<script setup lang="ts">
const { mainPartner, premiumPartners, regularPartners } = usePartners();

const mainPartners = computed(() => (mainPartner.value ? [mainPartner.value] : []));
const premiumPartnerList = computed(() => premiumPartners.value ?? []);
const regularPartnerList = computed(() => regularPartners.value ?? []);

const totalPartnersCount = computed(
  () => mainPartners.value.length + premiumPartnerList.value.length + regularPartnerList.value.length,
);

// One flat list for both layouts; `_tier` adds the main/premium modifier
// classes (currently unstyled hooks) and avoids triplicating the rendering.
const allPartners = computed(() => [
  ...mainPartners.value.map((p) => ({ ...p, _tier: 'main' as const })),
  ...premiumPartnerList.value.map((p) => ({ ...p, _tier: 'premium' as const })),
  ...regularPartnerList.value.map((p) => ({ ...p, _tier: 'regular' as const })),
]);

const hasAnyPartners = computed(() => totalPartnersCount.value > 0);
</script>

<template>
  <div v-if="hasAnyPartners" class="partners-section">
    <NuxtLink to="/partners" class="partners-inner">
      <p class="partners-label">
        <!-- Editable in Studio; falls back to the original label when no slot is supplied. -->
        <MDCSlot name="headline" :use="$slots.headline" unwrap="p">Onze partners</MDCSlot>
      </p>
      <div v-if="totalPartnersCount <= 5" class="partners-row">
        <span
          v-for="partner in allPartners"
          :key="`${partner._tier}-${partner.slug}`"
          class="partners-row__item"
          :class="{
            'partners-row__item--main': partner._tier === 'main',
            'partners-row__item--premium': partner._tier === 'premium',
          }"
        >
          <PartnerLogo :partner="partner" />
        </span>
      </div>
      <div v-else class="partners-carousel">
        <div class="partners-carousel__track">
          <!-- Duplicated for a seamless loop; the clone is hidden from AT. -->
          <span
            v-for="(partner, i) in [...allPartners, ...allPartners]"
            :key="`carousel-${i}-${partner.slug}`"
            class="partners-row__item"
            :class="{
              'partners-row__item--main': partner._tier === 'main',
              'partners-row__item--premium': partner._tier === 'premium',
            }"
            :aria-hidden="i >= allPartners.length ? true : undefined"
          >
            <PartnerLogo :partner="partner" />
          </span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped>
.partners-section {
  /* Single source for the row/carousel gap; the loop keyframe offsets by half. */
  --partners-gap: 16px;
  border-top: 1px solid rgba(var(--indi-blue-1-raw), 0.1);
  background: rgba(var(--indi-blue-1-raw), 0.06);
  padding: 32px 0;
  margin-bottom: 32px;
}

.partners-inner {
  display: block;
  max-width: 1300px;
  margin: 0 auto;
  padding: 28px 24px 32px;
  text-decoration: none;
  color: inherit;
}

.partners-label {
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.7;
  margin: 0 0 20px;
}

.partners-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 12px var(--partners-gap);
}

.partners-row__item {
  flex-shrink: 0;
  min-width: 220px;
  height: 96px;
  padding: 16px 20px;
  border-radius: 10px;
  border: 1px solid rgba(var(--indi-blue-1-raw), 0.2);
  background: rgba(var(--indi-blue-1-raw), 0.06);
  display: flex;
  align-items: center;
  justify-content: center;

  :deep(img) {
    height: 48px;
    max-width: 150px;
    object-fit: contain;
    display: block;
  }
}

.partners-carousel {
  width: 100%;
  overflow: hidden;
  position: relative;
  /* Owns the space, so the ticker can query the carousel width instead of the viewport. */
  container-type: inline-size;
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
}

/* The block is one link, so keyboard focus lands on the ancestor `.partners-inner`. */
.partners-inner:focus-within .partners-carousel__track,
.partners-carousel:hover .partners-carousel__track {
  animation-play-state: paused;
}

.partners-carousel__track {
  display: flex;
  width: max-content;
  align-items: center;
  gap: var(--partners-gap);
  padding: 12px 0;
  animation: partner-ticker 30s linear infinite;
}

/* Slower marquee in narrow contexts. Conditions take a literal length (no var()). */
@container (max-width: 900px) {
  .partners-carousel__track {
    animation: partner-ticker 20s linear infinite;
  }
}

@container (max-width: 390px) {
  .partners-carousel__track {
    animation: partner-ticker 15s linear infinite;
  }
}

/* Keep this last: it has the same specificity as the @container rules above, so
   source order decides that a reduced-motion user gets no animation. */
@media (prefers-reduced-motion: reduce) {
  .partners-carousel__track {
    animation: none;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    padding: 12px;
  }

  /* The doubled loop copy only exists to feed the animation. */
  .partners-carousel__track [aria-hidden='true'] {
    display: none;
  }
}

@keyframes partner-ticker {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-50% - var(--partners-gap, 16px) / 2));
  }
}
</style>
