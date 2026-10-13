---
name: indicium-content
description: 'Indicium site handoff: author/edit Nuxt Content + Nuxt Studio, per-collection docs, MDC syntax, architecture.'
allowed-tools: Read, Write, Edit, Glob, Grep
---

# Nuxt Content & Studio — Indicium site handoff

Repo `svIndicium/site`. **Content lives in Markdown/YAML under `content/`**, edited by non-technical staff via Nuxt Studio. Vue pages are thin shims that render that content. Prefer editing content over pages.

## Must-know conventions (read before touching anything)
- **Pages are shims — or become editable.** Content (copy, structure, images, links) goes in `content/**/*.{md,yml}`, not hardcoded in `.vue`. Any page still hardcoded should be converted via the `make-content-editable` skill rather than extended; scan `pages/` for pages that don't query a collection for the current exceptions (see `references/architecture.md`).
- **Data collections (`type: 'data'`) expose fields at the TOP level of the query result, NOT under `.meta`** — with a schema, `meta` is `{}`. Read `item.items`, `item.address`; **never** `item.meta?.items` (silently `undefined` → blank nav/footer, lost crawl routes). See `references/collections/*`.
- **Page collections** (`type: 'page'`) get native `title`/`description`; schemas cover custom frontmatter only.
- **MDC components used in Markdown must be globally registered** for Nuxt Studio's `/` command (see `references/nuxt-studio.md`).
- **Styling:** reuse generic components / shared classes over per-page scoped CSS; avoid cascading overrides (see `references/architecture.md`).

## Tech stack
Nuxt 4 (Vue 3, SSG via `pnpm generate`), `@nuxt/content` 3.x with **zod v4** (the zod major matters for `property().editor()` — see `references/nuxt-studio.md`), and `nuxt-studio` **pinned to a preview build** (see `package.json`; released versions lack nested drag handles). Hosting: Firebase → migrating to Cloudflare (see `references/architecture.md`).

> Generic, project-independent version of this knowledge lives in the managed skill
> **`nuxt-content-studio-authoring`** (MDC props/slots patterns, Studio form metadata,
> `data-content-id`, content-driven icons, per-theme tokens). This skill stays the
> Indicium-specific companion (paths, collections, deployment).

## Project state & getting started (read this if picking up the project)
- **Collections are schema-first** in `content.config.ts` (schemas validate and drive Studio's Form Editor). Use `property().editor({...})` for form metadata — with the installed zod major it must be wrapped (see `references/nuxt-studio.md`). That file is the authoritative, current list of collections/fields; don't duplicate it here.
- **Data collections expose fields at top level** (`.meta` gotcha) — consumers already read `.items`/`.links` etc. directly.
- **Studio**: MDC components used in content are globally registered and grouped in the editor; `Prose*` excluded; icon libraries locked to the installed set; the repository is pinned so local `generate` works. The exact component names/grouping live in `nuxt.config.ts` — read it there.
- To get oriented: read `content.config.ts`, `nuxt.config.ts`, and the relevant `references/collections/<name>.md`; run `pnpm generate` and confirm it completes.
- Open work and known issues live in `references/architecture.md` → "Open work & known issues".

## Sub-skills — read on demand (each is self-contained; do not load all up front)
| Topic | File |
|---|---|
| MDC authoring syntax, gotchas, nesting | `references/mdc-syntax.md` |
| Nuxt Studio editor integration, forms, validators, login gate | `references/nuxt-studio.md` |
| Architecture, hosting, Cloudflare migration, styling conventions | `references/architecture.md` |
| **Per-collection** docs (used where/how, fields, query) | `references/collections/<name>.md` |
| Converting a hardcoded page into Studio-editable MDC components | project-local `make-content-editable` skill |

## Collections
Collections are defined in `content.config.ts` (the source of truth). Two kinds: **`data`** collections (YAML, no body; fields sit at the top level of the query result) and **`page`** collections (Markdown + body; native `title`/`description`). Read `content.config.ts` for the current list, sources and schemas, and `references/collections/<name>.md` for how each is used — don't keep a duplicate inventory here.

## Verification recipes
- Full build: `pnpm generate` → confirm it finishes and prerenders without errors. Don't assert a fixed route count; it follows `pages/` and crawled links, so it changes whenever content/pages change.
- Studio component list (no auth in dev): start `nuxt dev`, curl `/__nuxt_studio/meta` → the MDC components registered via `nuxt.config.ts` should appear. (Framework globals like `Icon` from `@nuxt/icon` also appear in the raw JSON; `ungrouped: 'omit'` keeps ungrouped components out of the editor UI, so the list isn't only your content components.)
- Confirm data renders: grep the built HTML (e.g. `.output/public/index.html`) for a known nav/footer string after any schema/consumer change.
