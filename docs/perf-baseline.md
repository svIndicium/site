# Perf baseline — 2026-09-08 (pre nav rework)

> **Status 2026-09-21 — historical snapshot.** Numbers below are from that date; the site now
> prerenders **77 routes** (2026-09-21; after deleting `/activiteiten` and the playground-era
> dead files — the playground itself is intentionally kept. The 2026-09-13 figure of 79 was
> Nuxt/Nitro version drift, not a route change). Corrections to the notes:
> the dead `/partners/dressme` link was fixed (TD-026, 2026-09-13); the case-duplicate routes
> (`/contact` + `/Contact`, …) are deliberate filenames, not a defect (see the tech-debt index's
> "what NOT to fix"); the unreferenced-image audit is now tracked as TD-058 and needs an owner
> check because `public/` paths are hotlinked from mailchimp emails.

Method: `pnpm generate` → serve `.output/public` via plain http (no gzip;
localhost, so treat absolute ms as relative) → Lighthouse 13 (headless Chrome
152) desktop preset + default mobile simulation, homepage `/`.

## Bundle (`.output/public`, 25MB total)

| Asset | Raw | Notes |
|---|---|---|
| `_nuxt/CrNhNk-v.js` (main entry) | 433KB (84KB gzip) | LH flags 132KB unused on home |
| `_nuxt/CsL-TVkG.js`, `sqlite3-worker1-*.js` | 206KB ×2 | @nuxt/content sqlite runtime |
| `_nuxt/D0PI-2af.js`, `L-S5knWB.js` | 98 + 75KB | route/component chunks |
| All JS | ~950KB raw | |
| `index.html` | 100KB | prerendered, payload-heavy |
| `sqlite3.BVKGSWc-.wasm` | 844KB | content runtime, every page |
| `assets/images/intro2023.jpg` | 6.4MB | giant; `.webp` twin (1.4MB) exists — serve it |
| `pdf/Afschrift_Akte_…pdf` | 1.4MB | legacy PDF (see TD-024) |

Also spotted: prerender emits case-duplicate routes (`/contact` + `/Contact`,
`/Bestuur` + `/besturen`, …) and dead `/partners/dressme` — duplicate content,
fix with TD-026. *(2026-09-13: dressme fixed; the case-duplicates are intentional.)*
## WebP verdict (2026-09-08)

WebP twins exist and ARE used where it matters (homepage carousel loads
`.webp`; Intro hydrates `intro2023lowres.webp` → `Kamp_foto.jpeg`). But
`public/` copies verbatim, so dead weight ships too:
`intro2023.jpg` (6.5MB, ZERO references — only the lowres webp is used)
deletes cleanly. Same pattern likely for other unreferenced `.JPG` twins;
audit `public/assets/images` against code refs before deleting more.
Deploy-size win only (browsers never request unreferenced files).

## Lighthouse

| | Perf | A11y | BP | SEO | FCP | LCP | TBT | TTI |
|---|---|---|---|---|---|---|---|---|
| Desktop | 90 | 92 | 100 | 100 | 1.0s | 1.8s | 0ms | 1.8s |
| Mobile | 62 | 92 | 100 | 100 | 5.0s | 9.2s | 110ms | 9.2s |

Top mobile opportunity: unused JS 133KB (~900ms). CLS 0.064 desktop (hero image
without dimensions?).

## Re-run after nav work

Same commands. Compare mobile LCP + JS totals; nav change should be neutral or
better (less JS, no layout shift).
