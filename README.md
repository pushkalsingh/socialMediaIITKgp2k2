# Follow Wiki

A Wikipedia-style directory of who to follow on YouTube, Instagram, Facebook, X, and TikTok — organized by topic. Runs entirely for free: Next.js + a local SQLite database, no external accounts required.

## What's here

- **Public site** — browse topics (Artificial Intelligence, Software Development, Web Development, Data Science, Cybersecurity, …), see the people/channels recommended for each, and search across everyone.
- **Admin dashboard** — log in to add/edit/delete topics and channels, mark links as verified, and add more admin accounts.
- **Starter data** — the database ships pre-seeded with real, well-known accounts for a few topics so the site isn't empty on day one. See "About the seeded data" below.

## Getting started

```bash
npm install
npm run db:push   # create the SQLite database from prisma/schema.prisma
npm run db:seed   # create the admin account + starter topics/channels
npm run dev
```

Open http://localhost:3000. Admin login is at http://localhost:3000/admin/login.

Your `.env` file already has:

```
DATABASE_URL="file:./dev.db"
SESSION_SECRET="change-this-to-a-long-random-string-in-production"
ADMIN_EMAIL="admin@example.com"
ADMIN_NAME="Admin"
ADMIN_PASSWORD="ChangeMe123!"
```

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

Everything lives in `prisma/dev.db`, a single SQLite file (gitignored). To back up your data, just copy that file. `npm run db:studio` opens a local GUI (Prisma Studio) to browse or hand-edit the database directly.

## Staying free if you outgrow local-only

This runs entirely on your machine right now. If you later want it live on the internet:

1. **Hosting**: deploy the Next.js app to [Vercel](https://vercel.com)'s free Hobby tier.
2. **Database**: Vercel's servers don't keep a persistent filesystem, so the SQLite file won't survive between deploys there. Swap in a free hosted database instead — [Turso](https://turso.tech) (SQLite-compatible, generous free tier, minimal code changes) or [Supabase](https://supabase.com) (Postgres, also has free auth/storage if you want to grow beyond this app's built-in login) both work well with Prisma.
3. Update `DATABASE_URL` (and the Prisma datasource provider, if you switch to Postgres) to point at the hosted database, then run `npm run db:push` and `npm run db:seed` against it once.

None of this is required to use the app locally — it's just the path if "cheapest" later becomes "cheapest *and* public."

## Tech stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Prisma 6 · SQLite · JWT session cookies (`jose`) · `bcryptjs` for password hashing.
