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
    <div class="signupContainer">
      <iframe src="https://leden.conscribo.nl/svIndicium/aanmeldenlidmaatschap"></iframe>
    </div>
    <div>
      Gaat er iets niet helemaal goed? Geen zorgen,
      <a href="https://leden.conscribo.nl/svIndicium/aanmeldenlidmaatschap" target="_blank"
        >open het formulier in een nieuw tabblad</a
      >
      en probeer het nog een keer. 🙂
    </div>
  </ContentContainer>
</template>

<style scoped lang="scss">
h1 {
  margin-bottom: 24px;
}

.content-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

iframe {
  flex-grow: 1;
  border: none;
  width: 100%;
  height: 100%;
  filter: var(--filter);
}

.signupContainer {
  background-color: var(--secondary-background-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 900px;
  max-width: 1200px;
  border-radius: 4px;
  margin-bottom: 48px;
}

.newtab-button {
  background-color: var(--indi-blue-1);
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 8px;
  color: var(--text-color);
  font-weight: 600;
}
</style>
