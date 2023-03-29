<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

// this reference line is needed for TS and svg loader. Copy and past where needed
/// <reference types="vite-svg-loader" />
import ContentContainer from '@/layouts/ContentContainer.vue';
import { currentBoard } from '@/content/boards.json';
</script>
npm
<template>
    <ContentContainer>
      <h1>Bestuur</h1>
      <img :src="`/assets/boards/${currentBoard.groupPhoto}`" alt="Groepsfoto">
      <div class="member" v-for="member in currentBoard.members">
        <img class="member-photo" :src="member.photo ? '/assets/boards/' + member.photo : 'https://cataas.com/cat/says/' + member.name" :alt="member.name">
        <div class="member-info">
          <h3>{{ member.name }}</h3>
          <h4>{{ member.function }}</h4>
          <p>{{ member.introduction }}</p>
        </div>
      </div>
    </ContentContainer>
</template>

<style scoped lang="scss">
  .member {
    max-width: 1200px;
    margin: 4em auto;
    display: grid;
    grid-auto-flow: column;
    column-gap: 10%;

    @media screen and (max-width: 768px) {
      grid-auto-flow: row;

      .member-photo {
        margin: 0 auto;
      }
    }

    &:nth-child(odd) .member-info {
        grid-column: 1;
    }
  }
</style>
