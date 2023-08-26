<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';
import { mainPartner, premiumPartners, regularPartners } from '@/content/partners.json';
import { stateStore } from '@/stores/state';
const state = stateStore();

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
        <img
          class="partner-logo"
          :src="
            '/assets/partners/' +
            (state.darkModeActive && mainPartner.imgUrlDark ? mainPartner.imgUrlDark : mainPartner.imgUrl)
          "
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
              <a v-if="jobOffer.url" class="readMore button primary rounded" :href="jobOffer.url" target="_blank"
                >Lees meer</a
              >
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
        :src="'/assets/partners/' + (state.darkModeActive && partner.imgUrlDark ? partner.imgUrlDark : partner.imgUrl)"
        :alt="'Logo' + partner.title"
      />
      <div class="details">
        <h3>{{ partner.title }}</h3>
        <p v-for="paragraph in partner.description" class="description" v-html="paragraph"></p>
        <RouterLink class="readMore button primary rounded" :to="'/partners/' + partner.slug">Meer weten?</RouterLink>
      </div>
    </div>
    <hr class="dashed-line" />
    <h1>Reguliere partners</h1>
    <div class="regular-partners">
      <div class="regular-partner" v-for="partner in regularPartners">
        <RouterLink :to="'/partners/' + partner.slug" class="partner-logo">
          <img
            :src="
              '/assets/partners/' + (state.darkModeActive && partner.imgUrlDark ? partner.imgUrlDark : partner.imgUrl)
            "
            :alt="'Logo' + partner.title"
          />
        </RouterLink>
        <RouterLink class="readMore button primary rounded indi-green-1" :to="'/partners/' + partner.slug">{{
          partner.title
        }}</RouterLink>
      </div>
    </div>
  </ContentContainer>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';

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

    @media screen and (max-width: #{$bp-tablet-md}) {
      grid-template-columns: 1fr;
    }

    .description {
      text-align: left;
    }
  }

  .job-offers-container {
    margin-top: 3em;
    background-color: rgb(var(--panel-background));
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
        margin: 1.5em 16px;
        width: calc(100% - 32px);
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
          background-color: rgb(var(--text-color));
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

  .partner-logo {
    max-width: 600px;
    width: 100%;
  }

  @media screen and (max-width: #{$bp-tablet-lg}) {
    grid-template-columns: 1fr;

    .partner-logo {
      max-width: 300px;
      margin: 0 auto;
    }
  }

  .description {
    text-align: left;
  }
}

// TODO: flexbox or auto grid
.regular-partners {
  display: grid;
  gap: 5em;
  width: 95em;
  margin: 3em auto;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media screen and (max-width: #{$bp-desktop-lg}) {
    grid-template-columns: 1fr 1fr 1fr;
    width: 70em;
  }

  @media screen and (max-width: #{$bp-desktop-sm}) {
    grid-template-columns: 1fr 1fr;
    width: 45em;
  }

  @media screen and (max-width: #{$bp-tablet-md}) {
    grid-template-columns: 1fr;
    width: 20em;
  }

  .regular-partner {
    height: 20em;
    width: 20em;
    display: grid;
    grid-auto-flow: row;
    grid-template-rows: 1fr auto;
    justify-content: flex-end;

    .partner-logo {
      align-self: center;

      img {
        width: 20em;
      }
    }
  }
}

.readMore {
  text-decoration: none;
  color: inherit;
  display: inline-block;
  margin: 1em auto;
  padding: 0.7em;
  background-color: rgb(var(--indi-blue-1));
  border-radius: 0.5em;
}
</style>
