<script setup lang="ts">
defineProps<{
  images: string[];
}>();
</script>

<template>
  <ClientOnly>
    <LazyImageCarousel :images="images" fit="contain" hydrate-on-visible />
    <template #fallback>
      <div class="carousel-fallback">
        <img
          alt="carousel fallback"
          :src="images[0]"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          width="1600"
          height="800"
        />
      </div>
    </template>
  </ClientOnly>
</template>

<style scoped>
.carousel-fallback {
  height: 400px;
  max-height: 50vw;
  width: 100%;
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
}
</style>
