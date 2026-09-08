<template>
  <div>
    <NavDesktop />
    <LazyNavMobile hydrate-on-media-query="(max-width: 944px)" />
    <div class="page-content">
      <slot />
    </div>
    <AppFooter />
  </div>
</template>

<style>
body {
  .nav {
    display: block;
  }

  .mobile-nav {
    display: none;
  }
  background-color: var(--root-background-color);
}

@media screen and (max-width: 768px) {
  body {
    &::-webkit-scrollbar {
      width: 1em;
    }

    .nav {
      display: none !important;
    }

    .mobile-nav {
      display: block !important;
    }
  }
}

#app {
  width: 100vw;
  width: 100dvw;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;

  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .page-content {
    flex-grow: 1;
  }
}
</style>
