<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /** Image paths. */
    images: string[];
    /** Slide alt text. */
    alt?: string;
  }>(),
  { alt: '' },
);
</script>

<template>
  <div class="carousel-section">
    <ImageCarousel
      :images="props.images"
      :alt="props.alt"
      :slides-per-view="1.5"
      align="center"
      height="32em"
      max-height="32em"
      fit="cover"
    />
  </div>
</template>

<style scoped>
.carousel-section {
  margin: 1.5rem auto 0;
  width: 100%;
  max-width: 1080px;
  height: 30em;
  max-height: 30em;
  border-radius: 10px;
  overflow: hidden;
  background: var(--secondary-background-color);
  border: 1px solid rgba(var(--indi-blue-1-raw), 0.3);
}

@media (max-width: 944px) {
  .carousel-section {
    height: 26em;
    max-height: 26em;
  }
}

@media (max-width: 768px) {
  .carousel-section {
    margin-top: 1rem;
    height: 22em;
    max-height: 22em;
    border-radius: 8px;
  }
}
</style>
