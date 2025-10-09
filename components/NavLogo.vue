<script setup lang="ts">
import logo from '@/assets/logo/indicium-logo-icon.svg?component';
import { useRouter } from 'vue-router';

const router = useRouter();
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
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 10px;
  flex-grow: 1;

  .logo-icon {
    height: 48px;
    padding-right: 5px;
  }

  .logo-text {
    font-family: var(--indicium-font);
    margin: 0;
    font-size: 34px;
    width: max-content;

    &.small {
      color: #878787;
      font-size: 13px;
    }
  }

  .logo {
    max-width: 100%;
    max-height: 100%;
    overflow: hidden;
  }

  @media screen and (min-width: #{calc($bp-desktop-sm) + 1px}) {
    .logo {
      transition:
        max-width 0.5s,
        max-height 0.5s;
    }
  }
}

// hide the text when there's no space on dekstop but show it on mobile.
// +1px to prevent overlap, there's modern syntax that can use >= and <= but idk about support.
@media screen and (max-width: #{$bp-desktop-sm}) and (min-width: #{calc($bp-tablet-lg + 1px)}) {
  .logo {
    max-width: 0 !important;
    max-height: 0 !important;
  }
}
</style>
