# Architecture & roadmap (handoff)

## Current architecture
- **Framework:** Nuxt 4.5 (Vue 3), TypeScript strict, `@nuxt/content` 3.15.2, `nuxt-studio` 1.7.0, zod 4.4.3.
- **Rendering:** SSG. `pnpm generate` (`nuxt generate`) prerenders to `.output/public` (~83 routes). Deployed via GitHub Actions to **Firebase Hosting** (`firebase.json` serves `.output/public`, rewrites all → `/index.html`, project `svindicium-website`).
- **Content model:** `content/**/*.{md,yml}` → Nuxt Content collections (see `content.config.ts` and `references/collections/*`).
- **Pages are shims.** Each route is a small `.vue` that queries a collection and renders it (e.g. `pages/index.vue` → `home`; `pages/Contact.vue` → `contact`). Content itself lives in Markdown/YAML.
- **Assets/binaries:** currently committed under `public/` (e.g. `public/assets/images/*.webp`, logos, PDFs) and referenced via `/assets/...`.
- **Custom MDC components:** `components/content/` (Home*) + root `components/` (HeroSection, ActivityCalendar, SocialSidebar), globally registered (see `nuxt-studio.md`).
- **Styling:** global `assets/css/variables.css`, `typography.css`, `main.css` (design tokens + base), plus scoped styles per component/page.

## Target architecture (roadmap)
1. **Hosting → Cloudflare Pages** (static), replacing Firebase Hosting. `nuxt generate` output deploys to Pages; keep the existing GitHub Actions build or move to Pages' build integration.
2. **Studio login gate → Cloudflare Worker.** A Worker in front of the Studio route handles auth/SSO so only authorized staff can open the Studio editor in production. (Nuxt Studio currently requires production auth config — see `nuxt-studio.md`.)
3. **Binary content & images → R2 + Cloudflare Images.** Move images/PDFs out of `public/` into R2 (storage) and Cloudflare Images (resize/optimize/CDN), referenced by URL. Migrate existing `/assets/images/*` references.
4. **Consistent styling & maintainability refactor (ongoing, incremental):**
   - Reduce per-page scoped CSS overrides. When a page needs a style, first try a **generic reusable component** or a **shared utility class** used across the app.
   - Reuse the design tokens in `assets/css/variables.css` (`--indi-*`, color-mode aware) rather than hardcoding colors/sizes.
   - Reduce **cascading specificity issues**: avoid deep nested selectors, rely on BEM-ish/utility classes, keep component CSS scoped and flat.
   - Goal: professional, consistent look; fewer bugs; easier to maintain; less and less bespoke page CSS over time.

## Conventions to follow when editing
- **Content over code:** change copy/structure/images in `content/`, not in `.vue` shims.
- **Data collections:** read fields at top level, not `.meta` (see `SKILL.md` must-knows).
- **Styling:** prefer shared components/classes and design tokens; avoid new per-page overrides; keep specificity flat.
- **Studio:** new MDC components used in Markdown must be globally registered + added to the `studio.editor.components` group.
- **Builds:** always run `pnpm generate` after schema/consumer/content changes; confirm route count and rendered data (see `SKILL.md` verification recipes).

## Local build note
`nuxt-studio` needs a repo in production builds. It's pinned in `studio.repository`; running `pnpm generate` may still require CI-like env (`GITHUB_ACTIONS=true GITHUB_REPOSITORY=svIndicium/site`) if the pinned config is not honored — verify on first run.

## Open work & known issues (priority order)
1. **Migrate hosting → Cloudflare Pages** (replace Firebase). Keep `nuxt generate` output; wire CI (GitHub Actions or Pages build); retire `firebase.json`.
2. **Cloudflare Worker as the Studio login gate** — secure the production Studio editor behind SSO/OAuth for authorized staff (not yet implemented).
3. **Move binaries/images → R2 + Cloudflare Images** — migrate `public/assets/images/*`, logos, PDFs out of the repo; update `/assets/...` references (carousel images, board photos, partner logos, docx).
4. **Dead `about` collection** — `over-indicium.md` absent and `pages/over-indicium.vue` is hardcoded. Either delete the collection or write the content file and make the page a shim.
5. **Styling refactor (incremental)** — reduce per-page scoped CSS; extract generic components / shared utility classes; use design tokens in `assets/css/variables.css`; keep specificity flat.
6. **Verify Studio round-trip of the 3-level homepage MDC nesting** (`home-grid` → `home-main` → `home-text-block`); flatten if comark/remark-mdc round-trip is lossy.

### Known issues
- Local `pnpm generate` relies on the pinned `studio.repository`; if it still errors, run with `GITHUB_ACTIONS=true GITHUB_REPOSITORY=svIndicium/site`.
- `vue-router/volar/sfc-route-blocks` module-resolve warning at build — pre-existing, harmless.
- Never regress data-collection consumers back to `.meta?.X` (see `SKILL.md`).

## Fresh-agent handoff checklist
1. Read `SKILL.md`, then `references/architecture.md`.
2. `content.config.ts` = source of truth for collections/schemas; `references/collections/*` = per-collection usage.
3. Establish baseline: `pnpm generate` → **83 routes**; grep `.output/public/index.html` for nav/footer strings.
4. Edit content in `content/**`, never in `.vue` shims; register any new MDC component per `references/nuxt-studio.md`.
5. Follow styling rules (generic components/classes/tokens) over new per-page CSS.
