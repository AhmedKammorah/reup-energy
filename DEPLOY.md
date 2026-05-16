# reup.energy — GCP Cloud Run Deployment Plan

Target: production deploy of the Next.js 15 + Payload CMS app to **https://reup.energy** on **Google Cloud Run**, with **Cloud SQL Postgres** as the database, **Cloud Storage** for Payload media uploads, and **Cloudflare** for DNS.

Single-repo source of truth: [`github.com/AhmedKammorah/reup-energy`](https://github.com/AhmedKammorah/reup-energy).

---

## Architecture (production)

```
        Cloudflare DNS                    Google Cloud (region: europe-west1)
        reup.energy ──────► CNAME ──┐
                                    │
                                    ▼
                          Cloud Run service (reup-energy)
                          ├─ Docker container (Next.js standalone)
                          ├─ scales 0 → N (auto)
                          ├─ public ingress, managed TLS
                          │
                          ├──► Cloud SQL (Postgres 16)
                          │     └─ private IP via VPC connector
                          │
                          ├──► Cloud Storage bucket (reup-energy-media)
                          │     └─ Payload media uploads
                          │
                          └──► Secret Manager
                                ├─ PAYLOAD_SECRET
                                ├─ DATABASE_URI
                                └─ GCS service-account JSON
```

**Why this shape:** Cloud Run scales to zero (≈€0/mo when idle), pay-per-request when warm. Single container, no orchestration. Cloud SQL gives us managed Postgres with point-in-time recovery. GCS keeps media out of the container filesystem (Cloud Run is ephemeral — local writes vanish).

**Expected idle cost:** ~€8–15/mo (Cloud SQL minimum instance) + ≈€0 Cloud Run + ≈€0 GCS until traffic. Cloud SQL is the only line item that doesn't scale to zero.

---

## Track 0 — Pre-flight (one-time, ~30 min)

- [ ] Confirm a Google Cloud account is available (personal or `cognalabs.com` org).
- [ ] Install / verify CLI tools:
  ```sh
  gcloud --version          # Google Cloud SDK
  docker --version          # for local build test
  ```
  - If missing: `brew install --cask google-cloud-sdk docker`
- [ ] `gcloud auth login`
- [ ] Create a new GCP project: `reup-energy-prod` (note the project ID — must be globally unique, may need a suffix).
- [ ] Enable billing on the project (link a billing account).
- [ ] Set project as default: `gcloud config set project reup-energy-prod`
- [ ] Enable required APIs:
  ```sh
  gcloud services enable \
    run.googleapis.com \
    sqladmin.googleapis.com \
    artifactregistry.googleapis.com \
    cloudbuild.googleapis.com \
    secretmanager.googleapis.com \
    storage.googleapis.com \
    vpcaccess.googleapis.com \
    iamcredentials.googleapis.com
  ```

---

## Track 1 — Repo changes (in code)

These changes need to land in the repo **before** the first deploy. Branch name: `feat/gcp-deploy`.

### 1.1 — Add `output: 'standalone'` to Next.js

[`next.config.mjs`](next.config.mjs) — adds the standalone bundle so the Docker image is tiny.

```js
import { withPayload } from '@payloadcms/next/withPayload'

export default withPayload({
  output: 'standalone',
  // ... existing config
})
```

### 1.2 — Branch Payload config on `NODE_ENV`

[`src/payload.config.ts`](src/payload.config.ts) — use Postgres in prod, SQLite in dev.

```ts
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'

const isProd = process.env.NODE_ENV === 'production'

db: isProd
  ? postgresAdapter({
      pool: { connectionString: process.env.DATABASE_URI! },
    })
  : sqliteAdapter({
      client: { url: process.env.DATABASE_URI || 'file:./reup-landing.db' },
      push: true,
    }),
```

Install the package: `pnpm add @payloadcms/db-postgres`

### 1.3 — Payload media → Cloud Storage in prod

Install: `pnpm add @payloadcms/storage-gcs`

Wire it in `payload.config.ts` under `plugins:`:

```ts
import { gcsStorage } from '@payloadcms/storage-gcs'

plugins: [
  ...(isProd
    ? [
        gcsStorage({
          collections: { media: true },
          bucket: process.env.GCS_BUCKET!,
          options: {
            credentials: JSON.parse(process.env.GCS_CREDENTIALS!),
          },
        }),
      ]
    : []),
],
```

### 1.4 — Generate first Postgres migration

Once the config is updated, point at a throwaway local Postgres (or Neon free DB) to generate the migration, then commit:

```sh
DATABASE_URI=postgresql://... NODE_ENV=production pnpm payload migrate:create initial
```

The migration file lands in `src/migrations/` and is committed.

### 1.5 — Add `Dockerfile`

Multi-stage build, Next.js standalone output, non-root user, port 3000.

```dockerfile
# Stage 1: deps
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Stage 2: build
FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm build

# Stage 3: runtime
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
```

### 1.6 — Add `.dockerignore`

```
node_modules
.next
.git
*.db
*.db-journal
.env
.env.local
_static_prototype
docs
*.md
!README.md
```

### 1.7 — Add `cloudbuild.yaml` (Cloud Build → Cloud Run)

Triggers on push to `main`. Builds image, pushes to Artifact Registry, deploys to Cloud Run.

```yaml
steps:
  - name: gcr.io/cloud-builders/docker
    args:
      - build
      - -t
      - europe-west1-docker.pkg.dev/$PROJECT_ID/reup-energy/app:$SHORT_SHA
      - .
  - name: gcr.io/cloud-builders/docker
    args:
      - push
      - europe-west1-docker.pkg.dev/$PROJECT_ID/reup-energy/app:$SHORT_SHA
  - name: gcr.io/google.com/cloudsdktool/cloud-sdk
    entrypoint: gcloud
    args:
      - run
      - deploy
      - reup-energy
      - --image=europe-west1-docker.pkg.dev/$PROJECT_ID/reup-energy/app:$SHORT_SHA
      - --region=europe-west1
      - --platform=managed
      - --allow-unauthenticated
      - --port=3000
      - --memory=1Gi
      - --cpu=1
      - --min-instances=0
      - --max-instances=5
      - --add-cloudsql-instances=$PROJECT_ID:europe-west1:reup-energy-db
      - --set-secrets=PAYLOAD_SECRET=PAYLOAD_SECRET:latest,DATABASE_URI=DATABASE_URI:latest,GCS_CREDENTIALS=GCS_CREDENTIALS:latest
      - --set-env-vars=NODE_ENV=production,NEXT_PUBLIC_SITE_URL=https://reup.energy,GCS_BUCKET=reup-energy-media
options:
  logging: CLOUD_LOGGING_ONLY
```

---

## Track 2 — Cloud infra provisioning (one-time, ~45 min)

Run from the repo root after Track 0 is done.

### 2.1 — Artifact Registry (container images)

```sh
gcloud artifacts repositories create reup-energy \
  --repository-format=docker \
  --location=europe-west1 \
  --description="reup.energy container images"
```

### 2.2 — Cloud SQL (Postgres)

```sh
gcloud sql instances create reup-energy-db \
  --database-version=POSTGRES_16 \
  --tier=db-f1-micro \
  --region=europe-west1 \
  --storage-size=10GB \
  --storage-auto-increase \
  --backup-start-time=03:00

gcloud sql databases create reup --instance=reup-energy-db
gcloud sql users create reup-app --instance=reup-energy-db --password=<generate-strong>
```

Connection string (note the **Unix socket** path Cloud Run uses):
```
postgresql://reup-app:<password>@localhost/reup?host=/cloudsql/<project-id>:europe-west1:reup-energy-db
```

### 2.3 — Cloud Storage bucket (media)

```sh
gcloud storage buckets create gs://reup-energy-media \
  --location=europe-west1 \
  --uniform-bucket-level-access \
  --public-access-prevention
```

Create a service account for the app:
```sh
gcloud iam service-accounts create reup-app \
  --display-name="reup.energy Cloud Run app"

gcloud storage buckets add-iam-policy-binding gs://reup-energy-media \
  --member=serviceAccount:reup-app@<project-id>.iam.gserviceaccount.com \
  --role=roles/storage.objectAdmin

gcloud iam service-accounts keys create reup-app-key.json \
  --iam-account=reup-app@<project-id>.iam.gserviceaccount.com
```

(For a tighter setup later: switch to **Workload Identity Federation** so we don't need a JSON key.)

### 2.4 — Secrets in Secret Manager

```sh
# Payload secret
openssl rand -hex 32 | gcloud secrets create PAYLOAD_SECRET --data-file=-

# Database URI (paste the connection string from 2.2)
echo -n "postgresql://reup-app:...@/reup?host=/cloudsql/..." | \
  gcloud secrets create DATABASE_URI --data-file=-

# GCS service account JSON
gcloud secrets create GCS_CREDENTIALS --data-file=reup-app-key.json
rm reup-app-key.json  # delete local copy after upload
```

Grant Cloud Run service account access:
```sh
PROJECT_NUMBER=$(gcloud projects describe <project-id> --format='value(projectNumber)')
SA="${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"

for secret in PAYLOAD_SECRET DATABASE_URI GCS_CREDENTIALS; do
  gcloud secrets add-iam-policy-binding $secret \
    --member=serviceAccount:$SA --role=roles/secretmanager.secretAccessor
done
```

### 2.5 — Cloud Build trigger

Connect GitHub:
```sh
gcloud builds connections create github reup-github \
  --region=europe-west1
# follow the OAuth flow to authorize Cloud Build to read AhmedKammorah/reup-energy
```

Create a build trigger on push to `main`:
```sh
gcloud builds triggers create github \
  --name=reup-energy-main \
  --region=europe-west1 \
  --repository=projects/<project-id>/locations/europe-west1/connections/reup-github/repositories/reup-energy \
  --branch-pattern=^main$ \
  --build-config=cloudbuild.yaml
```

---

## Track 3 — First deploy + smoke test

- [ ] Merge the `feat/gcp-deploy` PR to `main` — triggers Cloud Build.
- [ ] Watch build: `gcloud builds list --ongoing` / Cloud Build UI.
- [ ] After deploy succeeds, get the auto-assigned URL: `gcloud run services describe reup-energy --region=europe-west1 --format='value(status.url)'`.
- [ ] Visit `<auto-url>/admin` → create first admin user (this writes to Cloud SQL).
- [ ] Visit `<auto-url>/` → verify landing page renders.
- [ ] In `/admin`, upload a test image → verify it lands in `gs://reup-energy-media`.

---

## Track 4 — Custom domain `reup.energy`

- [ ] Confirm `reup.energy` registrar + expiry (one-pass check on whois).
- [ ] Move nameservers to **Cloudflare**.
- [ ] In Cloudflare: add the domain, leave proxy **DNS-only (gray cloud)** for the Cloud Run mapping (orange-cloud breaks Cloud Run's TLS handshake — re-enable proxy only after switching to a Cloud Load Balancer, future work).
- [ ] In Cloud Run console → **Manage Custom Domains** → map `reup.energy` and `www.reup.energy` to the `reup-energy` service.
- [ ] Cloud Run gives you DNS records to add → paste them into Cloudflare.
- [ ] Wait for managed cert provisioning (15 min – 24 h).
- [ ] Verify HTTPS works at https://reup.energy.

---

## Track 5 — Email forwarding

- [ ] Cloudflare → Email Routing → Get Started.
- [ ] Add forwarding routes:
  - `hello@reup.energy` → `ahmedkammorah@gmail.com`
  - `ahmed@reup.energy` → `ahmedkammorah@gmail.com`
  - `ismail@reup.energy` → (Ismail's inbox)
- [ ] Verify by sending a test email.

---

## Track 6 — Monitoring (deploy-day light, expand later)

- [ ] Enable Cloud Run uptime check (Cloud Monitoring → Uptime checks → HTTPS GET / every 5 min).
- [ ] Alerting: email to `hello@reup.energy` if uptime drops.
- [ ] (Later) Sentry: `pnpm add @sentry/nextjs && npx @sentry/wizard@latest -i nextjs`.
- [ ] (Later) Plausible Cloud: drop one script tag in `(frontend)/layout.tsx` — cookieless, GDPR-safe.

---

## Track 7 — Hardening (post-launch, not blocking)

- [ ] Replace SA-key JSON in Secret Manager with **Workload Identity Federation**.
- [ ] Move Cloud SQL connection to **private IP + VPC connector** (currently public IP via Unix socket — fine but private is tighter).
- [ ] Add **Cloudflare proxy + Cloud Load Balancer** in front of Cloud Run for DDoS + caching.
- [ ] Lock `/admin` to an IP allowlist or behind Cloud IAP for staff-only access.
- [ ] Set up **staging environment**: separate Cloud Run service `reup-energy-staging` + Cloud SQL branch, triggered on `develop` branch.

---

## Cost ceiling (production, low traffic)

| Line | Monthly est. |
| :--- | :--- |
| Cloud Run (idle most of the time) | €0–2 |
| Cloud SQL `db-f1-micro` | €8–10 |
| Cloud Storage (media, <1 GB) | <€0.50 |
| Egress (low) | <€1 |
| Secret Manager | €0 (under free quota) |
| Cloud Build (≤120 build-min/day free) | €0 |
| **Total** | **~€10–14/mo** |

Add Plausible (€9/mo) and Sentry (free tier OK) later for observability.

---

## Execution order recap

1. **Track 0** — pre-flight CLI setup + GCP project creation
2. **Track 2.1–2.4** — provision infra (Artifact Registry, Cloud SQL, GCS, secrets)
3. **Track 1** — code changes in a branch, PR, merge
4. **Track 2.5** — Cloud Build trigger (auto-deploys on the merge)
5. **Track 3** — smoke-test the auto URL
6. **Track 4** — point `reup.energy` at it
7. **Track 5–6** — email + basic monitoring

Tracks 1 and 2 can run in parallel — code changes don't need infra to exist yet, and infra doesn't need the code.

---

## Status

| Date | Track | Note |
| :--- | :--- | :--- |
| 2026-05-16 | — | Plan drafted, repo initialized + pushed to GitHub |
| 2026-05-16 | 2 | GCP infra provisioned: `reup-energy-prod` project, Cloud SQL `cognalabs-pg-eu` (Postgres 15, shared), Artifact Registry, GCS `reup-energy-media`, runtime + deployer SAs, WIF for GitHub Actions, secrets in Secret Manager |
| 2026-05-16 | 1 | Repo scaffold: Dockerfile, `.dockerignore`, Next standalone, Payload Postgres + GCS adapters wired, GH Actions deploy workflow |
| 2026-05-16 | 4 | Cloudflare zone `reup.energy` added; nameservers updated at GoDaddy, propagation pending |
