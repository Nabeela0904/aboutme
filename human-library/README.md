# Human Library

A modern mentorship marketplace built with Next.js 15, TypeScript, Tailwind CSS, Shadcn UI, and Supabase.

## Getting Started

```bash
cd human-library
npm install
cp .env.example .env.local
# Add your Supabase URL and anon key to .env.local
npm run dev
```

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key into `.env.local`
3. Run migrations in order via the Supabase SQL Editor:
   - `supabase/migrations/001_profiles.sql`
   - `supabase/migrations/002_core_schema.sql`
   - `supabase/seed.sql`
4. Add `http://localhost:3000/auth/callback` as a redirect URL in Auth settings
5. Promote an admin:
   ```sql
   update public.users set role = 'admin' where email = 'your@email.com';
   ```

See `supabase/SCHEMA.md` for the full database schema and relationships.

## Database Tables

| Table | Description |
|-------|-------------|
| `users` | App users (extends auth.users) |
| `categories` | Mentorship topic categories |
| `mentors` | Mentor profiles |
| `mentor_categories` | Mentor ↔ category (M:N) |
| `mentor_availability` | Weekly time slots |
| `bookings` | Session bookings |
| `reviews` | Post-session reviews |

## TypeScript Types

- `src/types/database.ts` — Supabase `Database` interface
- `src/types/db/` — Per-table Row, Insert, Update types
- `src/lib/db/mappers.ts` — DB row → domain model mappers

## Auth

| Route | Description |
|-------|-------------|
| `/login` | Sign in |
| `/signup` | Create account |
| `/admin` | Admin only |
| `/booking/*` | Authenticated users |

Roles: `user`, `mentor`, `admin`
