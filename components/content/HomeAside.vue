<template>
  <aside class="content-aside">
    <slot />
  </aside>
</template>

<style scoped>
.content-aside {
  grid-area: aside;
  position: sticky;
  top: calc(var(--nav-height) + 20px);
  padding-top: 4px;

  @media (max-width: 900px) {
    position: static;
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
  }
}
</style>
