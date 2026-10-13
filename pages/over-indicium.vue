<script setup lang="ts">
const { data: page } = await useAsyncData('about', () => queryCollection('about').first());

useSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.description,
});
</script>

<template>
  <ContentContainer>
    <ContentRenderer v-if="page" :value="page" />
  </ContentContainer>
</template>
