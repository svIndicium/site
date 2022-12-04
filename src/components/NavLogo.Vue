<script setup lang="ts">
/// <reference types="vite-svg-loader" />
import { ref } from 'vue'
import logo from '@/assets/logo/indicium-logo-icon.svg?component'
import { useRouter } from 'vue-router'

const router = useRouter()

</script>

<template>
    <div class="logo-container" @click="router.push('/')">
        <logo class="logo-icon" />
        <div class="logo">
            <p class="logo-text">INDICIUM</p>
            <p class="logo-text small">ICT STUDIEVERENIGING</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.logo-container {
    display: flex;
    align-items: center;
    width: 256px;
    padding-left: 10px;
    padding-right: 10px;

    .logo-icon {
        height: 48px;
        margin-right: 5px;
    }

    .logo-text {
        font-family: 'constantina';
        margin: 0px;
        font-size: 34px;

        &.small {
            color: #878787;
            font-size: 13px;
        }
    }

    svg {
        width: "100%";
        height: "auto";
    }
}
</style>