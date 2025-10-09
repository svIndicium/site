<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';
import disputen from '@/content/dispuut.json';
/// <reference types="vite-svg-loader" />
</script>

<template>
  <ContentContainer>
    <h1>Disputen</h1>
    <p id="intro"></p>
    <div v-for="(dispuut, index) in disputen" :key="index" class="dispuut">
      <img alt="dispuutfoto" class="foto" :src="dispuut.imgUrl" />
      <div class="dispuut-info">
        <h2>{{ dispuut.title }}</h2>
        <p>{{ dispuut.description }}</p>
        <a href="https://ebriusvespertina.nl/" target="_blank" rel="noopener noreferrer" class="button primary rounded"
          >Website</a
        >
        <a
          href="https://www.instagram.com/dispuutebriusvespertina/"
          target="_blank"
          rel="noopener noreferrer"
          class="button primary indi-green-1 rounded"
          style="margin-left: 1em"
          >Instagram</a
        >
      </div>
      <div v-if="index % 2 === 0" class="spacer"></div>
    </div>
  </ContentContainer>
</template>

<style scoped lang="scss">
.dispuut {
  border-bottom: 3px solid var(--indi-blue-1);
  max-width: 1100px;
  margin: 0 auto;
  padding: 2em 0;
  display: grid;
  grid-auto-flow: column;
  column-gap: 5%;
  text-align: left;

  @media screen and (max-width: #{$bp-tablet-lg}) {
    grid-auto-flow: row;
  }

  img {
    height: 100%;
    min-width: 320px;
    border-radius: 10px;
    transition: transform 0.2s;
    background-image: linear-gradient(to bottom right, var(--indi-blue-1), var(--indi-blue-2));
    @media screen and (max-width: #{$bp-tablet-lg}) {
      max-width: 95%;
      margin: 0 auto;
    }
  }

  img:hover {
    transform: scale(1.1);
    transition: transform 0.5s;
  }

  h2 {
    margin-top: 0;
  }

  &:nth-child(odd) .dispuut-info {
    grid-column: 1;
    text-align: left;
  }

  &:last-child {
    border: none;
  }

  .dispuut-info {
    border-radius: 10px;
    padding: 1em 2em;
    background-color: var(--secondary-background-color);
    @media screen and (max-width: #{$bp-tablet-lg}) {
      margin-top: 2em;
    }
  }
}
</style>
