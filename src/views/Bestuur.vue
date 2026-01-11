<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';
import { currentBoard } from '@/content/boards.json';
</script>

<template>
  <ContentContainer>
    <h1>Bestuur 9</h1>
    <img id="group-photo" :src="`/assets/boards/${currentBoard.groupPhoto}`" alt="Groepsfoto 9e bestuur" />
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
        <address> <a href="mailto:{{ member.email }}">{{ member.email }}</a> </address><br>
        <h5>Bestuursverantwoordelijke voor:</h5>
        <h5 v-if="member.commissies && member.commissies.length > 0">{{ member.commissies.join(', ') }}</h5>
      </div>
    </div>
  </ContentContainer>
</template>

<style scoped lang="scss">
  ;

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
      h3, h4, address, h5 {
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
        h3, h4, address, h5 {
          text-align: center;
        }
      }
    }
    h3, h4, address, h5 {
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
