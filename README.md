# ReUP — Landing Page (Payload CMS + Next.js)

The reup.energy site as a **Next.js 15 App Router** app with **Payload 3.x** embedded as a headless CMS. All marketing copy lives in a single editable `Landing Page` global; future docs/legal pages live in a `Pages` collection.

> The original static prototype is preserved at `_static_prototype/` for reference. Safe to delete once this app is fully validated.

## Stack

| Layer | Choice |
| :--- | :--- |
| Framework | Next.js 15 (App Router, RSC) |
| CMS | Payload 3.x (lives inside the Next app) |
| DB (dev) | SQLite via `@payloadcms/db-sqlite` |
| DB (prod) | Postgres via `@payloadcms/db-postgres` (Neon / Supabase / RDS) |
| Editor | Lexical |
| Styling | Tailwind CSS (brand tokens in `tailwind.config.ts`) |
| Images | `sharp` |

## Getting started

```sh
cd ReUP/reup.energy

# 1. Install (Node 20.9+ required)
pnpm install            # or: npm install / yarn install / bun install

# 2. Configure env
cp .env.example .env
# Edit .env — set PAYLOAD_SECRET (any long random string).
# Default DATABASE_URI uses local SQLite.

# 3. Generate Payload TS types + import map (first run + after schema changes)
pnpm payload generate:types
pnpm payload generate:importmap

# 4. Run dev
pnpm dev
# → http://localhost:3000          (public landing page)
# → http://localhost:3000/admin    (CMS — create the first admin user here)
```

First time you open `/admin`, Payload prompts you to create the initial admin account.

## Routes

| Route | What |
| :--- | :--- |
| `/` | Landing page (rendered from the `Landing Page` global) |
| `/admin` | Payload CMS admin UI |
| `/api/*` | Payload REST API |
| `/api/graphql` | Payload GraphQL endpoint |
| `/api/graphql-playground` | GraphQL playground (dev) |

## Content model

### Globals
- **`landing-page`** — all copy for `/`. Tabs:
  - **SEO** — meta title + description
  - **Nav** — header links
  - **Hero** — eyebrow, heading, lede, CTAs
  - **Strip** — feature highlight row
  - **How** — "How ReUP works" 3-step section
  - **Audiences** — 4-tile "Who we serve" grid
  - **Why** — 3-tile "Why ReUP wins" grid
  - **Contact** — CTA section
  - **Footer** — copyright + small note

### Collections
- **`users`** — CMS editors. Auth-enabled. Role: `admin` | `editor`.
- **`media`** — uploads (logos, photos). Auto-generated thumbnail / card / hero sizes.
- **`pages`** — generic content pages (e.g. `/privacy`, `/terms`). Slug-routed; renderer to be added.

To wire up `/[slug]` rendering for the `pages` collection later: add `src/app/(frontend)/[slug]/page.tsx` that fetches by slug.

## Project layout

```
reup.energy/
├── _static_prototype/        # archived HTML/CSS/JS prototype
├── src/
│   ├── app/
│   │   ├── (frontend)/       # public site
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── (payload)/        # CMS admin + API
│   │       ├── admin/[[...segments]]/
│   │       │   ├── importMap.js
│   │       │   ├── not-found.tsx
│   │       │   └── page.tsx
│   │       ├── api/
│   │       │   ├── [...slug]/route.ts
│   │       │   ├── graphql/route.ts
│   │       │   └── graphql-playground/route.ts
│   │       ├── custom.scss
│   │       └── layout.tsx
│   ├── collections/
│   │   ├── Media.ts
│   │   ├── Pages.ts
│   │   └── Users.ts
│   ├── components/           # public-site React components
│   │   ├── Audiences.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Logo.tsx
│   │   ├── Nav.tsx
│   │   ├── Strip.tsx
│   │   └── WhyReUP.tsx
│   ├── globals/
│   │   └── LandingPage.ts
│   └── payload.config.ts
├── .env.example
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Switching DB to Postgres (prod / staging)

1. Set `DATABASE_URI=postgres://...` in `.env`.
2. In `src/payload.config.ts`, swap:
   ```ts
   // import { sqliteAdapter } from '@payloadcms/db-sqlite'
   import { postgresAdapter } from '@payloadcms/db-postgres'

   // db: sqliteAdapter({ client: { url: process.env.DATABASE_URI || '' } }),
   db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI } }),
   ```
3. Run Payload migrations: `pnpm payload migrate`.

`@payloadcms/db-postgres` is already a dependency, so no install needed.

## Deployment

- **Vercel** — works out of the box for the Next.js side. For Postgres, use Neon / Supabase / Vercel Postgres. SQLite won't work on Vercel (ephemeral FS).
- **Self-host / Fly / Render** — use a Docker image; mount a volume for SQLite, or use managed Postgres.
- Set `PAYLOAD_SECRET`, `DATABASE_URI`, `NEXT_PUBLIC_SITE_URL` in your platform's env.

## Common tasks

| Task | Command |
| :--- | :--- |
| Generate TS types from collections/globals | `pnpm payload generate:types` |
| Generate admin import map | `pnpm payload generate:importmap` |
| Run migrations (Postgres) | `pnpm payload migrate` |
| Create / promote a user via CLI | `pnpm payload` (interactive) |
| Reset SQLite | delete `reup-landing.db` |

## After-install checklist
- [ ] Set `PAYLOAD_SECRET` in `.env`
- [ ] Run `pnpm payload generate:types` and `pnpm payload generate:importmap`
- [ ] Run `pnpm dev`
- [ ] Visit `/admin`, create the first admin user
- [ ] Verify defaults render at `/`
- [ ] Edit copy in `/admin → Landing Page` and reload `/`
- [ ] Add logo + hero photo to **Media** (for later)

## Brand tokens
Defined in [tailwind.config.ts](tailwind.config.ts) — colors map to the design system in [../design/brand_guidelines.md](../design/brand_guidelines.md).
