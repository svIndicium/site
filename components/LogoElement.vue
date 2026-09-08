<script setup lang="ts">
import logo from '@/assets/logo/indicium-logo-icon.svg?component';
</script>

<template>
  <div class="logo-container">
    <logo class="logo-icon" />
    <div class="logo-texts">
      <p class="logo-text">INDICIUM</p>
      <p class="logo-text small">ICT STUDIEVERENIGING</p>
    </div>
  </div>
</template>

<style scoped>
.logo-container {
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  flex-direction: column;

  .logo-icon {
    height: 111px;
    @media screen and (max-width: 414px) {
      height: 96px;
    }
  }

  .logo-text {
    font-size: 5.5em;

    &.small {
      font-size: 2.1em;
    }

    @media screen and (max-width: 1120px) {
      font-size: 5em;

      &.small {
        font-size: 2em;
      }
    }

    @media screen and (max-width: 562px) {
      font-size: 4em;

      &.small {
        font-size: 1.5em;
      }
    }

    @media screen and (max-width: 414px) {
      font-size: 3em;

      &.small {
        font-size: 1.2em;
      }
    }

    @media screen and (max-width: 321px) {
      font-size: 2em;

      &.small {
        font-size: 1em;
      }
    }
  }

  & svg {
    width: 100%;
    height: auto;
  }
}
</style>
