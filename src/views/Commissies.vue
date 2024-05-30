<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';
import commissies from '@/content/commissies.json';
</script>
<!-- todo: eerste kopje gecentreerd en fix fotos-->

<template>
  <ContentContainer>
    <h1>Commissies</h1>
    <p id="intro">
      Wil jij naast je studie actief bijdragen aan onze studievereniging? Meld je dan aan voor een van onze commissies.
      Naast dat commissielid zijn super leuk is, staat dit ook goed op je CV!
    </p>
    <div class="commissie" v-for="(commissie, index) in commissies">
      <img class="foto" :src="commissie.imgUrl" :alt="`Foto ${commissie.title}`" />
      <div class="commissie-info">
        <h3>{{ commissie.title }}</h3>
        <p>{{ commissie.description }}</p>
        <RouterLink class="readMore button primary rounded" :to="`/commissies/${commissie.slug}`"> Meer info </RouterLink>
      </div>
      <div v-if="index % 2 === 0" class="spacer"></div>
    </div>
  </ContentContainer>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';

.commissie {
  max-width: 1200px;
  margin: 4em auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;

  .foto {
    object-fit: contain;
    width: 80%;
    border-radius: 10px;
    transition: transform 0.2s;
  }

  .foto:hover {
    transform: scale(1.1);
    transition: transform 0.5s;
  }

  h3 {
    margin-top: 0;
  }

  .commissie-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--secondary-background-color);
    border-radius: 10px;
    padding: 1em 2em;
  }

  @media screen and (max-width: #{$bp-tablet-md}) {
    grid-template-columns: 1fr;

    .foto {
      width: 95%;
    }
    .commissie-info {
      margin-top: 2em;
    }

    .foto {
      margin: 0 auto;
    }
  }
}

#intro {
  max-width: 600px;
  margin: 0 auto;
}

.spacer {
  grid-column: 1 / -1;
  height: 1em;
}
</style>
