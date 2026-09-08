<template>
  <div class="page-body">
    <slot />
  </div>
</template>

<style scoped>
.page-body {
  max-width: 1260px;
  margin: 0 auto;
  padding: 36px 24px 56px;
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-template-areas: 'main aside';
  column-gap: 48px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'main'
      'aside';
    padding: 28px 16px 48px;
  }
}
</style>
