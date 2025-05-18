<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';

const commissieSlug = window.location.pathname.split('/').pop();
const commissieName = `${commissieSlug?.charAt(0).toUpperCase()}${commissieSlug?.slice(1)}`;

console.log(commissieName);
</script>

<template>
<!--    <h1>404: Er wordt nog gewerkt aan de tekst over deze commissie.</h1>-->
    <h3>404: De {{commissieName}} is hard aan het schrijven!</h3>
</template>

<style scoped lang="scss">

h3 {
  text-align: center;
}

</style>
