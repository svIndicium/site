<script setup lang="ts">
/// <reference types="vite-svg-loader" />
import PaySuccess from '@/assets/icons/successful-payment.svg?component';
import ContentContainer from '@/layouts/ContentContainer.vue';
</script>

<template>
  <ContentContainer>
    <p>A sandbox to test new features</p>
    <PaySuccess />
  </ContentContainer>
</template>

<style scoped lang="scss">
p {
  color: red;
}
</style>
