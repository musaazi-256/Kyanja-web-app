# Kyanja Junior School - Next.js + Supabase

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS + Framer Motion + Lucide Icons
- Supabase (Postgres + REST) via `@supabase/supabase-js`
- NextAuth.js v5 (Credentials auth)
- React Hook Form + Zod

## Environment Variables
Copy `.env.example` to `.env` and set:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `AUTH_SECRET`
- `AUTH_URL` (`http://localhost:3000` in local dev)

## Local Development
1. Install dependencies:
   `npm install`
2. Setup env:
   `cp .env.example .env`
3. Create DB schema in Supabase SQL editor:
   run `supabase/schema.sql`
4. Seed initial admin user:
   run `supabase/seed.sql` after replacing the password hash.
5. Start:
   `npm run dev`

## Build
- `npm run build`

Build runs `scripts/check-env.mjs` and fails fast when required variables are missing.

## Default Admin
- Email: `admin@kyanjajuniorschool.edu`
- Password: set in `supabase/seed.sql` (replace hash before running)

