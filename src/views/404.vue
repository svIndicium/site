<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

// this reference line is needed for TS and svg loader. Copy and past where needed
/// <reference types="vite-svg-loader" />

import HelloWorld from '@/components/HelloWorld.vue'

import constuctionsSVG from "@/assets/icons/underconstruction.svg?component"
const excuses = ["Sorry. Het was dit of een tentamen en het is het allebei niet geworden", "Zit de wifi-kabel er goed in?",
    "Herstart je device anders even...", "Je houdt hem verkeerd vast", "Aan deze pagina zijn we nog niet toegekomen", "(╯°□°)╯︵ ┻━┻", "(┛ಠ_ಠ)┛彡┻━┻",
    "Dit was niet onderdeel van mijn stage opdracht", "Het werkte op mijn PC nog wel", "Is er toevallig iemand met verstand van computers die dit kan fixen?", "Deze pagina is op vakantie, dat moet soms ook even",
]
const faces = ["😢", "😭", "😿", "😞", "😩", "🙁", "😟", "😦", "😨", "😰", "😮", "😪", "😵"]
const excuus = excuses[Math.floor(Math.random() * excuses.length)]
const sadface = faces[Math.floor(Math.random() * faces.length)]
</script>

<template>
    <h1 class="face">{{ sadface }}</h1>
    <h1>Sorry, deze pagina bestaat niet</h1>
    <h2>404 - ODZ: "{{ excuus }}"</h2>
    <p>Als je denkt dat dit niet klopt. Ben je meer dan welkom om ons te helpen bij de DEVCOM!</p>
</template>

<style scoped lang="scss">
svg {
    width: 300px;
    height: 300px;
}

.face {
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
