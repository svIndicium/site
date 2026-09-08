<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
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
    background-color: var(--brand-navy-3);
  }

  &::-webkit-scrollbar-track {
    background-color: var(--brand-navy-3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--brand-orange);
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
</style>
