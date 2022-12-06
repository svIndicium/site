<script setup lang="ts">
import NavDesktop from "@/layouts/Nav.vue"
import NavMobile from "@/layouts/NavMobile.vue"
import FooterMenu from "@/layouts/Footer.vue"

import { stateStore } from "@/stores/state";

const state = stateStore();

state.refreshTheme()
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
  font-family: "Indicium-font";
  font-weight: 400;
  font-style: normal;
  font-display: auto;
  unicode-range: U+000-5FF;
  src: local("Constantia"), url("/fonts/constan.woff2") format("woff2");
}

body {
  margin: 0;

  &::-webkit-scrollbar {
    width: 1em;
    background-color: gray;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--indi-blue-green-2);
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
    .nav {
      display: none !important;
    }

    .mobile-nav {
      display: block !important;
    }
  }
}

#app {


  width: 100%;
  width: -webkit-fill-available;
  text-align: center;
  display: table;
  margin: 0;
  padding: 0;

  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.page-content {}
</style>
