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

// Brand colors (theme-independent)
:root {
  --indi-blue-1: #001f3d;
  --indi-blue-2: #003666;
  --indi-blue-3: #004d8f;
  --indi-blue-4: #0064b8;
  --indi-orange: #ff6600;
  --indi-orange-hover: #ff8533;
}

// Note: Theme colors are handled by variables.scss using [data-theme] attribute
// This respects user preference set in footer, not just system preference
</style>
