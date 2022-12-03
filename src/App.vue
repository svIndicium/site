<script setup lang="ts">
import Nav from "@/layouts/Nav.vue"
import NavMobile from "@/layouts/NavMobile.vue"
import Footer from "@/layouts/Footer.vue"

import { stateStore } from "@/stores/state";

const state = stateStore();

state.refreshTheme()
</script>

<template>
  <!-- <Nav /> -->
  <NavMobile />
  <div class="page-content">
    <router-view></router-view>
  </div>
  <Footer />
</template>

<style lang="scss">
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
}

#app {
  margin: 0;
  padding: 0;
  width: 100vw;
  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.page-content {

  width: 100vw;
}
</style>
