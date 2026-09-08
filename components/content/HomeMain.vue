<template>
  <main class="content-main">
    <slot />
  </main>
</template>

<style scoped>
.content-main {
  grid-area: main;
  min-width: 0;
}
</style>
