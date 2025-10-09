<script setup lang="ts">
/// <reference types="vite-svg-loader" />

// https://codepen.io/jenniesyip/pen/GWqJyR
import HeroCircuit from '@/assets/icons/hero.svg?component';

const backgroundStyle =
  ' transform: translate(' +
  (-10 + Math.floor(Math.random() * 20)) +
  '%, ' +
  (-10 + Math.floor(Math.random() * 20)) +
  '%) rotate(' +
  Math.floor(Math.random() * 8) * 45 +
  'deg);';
</script>

<template>
  <div class="background-view">
    <HeroCircuit
      class="HeroCircuit"
      style="scale: 2.5; position: absolute; top: 0; left: 0; width: 100%; height: 100%"
      :style="backgroundStyle"
    />
    <slot class="overlay"></slot>
  </div>
</template>

<style lang="scss">
.HeroCircuit {
  path,
  rect,
  circle {
    stroke: var(--pcb-trace-color);
  }
}

.background-view {
  background-color: var(--secondary-background-color);

  .HeroCircuit {
    .path {
      animation: draw 40s infinite;
      animation-timing-function: linear;
    }

    .path-2 {
      animation: draw 20s infinite;
      animation-delay: 1s;
      animation-timing-function: linear;
    }

    @keyframes draw {
      0% {
      }

      100% {
        stroke-dashoffset: 0;
        stroke-opacity: 1;
      }
    }
  }
}
</style>
