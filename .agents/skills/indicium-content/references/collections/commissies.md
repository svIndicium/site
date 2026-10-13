# Collection: `commissies`

- **Source:** `content/commissies/*.md` (one per committee) · **Type:** `page` · **Schema:** yes
- **Used by:** the committees page (`/commissies`).
- **Query:** `queryCollection('commissies').order('order', 'ASC').all()`.

## Schema fields
| Field | Type | Meaning |
|---|---|---|
| `title` | string | committee name |
| `imgUrl` | string | image path |
| `order` | number | sort order |

## Notes
- Body is the committee description rendered on the card.
