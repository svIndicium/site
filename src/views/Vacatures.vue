<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';
import Partners from '@/views/Partners.vue';
import JobOffers from '@/components/JobOffers.vue';
import { mainPartner, premiumPartners, regularPartners } from '@/content/partners.json';
import { stateStore } from '@/stores/state';
const state = stateStore();



</script>

<template>
  <ContentContainer>
    <h1>Vacatures</h1>
    <!--    Main partner    -->
    <div v-for="partner in premiumPartners">
      <JobOffers :partner="partner" />
    </div>
      <div class="regular-partner" v-for="partner in regularPartners">
        <JobOffers :partner="partner" />
      </div>
  </ContentContainer>
</template>

<style scoped lang="scss">

.job-offer-description ul {
  list-style: circle;
}

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
    max-width: 200px;
    width: 20vw;
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
