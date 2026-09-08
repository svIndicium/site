# Collection: `boards`

- **Source:** `content/boards/*.md` (one file per board year) · **Type:** `page` · **Schema:** yes
- **Used by:** `pages/Bestuur.vue` (current board: `order('boardNumber', 'DESC')`), `pages/besturen.vue` (timeline: `order('boardNumber', 'DESC')`).
- **Query:** `queryCollection('boards')...first()/all()`.

## Schema fields
| Field | Type | Meaning |
|---|---|---|
| `year` | string | e.g. `2024-2025` |
| `boardNumber` | number | 1 = founding board; max = current board (derived, no flag) |
| `groupPhoto` | string, optional | group photo filename |
| `members[]` | array | `{ name, function (role, e.g. 'Voorzitter'), photo?, email?, figcaption? (photo credit), responsibilities?[], commissions?[] }` |

- Board files have **no pages of their own** — Studio's preview would navigate to the file's content path (`/boards/2024-2025`) and hit the 404 catch-all. A `routeRules` redirect maps `/boards/**` → `/besturen` (the timeline), so Studio previews land on the page that renders them. Keep this redirect when touching board content; never create a `/boards/*` page.
