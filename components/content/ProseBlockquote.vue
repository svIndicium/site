<template>
  <blockquote>
    <slot />
  </blockquote>
</template>

<style scoped>
blockquote {
  margin: 0 0 1rem;
  padding: 0.75rem 1rem;
  border-left: 4px solid var(--indi-blue-1);
  background: var(--secondary-background-color);
  border-radius: 0 8px 8px 0;
  font-style: italic;
  font-size: 1rem;
}

/* Markdown wraps quote text in a <p>; keep it at the blockquote's own size, not
   the global paragraph size. */
blockquote :deep(p) {
  margin: 0;
  font-size: inherit;
}
</style>
