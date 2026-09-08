<script setup lang="ts">
const { data: home } = await useAsyncData('home', () => queryCollection('home').first());
</script>

<template>
  <ContentRenderer v-if="home" :value="home" />
</template>
