# Collection: `boards`

- **Source:** `content/boards/*.md` (one file per board year) · **Type:** `page` · **Schema:** yes
- **Used by:** `pages/Bestuur.vue` (current board: `where('isCurrent', '=', true)`), `pages/besturen.vue` (timeline: `.order('year', 'DESC')`).
- **Query:** `queryCollection('boards')...first()/all()`.

## Schema fields
| Field | Type | Meaning |
|---|---|---|
| `year` | string | e.g. `2024-2025` |
| `boardNumber` | number | 1 = founding board |
| `isCurrent` | boolean, optional | current board |
| `isFoundingBoard` | boolean, optional | founding board |
| `groupPhoto` | string, optional | group photo filename |
| `members[]` | array | `{ name, function (role, e.g. 'Voorzitter'), photo?, email?, figcaption? (photo credit), responsibilities?[], commissions?[] }` |

## Notes
- Body is usually a short italic tagline (`_Het achtste bestuur…_`).
