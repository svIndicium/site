<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';
import { mainPartner, premiumPartners, regularPartners } from '@/content/partners.json';

function expandJobOffer(event: MouseEvent) {
  const target = event.target as HTMLElement;
  target.parentElement!.classList.toggle('open');
}
</script>

<template>
  <ContentContainer>
    <h1>Partners</h1>
    <div id="main-partner" class="container">
      <div class="details">
        <img class="partner-logo" :src="'/assets/partners/' + mainPartner.imgUrl" :alt="'Logo' + mainPartner.title">
        <div class="description">
          <h3>Hoofdpartner: {{ mainPartner.title }}</h3>
          <p v-for="paragraph in mainPartner.description" v-html="paragraph"></p>
        </div>
      </div>
      <div class="job-offers-container">
        <h4>Vacatures bij {{ mainPartner.title }}</h4>
        <div class="job-offers">
          <div class="job-offer" v-for="jobOffer in mainPartner.jobOffers">
            <span class="job-offer-title" @click="expandJobOffer">{{ jobOffer.title }}</span>
            <div class="job-offer-description">
              <p v-html="jobOffer.description"></p>
              <a v-if="jobOffer.url" class="readMore" :href="jobOffer.url" target="_blank">Lees meer</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h1>Premium partners</h1>
    <div class="partner" v-for="partner in premiumPartners">
      <img class="partner-logo" :src="'/assets/partners/' + partner.imgUrl" :alt="'Logo' + partner.title">
      <div class="details">
        <h3>{{ partner.title }}</h3>
        <p v-for="paragraph in partner.description" class="description" v-html="paragraph"></p>
        <a class="readMore" :href="'/partners/' + partner.slug">Meer weten?</a>
      </div>
    </div>
    <h1>Reguliere partners</h1>
    <div class="partner" v-for="partner in regularPartners">
      <img class="partner-logo" :src="'/assets/partners/' + partner.imgUrl" :alt="'Logo' + partner.title">
      <div class="details">
        <h3>{{ partner.title }}</h3>
        <p v-for="paragraph in partner.description" class="description" v-html="paragraph"></p>
        <a class="readMore" :href="'/partners/' + partner.slug">Meer weten?</a>
      </div>
    </div>
  </ContentContainer>
</template>

<style scoped lang="scss">
#main-partner {
  margin: 100px auto 150px auto;

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
    margin-top: 3em;

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
          font-size: 1.3em;
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
  margin: 50px auto;
  max-width: 1600px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 8%;
  align-items: center;

  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr;

    .partner-logo {
      margin: 0 auto;
      max-width: 600px;
    }
  }

  .partner-logo {
    height: fit-content;
    width: 100%;
  }

  .description {
    text-align: left;
  }
}

.readMore {
  text-decoration: none;
  color: inherit;
  display: inline-block;
  margin: 1em auto;
  padding: 0.7em;
  background-color: var(--indi-blue-1);
  border-radius: 0.5em;
}
</style>
