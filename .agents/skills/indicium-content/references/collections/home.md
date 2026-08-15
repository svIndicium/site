# Collection: `home`

- **Source:** `content/index.md` · **Type:** `page` · **Schema:** yes
- **Used by:** homepage `/` — `pages/index.vue` (`queryCollection('home').first()`), rendered as MDC.
- **Query:** `queryCollection('home').first()`.

## Schema fields
| Field | Type | Meaning |
|---|---|---|
| `title` | string | site title |
| `description` | string | SEO description (Studio textarea via `property().editor`) |

## Body (MDC structure)
The homepage body composes these globally-registered MDC components:
`::hero-section`, `::home-grid` → `::home-main` (with `::home-image-carousel` + `::home-text-block`×3) and `::home-aside` (with `::activity-calendar`, `::social-sidebar`), `::home-partners`.

## Notes
- The carousel uses a **YAML props block** for its `images:` array (valid MDC; parses to a `:images` JS expression). See `references/mdc-syntax.md`.
- `home-image-carousel` prop: `images: string[]` (required). `home-text-block` props: `title`, `cta-label`, `cta-url` (required).
