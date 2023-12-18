<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';
import { mainPartner, premiumPartners, regularPartners } from '@/content/partners.json';
import { stateStore } from '@/stores/state';
import JobOffers from '@/components/JobOffers.vue';
const state = stateStore();
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
      <JobOffers :partner="mainPartner"/>
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
        <RouterLink class="readMore button primary rounded indi-green-1"
                    :to="'/partners/' + partner.slug">{{partner.title }}
        </RouterLink>
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

.regular-partners {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 3em;
  width: 95em;
  margin: 3em auto;

  @media screen and (max-width: #{$bp-desktop-lg}) {
    width: 70em;
  }

  @media screen and (max-width: #{$bp-desktop-sm}) {
    width: 45em;
  }

  @media screen and (max-width: #{$bp-tablet-md}) {
    width: 20em;
    gap: 0;
  }

  .regular-partner {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 20em;
    width: 20em;

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
