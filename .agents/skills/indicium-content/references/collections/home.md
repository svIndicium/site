# Collection: `home`

- **Source:** `content/index.md` · **Type:** `page` · **Schema:** see `content.config.ts`
- **Used by:** the homepage (`/`), rendered as MDC.
- **Query:** `queryCollection('home').first()`.

## Schema fields
Authoritative schema lives in `content.config.ts`. Page collections get native `title`/`description`; custom frontmatter is schema-defined (`description` uses `property().editor({ input: 'textarea' })` for the Studio textarea).

## Body (MDC structure)
The homepage body is a composition of globally-registered MDC components (hero, layout grid, carousel, text blocks, agenda, socials, partners, …). **Read `content/index.md` for the current structure** — don't rely on a fixed outline, because it's editable in Studio. Syntax rules: `references/mdc-syntax.md`.

## Notes
- Convention: **editable copy → slots**, **configuration → props** (inline `{key="value"}` or a YAML props block for arrays/objects). Check the component and `content/index.md` for the current props/slots rather than a duplicated list.
- Deeply repeated *nested* child components are unreliable in MDC (the parser can mis-nest them) — prefer a **YAML array prop** for lists. See the round-trip note in `references/architecture.md` (open work).
