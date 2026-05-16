# reup.energy — Site Roadmap (Enhancement + Deployment)

Two tracks: **content/feature enhancements** to keep the site evolving, and a **deployment path** to ship it to production at https://reup.energy.

Both tracks can start now and run in parallel; deployment doesn't need every enhancement to be done first.

---

## Track A — Enhancements

### A1 · Content fills (top priority — unblocks credibility)

| Item | Status | Notes |
| :--- | :--- | :--- |
| Real captain testimonial | placeholder | Replace once first pilot captain agrees |
| Real pilot marina logos / names | placeholder list | Update as MOUs sign |
| Hero photography | none | Commission shoot at first pilot marina (golden hour, MPU on dock, captain UI) |
| Brand logo (final) | placeholder SVG | Engage designer; current mark is workable but not final |
| Founder / team page | none | Add as `/team` once happy with bios + photos |
| Press / boat-show announcements | none | Build a `news` collection once activity warrants |
| ESG / carbon-savings calculator | none | Marketing differentiator — interactive widget |

### A2 · Pages to add (under the existing `pages` collection)

Add a renderer at `src/app/(frontend)/[slug]/page.tsx` that fetches by slug, then create:

- `/privacy` — GDPR-compliant privacy policy (lawyer-reviewed)
- `/terms` — terms of service
- `/cookies` — cookie policy + consent banner
- `/imprint` — legal entity disclosure (required in DE / EU contexts)
- `/about` — company / vision / team
- `/partners` — for marina / charter / event partner onboarding
- `/captains` — captain-specific landing (deep-link from app store / dockside QR)
- `/press` — press kit + logos + boilerplate

### A3 · Functional features

| Feature | Priority | Approach |
| :--- | :--- | :--- |
| **Waitlist / contact form** | High | Replace mailto with a Payload `enquiries` collection + form route. Resend / Postmark for confirmation email. Honeypot + rate-limit. |
| **Newsletter signup** | Medium | Mailchimp / Resend Audiences / Buttondown. Footer field + dedicated `/subscribe`. |
| **Cookie banner** | High (EU) | Minimal first-party banner — analytics off by default. Plausible / Fathom = no cookie needed → can skip if you go privacy-first. |
| **i18n (EN → ES, FR, IT)** | Medium | Payload supports field-level localization. Add `localization` block to `payload.config.ts`. Next-intl for client-side. |
| **Search** | Low | Algolia / Pagefind — wait until there are ≥10 pages. |
| **Live status badge** | Optional | "ReUP fleet status: X marinas live, Y kWh delivered this month" — drives FOMO once real. |
| **A/B copy testing** | Future | GrowthBook or Vercel's built-in flags — only once traffic justifies it. |

### A4 · Design polish

| Polish | Approach |
| :--- | :--- |
| **Real photography slot in Hero** | Add `heroImage` upload field on `landing-page` global → conditional Hero render with image background + overlay. |
| **Section dividers** | Already have `SectionSeparator` SVG component; sprinkle between sections sparingly. |
| **Custom 404** | `not-found.tsx` with brand-consistent styling. |
| **Favicon + OG image set** | Generate from logo SVG → 16/32/180/512 + 1200×630 OG + Apple touch. Use `realfavicongenerator.net`. |
| **Reduced-motion respect** | Already wired via `prefers-reduced-motion` — audit any new animation against it. |
| **Print stylesheet** | Hide ambient blobs, ensure copy reads on white. Low priority. |

### A5 · Performance + SEO + a11y

| Check | Tool / target |
| :--- | :--- |
| Lighthouse score | ≥95 on all four (Perf, A11y, Best Practices, SEO) |
| Image optimization | Next/image with Payload Media; preload hero, lazy below the fold |
| Font loading | Use `next/font` for self-hosted Inter + Outfit (eliminate Google Fonts FOIT) |
| `sitemap.xml` + `robots.txt` | Add `app/sitemap.ts` + `app/robots.ts` (generated) |
| Structured data | JSON-LD: `Organization`, `Service`, eventually `BreadcrumbList` |
| OG / Twitter cards | Per page; default in `(frontend)/layout.tsx` |
| WCAG 2.1 AA | Contrast (already aligned), keyboard nav (tab order), focus rings, alt text on all images, semantic HTML, prefers-reduced-motion (done) |
| Privacy-friendly analytics | **Plausible** (recommended) or Fathom — no cookies, GDPR-safe |
| Error monitoring | Sentry on both client + server |

### A6 · Code health

| Item | Notes |
| :--- | :--- |
| ESLint + Prettier | Add configs; run `pnpm lint` in CI |
| Type-checking | `pnpm tsc --noEmit` in CI |
| Test infra | Vitest for component logic, Playwright for happy path (`/`, `/admin` login) |
| Storybook | Optional — only if component library starts to fan out |
| Pre-commit hooks | `husky` + `lint-staged` for formatting + typecheck |

---

## Track B — Deployment

### B1 · Domain + DNS

1. **Confirm `reup.energy` registration** — currently held; verify renewal + expiry.
2. **Move DNS to Cloudflare** (free, fastest, DNSSEC, easy email forwarding).
3. **Email forwarding:** Cloudflare Email Routing → `hello@reup.energy`, `ahmed@`, `ismail@`, etc. → personal inboxes. Free, no mailbox provisioning needed for v1.
4. **Future mailbox provider:** Google Workspace or Fastmail when scale demands it.

### B2 · Hosting

**Recommended: Vercel + Neon Postgres + Cloudflare DNS.**

| Component | Choice | Why |
| :--- | :--- | :--- |
| Compute / hosting | **Vercel Hobby → Pro** | Next.js native, zero-config, edge functions, automatic ISR, preview deploys on PRs |
| Database (prod) | **Neon Postgres** | Serverless Postgres, EU regions, generous free tier, branching for staging |
| File storage (media) | Vercel Blob or S3-compatible (R2) | Payload Media uploads land here in prod |
| Domain | Cloudflare Registrar (cheapest, no markup) or current registrar |
| DNS | Cloudflare | CNAME / A records to Vercel |
| Email forwarding | Cloudflare Email Routing | Free, GDPR-friendly |
| Analytics | Plausible Cloud (EU-hosted) | Cookie-free, GDPR-safe, one script tag |
| Errors | Sentry (free tier) | Source maps, both client + server |
| Status page | Optional — later | BetterStack / Statuspage |

**Alternative paths if Vercel/Neon doesn't fit:**

- **Cloudflare Pages + D1** — closest to "fully Cloudflare." Payload's SQLite via D1 needs custom adapter work; not ready out of the box. Skip for v1.
- **Railway / Fly.io** — single-host both Next and Postgres. Good if cost is the prime concern; less ergonomic than Vercel.
- **Self-host (Hetzner + Coolify / Dokku)** — cheap and full control. Avoid until necessary.

### B3 · Prep work (one-time)

1. **Generate a real `PAYLOAD_SECRET`** for prod: `openssl rand -hex 32`.
2. **Provision Neon project** (EU region — Frankfurt). Create a `prod` database; copy the connection string.
3. **Update [src/payload.config.ts](src/payload.config.ts)** to use Postgres in prod:
   ```ts
   import { postgresAdapter } from '@payloadcms/db-postgres'

   db: process.env.NODE_ENV === 'production'
     ? postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI! } })
     : sqliteAdapter({ client: { url: process.env.DATABASE_URI || 'file:./reup-landing.db' }, push: true }),
   ```
4. **Migrations:** `pnpm payload migrate:create` to create the first migration, commit it.
5. **GitHub repo:** push `ReUP/reup.energy/` to its own GitHub repo (or a monorepo subdirectory).
6. **Vercel project:** import the repo, set the root directory to `ReUP/reup.energy/` if monorepo.

### B4 · Vercel environment variables

| Key | Value |
| :--- | :--- |
| `PAYLOAD_SECRET` | the openssl-generated string |
| `DATABASE_URI` | Neon connection string (with `?sslmode=require`) |
| `NEXT_PUBLIC_SITE_URL` | `https://reup.energy` |
| `PAYLOAD_PUBLIC_SERVER_URL` | `https://reup.energy` |
| `RESEND_API_KEY` | (once email integrated) |
| `SENTRY_DSN` / `NEXT_PUBLIC_SENTRY_DSN` | (once error monitoring added) |

### B5 · First deploy checklist

1. Push to `main` → Vercel builds preview → verify on `<project>.vercel.app`.
2. `pnpm payload migrate` runs against Neon (Vercel build hook or one-off CLI).
3. Visit `/admin`, create the first admin user.
4. Edit copy in the CMS, confirm `/` reflects changes (after ISR window).
5. Configure custom domain `reup.energy` in Vercel → set Cloudflare CNAME / apex A records.
6. Confirm HTTPS auto-issued.
7. Set up Cloudflare Email Routing for `hello@reup.energy`.
8. Submit `sitemap.xml` to Google Search Console + Bing Webmaster.
9. Set up Plausible site → drop script into `(frontend)/layout.tsx`.
10. Set up Sentry → add `@sentry/nextjs`, configure DSN.
11. Smoke test: `/`, `/admin`, `/api/globals/landing-page`, 404 page.

### B6 · CI/CD

GitHub Actions workflow:
- On PR: install, typecheck, lint, build, Playwright smoke test, Lighthouse CI.
- On merge to `main`: Vercel auto-deploys; run `pnpm payload migrate` post-deploy via Vercel build hook.
- Preview deploy URL commented on PR (Vercel does this automatically).

### B7 · Post-launch monitoring

| Metric | Target | Tool |
| :--- | :--- | :--- |
| Uptime | 99.9% | Vercel + BetterStack |
| TTFB (RSC) | <500 ms p95 | Vercel Analytics |
| Lighthouse Performance | ≥95 | Lighthouse CI |
| Sessions | track | Plausible |
| Errors | <0.1% | Sentry |
| Form submissions | track | Payload `enquiries` count |

---

## Suggested first-90-day sequence

| Week | Track A (enhance) | Track B (deploy) |
| :--- | :--- | :--- |
| 1 | Final logo brief out to designer | Move DNS to Cloudflare; set up email forwarding |
| 2 | Real hero photo brief (or commission) | Provision Neon; update Payload config for Postgres in prod |
| 3 | Add `/privacy` + `/terms` + page renderer | First Vercel deploy to preview URL |
| 4 | Waitlist form (Payload `enquiries`) | Cut over `reup.energy` → Vercel; verify HTTPS |
| 5 | i18n setup (EN/ES first) | Plausible + Sentry wiring |
| 6 | Press / partners pages | Sitemap + robots; Search Console verification |
| 7 | Real captain testimonial integrated | Lighthouse CI in GitHub Actions |
| 8 | OG image set + favicon | Cookie banner if needed |
| 9 | Cookie banner + GDPR audit | Backup + monitoring runbook |
| 10–12 | Continuous content + design iteration | First real campaign / boat-show landing variant |

---

## Where to update this

- **Site code changes** → here (`reup.energy/ROADMAP.md`).
- **Strategy / GTM changes** → [`../roadmap/`](../roadmap/) and the relevant doc in [`../docs/`](../docs/).
- **Active sprint tasks** → [`../roadmap/task_list.md`](../roadmap/task_list.md).
