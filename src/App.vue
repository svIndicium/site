<script setup lang="ts">
import NavDesktop from '@/layouts/Nav.vue';
import NavMobile from '@/layouts/NavMobile.vue';
import FooterMenu from '@/layouts/Footer.vue';

import { stateStore } from '@/stores/state';

const state = stateStore();

state.refreshTheme();
</script>

<template>
  <NavDesktop />
  <NavMobile />
  <div class="page-content">
    <router-view></router-view>
  </div>
  <FooterMenu />
</template>

<style lang="scss">
@font-face {
  font-family: 'Indicium-font';
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  unicode-range: U+000-5FF;
  src: local('Constantia'), url('/fonts/constan.woff2') format('woff2');
}

body {
  margin: 0;

  &::-webkit-scrollbar {
    width: 0.6em;
    background-color: var(--indi-blue-3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--indi-blue-2);
    outline: 0px solid slategrey;
  }

  .nav {
    display: block;
  }

  .mobile-nav {
    display: none;
  }
}

// --bp-desktop-sm: 1120px;
@media only screen and (max-width: 1120px) {
  body {
    &::-webkit-scrollbar {
      width: 1em;
    }

    .nav {
      display: none !important;
    }

    .mobile-nav {
      display: block !important;
    }
  }
}

#app {
  width: 100vw;
  width: 100dvw;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;

  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .page-content {
    flex-grow: 1;
  }
}
</style>
