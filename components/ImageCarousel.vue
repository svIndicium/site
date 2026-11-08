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
    /** Crossfading blurred backdrop behind the swiping slides. */
    backdrop?: boolean;
    /** Continuous focus zoom/blur for carousels that show peeking side cards. */
    cardEffect?: boolean;
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
    backdrop: false,
    cardEffect: false,
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

const carouselRoot = ref<HTMLElement | null>(null);
const cardElements: HTMLElement[] = [];

function setCardRef(el: unknown, index: number) {
  if (el instanceof HTMLElement) cardElements[index] = el;
}

// One continuous 0..1 timeline per card: 0 = centred/focused, 1 = one slide
// away. Embla already emits `scroll` once per rendered frame, so reading the
// slide rects here keeps the zoom/blur glued to the finger during touch drags.
function updateCardProgress() {
  const root = carouselRoot.value;
  if (!root) return;

  const rootRect = root.getBoundingClientRect();
  const viewCenter = rootRect.left + rootRect.width / 2;
  const slides = [...root.querySelectorAll<HTMLElement>('.image-carousel__slide')];
  const rects = slides.map((slide) => slide.getBoundingClientRect());
  // Use the measured slide width so the mobile CSS override (1 slide per view)
  // is respected even though the prop still says 1.5.
  const slideWidth =
    rects.find((rect) => rect.width > 0)?.width ?? root.clientWidth / props.slidesPerView;
  if (!slideWidth) return;

  const backdrops = props.backdrop
    ? [...root.querySelectorAll<HTMLElement>('.image-carousel__backdrop')]
    : [];

  rects.forEach((rect, index) => {
    const distance = Math.abs(rect.left + rect.width / 2 - viewCenter);
    const progress = Math.min(1, distance / slideWidth);

    if (props.cardEffect) {
      cardElements[index]?.style.setProperty('--p', progress.toFixed(3));
    }

    if (backdrops[index]) {
      // Scrub the crossfade with the drag instead of waiting for a CSS
      // transition on the selected index.
      backdrops[index].style.opacity = Math.max(0, 1 - progress).toFixed(3);
      backdrops[index].style.setProperty('--bg-p', progress.toFixed(3));
    }
  });
}

function handleSelect() {
  updateState();
  updateCardProgress();
}

function handleReInit() {
  updateState();
  updateCardProgress();
}

let cardResizeObserver: ResizeObserver | undefined;

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
  if (!props.autoplayMs || props.autoplayMs <= 0 || document.hidden) return;
  stopAutoplay();
  autoplayTimer = setInterval(() => {
    if (document.hidden) return;
    emblaApi.value?.scrollNext();
  }, props.autoplayMs);
}

// Embla's scroll animation is rAF-driven, which is paused while the tab/window
// is in the background. Autoplay would otherwise keep advancing its internal
// target and leave the slides visually out of sync until an interaction forces
// a recalculation. Pause while hidden and re-sync when we come back.
function resumeAfterBackground() {
  if (document.hidden) return;
  const api = emblaApi.value;
  if (api) {
    api.reInit();
    api.scrollTo(api.selectedScrollSnap(), true);
  }
  startAutoplay();
}

function handleVisibilityChange() {
  if (document.hidden) stopAutoplay();
  else resumeAfterBackground();
}

onMounted(() => {
  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('blur', stopAutoplay);
  window.addEventListener('focus', resumeAfterBackground);

  nextTick(() => {
    updateCardProgress();
    if (typeof ResizeObserver !== 'undefined' && carouselRoot.value) {
      cardResizeObserver = new ResizeObserver(updateCardProgress);
      cardResizeObserver.observe(carouselRoot.value);
    }
  });
});

watch(emblaApi, (api, previousApi) => {
  if (previousApi) {
    previousApi.off('select', handleSelect);
    previousApi.off('reInit', handleReInit);
    previousApi.off('scroll', updateCardProgress);
    previousApi.off('settle', updateCardProgress);
  }

  if (!api) return;

  api.on('select', handleSelect);
  api.on('reInit', handleReInit);
  api.on('scroll', updateCardProgress);
  api.on('settle', updateCardProgress);
  updateState();
  nextTick(updateCardProgress);
  startAutoplay();
});

watch(
  () => props.autoplayMs,
  () => {
    startAutoplay();
  },
);

onUnmounted(() => {
  cardResizeObserver?.disconnect();
  document.removeEventListener('visibilitychange', handleVisibilityChange);
  window.removeEventListener('blur', stopAutoplay);
  window.removeEventListener('focus', resumeAfterBackground);
  stopAutoplay();
  const api = emblaApi.value;
  if (!api) return;
  api.off('select', handleSelect);
  api.off('reInit', handleReInit);
  api.off('scroll', updateCardProgress);
  api.off('settle', updateCardProgress);
});
</script>

<template>
  <section
    ref="carouselRoot"
    class="image-carousel"
    :style="carouselStyle"
    aria-label="Gallery"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
    @focusin="stopAutoplay"
    @focusout="startAutoplay"
  >
    <!-- Fixed layer: the backdrop crossfades between images while Embla swipes
         the foreground slides. -->
    <template v-if="props.backdrop">
      <div
        v-for="(image, index) in props.images"
        :key="`backdrop-${image}-${index}`"
        class="image-carousel__backdrop"
        :class="{ 'image-carousel__backdrop--active': index === selectedIndex }"
        :style="{ backgroundImage: `url(${image})` }"
        aria-hidden="true"
      />
    </template>

    <div ref="emblaRef" class="image-carousel__viewport">
      <div class="image-carousel__container">
        <div v-for="(image, imageIndex) in props.images" :key="image" class="image-carousel__slide">
          <div
            :ref="(el) => setCardRef(el, imageIndex)"
            class="image-carousel__card"
            :class="{ 'image-carousel__card--effect': props.cardEffect }"
          >
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
  border-radius: 10px;
}

.image-carousel__viewport {
  position: relative;
  z-index: 1;
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
}

.image-carousel__card {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
}

.image-carousel__card--effect {
  /* Set per frame by updateCardProgress; 1 is the resting side-card default,
     and the initially selected first card is sharp before JS runs. */
  --p: 1;
  /* Side cards lose height only; width stays edge-to-edge. The clipped image
     is cropped top/bottom, never stretched or squashed. */
  clip-path: inset(calc(5% * var(--p)) 0 round 10px);
}

.image-carousel__slide:first-child .image-carousel__card--effect {
  --p: 0;
}

.image-carousel__backdrop {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-position: center;
  background-size: cover;
  /* The background also reacts to the drag: it zooms and blurs slightly more
     as it fades out, then settles back in. */
  filter: blur(calc(12px + 4px * var(--bg-p, 0))) brightness(0.45) saturate(1.15);
  transform: scale(calc(1.12 + 0.05 * var(--bg-p, 0)));
  opacity: 0;
  pointer-events: none;
}

.image-carousel__backdrop--active {
  opacity: 1;
}

.image-carousel__image {
  width: 100%;
  height: 100%;
  object-fit: var(--image-fit);
  display: block;
}

.image-carousel__card--effect .image-carousel__image {
  filter: blur(calc(6px * var(--p))) brightness(calc(1 - 0.2 * var(--p)))
    saturate(calc(1 + 0.1 * var(--p)));
}

@media (prefers-reduced-motion: reduce) {
  .image-carousel__card--effect {
    clip-path: none;
  }

  .image-carousel__card--effect .image-carousel__image {
    filter: none;
  }
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
