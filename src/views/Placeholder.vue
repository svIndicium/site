<script setup lang="ts">
/// <reference types="vite-svg-loader" />
import ContentContainer from '@/layouts/ContentContainer.vue';
import constuctionsSVG from '@/assets/icons/underconstruction.svg?component';
</script>

<template>
  <ContentContainer>
    <constuctionsSVG />
    <h1>Sorry. Deze pagina is nog effe niet af</h1>
    <h2>Duurt lang? kom bij devcom!</h2>
  </ContentContainer>
</template>

<style scoped lang="scss">
* {
  text-align: center;
}

svg {
  width: 300px;
  height: 300px;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
