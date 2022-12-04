<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

// this reference line is needed for TS and svg loader. Copy and past where needed
/// <reference types="vite-svg-loader" />
import theeSVG from "@/assets/icons/indicium_418.svg?component"
import ContentContainer from '@/layouts/ContentContainer.vue';

</script>

<template>
    <ContentContainer>
        <theeSVG class="icon"></theeSVG>
        <h1>Rustig aan, neem wat thee</h1>
        <h2>418 - ODZ: "Het is altijd thee tijd"</h2>
        <p>Als je denkt dat dit niet klopt. Ben je meer dan welkom om ons te helpen bij de DEVCOM!</p>
    </ContentContainer>
</template>

<style scoped lang="scss">
svg {
    width: 300px;
    height: 300px;
}

.icon {
    font-size: 150px;
}

.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
