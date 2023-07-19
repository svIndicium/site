<script setup lang="ts">
/// <reference types="vite-svg-loader" />
import content from '@/content/menu.json';
import NavLogo from '@/components/NavLogo.vue';
import MenuItem from '@/components/MenuItem.vue';

const items = content.items;
</script>

<template>
  <nav :class="'nav flex'">
    <div class="container flex">
      <NavLogo />
      <ul>
        <MenuItem v-for="(item, index) in items" :key="index" :item="item" :first="true" />
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  background: var(--root-background-color);
  border-bottom: 2px solid var(--indi-blue-1);
  /*
  * Consider using sticky so pages don't need to be padded at the top.
  * Unless if you are considering to use transparent navs on some pages,
  * then you'd need content behind it so use fixed.
  */
  position: fixed;
  top: 0;
  left: 0;
  width: inherit;

  // consistent style as on the home page (navbar shadow)
  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 0;
    right: 0;
    height: 10px;
    background: linear-gradient(to bottom, rgba(grey, 0.25) 0%, rgba(0, 0, 0, 0) 100%);
  }

  // make nav items fill the width
  * ul {
    display: flex;
    align-items: center;
    flex-grow: 1;
    padding: 0;
    margin: 0;
    list-style: none;
    height: 100%;

    a {
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }

      &:focus-within {
        outline: none;
        text-decoration: underline overline;
      }
    }

    li {
      position: relative;
      display: flex;
      flex-grow: 1;
      align-items: center;
      justify-content: center;
      width: 150px;
      height: 100%;
    }
  }

  @media screen and (max-width: #{$bp-tablet-lg}) {
    display: block;
    visibility: hidden;
  }
}

.container {
  height: var(--nav-height);
  max-width: 1084px !important;
  margin: 0 auto;
  padding: 0 24px;
}

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
