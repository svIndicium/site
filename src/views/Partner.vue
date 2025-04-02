<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';
import JobOffers from '@/components/JobOffers.vue';
import FourOFour from '@/views/404.vue';
import { mainPartner, premiumPartners, regularPartners } from '@/content/partners.json';
import { stateStore } from '@/stores/state';
import { watch, ref } from 'vue';
import { useRoute } from 'vue-router';
const state = stateStore();

const partners = [...premiumPartners, ...regularPartners, mainPartner];
const partnerSlug = location.pathname.split('/').pop();
const partner = ref(partners.find((p) => p.slug === partnerSlug));

// needed to update partner because of Vue's internal diffing algorithm reusing the component and thus not updating the partner
const route = useRoute();
watch(route, (newRoute, oldRoute) => {
  const newPartnerSlug = newRoute.path.split('/').pop();
  partner.value = partners.find((p) => p.slug === newPartnerSlug);
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
          <a v-if="partner.url" class="readMoreOutboundBtn button primary rounded" :href="partner.url" target="_blank">Naar de website</a>
        </div>
      </div>
      <JobOffers :partner="partner" />
    </div>
  </ContentContainer>
  <FourOFour v-else />
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
