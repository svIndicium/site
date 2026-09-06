# 01 — High priority

## Epics

### E1 — RETIRED 2026-09-06 (was: Vacancy pipeline repair)
Owner evidence: offers already render on partner pages (`JobOffers` via `partnerSlug` query); nothing links to `/vacatures` (verified: only external vacancy URLs exist). Page is dead code, not a broken feature — demoted to TD-001 (LOW, delete).

### E2 — Analytics consent decision (covers TD-002)
As maintainer I want tracking to be either consented or gone so that the site is GDPR-safe. Acceptance: [either consent-gated loading of the Firebase plugin or plugin + `firebase` dep + optimizeDeps/allowBuilds/taze entries deleted; owner confirms whether measurementId `G-449W2Y5BHP` dashboard is in use.]

### E3 — Single nav engine (covers TD-010)
As maintainer I want one recursive nav renderer over one data source and one breakpoint source of truth so that nav changes happen once. Acceptance: [NavMobile renders via shared recursive item (MenuItem or successor); single `navigation` fetch key; visibility breakpoints defined once; 769–944px range behaves by design, not accident.]

## Items

- TD-001 [LOW] pages/Vacatures.vue:1-27 — reads `(p.jobOffers || [])` (`:9`), a field in no schema (`content.config.ts:122-136`) and no content file, so it would always render empty; also orphaned (no inbound route links — only external vacancy URLs). Offers already render per-partner via `components/JobOffers.vue` (`[partner].vue:37`). → Delete the page (or rewire + link it, if an aggregate view is actually wanted). Impact S / Effort S → acceptance: - [x] `/vacatures` gone or working-and-linked — DONE 2026-09-06: page deleted (offers live on partner pages)
- TD-002 [HIGH] plugins/firebase.client.ts:1-28 — Firebase app + analytics init on every client load with hardcoded keys and no consent mechanism anywhere (no banner in components/pages/layouts/app), while `$firebase`/`$analytics` have zero consumers repo-wide (verified by grep), so the only effect is consent-free auto-collection on a Dutch student-association site. → Gate behind explicit opt-in or delete plugin + dep + `nuxt.config.ts` optimizeDeps + workspace/taze entries (confirm dashboard use first). Impact M / Effort S-M → acceptance: - [x] no unconsented tracking; footprint removed or consent-gated — DONE 2026-09-06: plugin + `firebase`/`firebase-tools` deps + optimizeDeps/allowBuilds/taze entries + `@nuxtjs/sentry` comment + sentry gitignore/README refs removed; lockfile pruned (0 firebase refs); hosting (`firebase.json`, `.firebaserc`, workflows) untouched; tests 23/23 pass
