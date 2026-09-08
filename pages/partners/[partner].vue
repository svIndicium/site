<script setup lang="ts">
import PartnerLogo from '@/components/PartnerLogo.vue';

const route = useRoute();
const slug = route.params.partner as string;

const { data: partner } = await useAsyncData(`partner-${slug}`, () =>
  queryCollection('partners').where('slug', '=', slug).where('tier', 'IS NOT NULL').first(),
);

const { data: jobOffers } = await useAsyncData(`partner-jobs-${slug}`, () =>
  queryCollection('partners').where('partnerSlug', '=', slug).all(),
);

useSeoMeta({
  title: partner.value?.title || 'Partner',
  description: partner.value?.description || `Informatie over ${partner.value?.title || 'deze partner'}`,
});
</script>

<template>
  <ContentContainer v-if="partner">
    <h1>{{ partner.title }}</h1>
    <div id="partner" class="container">
      <div class="details">
        <a v-if="partner.url" :href="partner.url" target="_blank">
          <PartnerLogo :partner="partner" class="partner-logo" />
        </a>
        <PartnerLogo v-else :partner="partner" class="partner-logo" />
        <div class="description">
          <ContentRenderer :value="partner" />
          <a v-if="partner.url" class="readMoreOutboundBtn button primary rounded" :href="partner.url" target="_blank">
            Naar de website
          </a>
        </div>
      </div>
      <JobOffers v-if="jobOffers && jobOffers.length" :offers="jobOffers" />
    </div>
  </ContentContainer>
  <ContentContainer v-else>
    <h1>Partner niet gevonden</h1>
    <p>De partner die je zoekt bestaat niet of is niet meer beschikbaar.</p>
    <NuxtLink to="/partners" class="button primary rounded">Terug naar partners</NuxtLink>
  </ContentContainer>
</template>

<style scoped>
#partner {
  margin: 2em auto;

  .details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 8%;
    align-items: center;

    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 2em;
    }

    .partner-logo {
      height: auto;
    }

    .description {
      text-align: left;
    }
  }
}

.description {
  :deep(h1) { font-size: 2rem; }
  :deep(h2) { font-size: 1.75rem; }
  :deep(h3) { font-size: 1.5rem; }
  :deep(h4) { font-size: 1.25rem; }
  :deep(h5) { font-size: 1.1rem; }
  :deep(h6) { font-size: 1rem; }
  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4),
  :deep(h5),
  :deep(h6) {
    margin: 1.2em 0 0.5em;
    line-height: 1.3;
    font-family: var(--indicium-font);
  }
  :deep(h1:first-child),
  :deep(h2:first-child),
  :deep(h3:first-child),
  :deep(h4:first-child),
  :deep(h5:first-child),
  :deep(h6:first-child) {
    margin-top: 0;
  }
}
</style>
