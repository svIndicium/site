<script setup lang="ts">
defineProps<{
  title: string;
  ctaLabel: string;
  ctaUrl: string;
}>();
</script>

<template>
  <section class="text-block">
    <h2>{{ title }}</h2>
    <slot />
    <NuxtLink :to="ctaUrl" class="inline-link">{{ ctaLabel }}</NuxtLink>
  </section>
</template>

<style scoped>
.text-block {
  padding: 24px 0 12px;

  & h2 {
    position: relative;
    margin: 0 0 0.7rem;
    padding-bottom: 0.4rem;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 3.25rem;
      height: 3px;
      border-radius: 2px;
      background: var(--indi-blue-1);
    }
  }
}

.inline-link {
  display: inline-block;
  margin-top: 0.5rem;
  font-weight: 600;
  color: var(--indi-blue-1);
  filter: brightness(0.72);
  text-underline-offset: 2px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    filter: brightness(0.58);
  }
}

html[data-theme='dark'] .inline-link {
  filter: brightness(1.15);
}

html[data-theme='dark'] .inline-link:hover {
  filter: brightness(1.3);
}
</style>
