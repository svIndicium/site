<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /** Image paths. */
    images: string[];
    /** Slide alt text; defaults to empty because the gallery images are decorative. */
    alt?: string;
  }>(),
  { alt: '' },
);
</script>

<template>
  <!-- Rendered on the server too: ImageCarousel's markup (slides + first image eager)
       is complete HTML, and Embla only measures and enhances it on mount. The old
       ClientOnly + hydrate-on-visible wrapper replaced this with a single fallback
       image until scrolled into view, which read as a hydration flicker. -->
  <ImageCarousel :images="props.images" :alt="props.alt" fit="contain" />
</template>
