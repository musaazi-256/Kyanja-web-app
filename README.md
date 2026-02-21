# Kyanja Junior School - Next.js Full-Stack App

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS + Framer Motion + Lucide Icons
- Prisma ORM
- NextAuth.js v5 (Credentials auth)
- React Hook Form + Zod

## What is automated now
- Build-time environment validation (`scripts/check-env.mjs`)
- Production-safe build pipeline (Supabase/Postgres):
  - `prisma generate`
  - `prisma db push`
  - `next build`
- Clear fail-fast checks for Vercel when:
  - required env vars are missing
  - `DATABASE_URL` is still SQLite (`file:...`) in production
  - `DIRECT_URL` is missing in production

## Local development
1. Install dependencies:
   `npm install`
2. Setup env:
   `cp .env.example .env`
3. Run migrations:
   `npx prisma migrate dev --name init`
4. Seed admin:
   `npm run prisma:seed`
5. Start dev server:
   `npm run dev`

## Default admin
- Email: `admin@kyanjajuniorschool.edu`
- Password: `Admin@123`

Change credentials immediately after first login.

## Vercel deployment checklist (what you still must do)
1. Create/connect a Supabase Postgres project.
2. In Vercel project settings, add env vars:
   - `DATABASE_URL` = Supabase pooler URL (`:6543`, with `?pgbouncer=true`)
   - `DIRECT_URL` = Supabase direct DB URL (`:5432`)
   - `AUTH_SECRET` = strong random secret
   - `AUTH_URL` = your production URL, e.g. `https://your-domain.com`
3. Ensure your Vercel project is connected to this repo/branch.
4. Trigger redeploy.
5. After successful deploy, seed an admin user (run once from a trusted env):
   - `npm run prisma:seed`

## If Vercel build fails
- Open deployment logs and check first red error line.
- Common causes are missing env vars or invalid `DATABASE_URL`.
