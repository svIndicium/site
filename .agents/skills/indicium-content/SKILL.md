---
name: indicium-content
description: 'Indicium site handoff: author/edit Nuxt Content + Nuxt Studio, per-collection docs, MDC syntax, architecture.'
allowed-tools: Read, Write, Edit, Glob, Grep
---

# Nuxt Content & Studio — Indicium site handoff

Repo `svIndicium/site`. **Content lives in Markdown/YAML under `content/`**, edited by non-technical staff via Nuxt Studio. Vue pages are thin shims that render that content. Prefer editing content over pages.

## Must-know conventions (read before touching anything)
- **Pages are shims.** Content (copy, structure, images, links) goes in `content/**/*.{md,yml}`, not hardcoded in `.vue`.
- **Data collections (`type: 'data'`) expose fields at the TOP level of the query result, NOT under `.meta`** — with a schema, `meta` is `{}`. Read `item.items`, `item.address`; **never** `item.meta?.items` (silently `undefined` → blank nav/footer, lost crawl routes). See `references/collections/*`.
- **Page collections** (`type: 'page'`) get native `title`/`description`; schemas cover custom frontmatter only.
- **MDC components used in Markdown must be globally registered** for Nuxt Studio's `/` command (see `references/nuxt-studio.md`).
- **Styling:** reuse generic components / shared classes over per-page scoped CSS; avoid cascading overrides (see `references/architecture.md`).

## Tech stack
Nuxt 4.5 (SSG `pnpm generate`), `@nuxt/content` 3.15.2, zod 4.4.3, `nuxt-studio` 1.7, Vue 3. Hosting: Firebase → migrating to Cloudflare Pages (see `references/architecture.md`).

## Project state & getting started (read this if picking up the project)
- **All collections have schemas** in `content.config.ts` (they validate and drive Studio's Form Editor). `home.description` uses `property().editor({ input: 'textarea' })` — with zod v4, `.editor()` must be wrapped in `property()` (see `references/nuxt-studio.md`).
- **Data collections expose fields at top level** (`.meta` gotcha) — consumers (`AppFooter`, `NavDesktop`, `NavMobile`, `Links.vue`) already read `.items`/`.links` etc. directly.
- **`@nuxt/content` is 3.15.2** (upgraded from 3.11.2). Studio features that need `property().editor()` only work on this/newer.
- **Studio editor configured**: 9 homepage MDC components globally registered; `Prose*` excluded; grouped under "Home"; `studio.repository` pinned so local `generate` works.
- To get oriented: read `content.config.ts` and the relevant `references/collections/<name>.md`; run `pnpm generate` and expect **83 prerendered routes**.
- Open work and known issues live in `references/architecture.md` → "Open work & known issues".

## Sub-skills — read on demand (each is self-contained; do not load all up front)
| Topic | File |
|---|---|
| MDC authoring syntax, gotchas, nesting | `references/mdc-syntax.md` |
| Nuxt Studio editor integration, forms, validators, login gate | `references/nuxt-studio.md` |
| Architecture, hosting, Cloudflare migration, styling conventions | `references/architecture.md` |
| **Per-collection** docs (used where/how, fields, query) | `references/collections/<name>.md` |

## Collections
| Collection | Source | Type | Consumed by |
|---|---|---|---|
| `navigation` | `navigation.yml` | data | `NavDesktop.vue`, `NavMobile.vue` |
| `home` | `index.md` | page | `pages/index.vue` |
| `contact` | `contact.yml` | data | `pages/Contact.vue` |
| `footer` | `footer.yml` | data | `AppFooter.vue` |
| `links` | `links.yml` | data | `pages/Links.vue` |
| `about` | `over-indicium.md` | page | **unused** (source file absent; page is hardcoded) |
| `boards` | `boards/*.md` | page | `pages/Bestuur.vue`, `pages/besturen.vue` |
| `partners` | `partners/**/*.md` | page | `pages/partners/*`, `usePartners`, `HomePartners` |
| `commissies` | `commissies/*.md` | page | `pages/Commissies.vue` |
| `vcp` | `vcp/*.md` | page | `pages/Vcp.vue` |
| `dispuut` | `dispuut/*.md` | page | `pages/Dispuut.vue` |

## Verification recipes
- Full build: `node .pnpm/…/nuxt.mjs generate` (or `pnpm generate` with repo env) → expect 83 prerendered routes.
- Studio component list (no auth in dev): start `nuxt dev`, curl `/__nuxt_studio/meta` → `components.list` = exactly the 9 homepage components.
- Confirm data renders: grep built `.output/public/index.html` for nav/footer strings after any schema/consumer change.
