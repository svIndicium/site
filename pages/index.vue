<script setup lang="ts">
const homeData = useAsyncData('home', () => queryCollection('home').first());

usePageSeo('Studievereniging HBO-ICT', {
  description: () => homeData.data.value?.description,
  ogDescription: () => homeData.data.value?.seo?.ogDescription,
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
