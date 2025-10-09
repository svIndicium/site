<script setup lang="ts">
import { stateStore } from '@/stores/state';

const state = stateStore();

// Only run theme refresh on client side after mount to avoid SSR hydration mismatch
onMounted(() => {
  state.refreshTheme();
});
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
@font-face {
  font-family: 'Indicium-font';
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  unicode-range: U+000-5FF;
  src:
    local('Constantia'),
    url('/fonts/constan.woff2') format('woff2');
}

body {
  margin: 0;

  &::-webkit-scrollbar {
    width: 0.6em;
    background-color: var(--indi-blue-3);
  }

  &::-webkit-scrollbar-track {
    background-color: var(--indi-blue-3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--indi-orange);
  }
}

*,
::before,
::after {
  box-sizing: border-box;
}

html {
  font-family: 'Indicium-font', 'Roboto', sans-serif;
  scroll-behavior: smooth;
  overflow-x: hidden;
}

#app {
  width: 100%;
  text-align: center;
}

.page-content {
  min-height: calc(100vh - 400px);
}

// Dark mode variables
:root {
  --indi-blue-1: #001f3d;
  --indi-blue-2: #003666;
  --indi-blue-3: #004d8f;
  --indi-blue-4: #0064b8;
  --indi-orange: #ff6600;
  --indi-orange-hover: #ff8533;
}

// Light mode
@media (prefers-color-scheme: light) {
  :root {
    --bg-primary: #ffffff;
    --bg-secondary: #f5f5f5;
    --text-primary: #000000;
    --text-secondary: #666666;
  }
}

// Dark mode
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #000000;
    --bg-secondary: #1a1a1a;
    --text-primary: #ffffff;
    --text-secondary: #cccccc;
  }
}
</style>
