<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';
import FourOFour from '@/views/404.vue';
import { otherPartners as partners } from '@/content/partners.json';

const partnerSlug = location.pathname.split('/').pop();
const partner = partners.find(partner => partner.slug === partnerSlug);

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
        <img class="partner-logo" :src="'/assets/partners/' + partner.imgUrl" :alt="'Logo' + partner.title">
        <div class="description">
          <p v-for="paragraph in partner.description.split('\n')">{{ paragraph }}</p>
        </div>
      </div>
      <div class="job-offers-container">
        <h2>Vacatures bij {{ partner.title }}</h2>
        <div class="job-offers container">
          <div class="job-offer" v-for="jobOffer in partner.jobOffers">
            <h3 class="job-offer-title" @click="expandJobOffer">{{ jobOffer.title }}</h3>
            <div class="job-offer-description">
              <p>{{ jobOffer.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ContentContainer>
  <FourOFour v-else />
</template>

<style scoped lang="scss">
@import "@/assets/scss/variables.scss";

#partner {
  margin: 100px auto 50px auto;

  .details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 8%;
    align-items: center;

    @media screen and (max-width: 768px) {
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
        padding-left: 2em;
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
          content: "";
          background-color: var(--text-color);
          -webkit-mask-image: url("/assets/icons/arrow-up.svg");
          mask-image: url("/assets/icons/arrow-up.svg");
          height: 12px;
          width: 21px;
          margin-left: auto;
          margin-right: 1em;
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

  .readMore {
    display: inline-block;
    margin-top: 0.5em;
    padding: 0.7em;
    background-color: var(--indi-blue-1);
    border-radius: 0.5em;
  }
}
</style>