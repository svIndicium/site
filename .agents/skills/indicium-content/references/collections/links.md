# Collection: `links`

- **Source:** `content/links.yml` · **Type:** `data` · **Schema:** yes
- **Used by:** the links page (`/links`, minimal layout).
- **Query:** `queryCollection('links').first()` → read `.links` top level (not `.meta`).

## Schema fields
| Field | Type | Meaning |
|---|---|---|
| `description` | string | concise summary for `<meta name="description">` |
| `seo.ogDescription` | string, max 200 | longer text for `og:description` |
| `links[].name` | string | link label |
| `links[].url` | string | destination |
| `links[].icon` | string, optional | emoji or asset path; missing on the first ("Website") link |

## Notes
- Rendered as `LinkCard` components.
