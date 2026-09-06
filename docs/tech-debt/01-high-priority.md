# 01 — High priority

## Epics

### E1 — Vacancy pipeline repair (covers TD-001)
As maintainer I want one working job-offer data path so that partner vacancies actually render. Acceptance: [`pages/Vacatures.vue` shows all 5 live offers; `jobOffers` key gone or schema-backed; no full-body partner fetch; empty-state only when zero offers exist.]

### E2 — Analytics consent decision (covers TD-002)
As maintainer I want tracking to be either consented or gone so that the site is GDPR-safe. Acceptance: [either consent-gated loading of the Firebase plugin or plugin + `firebase` dep + optimizeDeps/allowBuilds/taze entries deleted; owner confirms whether measurementId `G-449W2Y5BHP` dashboard is in use.]

### E3 — Single nav engine (covers TD-010)
As maintainer I want one recursive nav renderer over one data source and one breakpoint source of truth so that nav changes happen once. Acceptance: [NavMobile renders via shared recursive item (MenuItem or successor); single `navigation` fetch key; visibility breakpoints defined once; 769–944px range behaves by design, not accident.]

## Items

- TD-001 [HIGH] pages/Vacatures.vue:8-9 — `allOffers` flatMaps `(p.jobOffers || [])` but no content file or schema field (`content.config.ts` partners schema) defines `jobOffers` (offers are separate `.md` files linked by `partnerSlug`, e.g. `content/partners/chipsoft/net-developer-zorg-ict.md`), so the page always renders its empty-state copy despite 5 live offers, while fetching every partner body (~22KB) for nothing. → Rebuild on the `where('partnerSlug',…)` + `JobOffers` pattern already used by `pages/partners/index.vue` and `[partner].vue`, or delete the page. Impact M / Effort S → acceptance: - [ ] live offers render; dead key gone; no wasted full-body fetch
- TD-002 [HIGH] plugins/firebase.client.ts:1-28 — Firebase app + analytics init on every client load with hardcoded keys and no consent mechanism anywhere (no banner in components/pages/layouts/app), while `$firebase`/`$analytics` have zero consumers repo-wide (verified by grep), so the only effect is consent-free auto-collection on a Dutch student-association site. → Gate behind explicit opt-in or delete plugin + dep + `nuxt.config.ts` optimizeDeps + workspace/taze entries (confirm dashboard use first). Impact M / Effort S-M → acceptance: - [x] no unconsented tracking; footprint removed or consent-gated — DONE 2026-09-06: plugin + `firebase`/`firebase-tools` deps + optimizeDeps/allowBuilds/taze entries + `@nuxtjs/sentry` comment + sentry gitignore/README refs removed; lockfile pruned (0 firebase refs); hosting (`firebase.json`, `.firebaserc`, workflows) untouched; tests 23/23 pass
