# Collection: `navigation`

- **Source:** `content/navigation.yml` · **Type:** `data` · **Schema:** yes
- **Used by:** top navigation menu — `components/NavDesktop.vue`, `components/NavMobile.vue`.
- **Query:** `queryCollection('navigation').first()` → read `.items` (top level, **not** `.meta`).

## Schema fields
| Field | Type | Meaning |
|---|---|---|
| `items[].title` | string | menu label |
| `items[].url` | string | internal route |
| `items[].children[]` | array, optional | dropdown submenu (`{ title, url }`); absent on leaf items (e.g. "Lid worden") |

## Notes
- Editing nav structure = edit YAML here, not components.
