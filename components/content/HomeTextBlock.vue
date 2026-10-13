<script setup lang="ts">
defineProps<{
  /** Target route or external URL for the CTA link. */
  ctaUrl: string;
}>();
</script>

<template>
  <section class="text-block">
    <h2 class="heading-accent">
      <MDCSlot name="title" :use="$slots.title" unwrap="p" />
    </h2>
    <slot />
    <NuxtLink :to="ctaUrl" class="inline-link">
      <MDCSlot name="cta" :use="$slots.cta" unwrap="p" />
    </NuxtLink>
  </section>
</template>

<style scoped>
.text-block {
  padding: 24px 0 12px;

  & h2 {
    margin: 0 0 0.7rem;
    padding-bottom: 0.4rem;
  }
}

.inline-link {
  display: inline-block;
  margin-top: 0.5rem;
  font-weight: 600;
  color: var(--inline-link-color);
  text-underline-offset: 2px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: var(--inline-link-hover);
  }
}
</style>
