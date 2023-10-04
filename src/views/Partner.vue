<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';
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

function expandJobOffer(event: MouseEvent) {
  const target = event.target as HTMLElement;
  target.parentElement!.classList.toggle('open');
}
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
      <div v-if="partner.jobOffers.length > 0" class="job-offers-container">
        <h2>Vacatures bij {{ partner.title }}</h2>
        <div class="job-offers container">
          <div class="job-offer" v-for="jobOffer in partner.jobOffers">
            <h3 class="job-offer-title" @click="expandJobOffer">{{ jobOffer.title }}</h3>
            <div class="job-offer-description">
              <p v-for="paragraph in jobOffer.description" v-html="paragraph"></p>
              <a
                v-if="jobOffer.url"
                class="button primary rounded indi-green-1"
                style="display: inline-block; margin-bottom: 1em"
                :href="jobOffer.url"
                target="_blank"
                >Lees meer</a
              >
            </div>
          </div>
        </div>
      </div>
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

  .job-offers-container {
    .job-offers {
      .job-offer {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        width: 80%;
        text-align: left;
        margin: 1.5em auto;
        padding: 0 2em;
        background-color: rgba(255, 255, 255, 0.15);
        border-radius: 1.5em;

        .job-offer-title {
          display: flex;
          align-items: center;
          margin: 0;
          font-size: 1.5em;
          line-height: 4ex;
          cursor: pointer;
        }

        .job-offer-title::after {
          display: inline-block;
          content: '';
          background-color: var(--text-color);
          -webkit-mask-image: url('/assets/icons/arrow-up.svg');
          mask-image: url('/assets/icons/arrow-up.svg');
          height: 12px;
          width: 21px;
          margin-left: auto;
          transition: 0.2s transform ease-out;
        }

        .job-offer-description {
          display: none;
        }

        &.open {
          .job-offer-title::after {
            transform: scaleY(-1);
          }

          .job-offer-description {
            display: block;
          }
        }
      }
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
