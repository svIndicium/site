<script setup lang="ts">
import logo from '@/components/LogoElement.vue';
import HeroBackground from './HeroBackground.vue';

// MDX-editable passthrough to HeroBackground; unset falls back to themed colors.
withDefaults(
  defineProps<{
    heroBackgroundColor?: string;
    heroTraceColor?: string;
    heroPrimaryColor?: string;
    heroSecondaryColor?: string;
    heroTertiaryColor?: string;
    heroAnimated?: boolean;
    heroFlowDurationSeconds?: number;
  }>(),
  {
    heroAnimated: true,
    heroFlowDurationSeconds: 12,
  },
);
</script>

<template>
  <div class="hero">
    <div class="bg-container">
      <HeroBackground
        :background-color="heroBackgroundColor"
        :trace-color="heroTraceColor"
        :primary-color="heroPrimaryColor"
        :secondary-color="heroSecondaryColor"
        :tertiary-color="heroTertiaryColor"
        :animated="heroAnimated"
        :flow-duration-seconds="heroFlowDurationSeconds"
      />
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
        <router-link class="button secondary rounded indi-bluegreen-1" to="/links">Quick Links</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

.hero {
  display: flex;
  justify-content: center;
  position: relative;
  width: inherit;
  overflow: hidden;
  padding-top: var(--nav-height);

  .bg-container {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  .hero-content {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 92px 0;
    max-width: 100%;
    z-index: 1;

    h1 {
      max-width: 800px;
      padding: 0 16px;
      font-weight: 500;

      @media screen and (max-width: 1120px) {
        font-size: 2em;
      }

      @media screen and (max-width: 562px) {
        font-size: 1.5em;
      }

      @media screen and (max-width: 414px) {
        font-size: 1.2em;
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
  }
}
</style>
