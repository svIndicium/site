<script setup lang="ts">
/// <reference types="vite-svg-loader" />
import { ref } from 'vue'
import logo from '@/assets/logo/indicium-logo-icon.svg?component'
import { useRouter } from 'vue-router'

const router = useRouter()

</script>

<template>
    <div class="logo-container">
        <logo class="logo-icon" />
        <div class="logo-texts">
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
    flex-direction: column;

    .logo-icon {
        height: 111px;
        margin-right: 5px;
    }

    .logo-text {
        font-family: var(--indicium-font);
        margin: 0px;
        font-size: 89px;

        &.small {
            color: #878787;
            font-size: 34px;
        }
    }

    svg {
        width: "100%";
        height: "auto";
    }
}

@media only screen and (max-width: 500px) {
    .logo-container {
        .logo-icon {
            height: 70px;
            margin-right: 5px;
        }

        .logo-text {
            font-family: var(--indicium-font);
            font-size: 55px;

            &.small {
                font-size: 21px;
            }
        }
    }
}
</style>