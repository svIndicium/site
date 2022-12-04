<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

// this reference line is needed for TS and svg loader. Copy and past where needed
/// <reference types="vite-svg-loader" />

import HelloWorld from '@/components/HelloWorld.vue'

import constuctionsSVG from "@/assets/icons/underconstruction.svg?component"
</script>

<template>
    <constuctionsSVG />
    <h1>Sorry. Deze pagina is nog effe niet af</h1>
    <h2>Duurt lang? kom bij devcom!</h2>
</template>

<style scoped lang="scss">
svg {
    width: 300px;
    height: 300px;
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
