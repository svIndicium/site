# Collection: `about`

- **Source:** `content/over-indicium.md` · **Type:** `page` · **Schema:** see `content.config.ts`
- **Used by:** the about page (`/over-indicium`), rendered as MDC.
- **Query:** `queryCollection('about').first()`.

## Schema fields
Authoritative schema lives in `content.config.ts`. Page collections get native `title`/`description`; the SEO `description` uses `property().editor({ input: 'textarea' })`.

## Body (MDC structure)
The body composes globally-registered section components: a carousel, text sections, and a stats list. **Read `content/over-indicium.md` for the current structure** (it's editable in Studio) and `references/mdc-syntax.md` for syntax.

## Notes
- The SEO title/description come from frontmatter; `pages/over-indicium.vue` is a thin shim (`queryCollection('about').first()` → `ContentRenderer`).
- Was already covered by the `make-content-editable` conversion (was previously hardcoded in the page component).
