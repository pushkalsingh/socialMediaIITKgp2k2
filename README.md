# Follow Wiki

A Wikipedia-style directory of who to follow on YouTube, Instagram, Facebook, X, and TikTok — organized by topic. Runs on Next.js + a free-tier Supabase Postgres database.

## What's here

- **Public site** — browse topics (Artificial Intelligence, Software Development, Web Development, Data Science, Cybersecurity, …), see the people/channels recommended for each, and search across everyone.
- **Admin dashboard** — log in to add/edit/delete topics and channels, mark links as verified, and add more admin accounts.
- **Starter data** — the database ships pre-seeded with real, well-known accounts for a few topics so the site isn't empty on day one. See "About the seeded data" below.

## Getting started

```bash
npm install
npm run db:push   # sync prisma/schema.prisma to your database
npm run db:seed   # create the admin account + starter topics/channels
npm run dev
```

Open http://localhost:3000. Admin login is at http://localhost:3000/admin/login.

Your `.env` file needs:

```
SESSION_SECRET="change-this-to-a-long-random-string-in-production"
ADMIN_EMAIL="admin@example.com"
ADMIN_NAME="Admin"
ADMIN_PASSWORD="ChangeMe123!"

# From Supabase: Project Settings → Database → Connection string
DATABASE_URL="postgresql://...:6543/postgres?pgbouncer=true"   # transaction pooler — used by the running app
DIRECT_URL="postgresql://...:5432/postgres"                     # direct/session connection — used for migrations
```

`.env` is gitignored — it's never committed. If you're setting this up fresh against your own Supabase project, grab both connection strings from **Project Settings → Database** (not the API Keys page — this app talks to Postgres directly via Prisma, not through Supabase's client library). If your database password contains characters like `@`, `#`, or `%`, percent-encode them in the URL (e.g. `@` → `%40`) or the connection string won't parse.

**Log in with `ADMIN_EMAIL` / `ADMIN_PASSWORD` and change the password immediately** from Admin → Account, or edit `.env` and re-run `npm run db:seed` before your first login. You can add more admin accounts from the same Account page.

## Managing content

Everything — topics and the channels inside them — is managed from `/admin`:

- **Topics** — add a topic (name, one-line description, an emoji icon), edit, or delete one (you'll need to remove or move its channels first).
- **Channels** — add a person/channel: pick a topic, name, short bio, an optional avatar image URL, and any of YouTube / Instagram / Facebook / X / TikTok / personal website links. Leave any link blank if you don't have it yet — the site just won't show that icon.
- Tick **"I've checked these links and they work"** when editing a channel once you've clicked through and confirmed the links are current — that adds a small ✓ badge on the public pages.

## About the seeded data

`prisma/seed.ts` pre-populates a handful of topics with real, publicly known figures/channels (e.g. Andrej Karpathy, Andrew Ng, Fireship, ThePrimeagen, Kevin Powell, StatQuest…) and their well-known public handles. Two topics (Startups & Entrepreneurship, Design & UX) are created empty as a starting point for you to fill in.

Social media handles change over time, and a few of these could be slightly out of date — **open each seeded channel's edit page once and click through its links to confirm, then tick the verified checkbox.** Re-running `npm run db:seed` is safe: it updates existing entries by slug rather than duplicating them.

To add more starter channels for a topic yourself, either use the admin UI, or add entries to the `categories` array in `prisma/seed.ts` and re-run `npm run db:seed`.

## Data & backups

Everything lives in your Supabase Postgres database. Supabase takes automatic daily backups on paid plans; on the free tier, use `npm run db:studio` (Prisma Studio) to browse data, or `pg_dump` against your `DIRECT_URL` for a manual backup if you want one.

## Deploying to Vercel

1. Import this repo into a new [Vercel](https://vercel.com) Hobby (free) project.
2. In the project's Environment Variables settings, add the same variables from your local `.env`: `DATABASE_URL`, `DIRECT_URL`, `SESSION_SECRET`, `ADMIN_EMAIL`, `ADMIN_NAME`, `ADMIN_PASSWORD`.
3. Deploy. The database is already set up (you ran `db:push`/`db:seed` locally against it), so no build-time migration step is required.

## Tech stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Prisma 6 · Supabase (Postgres) · JWT session cookies (`jose`) · `bcryptjs` for password hashing.
