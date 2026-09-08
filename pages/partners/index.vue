<script setup lang="ts">
import JobOffers from '@/components/JobOffers.vue';
import PartnerLogo from '@/components/PartnerLogo.vue';

const { mainPartner, premiumPartners, regularPartners } = usePartners();

const { data: mainPartnerJobOffers } = await useAsyncData('mainPartnerJobOffers', async () => {
  if (!mainPartner.value?.slug) return [];
  return await queryCollection('partners').where('partnerSlug', '=', mainPartner.value.slug).all();
});
</script>

<template>
  <ContentContainer>
    <h1>Partners</h1>
    <div v-if="mainPartner" id="main-partner" class="container">
      <div class="details">
        <a v-if="mainPartner.url" :href="mainPartner.url" target="_blank">
          <PartnerLogo :partner="mainPartner" class="partner-logo" />
        </a>
        <PartnerLogo v-else :partner="mainPartner" class="partner-logo" />
        <div class="description">
          <h3>Hoofdpartner: {{ mainPartner.title }}</h3>
          <ContentRenderer :value="mainPartner" />
          <a class="readMore button primary rounded" href="mailto:secretaris@indicium.hu">Neem contact op!</a>
        </div>
      </div>
      <JobOffers v-if="mainPartnerJobOffers && mainPartnerJobOffers.length" :offers="mainPartnerJobOffers" />
    </div>

    <hr class="dashed-line" />

    <h1>Premium partners</h1>
    <div v-for="partner in premiumPartners || []" :key="partner.slug" class="partner">
      <a :href="partner.url" target="_blank" class="partner-logo-link">
        <PartnerLogo :partner="partner" />
      </a>
      <div class="details">
        <h3>{{ partner.title }}</h3>
        <ContentRenderer :value="partner" class="description" />
        <RouterLink class="readMore button primary rounded" :to="`/partners/${partner.slug}`">Meer weten?</RouterLink>
      </div>
    </div>

    <hr class="dashed-line" />

    <h1>Reguliere partners</h1>
    <div class="regular-partners">
      <div v-for="partner in regularPartners || []" :key="partner.slug" class="regular-partner">
        <a
          v-if="partner.url"
          :href="partner.url"
          target="_blank"
          rel="noopener noreferrer"
          class="partner-logo"
        >
          <PartnerLogo :partner="partner" />
        </a>
        <RouterLink v-else :to="`/partners/${partner.slug}`" class="partner-logo">
          <PartnerLogo :partner="partner" />
        </RouterLink>
        <RouterLink class="readMore button primary rounded indi-green-1" :to="`/partners/${partner.slug}`">
          {{ partner.title }}
        </RouterLink>
      </div>
    </div>
  </ContentContainer>
</template>

<style scoped>
.dashed-line {
  border: none;
  height: 2px;
  background: repeating-linear-gradient(
    90deg,
    var(--indi-green-1),
    var(--indi-green-1) 30px,
    transparent 30px,
    transparent 60px
  );
}

#main-partner {
  margin: 0 auto 6em auto;

  :deep(.partner-logo) {
    display: block;
    width: min(100%, 420px);
    height: auto;
  }

  .details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 8%;
    align-items: center;

    & > :first-child {
      grid-column: 1;
      justify-self: start;
    }

    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 0;

      & > :first-child {
        grid-column: 1;
        grid-row: 1;
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
      }

      .description {
        grid-column: 1;
        grid-row: 2;
      }
    }

    .description {
      text-align: left;
    }
  }
}

.partner {
  margin: 50px auto;
  max-width: 1600px;
  display: flex;
  gap: 8%;
  align-items: center;

  .partner-logo-link {
    display: block;
    flex: 0 0 30vw;
    max-width: 500px;
    width: 30vw;

    :deep(img) {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  @media screen and (max-width: 944px) {
    flex-wrap: wrap;

    .partner-logo-link {
      flex: 0 0 auto;
      width: 100%;
      max-width: 300px;
      margin: 0 auto;
    }
  }

  .description {
    text-align: left;
  }
}

.regular-partners {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 3em;
  margin: 3em auto;
  max-width: 1200px;

  .regular-partner {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 20em;

    .partner-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 8em;

      :deep(img) {
        display: block;
        width: min(100%, 20em);
        max-width: 100%;
        min-width: 140px;
        height: auto;
      }

      :deep(.theme-logo-wrapper) {
        display: flex;
        justify-content: center;
        width: 100%;
      }
    }
  }
}

.readMore {
  color: inherit;
  margin: 1em auto;
}
</style>
