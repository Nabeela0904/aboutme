# Human Library — Database Schema

## Entity Relationship Diagram

```
auth.users (Supabase Auth)
    │
    │ 1:1
    ▼
┌─────────┐       ┌──────────────────┐       ┌────────────┐
│  users  │       │ mentor_categories │       │ categories │
│         │       └────────┬─────────┘       └─────┬──────┘
│ id (PK) │                │ M:N                   │
│ email   │                ▼                       │
│ name    │         ┌─────────────┐                │
│ role    │◄──┐     │   mentors   │◄───────────────┘
└────┬────┘   │     │             │
     │        │     │ id (PK)     │
     │        └─────│ user_id (FK)│ (optional — links mentor account)
     │              │ slug        │
     │              │ profession  │
     │              │ hourly_rate │
     │              └──────┬──────┘
     │                     │
     │    ┌────────────────┼────────────────┐
     │    │                │                │
     │    ▼                ▼                ▼
     │ ┌──────────┐  ┌───────────┐  ┌─────────────────────┐
     │ │ bookings │  │  reviews  │  │ mentor_availability │
     │ │          │  │           │  └─────────────────────┘
     │ │ mentor_id│  │ mentor_id │
     └►│ user_id  │  │ user_id   │
       │ status   │  │ booking_id│ (optional 1:1)
       └──────────┘  └───────────┘
```

## Tables

### `users`
Extends `auth.users`. Created automatically on sign-up via trigger.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | FK → auth.users |
| email | text | unique |
| name | text | |
| role | user_role | `user`, `mentor`, `admin` |
| avatar_url | text | nullable |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### `categories`
Lookup table for mentorship topics.

| Column | Type | Notes |
|--------|------|-------|
| id | text PK | slug e.g. `career`, `tech` |
| name | text | display name |
| description | text | |
| icon | text | lucide icon name |

### `mentors`
Mentor profiles. Can optionally link to a `users` row when the mentor has an account.

| Column | Type | Notes |
|--------|------|-------|
| id | uuid PK | |
| user_id | uuid FK | nullable → users |
| slug | text | unique, URL path |
| profile_image | text | avatar URL |
| profession | text | |
| years_experience | int | |
| hourly_rate | numeric | |
| skills | text[] | |
| rating | numeric | auto-updated by reviews trigger |
| total_sessions | int | |
| featured | boolean | |
| is_active | boolean | |

### `mentor_categories`
Many-to-many junction between mentors and categories.

### `mentor_availability`
Weekly time slots per mentor.

### `bookings`
Sessions booked by users with mentors.

| Column | Type | Notes |
|--------|------|-------|
| mentor_id | uuid FK | → mentors |
| user_id | uuid FK | → users (booker) |
| status | booking_status | pending → confirmed → completed |
| duration_minutes | int | 30, 60, or 90 |

### `reviews`
Post-session reviews. One review per booking (optional).

## Migrations

Run in order in the Supabase SQL Editor:

1. `supabase/migrations/001_profiles.sql` — initial auth setup (legacy)
2. `supabase/migrations/002_core_schema.sql` — full schema (renames profiles → users)
3. `supabase/seed.sql` — categories + demo mentors

## TypeScript Types

| Location | Purpose |
|----------|---------|
| `src/types/database.ts` | Full Supabase `Database` interface |
| `src/types/db/*.ts` | Per-table Row/Insert/Update types |
| `src/types/db/index.ts` | Barrel exports |
| `src/lib/db/mappers.ts` | Row → domain model mappers |
