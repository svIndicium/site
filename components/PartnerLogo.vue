<script setup lang="ts">
const props = defineProps<{
  partner: {
    title: string;
    imgUrl?: string;
    imgUrlDark?: string;
  };
  alt?: string;
  class?: string;
}>();

const lightLogo = props.partner.imgUrl ? `/assets/partners/${props.partner.imgUrl}` : '';
const darkLogo = props.partner.imgUrlDark ? `/assets/partners/${props.partner.imgUrlDark}` : lightLogo;
const hasDarkVariant = !!props.partner.imgUrlDark;
</script>

<template>
  <span v-if="hasDarkVariant" class="theme-logo-wrapper">
    <img :src="lightLogo" :alt="alt || `Logo ${partner.title}`" :class="[props.class, 'light-only']" />
    <img :src="darkLogo" :alt="alt || `Logo ${partner.title}`" :class="[props.class, 'dark-only']" />
  </span>
  <img v-else :src="lightLogo" :alt="alt || `Logo ${partner.title}`" :class="props.class" />
</template>

<style>
/* Theme-aware logo visibility - must be unscoped to work with parent styles.
   Light is the default; the dark variant wins for an explicit dark choice or an
   OS dark preference (the latter also covers the no-JS path). */
.dark-only {
  display: none !important;
}

html:where(.dark, :has(#dark-mode:checked)) .light-only {
  display: none !important;
}

html:where(.dark, :has(#dark-mode:checked)) .dark-only {
  display: inline !important;
}

@media (prefers-color-scheme: dark) {
  html:where(:not(.light):not(:has(#light-mode:checked))) .light-only {
    display: none !important;
  }

  html:where(:not(.light):not(:has(#light-mode:checked))) .dark-only {
    display: inline !important;
  }
}
</style>

<style scoped>
.theme-logo-wrapper {
  display: contents;
}
</style>
