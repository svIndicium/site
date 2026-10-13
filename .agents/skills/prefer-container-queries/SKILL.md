---
name: prefer-container-queries
description:
  Enforce container queries over viewport breakpoints for responsive components. Use when writing or reviewing
  responsive CSS, when a component needs to adapt to its available space (cards, sidebars, lists, panels, anything
  reused in different layouts), or when migrating viewport breakpoints to container queries. Plain CSS first, Tailwind
  variants covered as fallback.
---

# Prefer Container Queries

Components should respond to the space they are in, not to the viewport. A card that lives in a sidebar has maybe 300px
of width even on a huge screen, and a viewport breakpoint will get that wrong every time. Container queries fix this:
the component asks "how wide am I?" instead of "how wide is the window?".

When writing responsive CSS, default to container queries. Viewport breakpoints are the exception, not the rule.

## How it works (plain CSS)

Mark the ancestor that owns the available space as a container, then query it from the component's own stylesheet:

```css
/* Parent / wrapper owns the space */
.cards {
  container-type: inline-size;
}

/* Component adapts to its container, not the viewport */
.card {
  display: grid;
  grid-template-columns: 1fr;
}

@container (min-width: 35rem) {
  .card {
    grid-template-columns: 12rem 1fr;
    gap: 1.5rem;
  }
}
```

Two rules that trip people up:

1. `container-type: inline-size` goes on the ancestor. The `@container` block styles descendants. An element cannot
   query its own size.
2. A `@container` rule responds to the nearest ancestor with `container-type` set. If styles are not applying, check
   which container you are actually querying.

## Site conventions (svIndicium/site)

- Query conditions take a **literal length only** — browsers reject `var()` there, so `@container (min-width: var(--x))`
  silently never matches. Write the length literally in the component (e.g. `562px`). There are
  deliberately no `--cq-*` tokens (TD-055); the reason is documented in `assets/css/variables.css`.
- Colours/sizes inside the query still come from the `assets/css/variables.css` tokens (`--indi-*`, `--icon-*`).
- In Vue SFCs, keep `@container` blocks top-level in the `<style>` scope — nested `@container` inside a selector is
  dropped in dev.
- Existing example: search the codebase for `container-type: inline-size` — e.g. a card that sets it plus a
  `@container (max-width: 562px)` rule to shrink in narrow contexts.

## When viewport breakpoints are still right

Do not convert these:

- Page-level layout. The overall grid, whether the sidebar exists at all, header and navigation behavior. These
  genuinely depend on the viewport.
- Fixed or sticky elements positioned relative to the viewport, like a bottom bar that becomes a side rail.
- Global typography scale tied to screen size.

Everything inside those layout regions, meaning cards, forms, media objects, stat blocks, table-to-list switches, should
use container queries.

## Migrating existing code

1. Find the component's viewport queries (`@media (max-width: …)`).
2. Add `container-type: inline-size` to the component's root or the wrapper that owns the available space.
3. Replace the media query with a `@container` query matching the actual width where the layout should change. Do not
   copy the pixel value blindly; a viewport breakpoint and a container breakpoint measure different things. Resize the
   container, not the window, to find the real breakpoint.
4. Test the component in its narrowest real context (sidebar, drawer, small grid cell), not just at mobile viewport
   widths.

## Mistakes to catch in review

- `@media` on a component that is rendered inside a sidebar or modal. It will stay stacked or break depending on the
  viewport, not its actual space.
- `@container` rules used with no `container-type` ancestor. They silently never apply.
- `container-type` and the query on the same element. The element cannot query itself; move the query to a child or the
  container to the parent.
- `var()` inside the query condition. Always a literal length.
- A component that only looks right at the exact spot it was built for. If moving it to a different column breaks it, it
  is viewport-coupled.

## If the project uses Tailwind instead (Which we dont!)

Tailwind v4 ships container queries in core and this same principle applies with different syntax: mark the parent with
the `@container` class, then use `@`-prefixed variants on descendants (`@md:flex-row`). The sizes (`@md` = 28rem
container, etc.) and the full docs are at https://tailwindcss.com/docs/responsive-design#container-queries. On Tailwind
v3 the same syntax needs the `@tailwindcss/container-queries` plugin. This project does not use Tailwind, so prefer the
plain CSS form above.
