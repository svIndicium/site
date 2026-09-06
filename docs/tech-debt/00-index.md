# Tech-debt index — Indicium site (Nuxt 3/4 + Vue + pnpm, SSG)

Review: 7 read-only partition scans (components, content-components+CSS, pages+layouts, logic layer, content+Studio, config/CI, dead-code sweep), 1 synthesis pass. 40 items. Every claim carries `path:line` + a drift-proof description. Lines will drift; anchors (identifiers, comments, prop names) are named so each item stays findable.

| ID | Title | Severity | Impact | Effort | Area | File(s) |
|----|-------|----------|--------|--------|------|---------|
| TD-001 | Vacatures page permanently empty (`jobOffers` key never exists) | HIGH | M | S | pages/content | `pages/Vacatures.vue`, `content.config.ts`, `content/partners/**` |
| TD-002 | Firebase/GA analytics runs consent-free, zero consumers | HIGH | M | S-M | plugins/privacy | `plugins/firebase.client.ts`, `nuxt.config.ts`, `package.json` |
| TD-010 | Nav implemented twice (NavMobile hand-rolls MenuItem recursion) + 4-file breakpoint stack | MED | M | M | components | `components/NavMobile.vue`, `components/MenuItem.vue`, `components/NavDesktop.vue`, `layouts/default.vue` |
| TD-011 | INDICIUM wordmark markup ×3 | LOW | S | M | components | `components/NavLogo.vue`, `components/LogoElement.vue`, `pages/Links.vue` |
| TD-012 | Partner hero block + job-offer query copy-pasted across partner pages | LOW | S | M | pages | `pages/partners/index.vue`, `pages/partners/[partner].vue`, `composables/usePartners.ts` |
| TD-013 | "Current board" derived two different ways on two pages | LOW | S | S | pages | `pages/Bestuur.vue`, `pages/besturen.vue` |
| TD-014 | Agenda dual import path via `useAgenda` re-export shim | MED | S | S | logic | `composables/useAgenda.ts`, `utils/agenda.ts` |
| TD-015 | Agenda TS location fallback contradicts canonical YML (wrong-city links) | MED | M | S | logic/content | `utils/agenda.ts`, `content/agenda-locations.yml` |
| TD-016 | Contact/socials data in 3 places, URLs already drifted | MED | S-M | M | content | `content/contact.yml`, `content/footer.yml`, `content/links.yml`, `components/SocialSidebar.vue` |
| TD-017 | Boards/commissies frontmatter redundancy + dead fields + title drift | MED | M | S-M | content | `content/boards/*.md`, `content/commissies/*.md`, `content.config.ts` |
| TD-018 | Partner `description` duplicated verbatim as body lead (8 files) | MED | M | S | content | `content/partners/**/*.md` |
| TD-019 | Dark palette copy-pasted twice in variables.css, already drifted | MED | M | M | css | `assets/css/variables.css` |
| TD-020 | Partner marquee implemented twice (dead PartnerCarousel + HomePartners inline) | MED | M | S | components | `components/PartnerCarousel.vue`, `components/content/HomePartners.vue` |
| TD-021 | Carousel SSR-fallback wrapper duplicated (HomeImageCarousel vs over-indicium) | MED | M | S | components/pages | `components/content/HomeImageCarousel.vue`, `pages/over-indicium.vue` |
| TD-024 | PDF-redirect middleware duplicates page paths, serves stale legal docs on iOS | MED | M | S | logic/pages | `middleware/pdf-redirect.global.ts`, `pages/Statuten.vue`, `pages/HR.vue` |
| TD-026 | Partners nav submenu hand-maintained, links to deleted DressMe | MED | M | S-M | content | `content/navigation.yml`, `content/partners/*`, `pages/partners/[partner].vue` |
| TD-027 | Global CSS duplicated/conflicting between app.vue and default.vue | MED | S | S | css/layouts | `app.vue`, `layouts/default.vue` |
| TD-030 | playground.vue ships dev sandbox to prod | LOW | S | S | pages | `pages/playground.vue` |
| TD-031 | Three overlapping error surfaces, none reads Nuxt error prop | MED | M | M | pages | `error.vue`, `pages/error.vue`, `pages/[...slug].vue` |
| TD-032 | LoadingState.vue orphaned (zero consumers) | LOW | S | S | components | `components/LoadingState.vue` |
| TD-033 | useTheme wrapper adds dead sugar over useColorMode | LOW | S | S | logic | `composables/useAppState.ts`, `components/AppFooter.vue` |
| TD-034 | Dead config trio: `about` collection, links.d.ts, src/ dirs | LOW | S | S | config/content | `content.config.ts`, `content/links.d.ts`, `src/content`, `src/views` |
| TD-035 | @vueuse/nuxt unused (zero app-code hits) | LOW | S | S | config | `package.json`, `nuxt.config.ts`, `taze.config.js` |
| TD-036 | ~500KB unreferenced logo binaries (assets/logo vs public) | LOW | S | S | assets | `assets/logo/`, `public/logo/`, `public/logo.png` |
| TD-037 | HomePartners: zero consumers, tier rendering triplicated | LOW | S | S | components | `components/content/HomePartners.vue`, `nuxt.config.ts` |
| TD-038 | pnpm-10 `onlyBuiltDependencies` dead under pinned pnpm 11 | LOW | S | S | config | `pnpm-workspace.yaml` |
| TD-039 | Stray `# test` heading live on chipsoft partner page | LOW | S | S | content | `content/partners/chipsoft/index.md` |
| TD-040 | router.client title hack races useSeoMeta | MED | M | S-M | plugins | `plugins/router.client.ts`, `nuxt.config.ts` |
| TD-041 | Desktop submenus hover-only, keyboard/AT-unreachable | MED | M | S-M | components | `components/MenuItem.vue` |
| TD-042 | No page reads useAsyncData error/pending; silent blank pages | MED | M | S-M | pages | `pages/*.vue` (15 collection pages) |
| TD-043 | Conscribo vendor patches silent on drift, untestable monolith | MED | M | S-M | logic | `utils/conscriboForm.ts`, `components/ConscriboForm.client.vue` |
| TD-044 | Component dark tweaks ignore no-JS radio path (wrong logo variant) | MED | M | S | components/css | `components/PartnerLogo.vue`, `components/content/HomeTextBlock.vue`, `assets/css/variables.css` |
| TD-045 | CI never runs tests or lint (no lint script at all) | MED | M | S | ci/test | `.github/workflows/*.yml`, `package.json`, `eslint.config.mjs`, `test/` |
| TD-046 | CI overrides pnpm pin, floating action tags, no cache | MED | M | S | ci | `.github/workflows/*.yml`, `taze.config.js` |
| TD-050 | Commissies/Dispuut identical card-list skeletons | LOW | S | S | pages | `pages/Commissies.vue`, `pages/Dispuut.vue` |
| TD-051 | JobOffers accordion via parentElement.classList, no aria | LOW | S | S | components | `components/JobOffers.vue` |
| TD-052 | Archived board photo/email fields authored but never rendered; 2024-2025 photos missing | LOW | S | S | content/pages | `content/boards/*.md`, `pages/Bestuur.vue`, `pages/besturen.vue` |
| TD-053 | Intro.vue hardcoded seasonal page (2026 dates, 2023 asset) bypasses content | LOW | S | M | pages | `pages/Intro.vue` |
| TD-054 | Activiteiten.vue orphan route (no inbound links) | LOW | S | S | pages | `pages/Activiteiten.vue` |
| TD-055 | CSS hygiene batch: dead tokens, invalid @container example, font contradiction, accent-bar ×3 | LOW | S | S | css | `assets/css/variables.css`, `assets/css/main.css`, `assets/css/typography.css`, `components/content/HomeTextBlock.vue` |

## Top 5 next actions

1. **Decide TD-002 (analytics/consent)** — legal exposure on every page load; gate behind consent or delete. Owner decision first (is the GA dashboard used?).
2. **Fix TD-001 (Vacatures)** — broken prod page hiding 5 live vacancies; rewire to `partnerSlug` query + JobOffers.
3. **Deletion batch (one PR)** — TD-030 playground, TD-031 pages/error.vue, TD-032 LoadingState, TD-034 dead config, TD-035 @vueuse, TD-039 `# test`. ~450 LOC + ~500KB gone, near-zero risk.
4. **Agenda correctness (TD-014 + TD-015)** — one import path; single location source of truth (wrong-city Maps links live today).
5. **Quality gates (TD-045 + TD-046)** — run existing tests + eslint in CI, honor the pnpm pin; stops all future drift at the door.

## What explicitly NOT to fix

- LinkCard vs ContentCard vs JobOffers — distinct concerns (link card / image+body slot card / accordion); only LinkCard's internal external-vs-RouterLink twin block is a nit (see `06-nits.md`).
- ImageCarousel (Embla slider) vs partner marquee (CSS ticker) — different patterns; the real dup is marquee×2 (TD-020).
- HomeGrid/HomeMain/HomeAside trio — MDC needs distinct tags as grid-area targets; merging breaks mobile order.
- ConscriboFormShim HTML-string hack — deliberate, commented workaround for Vue layout-table compilation.
- HeroBackground `:deep` coupling to hero.svg — documented with magic-number comment; leave.
- Plain-CSS breakpoint literals (768/900/944px…) — `@media`/`@container` cannot consume `var()`; literals are correct per convention. (The `--cq-*` tokens + doc example claiming otherwise are the bug — TD-055.)
- Bestuur vs besturen routes, `[...slug]` vs `partners/[partner]` — deliberate, non-conflicting splits; only shared logic needs extraction (TD-013).
- firebase, ua-parser-js, canvas-confetti, embla, add-to-calendar-button, nuxt-svgo, color-mode, zod, better-sqlite3 — all verified used; keep.
- `useNavState`, `ConscriboForm.client`, HuMap, PdfViewer, ErrorDisplay — all have live consumers.
- Case-mixed page filenames (Bestuur vs besturen), Links/Discord on minimal layout — work as-is; churn without payoff.
