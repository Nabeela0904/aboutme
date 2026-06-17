# Human Library

A modern mentorship marketplace built with Next.js 15, TypeScript, Tailwind CSS, and Shadcn UI.

## Getting Started

```bash
cd human-library
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo Accounts

| Role  | Email                     | Password  |
|-------|---------------------------|-----------|
| Admin | admin@humanlibrary.app    | Admin123! |
| User  | demo@humanlibrary.app     | Demo1234  |

## Pages

- `/` — Home page with hero, featured mentors, and testimonials
- `/mentors` — Browse and filter mentors
- `/mentors/[slug]` — Mentor profile with reviews and availability
- `/booking/[mentorSlug]` — Book a mentorship session (requires login)
- `/login` — Sign in
- `/register` — Create account
- `/admin` — Admin dashboard (admin role required)

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Shadcn UI** (Base UI primitives)
- **React Hook Form + Zod** for form validation
- **Lucide React** for icons
