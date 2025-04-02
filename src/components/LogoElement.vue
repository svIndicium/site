<script setup lang="ts">
/// <reference types="vite-svg-loader" />
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

<style scoped lang="scss">
.logo-container {
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  flex-direction: column;

  .logo-icon {
    height: 111px;
    @media screen and (max-width: #{$bp-mobile-lg}) {
      & {
        height: 96px;
      }
    }
  }

  .logo-text {
    font-family: var(--indicium-font);
    margin: 0px;

    font-size: 5.5em;

    &.small {
      color: #878787;
      font-size: 2.1em;
    }

    $logobreakpoints: (
      (
        bp: $bp-desktop-sm,
        fontSize: 5em,
        smallFontSize: 2em,
      ),
      (
        bp: $bp-tablet-sm,
        fontSize: 4em,
        smallFontSize: 1.5em,
      ),
      (
        bp: $bp-mobile-lg,
        fontSize: 3em,
        smallFontSize: 1.2em,
      ),
      (
        bp: $bp-mobile-sm,
        fontSize: 2em,
        smallFontSize: 1em,
      )
    );

    // default
    &.small {
      color: #878787;
      font-size: 2.1em;
    }

    @each $breakpoint in $logobreakpoints {
      @media screen and (max-width: map-get($breakpoint, bp)) {
        font-size: map-get($breakpoint, fontSize);

        &.small {
          font-size: map-get($breakpoint, smallFontSize);
        }
      }
    }
  }

  svg {
    width: '100%';
    height: 'auto';
  }
}
</style>
