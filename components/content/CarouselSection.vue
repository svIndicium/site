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
      height="100%"
      max-height="100%"
      fit="cover"
      card-effect
    />
  </div>
</template>

<style scoped>
.carousel-section {
  margin: 1.5rem auto 0;
  width: 100%;
  max-width: 1080px;
  /* 1.5 slides per view: each slide is 2/3 of the width, so a 9/4 container
     makes every slide exactly 3:2 — the photos' native ratio. */
  aspect-ratio: 9 / 4;
  border-radius: 10px;
  overflow: hidden;
}

@media (max-width: 768px) {
  .carousel-section {
    margin-top: 1rem;
    /* No room for side images on phones: one full-width 3:2 slide. */
    aspect-ratio: 3 / 2;
    border-radius: 8px;
  }

  .carousel-section :deep(.image-carousel) {
    --slides-per-view: 1 !important;
  }
}
</style>
