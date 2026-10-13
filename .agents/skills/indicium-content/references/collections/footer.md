# Collection: `footer`

- **Source:** `content/footer.yml` · **Type:** `data` · **Schema:** yes
- **Used by:** the site footer.
- **Query:** `queryCollection('footer').first()` → read `.items`, `.socialMediaItems`, `.contactItems` top level (not `.meta`).

## Schema fields
| Field | Type | Meaning |
|---|---|---|
| `items[]` | array `{ title, url }` | "Pagina's" column |
| `contactItems` | object | `address`, `postcode`, `lokaal` (room), `email` |
| `socialMediaItems[]` | array `{ title, url }` | "Social media" column |

## Notes
- The footer previously read `.meta?.items` — must stay on top-level access (see `SKILL.md`).
