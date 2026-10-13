---
name: make-content-editable
description:
  Converts hardcoded Vue page content into slot-based, Studio-editable MDC components. Use when a user wants a hardcoded
  page to be visually editable in Nuxt Studio's TipTap editor.
allowed-tools: Read, Write, Edit, Glob, Grep
---

# Make Content Editable

Convert hardcoded Vue content found in a page into slot-based, Nuxt Studio-editable MDC components.

> **Indicium adaptation** of upstream `nuxt-content/nuxt-studio/skills/make-content-editable`. Differences from
> upstream: this project uses **plain CSS** (no Tailwind) and **no Nuxt UI**; file/component selection uses the
> `question` tool; there is no Nuxt-UI MCP. Project-specific Studio wiring (global registration, editor groups,
> `property().editor()`, verification) lives in the `indicium-content` skill — read its `references/nuxt-studio.md`
> before starting.

## References

Consult these files as you work through each step:

| File                                                             | When to consult                                                             |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [`references/vue-slots.md`](references/vue-slots.md)             | Slot naming conventions, props vs slots, mdc-unwrap, interactive components |
| [`references/mdc-syntax.md`](references/mdc-syntax.md)           | Colon depth, indentation, slot ordering, parse errors                       |
| [`references/nuxt-studio.md`](references/nuxt-studio.md)         | Why slots = editable regions, v-show rule                                   |
| [`references/nuxt-components.md`](references/nuxt-components.md) | Nuxt component auto-discovery, props, default/named slots                   |

---

## Goal

Produce a 1:1 visual match of every original rendered section, with all content moved into MDC slots and props so it is
editable in Nuxt Studio's TipTap editor.

---

## Step 0 — Select file and components

**0a — Pick the file**: Glob `pages/**/*.vue` for the hardcoded page. Present the
candidates via the `question` tool (single-select).

**0b — Pick the sections**: Read the chosen page. Extract every hardcoded content section (carousel, text blocks, stat
cards, CTAs) and any already-extracted components it uses. Present the list via the `question` tool (`multiple: true`),
showing for each: name + one-line summary of whether it has hardcoded content or is already slot/prop-driven.

**0c — Confirm**: Single-select confirmation before any conversion begins.

Process each confirmed section through Steps 1–5.

---

## Step 1 — Read and analyse the section

Read the page (and any component files it uses) in full. Classify each element (see **`references/vue-slots.md`** — Slot
Naming Conventions):

| Element                                       | Becomes                                                         |
| --------------------------------------------- | --------------------------------------------------------------- |
| Hardcoded text (headings, labels, paragraphs) | Named slot                                                      |
| Repeated items (cards, stats, slides)         | Child component with its own slots                              |
| Image path, URL, boolean                      | Prop                                                            |
| Visual variant differing between siblings     | color prop + static lookup map (keep in mind our design tokens) |
| Interactive logic (carousels, toggles)        | Hardcoded inside component — not a slot                         |

Identify visual render order top-to-bottom — this is the required slot order in MDC.

---

## Step 2 — Design the component tree

Name components generically (reusable across pages, not tied to a specific page):

- One parent section (`AboutHero`, `StatList`)
- One collection wrapper for repeated items (`StatList`)
- One item component per repeated element (`StatCard`)
- One component per interactive sub-section (`CodePlayground`, `Carousel`, etc)

Align slot names with the naming table in `references/vue-slots.md` (`#headline`, `#title`, `#description`, `#body`,
`#footer`).

---

## Step 3 — Create the Vue components

**Slots**: `<slot name="..." mdc-unwrap="p" />` for editable text. In this project slots render via
`<MDCSlot name="..." :use="$slots...." unwrap="p" />` — the `name` is required, otherwise the element renders empty with
no error. See `indicium-content` `references/mdc-syntax.md`.

**Props**: `defineProps` for image paths, URLs, booleans, variant names. Never use props for content editors need to
type.

**Variants**: When siblings differ visually, add a `variant`/`color` prop with a static lookup map. Never construct
class names dynamically.

**Styling**: plain scoped CSS + design tokens. Reuse generic components/shared classes over per-page overrides. For
reused layouts prefer native container queries. Always make sure that components are responsive and accessible (ARIA,
keyboard navigation, color contrast) and use modern CSS features like container querries so they can be reused anywhere
regardless of screen size or the size they are placed in.

**Interactive components**: Keep state inside the component. Use `v-show` (not `v-if`) so all slot content stays mounted
for Studio's TipTap parser.

**Script tag**: Only add `<script setup>` when there are props, refs, or computed values.

New MDC components must be **globally registered** (`nuxt.config.ts` `components:extend`) and added to the
`studio.editor.components` group, or Studio's `/` picker will not list them.

---

## Step 4 — Update the MDC in the content file

Replace each component usage. See `references/mdc-syntax.md` for colon depth, indentation, and parse error reference.

Key rules:

- Slots appear in visual DOM order (top to bottom)
- Plain-text slots (`#headline`, `#title`, `#description`) before slots containing nested components (`#body`,
  `#footer`)
- Short config → inline props `{key="value"}`; multiple/complex → YAML frontmatter
- `#default` works for simple single-slot components; use named slots when nested children share slot names (`#title`,
  `#description`) to avoid parse errors

---

## Step 5 — Verify visual parity and Studio wiring

## Step 5 — Verify visual parity

Compare every element against the original:

- [ ] Same section padding and container width
- [ ] Same heading text, size, weight
- [ ] Same description text and size
- [ ] Same badge/headline label and icon
- [ ] Same interactive controls with same labels and icons
- [ ] Same code snippets verbatim
- [ ] Same number of cards/items in same order
- [ ] Same icon and color per card/item (check ALL siblings — colors often differ)
- [ ] Content sections not text-centered if the original wasn't

Fix any discrepancy before moving to the next section.
