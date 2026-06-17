-- Human Library: core database schema
-- Run after 001_profiles.sql (migrates profiles → users) or standalone on fresh DB

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------
do $$ begin
  create type public.user_role as enum ('user', 'mentor', 'admin');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.booking_status as enum ('pending', 'confirmed', 'completed', 'cancelled');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.day_of_week as enum (
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  );
exception when duplicate_object then null;
end $$;

-- ---------------------------------------------------------------------------
-- Users (extends auth.users; migrates from profiles if present)
-- ---------------------------------------------------------------------------
do $$ begin
  if exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'profiles'
  ) then
    alter table public.profiles rename to users;
  end if;
end $$;

create table if not exists public.users (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null unique,
  name        text not null,
  role        public.user_role not null default 'user',
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Categories
-- ---------------------------------------------------------------------------
create table if not exists public.categories (
  id          text primary key,
  name        text not null,
  description text not null default '',
  icon        text,
  created_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Mentors
-- ---------------------------------------------------------------------------
create table if not exists public.mentors (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid references public.users(id) on delete set null,
  slug              text not null unique,
  name              text not null,
  profile_image     text not null,
  profession        text not null,
  years_experience  int not null check (years_experience >= 0),
  hourly_rate       numeric(10, 2) not null check (hourly_rate >= 0),
  currency          text not null default 'USD',
  bio               text not null,
  skills            text[] not null default '{}',
  rating            numeric(3, 2) not null default 0 check (rating >= 0 and rating <= 5),
  total_sessions    int not null default 0 check (total_sessions >= 0),
  location          text not null default '',
  featured          boolean not null default false,
  is_active         boolean not null default true,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create index if not exists mentors_slug_idx on public.mentors(slug);
create index if not exists mentors_featured_idx on public.mentors(featured) where featured = true;
create index if not exists mentors_user_id_idx on public.mentors(user_id);

-- ---------------------------------------------------------------------------
-- Mentor ↔ Category (many-to-many)
-- ---------------------------------------------------------------------------
create table if not exists public.mentor_categories (
  mentor_id   uuid not null references public.mentors(id) on delete cascade,
  category_id text not null references public.categories(id) on delete cascade,
  primary key (mentor_id, category_id)
);

create index if not exists mentor_categories_category_idx on public.mentor_categories(category_id);

-- ---------------------------------------------------------------------------
-- Mentor availability
-- ---------------------------------------------------------------------------
create table if not exists public.mentor_availability (
  id          uuid primary key default gen_random_uuid(),
  mentor_id   uuid not null references public.mentors(id) on delete cascade,
  day_of_week public.day_of_week not null,
  start_time  time not null,
  end_time    time not null,
  check (end_time > start_time)
);

create index if not exists mentor_availability_mentor_idx on public.mentor_availability(mentor_id);

-- ---------------------------------------------------------------------------
-- Bookings
-- ---------------------------------------------------------------------------
create table if not exists public.bookings (
  id                uuid primary key default gen_random_uuid(),
  mentor_id         uuid not null references public.mentors(id) on delete restrict,
  user_id           uuid not null references public.users(id) on delete cascade,
  date              date not null,
  start_time        time not null,
  end_time          time not null,
  duration_minutes  int not null check (duration_minutes in (30, 60, 90)),
  topic             text not null,
  goals             text not null,
  status            public.booking_status not null default 'pending',
  total_price       numeric(10, 2) not null check (total_price >= 0),
  currency          text not null default 'USD',
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  check (end_time > start_time)
);

create index if not exists bookings_mentor_idx on public.bookings(mentor_id);
create index if not exists bookings_user_idx on public.bookings(user_id);
create index if not exists bookings_status_idx on public.bookings(status);
create index if not exists bookings_date_idx on public.bookings(date);

-- ---------------------------------------------------------------------------
-- Reviews
-- ---------------------------------------------------------------------------
create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  mentor_id   uuid not null references public.mentors(id) on delete cascade,
  user_id     uuid references public.users(id) on delete set null,
  booking_id  uuid unique references public.bookings(id) on delete set null,
  author_name text not null,
  rating      int not null check (rating between 1 and 5),
  comment     text not null,
  created_at  timestamptz not null default now()
);

create index if not exists reviews_mentor_idx on public.reviews(mentor_id);
create index if not exists reviews_user_idx on public.reviews(user_id);

-- ---------------------------------------------------------------------------
-- Updated-at trigger
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists users_updated_at on public.users;
create trigger users_updated_at
  before update on public.users
  for each row execute function public.set_updated_at();

drop trigger if exists mentors_updated_at on public.mentors;
create trigger mentors_updated_at
  before update on public.mentors
  for each row execute function public.set_updated_at();

drop trigger if exists bookings_updated_at on public.bookings;
create trigger bookings_updated_at
  before update on public.bookings
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Auth trigger: create user row on sign up
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.users (id, email, name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce((new.raw_user_meta_data->>'role')::public.user_role, 'user')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Recalculate mentor rating after review changes
-- ---------------------------------------------------------------------------
create or replace function public.refresh_mentor_rating()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
declare
  target_mentor_id uuid;
begin
  target_mentor_id := coalesce(new.mentor_id, old.mentor_id);

  update public.mentors m
  set rating = coalesce((
    select round(avg(r.rating)::numeric, 2)
    from public.reviews r
    where r.mentor_id = target_mentor_id
  ), 0)
  where m.id = target_mentor_id;

  return coalesce(new, old);
end;
$$;

drop trigger if exists reviews_refresh_rating on public.reviews;
create trigger reviews_refresh_rating
  after insert or update or delete on public.reviews
  for each row execute function public.refresh_mentor_rating();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.users enable row level security;
alter table public.categories enable row level security;
alter table public.mentors enable row level security;
alter table public.mentor_categories enable row level security;
alter table public.mentor_availability enable row level security;
alter table public.bookings enable row level security;
alter table public.reviews enable row level security;

-- Users
drop policy if exists "Users are viewable by authenticated users" on public.users;
create policy "Users are viewable by authenticated users"
  on public.users for select to authenticated using (true);

drop policy if exists "Users can insert their own row" on public.users;
create policy "Users can insert their own row"
  on public.users for insert to authenticated with check (auth.uid() = id);

drop policy if exists "Users can update their own row" on public.users;
create policy "Users can update their own row"
  on public.users for update to authenticated using (auth.uid() = id);

-- Categories (public read)
drop policy if exists "Categories are publicly readable" on public.categories;
create policy "Categories are publicly readable"
  on public.categories for select using (true);

-- Mentors (public read for active)
drop policy if exists "Active mentors are publicly readable" on public.mentors;
create policy "Active mentors are publicly readable"
  on public.mentors for select using (is_active = true);

drop policy if exists "Mentors can update their own profile" on public.mentors;
create policy "Mentors can update their own profile"
  on public.mentors for update to authenticated
  using (user_id = auth.uid());

-- Mentor categories & availability (public read)
drop policy if exists "Mentor categories are publicly readable" on public.mentor_categories;
create policy "Mentor categories are publicly readable"
  on public.mentor_categories for select using (true);

drop policy if exists "Mentor availability is publicly readable" on public.mentor_availability;
create policy "Mentor availability is publicly readable"
  on public.mentor_availability for select using (true);

-- Bookings
drop policy if exists "Users can view their own bookings" on public.bookings;
create policy "Users can view their own bookings"
  on public.bookings for select to authenticated
  using (user_id = auth.uid());

drop policy if exists "Mentors can view bookings for their profile" on public.bookings;
create policy "Mentors can view bookings for their profile"
  on public.bookings for select to authenticated
  using (
    exists (
      select 1 from public.mentors m
      where m.id = bookings.mentor_id and m.user_id = auth.uid()
    )
  );

drop policy if exists "Admins can view all bookings" on public.bookings;
create policy "Admins can view all bookings"
  on public.bookings for select to authenticated
  using (
    exists (
      select 1 from public.users u
      where u.id = auth.uid() and u.role = 'admin'
    )
  );

drop policy if exists "Authenticated users can create bookings" on public.bookings;
create policy "Authenticated users can create bookings"
  on public.bookings for insert to authenticated
  with check (user_id = auth.uid());

drop policy if exists "Admins can update bookings" on public.bookings;
create policy "Admins can update bookings"
  on public.bookings for update to authenticated
  using (
    exists (
      select 1 from public.users u
      where u.id = auth.uid() and u.role = 'admin'
    )
  );

-- Reviews (public read)
drop policy if exists "Reviews are publicly readable" on public.reviews;
create policy "Reviews are publicly readable"
  on public.reviews for select using (true);

drop policy if exists "Users can create reviews for their bookings" on public.reviews;
create policy "Users can create reviews for their bookings"
  on public.reviews for insert to authenticated
  with check (user_id = auth.uid());
