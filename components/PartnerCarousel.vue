<script setup lang="ts">
const props = defineProps<{
  partners: Array<{
    title: string;
    imgUrl?: string;
    imgUrlDark?: string;
  }>;
}>();

// Duplicate the list so the marquee loops seamlessly
const doubled = computed(() => [...props.partners, ...props.partners]);
</script>

<template>
  <NuxtLink to="/partners" class="partner-ticker" aria-label="Onze partners — bekijk alle partners">
    <div class="partner-ticker__track">
      <span
        v-for="(partner, i) in doubled"
        :key="`${i}-${partner.title}`"
        class="partner-ticker__item"
        :aria-label="partner.title"
      >
        <PartnerLogo :partner="partner" />
      </span>
    </div>
  </NuxtLink>
</template>

<style scoped>
.partner-ticker {
  display: block;
  overflow: hidden;
  width: 100%;
  border-top: 1px solid rgba(var(--indi-blue-1-raw), 0.1);
  border-bottom: 1px solid rgba(var(--indi-blue-1-raw), 0.1);
  background: var(--secondary-background-color);
  cursor: pointer;
  text-decoration: none;

  &:hover .partner-ticker__track {
    animation-play-state: paused;
  }
}

.partner-ticker__track {
  display: flex;
  width: max-content;
  align-items: center;
  padding: 12px 0;
  animation: ticker 40s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    padding: 12px;
  }
}

.partner-ticker__item {
  display: flex;
  align-items: center;
  padding: 0 40px;
  flex-shrink: 0;

  :deep(img) {
    height: 44px;
    max-width: 140px;
    object-fit: contain;
    display: block;
    opacity: 0.8;
    transition: opacity 0.2s ease;
  }

  :deep(.theme-logo-wrapper) {
    display: flex;
    align-items: center;
  }
}

.partner-ticker:hover .partner-ticker__item :deep(img) {
  opacity: 1;
}

@keyframes ticker {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
