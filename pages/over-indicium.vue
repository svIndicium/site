<script setup lang="ts">
const aboutData = useAsyncData('about', () => queryCollection('about').first());

useSeoMeta({
  title: () => aboutData.data.value?.title,
  description: () => aboutData.data.value?.description,
  ogDescription: () => aboutData.data.value?.seo?.ogDescription || aboutData.data.value?.description,
});

const { data: page } = await aboutData;
</script>

<template>
  <ContentContainer>
    <ContentRenderer v-if="page" :value="page" />
  </ContentContainer>
</template>
