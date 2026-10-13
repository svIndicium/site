# Collection: `dispuut`

- **Source:** `content/dispuut/*.md` (one per fraternity) · **Type:** `page` · **Schema:** yes
- **Used by:** the fraternity page (`/dispuut`).
- **Query:** `queryCollection('dispuut').all()`.

## Schema fields
| Field | Type | Meaning |
|---|---|---|
| `title` | string | fraternity name |
| `abbreviation` | string, optional | e.g. `DEV` |
| `imgUrl` | string | logo/image |
| `website` | string, optional | external site |
| `instagram` | string, optional | Instagram URL |

## Notes
- `description` is a native page field.
