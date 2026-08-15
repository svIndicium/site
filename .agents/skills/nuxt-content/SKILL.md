---
name: nuxt-content
description: 'Author or edit Nuxt Content Markdown using MDC syntax and Vue components.'
allowed-tools: Read, Write, Edit, Glob, Grep
---

# Nuxt Content MDC Authoring Guide

MDC (Markdown Components) extends standard Markdown with Vue component support. Use this guide when authoring `.md` files for Nuxt Content.

## Quick Reference

| Syntax | Description |
|--------|-------------|
| `::component` | Block component |
| `:component` | Inline component |
| `{prop="value"}` | Props |
| `#slotname` | Named slot |
| `[text]{.class}` | Span with attributes |
| `{{ $doc.var }}` | Variable binding |

## Core Rules (read this first)

These are the MDC rules most commonly violated. Get them right and everything else follows.

1. **Nested block components need MORE colons, not fewer or equal.** The outer component opens with `::`, any child inside its slot opens with `:::`, a grandchild with `::::`, and so on. The closing fence must match the opening fence exactly (`::::` closes `::::`, not `::`). Using `::` for both outer and inner — a common mistake — silently closes the outer component at the inner component's opening line. **Convention:** indent each child component (and its content) by 2 spaces per level to make the structure obvious at a glance.
2. **An inline component alone on its own line becomes a block component.** `:icon{name="x"}` inside a paragraph is inline; the same text on a blank line on both sides is parsed as a block. If you need it to stay inline, keep surrounding text on the same line.
3. **Disambiguate inline components from following characters with empty props `{}`.** `:hello-world` is read as a component named `hello-world`. Write `:hello{}-world` to mean the component `hello` followed by `-world`. Same trick separates a component from punctuation when needed.
4. **JSON/JS prop values are prefixed with `:` and wrapped in single quotes.** `{:items='["a","b"]'}` — the leading `:` marks it as an expression, and single quotes let the inside use standard JSON double quotes.
5. **YAML props block replaces inline props for complex values.** Open the block with `---` on the line after the component opener, close with `---`, then put slot content below. Don't mix YAML block props with inline props on the same component.
6. **Named slot directives (`#slotname`) must align with the parent `::` fence column.** The directive line itself is treated as part of the fence, not body content — any indentation mismatch reverts the parser and the directive leaks as literal text. Body content *under* each directive may be flush or indented; only the `#slot` line is constrained. This rule is invisible for default-slot-only components (no `#` lines exist), but bites hard on multi-slot components like Nuxt UI's `UPageHero`/`UPageSection`/`UPageFeature`. Enforced by `remark-mdc` (`dist/index.mjs:1702` checks `sectionIndentSize === initialPrefix`).
7. **Every block component MUST have a matching closing fence on its own line.** A missing `::` does not raise a parse error or console warning — the parser silently consumes all subsequent content (including later headings, components, even the rest of the file) as the unclosed component's body. Symptoms: a page suddenly renders blank below some point, or a later component appears nested inside an earlier one. When debugging "where did the rest of my page go?", grep for unbalanced fences first. Self-closing components are not a thing in MDC; `::divider` still needs a `::` on the next line.

## Frontmatter

YAML metadata block at the top of the file:

```markdown
---
title: My Article
description: A brief description
author: John Doe
date: 2024-01-15
tags:
  - tutorial
  - nuxt
draft: false
---
```

Access frontmatter values in content using `{{ $doc.propertyName }}`.

## Block Components

Block components use `::` syntax and can contain Markdown content:

```markdown
::alert{type="warning"}
This is a warning message with **Markdown** support.
::
```

### Nested Components

Every level of nesting adds one colon. Outer `::`, child `:::`, grandchild `::::`. Open and close must match.

```markdown
::card
  :::card-header
  Card Title
  :::

  Card body content here.

  :::card-footer
  Footer text
  :::
::
```

A three-level example:

```markdown
::hero
  :::card
  A nested card.

    ::::callout
    A deeply nested callout inside the card.
    ::::
  :::
::
```

**Anti-pattern** (this does NOT do what it looks like — the inner `::card-header` opener is parsed as the *closer* for `::card`, so `card-header` ends up outside):

```markdown
::card
  ::card-header
  Card Title
  ::
::
```

### Named Slots

Use `#slotname` to define named slots. **Each `#slotname` line must sit in the same column as its parent `::` fence** (see Core Rule 6).

```markdown
::card
Default slot content goes here.

#header
This goes in the header slot.

#footer
This goes in the footer slot.
::
```

### Self-Closing Block Components

For components without content:

```markdown
::divider
::
```

## Inline Components

Inline components use single `:` and flow with text:

```markdown
Here is an :icon{name="heroicons:star"} icon inline.

Status: :badge[Active]{color="success"}

Click :button[Submit]{@click="handleSubmit"} to continue.
```

### Inline Component with Content

Use square brackets for default slot content:

```markdown
:badge[Premium]
:button[Click Me]{variant="outline"}
```

### Inline gotchas

- **Alone on a line → block.** `:badge[Premium]` surrounded by blank lines is parsed as a block component, not inline. To keep it inline, embed it in a paragraph: `This plan is :badge[Premium] tier.`
- **Trailing characters need the `{}` escape.** Component names greedily consume `[A-Za-z0-9-]`, so `:hello-world` is the single component `hello-world`, and `:icon{name="x"}s` tries to make `s` part of the props syntax. Insert empty props to terminate the name: `:hello{}-world`, `:icon{name="x"}{}s`.
- **Inline components with text content use `[...]`, not `{...}`**. Props go in `{...}`, slot text goes in `[...]`. Order: `:component[slot text]{prop="value"}`.

## Props

### Inline Props

```markdown
::alert{type="info" icon="heroicons:information-circle"}
Content here
::

:icon{name="heroicons:check" class="text-green-500" size="24"}
```

### YAML Props Block

For complex props, use a YAML block after the component declaration:

```markdown
::card
---
title: My Card
image: /images/hero.jpg
tags:
  - featured
  - new
---
Card content with complex props defined above.
::
```

### JSON Props (Arrays/Objects)

Prefix with `:` for JavaScript expressions:

```markdown
::dropdown{:items='["Option A", "Option B", "Option C"]'}
::

::chart{:data='{"labels": ["Jan", "Feb"], "values": [10, 20]}'}
::
```

### Boolean Props

```markdown
::modal{closable}       <!-- true -->
::modal{:closable="false"}  <!-- explicit false -->
```

### Dynamic Props

Bind to frontmatter variables:

```markdown
---
cardTitle: Welcome
---

::card{:title="$doc.cardTitle"}
::
```

## Slots

### Default Slot

Content directly inside the component:

```markdown
::callout
This is the default slot content.
It supports **Markdown** formatting.
::
```

### Named Slots

```markdown
::hero
#title
Welcome to Our Site

#subtitle
Build amazing things with Nuxt

#actions
:button[Get Started]{to="/docs"}
:button[Learn More]{to="/about" variant="outline"}
::
```

### Nested Slots

Children of a `::` block must open with `:::` (and close with `:::`):

```markdown
::tabs
  :::tab{label="Preview"}
  Preview content here.
  :::

  :::tab{label="Code"}
  ```ts
  const example = 'code'
  ```
  :::
::
```

## Spans & Attributes

Apply attributes to inline text using `[text]{attributes}`:

```markdown
This is [highlighted text]{.text-primary}.

[Custom styled]{.font-bold .text-lg #my-id style="color: red"}

[Link with class](/about){.nav-link}
```

### Attributes on Standard Markdown

```markdown
**bold text**{.text-red-500}

*italic*{.text-sm}

`inline code`{lang="ts"}

![image alt](/path/to/image.jpg){width="300" loading="lazy"}
```

### Multiple Classes

```markdown
[styled text]{.class-one .class-two .class-three}
```

## Variable Binding

Interpolate frontmatter values in content:

```markdown
---
author: Jane Smith
publishDate: 2024-01-15
version: 2.0.0
---

# {{ $doc.title }}

Written by {{ $doc.author }} on {{ $doc.publishDate }}.

Current version: **{{ $doc.version }}**
```

Bindings resolve from (in order) the YAML frontmatter, a component's YAML props block, or the `data` prop passed to `<ContentRenderer>`. Use a default fallback: `{{ $doc.customVariable || 'defaultValue' }}`.

## Code Blocks

### Basic Syntax Highlighting

```markdown
```typescript
const greeting: string = 'Hello, World!'
console.log(greeting)
```
```

### Filename Display

```markdown
```ts [utils/helpers.ts]
export function formatDate(date: Date): string {
  return date.toLocaleDateString()
}
```
```

### Line Highlighting

```markdown
```ts {2-4,6}
function example() {
  // Lines 2-4 highlighted
  const a = 1
  const b = 2
  // Line 5 not highlighted
  return a + b  // Line 6 highlighted
}
```
```

### Meta String

Combine filename and highlighting:

```markdown
```vue [components/Button.vue] {3-5}
<template>
  <button
    class="btn"
    :class="variant"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>
```
```

### Code Groups

```markdown
::code-group
```bash [npm]
npm install @nuxt/content
```

```bash [pnpm]
pnpm add @nuxt/content
```

```bash [yarn]
yarn add @nuxt/content
```
::
```

## Prose Components

Customize how standard Markdown elements render by creating components in `components/content/`:

| Element | Component | Description |
|---------|-----------|-------------|
| `<p>` | `ProseP` | Paragraphs |
| `<h1>` | `ProseH1` | Heading 1 |
| `<h2>` | `ProseH2` | Heading 2 |
| `<h3>` | `ProseH3` | Heading 3 |
| `<a>` | `ProseA` | Links |
| `<code>` | `ProseCode` | Inline code |
| `<pre>` | `ProsePre` | Code blocks |
| `<ul>` | `ProseUl` | Unordered lists |
| `<ol>` | `ProseOl` | Ordered lists |
| `<li>` | `ProseLi` | List items |
| `<blockquote>` | `ProseBlockquote` | Blockquotes |
| `<img>` | `ProseImg` | Images |
| `<table>` | `ProseTable` | Tables |

**Plain-markdown lists nested inside MDC blocks introduce a new visual level.** When a project drives list styling with CSS counters scoped per nesting level (e.g., a `Steps` component that renders `1, 2, 3 → a, b, c → i, ii, iii`), a plain `1. 2. 3.` ordered list written *inside* a step body counts as one level deeper than its parent — it does NOT share the parent's depth. So a plain-markdown ordered list inside a level-2 step renders as visual level 3 (lower-roman, in the example cycle). The CSS selector that drives this (in projects following the ShipStream pattern) targets `.step-item > .steps-list > .step-item > .prose-ol-nested > li::before` — note the `.prose-ol-nested` segment, which is the marker that the plain-markdown list adds its own depth. Only relevant in projects with depth-sensitive list styling.

## Excerpts

Use `<!--more-->` to define excerpt boundaries:

```markdown
---
title: My Article
---

This is the excerpt that appears in listings.

<!--more-->

This is the full article content that only shows on the detail page.
```

## Practical Component Examples

### Alert/Callout

```markdown
::alert{type="info"}
This is an informational message.
::

::alert{type="warning" icon="heroicons:exclamation-triangle"}
**Warning:** Please read carefully before proceeding.
::

::alert{type="error"}
An error occurred. Please try again.
::

::alert{type="success"}
Operation completed successfully!
::
```

### Card with Slots

```markdown
::card{image="/images/feature.jpg"}
#header
Feature Title

#default
This card showcases a new feature with an image header and action buttons.

#footer
:button[Learn More]{to="/features" variant="link"}
::
```

### Accordion/Collapsible

```markdown
::accordion
  :::accordion-item{title="What is Nuxt Content?"}
  Nuxt Content is a file-based CMS for Nuxt applications.
  :::

  :::accordion-item{title="How do I install it?"}
  Run `npx nuxi module add content` to add it to your project.
  :::
::
```

### Tabs

```markdown
::tabs
  :::tab{label="Vue"}
  ```vue
  <template>
    <div>Hello Vue!</div>
  </template>
  ```
  :::

  :::tab{label="React"}
  ```jsx
  function Hello() {
    return <div>Hello React!</div>
  }
  ```
  :::
::
```

### Badge/Tag

```markdown
Status: :badge[Published]{color="success"} :badge[Featured]{color="primary"}

Tags: :tag[Vue] :tag[Nuxt] :tag[TypeScript]
```

### Icon

```markdown
:icon{name="heroicons:home" class="w-5 h-5"}
:icon{name="lucide:github" size="24"}
:icon{name="mdi:vuejs" class="text-green-500"}
```

### Callout with Icon

```markdown
::callout{icon="heroicons:light-bulb"}
#title
Pro Tip

#default
Use MDC syntax to create rich, interactive documentation with Vue components.
::
```

## Nuxt UI Prose Components

When the project uses [Nuxt UI v4](https://ui.nuxt.com) (including Docus, Nuxt UI Pro docs starter, etc.), `@nuxt/content` auto-registers a set of prose components. **Read [`nuxt-ui-components.md`](./nuxt-ui-components.md)** for the full reference with examples and props.

Available components: `accordion` / `accordion-item`, `badge`, `callout` (+ `note` / `tip` / `warning` / `caution` shortcuts), `card` / `card-group`, `code-collapse`, `code-group`, `code-preview`, `code-tree`, `collapsible`, `field` / `field-group`, `icon`, `kbd`, `steps`, `tabs` / `tabs-item`. (`prompt` is upcoming.)

Remember the universal nesting rule (see Core Rules above): a child inside a `::` block opens with `:::`, not `::`. This matters for pairs like `tabs` / `tabs-item`, `accordion` / `accordion-item`, `card-group` / `card`, `field-group` / `field`, and `steps` with its step children. Source: <https://ui.nuxt.com/docs/typography>.

## Creating Custom Components

Create Vue components in `components/content/` to use in MDC:

```vue
<!-- components/content/Alert.vue -->
<script setup lang="ts">
defineProps<{
  type?: 'info' | 'warning' | 'error' | 'success'
  icon?: string
}>()
</script>

<template>
  <div :class="['alert', `alert-${type}`]">
    <Icon v-if="icon" :name="icon" />
    <slot />
  </div>
</template>
```

Then use in Markdown:

```markdown
::alert{type="info" icon="heroicons:information-circle"}
Custom alert component content.
::
```

### Name collisions with Nuxt UI prose components

If the project uses Nuxt UI v4, several `Prose*` components are auto-registered globally (`ProseTip`, `ProseNote`, `ProseWarning`, `ProseCaution`, `ProseSteps`, etc. — see `nuxt-ui-components.md` for the full list). **Defining a custom component in `components/content/` with the same name as a Nuxt UI built-in works in `pnpm dev` but silently breaks in `pnpm build`.** Vite's dev resolver tolerates the duplicate registration and picks one at runtime; the production prerender bakes a frozen component map and emits the literal MDC tag (e.g., `<ProseTip>...</ProseTip>`) into the prerendered HTML, skipping rendering entirely.

Two safe patterns:

1. **Use a unique name** for the custom component (e.g., `OlSteps` instead of `Steps` to avoid `ProseSteps`). If the markdown source already uses the Nuxt UI tag name, rename in markdown too — or add an `mdc.components.map` entry in `nuxt.config.ts` to remap the tag (less preferred — silent indirection).
2. **Delete the local wrapper** if it's just re-implementing Nuxt UI's behavior. The built-in is already registered; a duplicate adds nothing but risk.

**Always verify in production builds, not just dev.** A component that renders correctly in `pnpm dev` may emit literal tags in `pnpm build`. Run a quick `curl localhost:3000/<page> | grep -c '<Prose'` to count any leaked tags after building.

### Project-specific custom components

Beyond the prose set and Nuxt UI's typography components, projects often add their own MDC components for domain-specific patterns (e.g., `::version-badge`, `::ol-steps`, `::pill-green`). When picking up an unfamiliar Nuxt Content project, list `app/components/content/` (or `components/content/`) before authoring — that directory is the ground truth for what custom MDC tags are available locally.

## Routing Best Practices

### Avoiding Route Ambiguity with Optional Catch-All Routes
When creating a documentation section or any area using dynamic routes for content, avoid using optional catch-all routes like `[[...slug]].vue` if you also need to support the root path (e.g., `/docs`) and sub-paths (e.g., `/docs/getting-started`) reliably.

Nuxt/Vue Router can have trouble disambiguating the root path when using `[[...slug]].vue`.

**Recommended Pattern:**
Split the implementation into two explicit files:

1. `pages/docs/index.vue` - Handles the root `/docs` path
   ```vue
   <script setup>
   const { data: page } = await useAsyncData('docs-index', () => 
     queryCollection('docs').path('/docs').first()
   )
   // ... handle page not found ...
   </script>
   ```

2. `pages/docs/[...slug].vue` - Handles all nested paths (slug is required)
   ```vue
   <script setup>
   const route = useRoute()
   const slug = route.params.slug.join('/')
   const { data: page } = await useAsyncData(`docs-${slug}`, () => 
     queryCollection('docs').path(`/docs/${slug}`).first()
   )
   // ... handle page not found ...
   </script>
   ```

This ensures predictable routing behavior and prevents 404 errors on the root path.

## References

- [ContentRenderer](https://content.nuxt.com/docs/components/content-renderer) - Render parsed content in templates
- [Custom Components](https://content.nuxt.com/docs/getting-started/components) - Create MDC-compatible Vue components
- [Collections](https://content.nuxt.com/docs/getting-started/collections) - Organize and query content
- [Prose Components](https://content.nuxt.com/docs/components/prose) - Customize default HTML rendering
- [MDC Module](https://github.com/nuxt-modules/mdc) - Underlying MDC parser and syntax
- [Nuxt Content Docs](https://content.nuxt.com/) - Official documentation

## This Project's Conventions

Key patterns learned while refactoring this Indicium site:

### Component Location
- Indicium homepage MDC block components live in `components/content/` (`HomeGrid`, `HomeMain`, `HomeAside`, `HomeImageCarousel`, `HomeTextBlock`, `HomePartners`) and root `components/` (`HeroSection`, `ActivityCalendar`, `SocialSidebar`)
- `components/content/` components are auto-available in markdown; the root `components/` block components are additionally registered global (see Nuxt Studio section)
- Referenced in MDC by kebab-case name: `::hero-section`, `::home-grid`, `::home-image-carousel`, `::activity-calendar`, `::social-sidebar`, etc.

### Array/JSON Props
- The YAML props block (`---\nkey:\n  - val\n---`) IS valid MDC (the official "YAML method") and parses correctly — verified in the minimark cache, e.g. `home-image-carousel`'s YAML `images:` list becomes a `:images` JS-expression prop that Nuxt Content evaluates into an array. Use it for readable multi-line/complex values.
- Colon-prefixed inline JSON is a valid compact alternative: `{:images='["path1","path2"]'}`
- The `:` prefix marks a JS expression; single quotes wrap the JSON so it can use double quotes.

### Slot Content
- Markdown content in slots is auto-wrapped in `<p>` tags by the Nuxt Content renderer
- Use `<ContentSlot :use="$slots.default" unwrap="p" />` to extract raw text from paragraphs
- Standard `<slot />` preserves the `<p>` wrapping (usually fine for prose)

### Nesting Depth
- Three-level nesting works: `::` (level 1), `:::` (level 2), `::::` (level 3)
- Match closers exactly: `:::` closes `:::`, `::` closes `::`
- Indent 2 spaces per level for readability

### Collection Registration
- Single-file collections use `source: 'filename.md'` in `content.config.ts`
- Example: `home: defineCollection({ source: 'index.md', type: 'page' })`
- Query with `queryCollection('collectionName').first()`
- A `schema` (zod) drives Studio's Form Editor. Annotate fields with `property(z.string()).editor({ input: 'textarea' })`, importing `property` from `@nuxt/content` (zod v4 needs the `property()` wrapper — see Validators section).
- @nuxt/content is pinned at 3.15.2; it bundles zod v3 internally while the project pins zod v4.4.3 (import `z` from `zod` = v4).

### Nuxt Studio (validators & editor metadata)
- `@nuxt/content` supports zod v3, zod v4, and valibot collection schemas. `property(...).editor({ input: 'media' | 'icon' | 'textarea', label, description, tooltip, iconLibraries })` enriches fields for Studio's form editor.
- **`.editor()` directly on `z.string()` only works with zod v3** — @nuxt/content patches *its own* zod v3 `ZodType.prototype.editor`. With the project's zod v4, use `property(z.string()).editor({ ... })` (import `property` from `@nuxt/content`).
- MDC components must be **globally registered** for Studio's `/` slash command to list them. `nuxt.config.ts` uses a `hooks['components:extend']` hook that sets `component.global = true` for the 9 homepage components (via a `Record<string, true>` allowlist).
- `studio.editor.components` in `nuxt.config.ts`:
  - `exclude: ['Prose*']` — removes `@nuxt/content`'s markdown renderers (`ProseH1` etc.), which Studio otherwise surfaces redundantly alongside its native heading commands.
  - `groups: [{ label: 'Home', include: ['HeroSection','Home*','ActivityCalendar','SocialSidebar'] }]` + `ungrouped: 'omit'` — the list is filtered by `component.name` (= pascalName), so patterns are pascal-case/globs.
- `studio.repository: { provider: 'github', owner: 'svIndicium', repo: 'site', branch: 'main' }` lets local `pnpm generate` build without CI env vars; otherwise nuxt-studio throws `Repository owner and repository name are required` (it only auto-detects from CI env).
- Verify Studio's component list without auth by starting `nuxt dev` and curling `/__nuxt_studio/meta` — `components.list` should contain exactly the 9 home components.
