<script setup lang="ts">
const homeData = useAsyncData('home', () => queryCollection('home').first());

useSeoMeta({
  title: 'Studievereniging HBO-ICT',
  description: () => homeData.data.value?.description,
  ogDescription: () => homeData.data.value?.seo?.ogDescription || homeData.data.value?.description,
});

const { data: home } = await homeData;

// The homepage content renders ::home-partners (MDC), which cannot await Nuxt
// composables itself — pre-resolve the same keys here so the marquee is in the
// prerendered HTML instead of appearing after hydration.
await prefetchPartners();
</script>

<template>
  <ContentRenderer v-if="home" :value="home" />
</template>
