# Collection: `footer`

- **Source:** `content/footer.yml` · **Type:** `data` · **Schema:** yes
- **Used by:** site footer — `components/AppFooter.vue`.
- **Query:** `queryCollection('footer').first()` → read `.items`, `.socialMediaItems`, `.contactItems` top level (not `.meta`).

## Schema fields
| Field | Type | Meaning |
|---|---|---|
| `items[]` | array `{ title, url }` | "Pagina's" column |
| `contactItems` | object | `address`, `postcode`, `lokaal` (room), `email` |
| `socialMediaItems[]` | array `{ title, url }` | "Social media" column |

## Notes
- `AppFooter.vue` was previously reading `.meta?.items` — must stay on top-level access (see `SKILL.md`).
