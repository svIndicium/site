# 06 — Nits (one-liners, fix opportunistically, not tracked)

- `components/AppFooter.vue:47` — dead `ref="menuItemsRefs"` (variable never declared); remove attribute.
- `components/PdfViewer.vue:12-13` — template-`||` defaults + "tablad" typo + redundant `height="800px"` vs CSS aspect-ratio; use `withDefaults`, fix typo, drop sizing attr.
- `components/LinkCard.vue:13,20-30` — `"svg"` twice in filetypes; external-`<a>` vs RouterLink twin blocks with identical children; dedupe inner markup.
- `components/ContentContainer.vue:10` — magic `100px` top padding vs `--nav-height:90px` token.
- `components/HeroSection.vue:17-18` vs `HeroBackground.vue:29-30` — passthrough re-declares child defaults (`animated`, 12s) without the child's clamp; single-source them.
- `utils/agenda.ts:9` — stale env comment (`NUXT_AGENDA_API_KEY` vs real `NUXT_PUBLIC_AGENDA_API_KEY`); fix when doing TD-014.
- `package.json:36` — `@types/ua-parser-js` is a v1-era stub shadowed by ua-parser-js 2.x's bundled types; delete.
- `components/ActivityCalendar.vue:131-136 vs :211-215` (+`:207-209` vs `:226-228`) — loading skeleton + placeholder buttons duplicated pending-vs-fallback; extract `CalendarSkeleton` row.
- `layouts/minimal.vue` (used only by Links/Discord) inherits a different base-CSS subset than default-layout pages (see TD-027); check after unifying.
- `content/vcp/*.md` — `status` stores redundant "VCP Intern/Extern" prefix that `Vcp.vue` strips; store bare status.
- `content/boards/2017-2018.md` — `year` "(2016-)2017-2018" diverges from filename; align when doing TD-017.
- `eslint` unusable repo-wide (verified 2026-09-06, incl. untouched files): typescript-eslint parser crashes on TS 7.0 (`typescript-eslint does not support TS 7.0`). Lint gate (TD-045) is blocked on this first — needs TS downgrade/pin or parser upgrade.
