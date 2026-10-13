<script setup lang="ts">
defineProps<{
  /** Target route or external URL for the optional CTA. */
  ctaUrl?: string;
}>();
</script>

<template>
  <section class="text-section">
    <h2 class="heading-accent">
      <MDCSlot name="title" :use="$slots.title" unwrap="p" />
    </h2>
    <slot />
    <NuxtLink v-if="$slots.cta" :to="ctaUrl" class="button primary rounded text-section__cta">
      <MDCSlot name="cta" :use="$slots.cta" unwrap="p" />
    </NuxtLink>
  </section>
</template>

<style scoped>
.text-section {
  max-width: 860px;
  margin: 2.25rem auto 0;
}

.text-section h2 {
  margin: 0 0 0.7rem;
  padding-bottom: 0.4rem;
}

.text-section :deep(p) {
  margin: 0;
  line-height: 1.78;
  color: var(--text-color);
}

.text-section__cta {
  margin-top: 1rem;
  display: inline-block;
}
</style>
