<script setup lang="ts">
/// <reference types="vite-svg-loader" />
import logo from '@/components/LogoElement.vue';
import HeroBackground from './HeroBackground.vue';
</script>

<template>
  <div class="hero">
    <div class="bg-container">
      <HeroBackground />
    </div>
    <div class="hero-content">
      <logo />
      <h1>
        Wij zijn dé
        <span class="extra-bold">studie</span>vereniging voor HBO-ICT van Hogeschool Utrecht
      </h1>
      <!-- <a size="l" href="https://leden.conscribo.nl/svIndicium/aanmeldenlidmaatschap">Word lid</a> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.hero {
  display: flex;
  justify-content: center;
  position: relative;
  width: inherit;

  .bg-container {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    z-index: -1;
    background-color: rgb(var(--hero-bg-color));
  }

  .hero-content {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 128px 0;

    h1 {
      max-width: 800px;
      padding: 0 16px;
    }
  }
}

@media screen and (max-width: #{$bp-desktop-sm}) {
  h1 {
    font-size: 2em;
  }
}
</style>
