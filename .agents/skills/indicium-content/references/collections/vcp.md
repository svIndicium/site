# Collection: `vcp`

- **Source:** `content/vcp/*.md` (one per member) · **Type:** `page` · **Schema:** yes
- **Used by:** VCP page `/vcp` — `pages/Vcp.vue`.
- **Query:** `queryCollection('vcp').order('order', 'ASC').all()`.

## Schema fields
| Field | Type | Meaning |
|---|---|---|
| `name` | string | member name |
| `phonenumber` | string | phone |
| `email` | string | email |
| `status` | string | e.g. `VCP Extern` |
| `photo` | string | photo path |
| `order` | number | sort order |
| `funfacts[]` | array of string | fun facts shown on the card |

## Notes
- `title`/`description` are native page fields (the `description` is the bio, set in frontmatter).
