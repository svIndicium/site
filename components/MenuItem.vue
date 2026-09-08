<script setup lang="ts">
interface MenuItem {
  title: string;
  url: string;
  children?: MenuItem[];
}

const props = defineProps<{
  item: MenuItem;
  depth?: number;
  first?: boolean;
}>();

const depth = props.depth ?? 0;
const first = props.first ?? false;

const menuItem = ref<HTMLElement | null>(null);
const shouldDisplayDropdown = ref(false);
const dropdownClass = ref('');
const arrowHTML = ref('');

function mouseOver() {
  shouldDisplayDropdown.value = true;

  if (!menuItem.value) return;

  const rect = menuItem.value.getBoundingClientRect();
  const spaceRight = window.innerWidth - rect.right;

  if (first) {
    dropdownClass.value = 'down';
    arrowHTML.value = '&#x25BC;';
  } else if (spaceRight < 200) {
    dropdownClass.value = 'left';
    arrowHTML.value = '&#x25C0;';
  } else {
    dropdownClass.value = 'right';
    arrowHTML.value = '&#x25B6;';
  }
}

function getLinkClass(url: string) {
  return {
    'button secondary rounded': url === '/links',
    'button primary rounded': url === '/lid-worden',
    'button rounded': url.startsWith('http'),
  };
}

onMounted(() => {
  if (!menuItem.value) return;

  menuItem.value.addEventListener('mouseleave', () => {
    shouldDisplayDropdown.value = false;
  });
  menuItem.value.addEventListener('click', () => {
    shouldDisplayDropdown.value = false;
  });

  mouseOver();
  shouldDisplayDropdown.value = false;
});
</script>

<template>
  <li ref="menuItem" class="menu-item" @mouseover="mouseOver">
    <router-link :to="item.url" class="navlink" :class="getLinkClass(item.url)">{{ item.title }}</router-link>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <span v-if="item.children" :class="`${dropdownClass} arrow`" v-html="arrowHTML" />
    <ul v-if="item.children && shouldDisplayDropdown" :class="`dropdown ${dropdownClass}`" :data-depth="depth % 3">
      <MenuItem
        v-for="(child, index) in item.children"
        :key="`${index}-${child.title}-${child.url}`"
        :item="child"
        :depth="depth + 1"
      />
    </ul>
  </li>
</template>

<style scoped>
.dropdown {
  position: absolute;
  background: var(--root-background-color);
  top: 100%;
  min-width: 200px;
  width: max-content;
  height: fit-content;
  z-index: 1;
  list-style-type: none;
  padding: 0;
}

[data-depth='0'] {
  box-shadow: inset 0 0 0 2px var(--indi-blue-green-1);
}

[data-depth='0'] .menu-item a:hover,
[data-depth='0'] .menu-item a:focus-within {
  background-color: var(--indi-blue-green-1);
}

[data-depth='1'] {
  box-shadow: inset 0 0 0 2px var(--indi-green-1);
}

[data-depth='1'] .menu-item a:hover,
[data-depth='1'] .menu-item a:focus-within {
  background-color: var(--indi-green-1);
}

[data-depth='2'] {
  box-shadow: inset 0 0 0 2px var(--indi-blue-1);
}

[data-depth='2'] .menu-item a:hover,
[data-depth='2'] .menu-item a:focus-within {
  background-color: var(--indi-blue-1);
}

.menu-item {
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

.menu-item a:hover:not(.button),
.menu-item a:hover:focus:not(.button),
.menu-item a:focus-within:not(.button) {
  color: white;
  text-decoration: none;
  background-color: var(--indi-blue-1);
}

span.down {
  position: absolute;
  right: 8px;
}

.dropdown .menu-item .dropdown {
  position: absolute;
  top: 0;
}

.dropdown .menu-item .dropdown.right {
  left: 100%;
}

.dropdown .menu-item .dropdown.left {
  right: 100%;
}

.arrow {
  position: absolute;
  pointer-events: none;
  font-size: 0.6rem;
}

.arrow.right {
  right: 8px;
}

.arrow.left {
  left: 8px;
}

.menu-item .navlink.button {
  height: unset;
  width: max-content;
}
</style>
