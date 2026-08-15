# Collection: `partners`

- **Source:** `content/partners/**/*.md` — one `index.md` per partner + optional job-offer files (e.g. `chipsoft/net-developer-zorg-ict.md`) · **Type:** `page` · **Schema:** yes
- **Used by:** `pages/partners/index.vue`, `pages/partners/[partner].vue`, `composables/usePartners.ts`, `components/HomePartners.vue`, `pages/Vacatures.vue`.
- **Query:** `queryCollection('partners').where('tier', '=', 'main'|'premium'|'regular')...` and `.where('partnerSlug', '=', slug)` for job offers.

## Schema fields
| Field | Type | Meaning |
|---|---|---|
| `slug` | string, optional | partner page slug (partner `index.md` only) |
| `title` | string | name |
| `tier` | enum, optional | `main` / `premium` / `regular` |
| `partnerSlug` | string, optional | job offers: links offer to its partner slug |
| `imgUrl` / `imgUrlDark` | string, optional | partner logo, light / dark theme |
| `url` | string, optional | external partner site / vacancy URL |
| `order` | number, optional | sort order |
| `featured` | boolean, optional | feature flag |

## Notes
- Partner `index.md` files carry `slug` + `tier` + logos; job-offer files carry `partnerSlug` + `url` (+ `featured`).
- `description` is a native page field (not in schema).
- `[partner].vue` requires `tier IS NOT NULL` to treat a file as a partner page (excludes job offers).
