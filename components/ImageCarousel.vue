<script setup lang="ts">
import emblaCarouselVue from 'embla-carousel-vue';

const props = withDefaults(
  defineProps<{
    images: string[];
    alt?: string;
    slidesPerView?: number;
    autoplayMs?: number;
    height?: string;
    maxHeight?: string;
    fit?: 'contain' | 'cover';
    showArrows?: boolean;
    showDots?: boolean;
    align?: 'start' | 'center' | 'end';
  }>(),
  {
    alt: 'carousel image',
    slidesPerView: 1,
    autoplayMs: 5000,
    height: '400px',
    maxHeight: '50vw',
    fit: 'contain',
    showArrows: true,
    showDots: true,
    align: 'start',
  },
);

const [emblaRef, emblaApi] = emblaCarouselVue({ loop: true, align: props.align });

const selectedIndex = ref(0);
const scrollSnaps = ref<number[]>([]);

let autoplayTimer: ReturnType<typeof setInterval> | undefined;

const carouselStyle = computed(() => ({
  '--carousel-height': props.height,
  '--carousel-max-height': props.maxHeight,
  '--slides-per-view': String(props.slidesPerView),
  '--image-fit': props.fit,
}));

function updateState() {
  const api = emblaApi.value;
  if (!api) return;
  selectedIndex.value = api.selectedScrollSnap();
  scrollSnaps.value = api.scrollSnapList();
}

function scrollPrev() {
  emblaApi.value?.scrollPrev();
}

function scrollNext() {
  emblaApi.value?.scrollNext();
}

function scrollTo(index: number) {
  emblaApi.value?.scrollTo(index);
}

function stopAutoplay() {
  if (!autoplayTimer) return;
  clearInterval(autoplayTimer);
  autoplayTimer = undefined;
}

function startAutoplay() {
  if (!props.autoplayMs || props.autoplayMs <= 0) return;
  stopAutoplay();
  autoplayTimer = setInterval(() => {
    emblaApi.value?.scrollNext();
  }, props.autoplayMs);
}

watch(emblaApi, (api, previousApi) => {
  if (previousApi) {
    previousApi.off('select', updateState);
    previousApi.off('reInit', updateState);
  }

  if (!api) return;

  api.on('select', updateState);
  api.on('reInit', updateState);
  updateState();
  startAutoplay();
});

watch(
  () => props.autoplayMs,
  () => {
    startAutoplay();
  },
);

onUnmounted(() => {
  stopAutoplay();
  const api = emblaApi.value;
  if (!api) return;
  api.off('select', updateState);
  api.off('reInit', updateState);
});
</script>

<template>
  <section
    class="image-carousel"
    :style="carouselStyle"
    aria-label="Gallery"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
    @focusin="stopAutoplay"
    @focusout="startAutoplay"
  >
    <div ref="emblaRef" class="image-carousel__viewport">
      <div class="image-carousel__container">
        <div v-for="(image, imageIndex) in props.images" :key="image" class="image-carousel__slide">
          <img
            :alt="props.alt"
            :src="image"
            class="image-carousel__image"
            :loading="imageIndex === 0 ? 'eager' : 'lazy'"
            :fetchpriority="imageIndex === 0 ? 'high' : 'auto'"
            decoding="async"
          />
        </div>
      </div>
    </div>

    <button
      v-if="props.showArrows"
      type="button"
      class="image-carousel__prev"
      aria-label="Navigate to previous slide"
      @click="scrollPrev"
    >
      ‹
    </button>
    <button
      v-if="props.showArrows"
      type="button"
      class="image-carousel__next"
      aria-label="Navigate to next slide"
      @click="scrollNext"
    >
      ›
    </button>

    <div v-if="props.showDots" class="image-carousel__dots">
      <button
        v-for="(_, index) in scrollSnaps"
        :key="`dot-${index}`"
        type="button"
        class="image-carousel__dot"
        :class="{ 'image-carousel__dot--active': index === selectedIndex }"
        :aria-label="`Navigate to slide ${index + 1}`"
        :aria-pressed="index === selectedIndex"
        @click="scrollTo(index)"
      />
    </div>
  </section>
</template>

<style scoped>
.image-carousel {
  position: relative;
  height: var(--carousel-height);
  max-height: var(--carousel-max-height);
  width: 100%;
  overflow: hidden;
}

.image-carousel__viewport {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.image-carousel__container {
  display: flex;
  width: 100%;
  height: 100%;
  transition: none !important;
}

.image-carousel__slide {
  flex: 0 0 calc(100% / var(--slides-per-view));
  min-width: 0;
  height: 100%;
  transition: none !important;
}

.image-carousel__image {
  width: 100%;
  height: 100%;
  object-fit: var(--image-fit);
  display: block;
}

.image-carousel__prev,
.image-carousel__next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.35);
  color: white;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
}

.image-carousel__prev {
  left: 10px;
}

.image-carousel__next {
  right: 10px;
}

.image-carousel__dots {
  position: absolute;
  left: 50%;
  bottom: 12px;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
}

.image-carousel__dot {
  width: 9px;
  height: 9px;
  border-radius: 999px;
  border: none;
  background: rgba(255, 255, 255, 0.55);
  cursor: pointer;
}

.image-carousel__dot--active {
  background: rgba(255, 255, 255, 1);
}
</style>
