# Collection: `contact`

- **Source:** `content/contact.yml` · **Type:** `data` · **Schema:** yes
- **Used by:** contact page `/contact` — `pages/Contact.vue`.
- **Query:** `queryCollection('contact').first()` → read fields top level (e.g. `contact.address`; **not** `.meta`).

## Schema fields
| Field | Type | Meaning |
|---|---|---|
| `address` | string | full address |
| `mapsUrl` | string | Google Maps link to the address |
| `room` | string | room number, e.g. `HL15-4.092` |
| `kvk` | string | Chamber of Commerce (KvK) number |

## Notes
- `Contact.vue` reads these top-level fields directly.
- Email addresses shown on the page are hardcoded in `Contact.vue`, not in this file.
