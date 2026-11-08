<script setup lang="ts">
interface MenuItem {
  title: string;
  url: string;
  children?: MenuItem[];
}

const props = defineProps<{
  item: MenuItem;
  depth?: number;
}>();

const depth = props.depth ?? 0;
const isExternal = props.item.url.startsWith('http');

function getLinkClass(url: string) {
  return {
    'button secondary rounded': url === '/links',
    'button primary rounded': url === '/lid-worden',
    'button rounded': url.startsWith('http'),
  };
}
</script>

<template>
  <li class="menu-item" :data-depth="depth % 3">
    <RouterLink v-if="!isExternal" :to="item.url" class="navlink" :class="getLinkClass(item.url)">
      {{ item.title }}
    </RouterLink>
    <a v-else :href="item.url" target="_blank" rel="noopener" class="navlink" :class="getLinkClass(item.url)">
      {{ item.title }}
    </a>
    <ul v-if="item.children" class="dropdown">
      <MenuItem v-for="(child, index) in item.children" :key="`${index}-${child.title}-${child.url}`" :item="child" :depth="depth + 1" />
    </ul>
  </li>
</template>

<style scoped>
/* Desktop dropdowns (NavMobile is a separate drill-down implementation).
   Positioning: CSS anchor positioning with flip fallbacks (replaces the old
   getBoundingClientRect measuring). Anchor pattern: shared `anchor-name` +
   `anchor-scope` per item, explicit `position-anchor` on dropdowns (implicit
   auto does not reach position:fixed descendants). */

.menu-item {
  anchor-name: --submenu-anchor;
  /* Scope the shared name to this subtree: each dropdown binds its own
     item's anchor instead of the last same-named anchor in source order. */
  anchor-scope: --submenu-anchor;
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-item .navlink {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: var(--text-color);
  padding-left: 1.6rem;
  padding-right: 1.6rem;
}

.menu-item .navlink.button {
  height: unset;
  width: max-content;
}

.menu-item:has(> .dropdown)::after {
  content: '▼';
  position: absolute;
  right: 8px;
  pointer-events: none;
  font-size: 0.6rem;
  line-height: 1;
}

.dropdown {
  display: none;
  position: fixed;
  /* Explicit binding: implicit (auto) anchoring does not reach
     position:fixed descendants; scope keeps each dropdown on its own item. */
  position-anchor: --submenu-anchor;
  /* Centered under the anchor (top center of the row below); flips up only
     when there is genuinely no room below. */
  position-area: block-end;
  position-try-fallbacks: flip-block;
  background: var(--root-background-color);
  min-width: 200px;
  width: max-content;
  height: fit-content;
  z-index: 1;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.dropdown .dropdown {
  position-area: inline-end center;
  /* Top edge flush with the parent row, like the old top:0. */
  align-self: start;
  position-try-fallbacks: flip-inline, flip-block;
}

/* Nuxt Studio shifts every position:fixed element by writing an inline `left`
   when its sidebar is expanded. That overrides the anchor-computed inline
   position and pins all dropdowns to the sidebar edge, so let position-area
   own the horizontal axis again while Studio is open. */
body[data-studio-active][data-expand-sidebar] .dropdown {
  left: auto !important;
}

/* No anchor positioning (older browsers): today's static placement. */
@supports not (position-area: block-end) {
  .dropdown {
    position: absolute;
    top: 100%;
    left: 0;
  }

  .dropdown .dropdown {
    top: 0;
    left: 100%;
  }
}

.menu-item:hover > .dropdown,
.menu-item:focus-within > .dropdown {
  display: block;
}

.dropdown .menu-item:has(> .dropdown)::after {
  content: '▶';
}

/* ---------- Depth colors ---------- */
[data-depth='0'] > .dropdown {
  box-shadow: inset 0 0 0 2px var(--indi-blue-green-1);
}

[data-depth='0'] .menu-item a:hover,
[data-depth='0'] .menu-item a:focus-visible {
  background-color: var(--indi-blue-green-1);
}

[data-depth='1'] > .dropdown {
  box-shadow: inset 0 0 0 2px var(--indi-green-1);
}

[data-depth='1'] .menu-item a:hover,
[data-depth='1'] .menu-item a:focus-visible {
  background-color: var(--indi-green-1);
}

[data-depth='2'] > .dropdown {
  box-shadow: inset 0 0 0 2px var(--indi-blue-1);
}

[data-depth='2'] .menu-item a:hover,
[data-depth='2'] .menu-item a:focus-visible {
  background-color: var(--indi-blue-1);
}

.menu-item a:hover:not(.button),
.menu-item a:focus-visible:not(.button) {
  color: white;
  text-decoration: none;
  background-color: var(--indi-blue-1);
}
</style>
