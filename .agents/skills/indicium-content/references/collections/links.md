# Collection: `links`

- **Source:** `content/links.yml` · **Type:** `data` · **Schema:** yes
- **Used by:** links page `/links` (minimal layout) — `pages/Links.vue`.
- **Query:** `queryCollection('links').first()` → read `.links` top level (not `.meta`).

## Schema fields
| Field | Type | Meaning |
|---|---|---|
| `links[].name` | string | link label |
| `links[].url` | string | destination |
| `links[].icon` | string, optional | emoji or asset path; missing on the first ("Website") link |

## Notes
- Rendered as `LinkCard` components.
