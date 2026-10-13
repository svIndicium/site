# MDC Authoring Guide (syntax, gotchas, nesting)

MDC (Markdown Components) extends standard Markdown with Vue component support. Used in `content/**/*.md`.

## Quick Reference
| Syntax | Description |
|--------|-------------|
| `::component` | Block component |
| `:component` | Inline component |
| `{prop="value"}` | Props |
| `#slotname` | Named slot |
| `[text]{.class}` | Span with attributes |
| `{{ $doc.var }}` | Variable binding |

## Core Rules (read first — these bite most often)
1. **Nested block components need MORE colons, not fewer.** Outer `::`, child `:::`, grandchild `::::`. Closing fence must match exactly (`::::` closes `::::`). Using `::` for a child inside `::` silently closes the outer at the child's opening line. Indent each level by 2 spaces.
2. **An inline component alone on a line becomes a block.** `:icon{name="x"}` inside a paragraph is inline; on a blank line both sides it parses as block. Keep surrounding text on the same line to stay inline.
3. **Disambiguate with empty props `{}`.** `:hello-world` reads as one component. `:hello{}-world` means component `hello` + `-world`. Also separates from punctuation.
4. **JSON/JS prop values: `:` prefix + single quotes.** `{:items='["a","b"]'}` — `:` marks a JS expression; single quotes let the JSON use double quotes.
5. **YAML props block** (`---\nkey:\n  - v\n---` after the opener) is the official "YAML method" and **parses correctly**. For readable multi-line/complex values. Don't mix with inline props.
6. **Named slot directives (`#slotname`) must align with the parent `::` fence column.** A mis-indented `#slot` line reverts the parser and leaks as literal text. Body *under* a slot may be indented freely; only the `#slot` line is constrained.
7. **Every block component needs a matching closing fence on its own line.** A missing `::` silently consumes the rest of the file (later headings/components appear nested). Symptom: "where did the rest of my page go?" → grep for unbalanced fences. Self-closing components don't exist; `::divider` still needs a `::`.

## Authoring components for content (props vs slots)
Content lives in **named slots**; configuration lives in **props** — the pattern Docus uses for
its hero (`::u-page-hero` with `#title` / `#description` / `#links`, each CTA a nested
`:::u-button`). Illustrative shape:

```markdown
::my-section
#title
Some **markdown** title

#buttons
  :::my-button{to="/example"}
  A call to action
  :::

  :::my-button{to="/other" color="green-1"}
  Another CTA
  :::
::
```

Why: the title is real Markdown (`**bold**` → `<strong>`), each CTA is its own node (per-item
props, reorderable in the visual editor, `hidden` parks a seasonal button in the file), and
adding a button is adding a line.

### Props
- Typed props + `withDefaults` + a JSDoc line above each prop = the editor's fields with
  descriptions and current values. Defaults must render **observably identical** output to the
  markup they replaced (compare text/classes/hrefs, not raw HTML).
- **MDC passes attribute values as strings**: bare `{animated}` → `true`, but
  `{flow-duration-seconds="30"}` → `"30"`, which fails a `number` prop and is rejected by
  `Number.isFinite` guards. Declare `number | string` or coerce (`Number(v) || 30`).
- Objects/arrays come from the YAML block; **inline props and a YAML block do combine** in one
  block (verified with a block carrying both an inline prop and a YAML list), so the
  older "don't mix" note was too strict.

### Slots (`MDCSlot`)
- MDC's compiler **rewrites `<MDCSlot>` into a slot outlet**, so pass the slot `name` as well as
  `use` — otherwise it renders the (nonexistent) default slot and you get an **empty element
  with no error**:
  ```html
  <MDCSlot name="title" :use="$slots.title" unwrap="p" />
  ```
- `unwrap="p"` drops Markdown's paragraph wrapper so inline text lands inside the component's own
  heading; without it you get `<h1><p>…</p></h1>`.
- Styling slotted content from the component needs a **flat** `:deep()` rule; nested inside
  another selector block it can compile to something that never matches:
  ```css
  .hero-content :deep(h1 strong) { font-weight: 900; }
  ```


```markdown
::alert{type="warning"}
This is a warning message with **Markdown** support.
::
```
Nesting (each level +1 colon, indent 2/level):
```markdown
::hero
  :::card
  Card body.

    ::::callout
    Deeply nested callout.
    ::::
  :::
::
```
**Anti-pattern** — inner `::card-header` is parsed as the closer for `::card`:
```markdown
::card
  ::card-header   <!-- WRONG: closes ::card -->
  Card Title
  ::
::
```

### Named slots
`#slotname` lines must sit in the parent fence column:
```markdown
::card
Default slot content.

#header
This goes in the header slot.

#footer
Footer slot.
::
```

## Inline components
```markdown
Here is an :icon{name="heroicons:star"} icon inline.
Status: :badge[Active]{color="success"}
```
Gotchas:
- Alone on a line → block. Embed in a paragraph to stay inline.
- Trailing chars need `{}` escape: `:icon{name="x"}{}s`.
- Content uses `[...]`, props use `{...}`: `:component[slot text]{prop="value"}`.

## Props
- Inline: `::alert{type="info" icon="heroicons:info"}`.
- YAML block (arrays/objects, readable): 
  ```markdown
  ::card
  ---
  title: My Card
  tags:
    - featured
  ---
  Content
  ::
  ```
- JSON expression: `::dropdown{:items='["a","b"]'}`.
- Boolean: `::modal{closable}` (true) / `::modal{:closable="false"}`.
- Dynamic (bind to frontmatter): `::card{:title="$doc.cardTitle"}`.
- **Quote values starting with `#`.** `color: #5865F2` is a YAML *comment*: the value becomes
  empty, the collection fails schema validation and the page 500s instead of erroring helpfully.
  Write `color: '#5865F2'`. (Studio's own form writer quotes correctly; this only bites when
  hand-editing.)

## Variable binding
```markdown
# {{ $doc.title }}
Written by {{ $doc.author }}.
```
Bindings resolve from (in order) frontmatter, a component's YAML props block, or `<ContentRenderer>` `data` prop. Fallback: `{{ $doc.customVariable || 'defaultValue' }}`.

## Prose components (customize standard markdown rendering)
Create overrides in `components/content/` (e.g. `ProseP.vue`). Full set: `ProseP,H1,H2,H3,H4,H5,H6,A,Code,Pre,Ul,Ol,Li,Blockquote,Img,Table,Hr,Em,Strong,Script`.

## Gotchas / edge cases
- **Lists nested in MDC blocks add a visual depth level** — a plain `1. 2.` list inside a step body counts one deeper than its parent (relevant only where list styling is depth-scoped, e.g. `.prose-ol-nested`).
- **Duplicate component registration** breaks only in `pnpm build`, not `pnpm dev` (prerender bakes a frozen map and emits the literal tag). Prefer unique component names; verify in production builds (`curl localhost:3000/<page> | grep -c '<Prose'`).
- **Slot text is auto-wrapped in `<p>`.** Unwrap it when rendering raw text inside your own
  element: `<MDCSlot name="default" :use="$slots.default" unwrap="p" />` (see "Authoring
  components for content" above — MDC's compiler rewrites `MDCSlot` to a slot outlet, so the
  `name` is required; `<ContentSlot>` is the old Nuxt Content 2 name and is not what this
  project uses).

## Excerpts
`<!--more-->` defines the excerpt boundary for listings.

## Official docs
- <https://content.nuxt.com/docs/files/markdown>
- <https://remark-mdc.nuxt.space/#syntax>
