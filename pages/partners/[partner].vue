<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';
import JobOffers from '@/components/JobOffers.vue';
import { mainPartner, premiumPartners, regularPartners } from '@/content/partners.json';
import { stateStore } from '@/stores/state';
import { computed } from 'vue';

const state = stateStore();

const route = useRoute();
const partners = [...premiumPartners, ...regularPartners, mainPartner];

// Use Nuxt's route params instead of location.pathname
const partner = computed(() => {
  const partnerSlug = route.params.partner as string;
  return partners.find((p) => p.slug === partnerSlug);
});
</script>

<template>
  <ContentContainer v-if="partner !== undefined">
    <h1>{{ partner.title }}</h1>
    <div id="partner" class="container">
      <div class="details">
        <a :href="partner.url" target="_blank">
          <img
            class="partner-logo"
            :src="
              '/assets/partners/' + (state.darkModeActive && partner.imgUrlDark ? partner.imgUrlDark : partner.imgUrl)
            "
            :alt="'Logo' + partner.title"
          />
        </a>
        <div class="description">
          <p v-for="paragraph in partner.description" v-html="paragraph"></p>
          <a v-if="partner.url" class="readMoreOutboundBtn button primary rounded" :href="partner.url" target="_blank"
            >Naar de website</a
          >
        </div>
      </div>
      <JobOffers :partner="partner" />
    </div>
  </ContentContainer>
  <ContentContainer v-else>
    <h1>Partner niet gevonden</h1>
    <p>De partner die je zoekt bestaat niet of is niet meer beschikbaar.</p>
    <NuxtLink to="/partners" class="button primary rounded">Terug naar partners</NuxtLink>
  </ContentContainer>
</template>

<style scoped lang="scss">
.job-offer-description ul {
  list-style: circle;
}

#partner {
  margin: 2em auto;

  .details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 8%;
    align-items: center;

    @media screen and (max-width: #{$bp-desktop-lg}) {
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
</style>
