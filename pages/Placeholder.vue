<script setup lang="ts">
/// <reference types="vite-svg-loader" />
import ContentContainer from '@/layouts/ContentContainer.vue';
import constuctionsSVG from '@/assets/icons/underconstruction.svg?component';
</script>

<template>
  <ContentContainer>
    <constuctionsSVG />
    <h1>Sorry. Deze pagina is nog niet af</h1>
    <h2>
      Duurt lang? Kom bij devcom! Of
      <a href="https://github.com/svIndicium/site" target="_blank">stuur een pull request!</a>
    </h2>
  </ContentContainer>
</template>

<style scoped lang="scss">
* {
  text-align: center;
}

svg {
  align-self: center;
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
