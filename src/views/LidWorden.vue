<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

// this reference line is needed for TS and svg loader. Copy and past where needed
/// <reference types="vite-svg-loader" />
import ContentContainer from '@/layouts/ContentContainer.vue';
import confetti from 'canvas-confetti';

confetti({
  angle: 90,
  particleCount: 200,
  spread: 130,
  origin: { y: 1, x: 0.5 },
  startVelocity: 90,
  ticks: 400,
});
</script>

<template>
  <ContentContainer>
    <h1>Aanmelden lidmaatschap INDICIUM</h1>
    <iframe src="https://leden.conscribo.nl/svIndicium/aanmeldenlidmaatschap"></iframe>
  </ContentContainer>
</template>

<style scoped lang="scss">
iframe {
  border: 0px;
  width: 100%;
  height: 1000px;
  background-color: var(--signup-background);
}
</style>
