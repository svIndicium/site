<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';
import { currentBoard } from '@/content/boards.json';
</script>

<template>
  <ContentContainer>
    <h1>Bestuur</h1>
    <div class="member" v-for="member in currentBoard.members">
      <img
        class="member-photo"
        :src="member.photo ? '/assets/boards/' + member.photo : 'https://cataas.com/cat/says/' + member.name"
        :alt="member.name"
      />
      <div class="member-info">
        <h3>{{ member.name }}</h3>
        <h4>{{ member.function }}</h4>
        <!--<p>{{ member.introduction }}</p>-->
      </div>
    </div>
    <img id="group-photo" :src="`/assets/boards/${currentBoard.groupPhoto}`" alt="Groepsfoto" />
  </ContentContainer>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';

h1 {
  text-align: center;
}

.member {
  max-width: 1170px;
  margin: 4em auto;
  display: grid;
  grid-auto-flow: column;
  column-gap: 5%;

  .member-photo {
    width: 100%;
    max-width: 400px;
    border-radius: 10px;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.1);
      transition: transform 0.5s;
    }
  }

  h3,
  h4 {
    text-align: left;
  }

  h3:has(+ h4) {
    margin-bottom: 0;
  }

  @media screen and (max-width: #{$bp-tablet-md}) {
    grid-auto-flow: row;

    .member-photo {
      margin: 0 auto;
    }

    h3 {
      margin-top: 0;
      text-align: center;
    }

    h4 {
      margin-top: 0;
      text-align: center;
    }
  }

  &:nth-child(even) .member-info {
    grid-column: 1;
    h3,
    h4 {
      text-align: right;
    }
  }

  &:nth-child(odd) {
    .member-photo {
      margin: auto 0 auto auto;
    }
  }
}

#group-photo {
  display: block;
  margin: 0 auto;
  max-height: 512px;
  border-radius: 10px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
    transition: transform 0.5s;
  }
}
</style>
