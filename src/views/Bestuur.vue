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
        <p>{{ member.introduction }}</p>
      </div>
    </div>
    <img id="group-photo" :src="`/assets/boards/${currentBoard.groupPhoto}`" alt="Groepsfoto" />
  </ContentContainer>
</template>

<style scoped lang="scss">
h1 {
  text-align: center;
}

.member {
  max-width: 1170px;
  margin: 4em auto;
  display: grid;
  grid-auto-flow: column;
  column-gap: 10%;

  h3:has(+ h4) {
    margin-bottom: 0;
  }

  @media screen and (max-width: 768px) {
    grid-auto-flow: row;

    .member-photo {
      margin: 0 auto;
    }
  }

  &:nth-child(even) .member-info {
    grid-column: 1;
  }
}

#group-photo {
  display: block;
  margin: 0 auto;
}
</style>
