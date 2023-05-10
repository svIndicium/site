<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';
import { mainPartner, premiumPartners, regularPartners } from '@/content/partners.json';

function expandJobOffer(event: MouseEvent) {
  const target = event.target as HTMLElement;
  target.parentElement!.classList.toggle('open');
}

import { stateStore } from '@/stores/state';

const state = stateStore();
</script>

<template>
  <ContentContainer>
    <h1>Partners</h1>
    <div id="main-partner" class="container">
      <div class="details">
        <img
          class="partner-logo"
          :src="'/assets/partners/' + (state.darkModeActive ? mainPartner.imgUrlDark : mainPartner.imgUrl)"
          :alt="'Logo' + mainPartner.title"
        />
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
    <hr class="dashed-line" />
    <h1>Premium partners</h1>
    <div class="partner" v-for="partner in premiumPartners">
      <img
        class="partner-logo"
        :src="'/assets/partners/' + (state.darkModeActive ? partner.imgUrlDark : partner.imgUrl)"
        :alt="'Logo' + partner.title"
      />
      <div class="details">
        <h3>{{ partner.title }}</h3>
        <p v-for="paragraph in partner.description" class="description" v-html="paragraph"></p>
        <a class="readMore" :href="'/partners/' + partner.slug">Meer weten?</a>
      </div>
    </div>
    <hr class="dashed-line" />
    <h1>Reguliere partners</h1>
    <div class="partner" v-for="partner in regularPartners">
      <img
        class="partner-logo"
        :src="'/assets/partners/' + (state.darkModeActive ? partner.imgUrlDark : partner.imgUrl)"
        :alt="'Logo' + partner.title"
      />
      <div class="details">
        <h3>{{ partner.title }}</h3>
        <p v-for="paragraph in partner.description" class="description" v-html="paragraph"></p>
        <a class="readMore" :href="'/partners/' + partner.slug">Meer weten?</a>
      </div>
    </div>
  </ContentContainer>
</template>

<style scoped lang="scss">
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
  margin: 0 auto 150px auto;

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
    background-color: var(--panel-background);
    border-radius: 8px;
    border: 1px solid gray;

    h4 {
      margin: 16px;
    }

    .job-offers {
      .job-offer {
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        width: 100%;
        text-align: left;
        padding: 0 16px;
        margin: 1.5em auto;
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
          content: '';
          background-color: var(--text-color);
          -webkit-mask-image: url('/assets/icons/arrow-up.svg');
          mask-image: url('/assets/icons/arrow-up.svg');
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
