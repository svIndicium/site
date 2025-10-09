<script setup lang="ts">
import NavDesktop from '@/layouts/Nav.vue';
import NavMobile from '@/layouts/NavMobile.vue';
import FooterMenu from '@/layouts/Footer.vue';

const route = useRoute();
const hideNavFooter = computed(() => {
  const paths = ['/links', '/discord']; // paths to hide nav and footer on
  return paths.includes(route.path);
});
</script>

<template>
  <div>
    <NavDesktop v-if="!hideNavFooter" />
    <NavMobile v-if="!hideNavFooter" />
    <div class="page-content">
      <slot />
    </div>
    <FooterMenu v-if="!hideNavFooter" />
  </div>
</template>

<style lang="scss">
body {
  .nav {
    display: block;
  }

  .mobile-nav {
    display: none;
  }
  background-color: var(--root-background-color);
}

@media screen and (max-width: #{$bp-tablet-lg}) {
  body {
    &::-webkit-scrollbar {
      width: 1em;
    }

    .nav {
      display: none !important;
    }

    .mobile-nav {
      display: block !important;
    }
  }
}

#app {
  width: 100vw;
  width: 100dvw;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;

  font-family: var(--font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .page-content {
    flex-grow: 1;
  }
}
</style>
