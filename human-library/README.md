# Human Library

A modern mentorship marketplace built with Next.js 15, TypeScript, Tailwind CSS, Shadcn UI, and Supabase Auth.

## Getting Started

```bash
cd human-library
npm install
cp .env.example .env.local
# Add your Supabase URL and anon key to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key into `.env.local`
3. Run the SQL migration in `supabase/migrations/001_profiles.sql` via the Supabase SQL Editor
4. In Supabase Auth settings, add `http://localhost:3000/auth/callback` as a redirect URL
5. (Optional) Promote a user to admin:
   ```sql
   update public.profiles set role = 'admin' where email = 'your@email.com';
   ```

## Authentication

| Route | Description |
|-------|-------------|
| `/login` | Sign in |
| `/signup` | Create account (User or Mentor role) |
| `/auth/callback` | Supabase OAuth / email confirmation handler |

### Roles

- **user** — Book mentorship sessions
- **mentor** — Share experience (mentor onboarding coming soon)
- **admin** — Access admin dashboard

### Protected Routes

- `/booking/*` — Requires signed-in user (any role)
- `/admin/*` — Requires admin role

## Pages

- `/` — Home page
- `/mentors` — Browse and filter mentors
- `/mentors/[slug]` — Mentor profile
- `/booking/[mentorSlug]` — Book a session
- `/login` — Sign in
- `/signup` — Sign up
- `/admin` — Admin dashboard

## Tech Stack

- **Next.js 15** (App Router)
- **Supabase** (Auth + profiles)
- **TypeScript**
- **Tailwind CSS v4**
- **Shadcn UI**
- **React Hook Form + Zod**
