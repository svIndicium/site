<script lang="ts">
import { ref, reactive, toRefs, onMounted } from 'vue';
import type { Ref } from 'vue';

interface MenuItem {
  title: string;
  url: string;
  children?: MenuItem[];
}

export default {
  name: 'MenuItem',
  props: {
    item: {
      type: Object as () => MenuItem,
      required: true,
    },
    depth: {
      type: Number,
      default: 0,
    },
    first: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const menuItem: Ref<HTMLElement | null> = ref(null);
    const state = reactive({
      shouldDisplayDropdown: false,
      dropdownClass: '',
      arrowHTML: '',
    });

    const mouseOver = () => {
      state.shouldDisplayDropdown = true;

      if (!menuItem.value) return;

      const rect = menuItem.value.getBoundingClientRect();
      const spaceRight = window.innerWidth - rect.right;

      if (props.first) {
        state.dropdownClass = 'down';
        state.arrowHTML = '&#x25BC;';
      } else if (spaceRight < 200) {
        state.dropdownClass = 'left';
        state.arrowHTML = '&#x25C0;';
      } else {
        state.dropdownClass = 'right';
        state.arrowHTML = '&#x25B6;';
      }
    };

    onMounted(() => {
      if (!menuItem.value) return;

      // Ensure dropdown is hidden when mouse leaves the menu item.
      menuItem.value.addEventListener('mouseleave', () => {
        state.shouldDisplayDropdown = false;
      });
      menuItem.value.addEventListener('click', () => {
        state.shouldDisplayDropdown = false;
      });

      mouseOver();
      state.shouldDisplayDropdown = false;
    });

    return { ...toRefs(state), menuItem, mouseOver };
  },
  methods: {
    getLinkClass(url: string) {
      // returns custom classes for a url, for customization
      return {
        'button secondary rounded': url === '/links',
        'button primary rounded': url === '/lid-worden',
        'button rounded': url.startsWith('http'),
      };
    },
  },
};
</script>

<template>
  <li ref="menuItem" class="menu-item" @mouseover="mouseOver">
    <router-link :to="item.url" class="navlink" :class="getLinkClass(item.url)">{{ item.title }}</router-link>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <span v-if="item.children" :class="`${dropdownClass} arrow`" v-html="arrowHTML" />
    <ul v-if="item.children && shouldDisplayDropdown" :class="`dropdown ${dropdownClass}`" :data-depth="depth % 3">
      <MenuItem
        v-for="(child, index) in item.children"
        :key="index + child.title + child.url"
        :item="child"
        :depth="depth + 1"
      />
    </ul>
  </li>
</template>

<style lang="scss" scoped>
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

// matches index with a color, applies that.
// FIX: issue with CSS cascading. If a child is hovered, the parent's color is also applied and causes a specificity/cascade error.
[data-depth='0'] {
  box-shadow: inset 0 0 0 2px var(--indi-blue-green-1);

  & .menu-item a:hover,
  & .menu-item a:focus-within {
    background-color: var(--indi-blue-green-1);
  }
}

[data-depth='1'] {
  box-shadow: inset 0 0 0 2px var(--indi-green-1);

  & .menu-item a:hover,
  & .menu-item a:focus-within {
    background-color: var(--indi-green-1);
  }
}

[data-depth='2'] {
  box-shadow: inset 0 0 0 2px var(--indi-blue-1);

  & .menu-item a:hover,
  & .menu-item a:focus-within {
    background-color: var(--indi-blue-1);
  }
}

.menu-item {
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  & .navlink {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--text-color);
    padding-left: 1.6rem;
    padding-right: 1.6rem;
  }
}

.menu-item {
  & a:hover:not(.button),
  & a:hover:focus:not(.button),
  & a:focus-within:not(.button) {
    color: white;
    text-decoration: none;
    background-color: var(--indi-blue-1);
  }
}

span.down {
  position: absolute;
  right: 8px;
}

.dropdown .menu-item .dropdown {
  position: absolute;
  top: 0;
  &.right {
    left: 100%;
  }
  &.left {
    right: 100%;
  }
}

.arrow {
  position: absolute;
  pointer-events: none;
  font-size: 0.6rem;

  &.right {
    right: 8px;
  }

  &.left {
    left: 8px;
  }
}

.menu-item .navlink.button {
  height: unset;
  width: max-content;
}
</style>
