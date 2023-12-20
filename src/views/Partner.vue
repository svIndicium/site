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
        <img
          class="partner-logo"
          :src="
            '/assets/partners/' + (state.darkModeActive && partner.imgUrlDark ? partner.imgUrlDark : partner.imgUrl)
          "
          :alt="'Logo' + partner.title"
        />
        <div class="description">
          <p v-for="paragraph in partner.description" v-html="paragraph"></p>
          <a v-if="partner.url" class="button primary rounded" :href="partner.url" target="_blank">Lees meer</a>
        </div>
      </div>
      <JobOffers :partner="partner"/>
    </div>
  </ContentContainer>
  <FourOFour v-else />
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';
.job-offer-description ul {
  list-style: circle;
}

#partner {
  margin: 50px auto;

  .details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 8%;
    align-items: center;

    @media screen and (max-width: #{$bp-tablet-md}) {
      grid-template-columns: 1fr;
    }

    .partner-logo {
      height: fit-content;
    }

    .description {
      text-align: left;
    }
  }
}

.partner {
  margin: 50px auto 100px auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 8%;
  align-items: center;

  .partner-logo {
    height: fit-content;
    width: 100%;
  }

  .description {
    text-align: left;
  }
}
</style>
