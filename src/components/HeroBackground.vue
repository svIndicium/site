<script setup lang="ts">
/// <reference types="vite-svg-loader" />

// https://codepen.io/jenniesyip/pen/GWqJyR
import HeroCircuit from "@/assets/icons/hero.svg?component"


var backgroundStyle = `
scale: 2.5;
position: absolute;
top: 0%;
left: 0%;
width: 100vw;
height: 800px;
` + " transform: translate(" + (-10 + Math.floor(Math.random() * 20)) + "%, " + (-10 + Math.floor(Math.random() * 20)) + "%) rotate(" + (Math.floor(Math.random() * 8) * 45) + "deg);"


</script>

<template>
    <div class="background-view">
        <HeroCircuit class="HeroCircuit" :style="backgroundStyle" />
        <slot class="overlay"></slot>
    </div>
</template>

<style lang="scss">
[data-theme=dark] {
    .background-view {
        background-color: black;

        .HeroCircuit {
            path {
                stroke: #161616;
            }

            rect {
                stroke: #161616;
            }

            circle {
                stroke: #161616;
            }
        }
    }
}

.background-view {
    background-color: var(--secondary-background-color);

    .HeroCircuit {
        .path {
            animation: draw 40s infinite;
            animation-timing-function: linear;
        }

        .path-2 {
            animation: draw 20s infinite;
            animation-delay: 1s;
            animation-timing-function: linear;
        }

        @keyframes draw {
            0% {}

            100% {
                stroke-dashoffset: 0;
                stroke-opacity: 1;
            }
        }
    }
}
</style>
