<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';
import { currentBoard } from '@/content/boards.json';
</script>

<template>
  <ContentContainer>
    <h1>Bestuur 8</h1>
    <img id="group-photo" :src="`/assets/boards/${currentBoard.groupPhoto}`" alt="Groepsfoto 8e bestuur" />
    <div class="member" v-for="member in currentBoard.members">
      <img
        class="member-photo"
        :src="member.photo ? `/assets/boards/${member.photo}` : `https://cataas.com/cat/says/${member.name}`"
        :alt="member.name"
        :title="member.figcaption ? member.figcaption : undefined"
      />
      <div class="member-info">
        <h3>{{ member.name }}</h3>
        <h4>{{ member.function }}</h4>
        <!--<p>{{ member.introduction }}</p>-->
      </div>
    </div>
  </ContentContainer>
</template>

<style scoped lang="scss">
  @import '@/assets/scss/variables.scss';

  .content-container {
    display: flex;
    flex-direction: column;
  }

  h1 {
    text-align: center;
  }

  .member {
    display: flex;
    gap: 3em;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 1170px;
    margin: 2em auto;

    &:nth-child(even) {
      flex-direction: row-reverse;
      h3, h4 {
        text-align: right;
      }
    }
  }

  .member-photo {
    width: 100%;
    max-width: 400px;
    border-radius: 10px;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.05);
      transition: transform 0.2s;
    }
  }

  @media screen and (max-width: #{$bp-tablet-md}) {
    .member {
      gap: 1em;
      margin: 2em auto;

      &:nth-child(even) {
        h3, h4 {
          text-align: center;
        }
      }
    }
    h3, h4 {
      text-align: center;
    }
  }

  @media screen and (max-width: #{$bp-tablet-sm}) {
    .member {
      gap: 0;
    }
  }
  #group-photo {
    display: block;
    margin: 2em auto;
    max-height: 512px;
    border-radius: 10px;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.05);
      transition: transform 0.2s;
    }
  }

</style>
