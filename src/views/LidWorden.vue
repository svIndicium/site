<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

// this reference line is needed for TS and svg loader. Copy and past where needed
/// <reference types="vite-svg-loader" />
import ContentContainer from '@/layouts/ContentContainer.vue';
</script>

<template>
    <ContentContainer>
        <h1>Aanmelden lidmaatschap INDICIUM</h1>
        <iframe src="https://leden.conscribo.nl/svIndicium/aanmeldenlidmaatschap"></iframe>
    </ContentContainer>
</template>

<style scoped lang="scss">
iframe {
    border: 0px;
    width: 100%;
    height: 1000px;
}
</style>
