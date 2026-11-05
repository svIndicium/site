<script setup lang="ts">
useSeoMeta({
  title: 'Studievereniging HBO-ICT',
});

const { data: home } = await useAsyncData('home', () => queryCollection('home').first());

// The homepage content renders ::home-partners (MDC), which cannot await Nuxt
// composables itself — pre-resolve the same keys here so the marquee is in the
// prerendered HTML instead of appearing after hydration.
await prefetchPartners();
</script>

<template>
  <ContentRenderer v-if="home" :value="home" />
</template>
