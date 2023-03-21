<script setup lang="ts">

import ContentContainer from "@/layouts/ContentContainer.vue";
import commissies from '@/content/commissies.json';
const [commissie] = commissies;


</script>
<!--<template>
    <content-container>
      <div class="commissie" v-for="commissie in commissies">
        <h1>{{commissie.title}}</h1>
        <img class="foto" :src="commissie.imgUrl" >
        <p class="description">{{ commissie.description }}</p>
      </div>
    </content-container>
</template>-->

<template>
  <ContentContainer>
    <h1>Commissies</h1>
    <div class="commissie" v-for="(commissie, index) in commissies">
      <img class="foto" :src="commissie.imgUrl" >
      <div class="commissie-info">
        <h3>{{ commissie.title }}</h3>
        <p>{{ commissie.description }}</p>
      </div>
      <div v-if="index % 2 === 0" class="spacer"></div>
    </div>
  </ContentContainer>
</template>

<style scoped lang="scss">
.commissie {
  max-width: 1200px;
  margin: 4em auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10%;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;

    .foto {
      margin: 0 auto;
    }
  }
}

.spacer {
  grid-column: 1 / -1;
  height: 1em;
}
</style>


