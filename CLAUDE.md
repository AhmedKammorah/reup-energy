# reup.energy — Claude Memory

The Next.js 15 + Payload 3 application powering the **reup.energy** marketing site. Same Next process serves both the public landing page and the Payload CMS admin.

> This folder is the codebase. Strategy/design docs live one level up at [../](../) — see [../CLAUDE.md](../CLAUDE.md) for the broader ReUP context.

## Stack

| Layer | Choice |
| :--- | :--- |
| Framework | Next.js 15 (App Router, RSC) |
| CMS | Payload 3.x (embedded in the Next app) |
| DB (dev) | SQLite via `@payloadcms/db-sqlite` — `reup-landing.db` in this folder |
| DB (prod target) | Postgres via `@payloadcms/db-postgres` (Neon planned) |
| Editor | Lexical |
| Styling | Tailwind CSS — brand tokens in [tailwind.config.ts](tailwind.config.ts) |
| Images | `sharp` |
| Package manager | pnpm |
| Node | ≥ 20.9 |

## Dev commands

```sh
pnpm dev                     # → http://localhost:3000 + /admin
pnpm build && pnpm start     # production build locally
pnpm payload generate:types  # regenerate src/payload-types.ts after schema changes
pnpm payload generate:importmap  # regenerate admin import map
pnpm db:reset                # nuke local SQLite db (dev safety valve)
```

## Folder map

```
reup.energy/
├── _static_prototype/        # archived HTML/CSS/JS prototype — reference only
├── src/
│   ├── app/
│   │   ├── (frontend)/       # public site at /
│   │   │   ├── globals.css   # Tailwind + brand tokens + animations
│   │   │   ├── layout.tsx    # SEO via getPayload().findGlobal(...)
│   │   │   └── page.tsx      # composes all section components
│   │   └── (payload)/        # CMS at /admin + REST/GraphQL at /api/*
│   │       ├── admin/[[...segments]]/
│   │       ├── api/
│   │       ├── custom.scss
│   │       └── layout.tsx
│   ├── collections/
│   │   ├── Media.ts          # uploads (auto thumbnail/card/hero sizes)
│   │   ├── Pages.ts          # generic content pages (/privacy, /terms, ...)
│   │   └── Users.ts          # admin auth — role: admin | editor
│   ├── components/           # public-site React (see Components map below)
│   ├── globals/
│   │   └── LandingPage.ts    # ALL marketing copy + structure for /
│   ├── payload.config.ts     # Payload bootstrap (adapter, secrets, paths)
│   └── payload-types.ts      # generated — DO NOT edit by hand
├── .env.example              # secrets template
├── next.config.mjs           # withPayload() wrapper
├── package.json
├── tailwind.config.ts        # brand tokens
└── tsconfig.json             # `@/*` and `@payload-config` path aliases
```

## Components map

All under [src/components/](src/components/):

| Component | Role |
| :--- | :--- |
| `Backdrop` | Page-wide ambient gradients + grid (fixed, behind everything) |
| `Logo` | SVG mark (bolt + wave) + wordmark, compact variant for nav |
| `icons.tsx` | Custom icon set (`BoltIcon`, `ShieldWaveIcon`, `SilentIcon`, `TapIcon`, `AnchorIcon`, `CompassIcon`) + `ICON_MAP` + `<Icon name />` resolver |
| `Nav` | **Client.** Morphing sticky nav (pill on scroll) |
| `Hero` | Cinematic ambient SVG, staggered fade-in, headline + CTAs + audience pills |
| `Strip` | Feature row with circular icon chips (uses `<Icon />`) |
| `Numbers` | 3 big stats in a bordered grid |
| `HowItWorks` | 3-step list + live `ChargeMeter` (sticky on lg+) |
| `ChargeMeter` | **Client.** Animated mock session — cycles Request → Dispatch → Arrive → Charging → Done |
| `PilotMarinas` | 6 marina cards with status pill + pulsing dot |
| `Audiences` | **Two-column split**: "For Harbors" + "For End Customers" (partitioned by `group` field) |
| `WhyReUP` | 3 reasons with lamp-bullet treatment |
| `Testimonial` | Big-quote captain testimonial (toggleable) |
| `Contact` | Central CTA on glow halo |
| `Footer` | Logo + copyright + small note |
| `ScrollReveal` | **Client.** IntersectionObserver fade-in wrapper |

Only the four marked **Client** use `'use client'`. Everything else is RSC and fetches CMS data via the Payload Local API in [page.tsx](src/app/(frontend)/page.tsx).

## Content model — `LandingPage` global

Single editable record at `/admin → Globals → Landing Page`. Tabs: **SEO · Nav · Hero · Strip · How · Audiences · Why · Numbers · Pilot Marinas · Testimonial · Contact · Footer**. Schema source: [src/globals/LandingPage.ts](src/globals/LandingPage.ts).

Two important schema details:
- **Strip icon field** is a `select` dropdown with keys (`bolt`, `shield`, `silent`, `tap`, `anchor`, `compass`). The `<Icon />` component resolves the key → SVG. Backward-compat: if the saved value is an emoji string, it renders as a literal.
- **Audiences items** carry a `group: 'harbor' | 'customer'` enum. The component partitions automatically into two panels.

## Data flow (the one thing to know)

```
Browser ──GET /──▶ Next server (RSC)
                    │
                    ▼
              getPayload(config).findGlobal('landing-page')
                    │
                    ▼
              SQLite read (Local API — no HTTP)
                    │
                    ▼
              Typed RSC tree → stream HTML
```

`export const revalidate = 60` in [page.tsx](src/app/(frontend)/page.tsx) — CMS edits propagate within ~1 minute. For instant: replace with an `afterChange` hook + `revalidatePath('/')`.

## Schema-change workflow (read before adding fields)

The SQLite adapter has `push: true` in dev, which **usually** auto-syncs the schema. But:

- **SQLite has limited `ALTER TABLE`.** Adding a column to a table that already has rows sometimes fails with `__new_landing_page` migration errors.
- **Safe recipe when this happens:**
  ```sh
  pnpm db:reset   # nukes reup-landing.db
  pnpm dev        # recreates with the current schema + seeded defaults
  ```
- You'll need to **recreate the admin user** on first /admin visit (the `users` table is in the deleted db).
- For prod (Postgres), use real migrations: `pnpm payload migrate:create` + `pnpm payload migrate`.

## Brand tokens (Tailwind utility colors)

| Token | Hex | Use |
| :--- | :--- | :--- |
| `reup-deep` | `#0A1F33` | Primary dark background |
| `reup-marine` | `#0E3A5F` | Secondary dark / strip |
| `reup-spark` | `#39E5C7` | Accent — CTAs, icons, focal moments |
| `reup-mist` | `#E8EEF2` | Light surfaces / body text on dark |
| `reup-graphite` | `#2A2F36` | Body text on light surfaces |
| `reup-ok` / `warning` / `alert` | `#4CCFA6` / `#F5B74A` / `#F25C5C` | Status |

Type: `font-display` = Outfit, `font-sans` = Inter, `font-mono` = JetBrains Mono.

## Routes

| Route | What |
| :--- | :--- |
| `/` | Landing page (rendered from the `landing-page` global) |
| `/admin` | Payload CMS admin |
| `/api/*` | Payload REST API |
| `/api/graphql` | Payload GraphQL |
| `/api/graphql-playground` | GraphQL playground (dev) |
| `/[slug]` | **Not wired yet** — `pages` collection exists but no renderer |

## Common gotchas

- **`handleServerFunctions` import path:** must be `@payloadcms/next/layouts`, not `/utilities`. See [src/app/(payload)/layout.tsx](src/app/(payload)/layout.tsx).
- **`importMap.js`** at [src/app/(payload)/admin/importMap.js](src/app/(payload)/admin/importMap.js) is **regenerated** by `pnpm payload generate:importmap`. Don't hand-edit it.
- **Schema change + existing db** = use the `pnpm db:reset` recipe above.
- **Folder dot (`reup.energy`)** is fine for Next/Payload/pnpm. Vercel CLI may complain on `vercel deploy` — set `--name reup-energy` if so.
- **Don't store secrets in code.** Use `.env`. `PAYLOAD_SECRET` is required.

## Where to find more

- Strategy / business / market → [../docs/](../docs/)
- Architecture / specs → [../architecture/](../architecture/)
- Brand / journeys → [../design/](../design/)
- Roadmap → [../roadmap/](../roadmap/)
- Site-specific roadmap (this app's enhancement + deploy plan) → [ROADMAP.md](ROADMAP.md)
