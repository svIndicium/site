<script setup lang="ts">
/// <reference types="vite-svg-loader" />
import logo from '@/components/LogoElement.vue';
import HeroBackground from './HeroBackground.vue';
import { storeToRefs } from 'pinia';
import { stateStore } from '@/stores/state';
const state = stateStore();
const { darkModeActive } = storeToRefs(state);
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
      <div class="hero-buttons">
        <router-link class="button primary rounded" to="/intro">Introductiekamp</router-link>
        <router-link class="button primary rounded indi-green-1" to="/lid-worden">Word lid</router-link>
<!--        <router-link class="button secondary rounded indi-bluegreen-1" to="/links">Quick Links</router-link>-->
      </div>
      <div class="hero-buttons hero-buttons-2">
        <router-link class="button secondary rounded indi-blue-2" to="/vacatures">Vacatures</router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "sass:map";

.hero {
  display: flex;
  justify-content: center;
  position: relative;
  width: inherit;
  overflow: hidden;

  .bg-container {
    position: absolute;
    inset: 0;
    overflow: hidden;
    z-index: -1;
    background-color: var(--hero-bg-color);
  }

  .hero-content {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 92px 0;
    max-width: 100%;

    h1 {
      max-width: 800px;
      padding: 0 16px;
      font-weight: 500;
    }

    $h1-breakpoints: (
      (
        bp: $bp-desktop-sm,
        fontSize: 2em,
      ),
      (
        bp: $bp-tablet-sm,
        fontSize: 1.5em,
      ),
      (
        bp: $bp-mobile-lg,
        fontSize: 1.2em,
      )
    );

    h1 {
      @each $breakpoint in $h1-breakpoints {
        @media screen and (max-width: map.get($breakpoint, bp)) {
          font-size: map.get($breakpoint, fontSize);
        }
      }
    }

    .button.primary.rounded,
    .button.secondary.rounded {
      font-size: 1.1rem;
      letter-spacing: 0.06rem;
      text-decoration: none;
    }

    & .hero-buttons {
      margin-top: 1rem;
      & > * {
        margin: 0.5em;
      }
    }
    & .hero-buttons-2 {
      margin-top: 0;
    }
  }
}
</style>
