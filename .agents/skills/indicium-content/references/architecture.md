# Architecture & roadmap (handoff)

## Current architecture
- **Framework:** Nuxt 4 (Vue 3), TypeScript strict, `@nuxt/content` 3.x, `nuxt-studio` pinned to a preview build (see `package.json`; TD-057), zod v4.
- **Rendering:** SSG. `pnpm generate` prerenders `.output/public`. Deployed via GitHub Actions to **Firebase Hosting** (`firebase.json` serves `.output/public`, rewrites all → `/index.html`).
- **Content model:** `content/**/*.{md,yml}` → Nuxt Content collections (see `content.config.ts` and `references/collections/*`).
- **Pages are shims.** Each route is a small `.vue` that queries a collection and renders it. Content itself lives in Markdown/YAML.
- **Assets/binaries:** currently committed under `public/` (e.g. `public/assets/images/*.webp`, logos, PDFs) and referenced via `/assets/...`.
- **Custom MDC components:** live under `components/content/` and root `components/`; the ones used in Markdown are globally registered in `nuxt.config.ts` (see `nuxt-studio.md`). Read that config for the current set rather than trusting a list here.
- **Styling:** global `assets/css/variables.css`, `typography.css`, `main.css` (design tokens + base), plus scoped styles per component/page.

## Target architecture (roadmap)
1. **Hosting → Cloudflare Pages** (static), replacing Firebase Hosting. `nuxt generate` output deploys to Pages; keep the existing GitHub Actions build or move to Pages' build integration.
2. **Studio login gate → Cloudflare Worker.** A Worker in front of the Studio route handles auth/SSO so only authorized staff can open the Studio editor in production. (Nuxt Studio currently requires production auth config — see `nuxt-studio.md`.)
3. **Binary content & images → R2 + Cloudflare Images.** Move images/PDFs out of `public/` into R2 (storage) and Cloudflare Images (resize/optimize/CDN), referenced by URL. Migrate existing `/assets/images/*` references.
4. **Consistent styling & maintainability refactor (ongoing, incremental):**
   - Reduce per-page scoped CSS overrides. When a page needs a style, first try a **generic reusable component** or a **shared utility class** used across the app.
   - Reuse the design tokens in `assets/css/variables.css` (`--indi-*`, color-mode aware) rather than hardcoding colors/sizes.
   - Reduce **cascading specificity issues**: avoid deep nested selectors, rely on BEM-ish/utility classes, keep component CSS scoped and flat.
   - **Space-adaptive components**: prefer native **container queries** (`container-type: inline-size` + `@container (min-width: 28rem)`) over viewport `@media` for anything reused across layouts. Conditions cannot take `var()` — browsers reject `@container (min-width: var(--x))` — so write the length literally in the component (the `--cq-*` tokens were removed for this reason, TD-055; see the `prefer-container-queries` skill). Keep `@media` for page-level layout only.
   - Goal: professional, consistent look; fewer bugs; easier to maintain; less and less bespoke page CSS over time.

## Conventions to follow when editing
- **Content over code:** change copy/structure/images in `content/`, not in `.vue` shims.
- **Data collections:** read fields at top level, not `.meta` (see `SKILL.md` must-knows).
- **Styling:** prefer shared components/classes and design tokens; avoid new per-page overrides; keep specificity flat.
- **Studio:** new MDC components used in Markdown must be globally registered + added to the `studio.editor.components` group.
- **Builds:** always run `pnpm generate` after schema/consumer/content changes; confirm route count and rendered data (see `SKILL.md` verification recipes).

## Local build note
`nuxt-studio` needs a repo in production builds; it is pinned in `studio.repository`. Verified 2026-09-13: `pnpm generate` completes locally without any CI-like env (`GITHUB_ACTIONS`/`GITHUB_REPOSITORY` unset).

## Open work & known issues (priority order)
1. **Migrate hosting → Cloudflare Pages** (replace Firebase). Keep `nuxt generate` output; wire CI (GitHub Actions or Pages build); retire `firebase.json`.
2. **Cloudflare Worker as the Studio login gate** — secure the production Studio editor behind SSO/OAuth for authorized staff (not yet implemented).
3. **Move binaries/images → R2 + Cloudflare Images** — migrate `public/assets/images/*`, logos, PDFs out of the repo; update `/assets/...` references (carousel images, board photos, partner logos, docx).
4. **Some pages are still hardcoded, not content** — convert them via the `make-content-editable` skill (slot-based MDC components + a `page` collection, page becomes a shim) when they next change. The current list is discoverable by scanning `pages/` for components that don't query a collection.
5. **Styling refactor (incremental)** — reduce per-page scoped CSS; extract generic components / shared utility classes; use design tokens in `assets/css/variables.css`; keep specificity flat.
6. **Verify Studio round-trip of deeply nested homepage MDC**; flatten if the comark/remark-mdc round-trip is lossy. **Observed:** at deep nesting, repeated nested components with named slots are unreliable — the parser can swallow the closing fence and nest the next sibling incorrectly. Prefer a **props/YAML data prop for repeated children** and an explicit `#default` marker, and re-test manually in Studio whenever this area changes.

### Known issues
- Local `pnpm generate` works without CI env (verified 2026-09-13); if it ever errors, try `GITHUB_ACTIONS=true GITHUB_REPOSITORY=svIndicium/site`.
- `vue-router/volar/sfc-route-blocks` module-resolve warning at build — pre-existing, harmless.
- Never regress data-collection consumers back to `.meta?.X` (see `SKILL.md`).

## Fresh-agent handoff checklist
1. Read `SKILL.md`, then `references/architecture.md`.
2. `content.config.ts` = source of truth for collections/schemas; `references/collections/*` = per-collection usage.
3. Establish a baseline: `pnpm generate` completes; grep the built HTML for a known nav/footer string (don't hardcode counts).
4. Edit content in `content/**`, never in `.vue` shims; register any new MDC component per `references/nuxt-studio.md`.
5. Follow styling rules (generic components/classes/tokens) over new per-page CSS.
