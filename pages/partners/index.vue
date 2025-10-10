<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';
import { mainPartner, premiumPartners, regularPartners } from '@/content/partners.json';
import JobOffers from '@/components/JobOffers.vue';

const { isDark } = useTheme();
</script>

<template>
  <ContentContainer>
    <h1>Partners</h1>
    <div id="main-partner" class="container">
      <div class="details">
        <a :href="mainPartner.url" target="_blank">
          <img
            class="partner-logo"
            :src="
              '/assets/partners/' + (isDark && mainPartner.imgUrlDark ? mainPartner.imgUrlDark : mainPartner.imgUrl)
            "
            :alt="'Logo' + mainPartner.title"
          />
        </a>
        <div class="description">
          <h3>Hoofdpartner: {{ mainPartner.title }}</h3>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p v-for="(paragraph, index) in mainPartner.description" :key="index" v-html="paragraph"></p>
          <a class="readMore button primary rounded" href="mailto:secretaris@indicium.nl">Neem contact op!</a>
        </div>
      </div>
      <JobOffers :partner="mainPartner" />
    </div>
    <hr class="dashed-line" />
    <h1>Premium partners</h1>
    <div v-for="partner in premiumPartners" :key="partner.slug" class="partner">
      <a :href="partner.url" target="_blank">
        <img
          class="partner-logo"
          :src="'/assets/partners/' + (isDark && partner.imgUrlDark ? partner.imgUrlDark : partner.imgUrl)"
          :alt="'Logo' + partner.title"
        />
      </a>
      <div class="details">
        <h3>{{ partner.title }}</h3>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p v-for="(paragraph, index) in partner.description" :key="index" class="description" v-html="paragraph"></p>
        <RouterLink class="readMore button primary rounded" :to="'/partners/' + partner.slug">Meer weten?</RouterLink>
      </div>
    </div>
    <hr class="dashed-line" />
    <h1>Reguliere partners</h1>
    <div class="regular-partners">
      <div v-for="partner in regularPartners" :key="partner.slug" class="regular-partner">
        <RouterLink :to="'/partners/' + partner.slug" class="partner-logo">
          <a :href="partner.url" target="_blank">
            <img
              :src="'/assets/partners/' + (isDark && partner.imgUrlDark ? partner.imgUrlDark : partner.imgUrl)"
              :alt="'Logo' + partner.title"
            />
          </a>
        </RouterLink>
        <RouterLink class="readMore button primary rounded indi-green-1" :to="'/partners/' + partner.slug"
          >{{ partner.title }}
        </RouterLink>
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
  margin: 0 auto 6em auto;

  .details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 8%;
    align-items: center;

    @media screen and (max-width: #{$bp-tablet-md}) {
      grid-template-columns: 1fr;
      gap: 0;
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

  .partner-logo {
    max-width: 500px;
    width: 30vw;
    height: auto;
  }

  @media screen and (max-width: #{$bp-tablet-lg}) {
    flex-wrap: wrap;

    .partner-logo {
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
    justify-content: space-between;
    width: 20em;

    .partner-logo {
      img {
        width: 20em;
        height: auto;
      }
    }
  }
}

.readMore {
  font-size: large;
  text-decoration: none;
  color: inherit;
  margin: 1em auto;
  padding: 10px;
  background-color: rgb(var(--indi-blue-1));
  border-radius: 0.5em;
}
</style>
