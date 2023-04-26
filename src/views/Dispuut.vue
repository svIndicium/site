<script setup lang="ts">

import ContentContainer from "@/layouts/ContentContainer.vue";
import disputen from "@/content/dispuut.json";

const [dispuut] = disputen;
</script>

<template>
  <ContentContainer>
    <h1>Disputen</h1>
    <p id="intro"></p>
    <div class="dispuut" v-for="(dispuut, index) in disputen">
      <img class="foto" :src="dispuut.imgUrl" >
      <div class="dispuut-info">
        <h3>{{ dispuut.title }}</h3>
        <p>{{ dispuut.description }}</p>
      </div>
      <div v-if="index % 2 === 0" class="spacer"></div>
    </div>
  </ContentContainer>
</template>

<style scoped lang="scss">
  .dispuut {
    border-bottom: 3px solid var(--indi-blue-1);
    max-width: 1500px;
    margin: 0 auto;
    padding: 2em 0;
    display: grid;
    grid-auto-flow: column;
    column-gap: 5%;
    text-align: left;

    @media screen and (max-width: 975px) {
      grid-auto-flow: row;
    }

    // .foto{
    //   margin: 0 auto;
    //   size: 900px;
    // }

    &:nth-child(odd) .dispuut-info {
        grid-column: 1;
        text-align: right;
    }

    &:last-child {
      border: none;
    }
  }
</style>
