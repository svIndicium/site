<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

// this reference line is needed for TS and svg loader. Copy and past where needed
/// <reference types="vite-svg-loader" />
import ContentContainer from '@/layouts/ContentContainer.vue';
import { previousBoards } from '@/content/boards.json';
</script>

<template>
  <ContentContainer>
    <h1>Oud Besturen</h1>
    <div class="board" v-for="board in previousBoards">
      <img
        :src="
          board.groupPhoto
            ? '/assets/boards/' + board.groupPhoto
            : 'https://cataas.com/cat/says/Heb%20jij%20een%20goede%20foto%20van%20' +
              board.year +
              '%3F%0AStuur%20hem%20op%20naar%20bestuur%40indicium,hu%21?width=680&height=450'
        "
        alt="Groepsfoto"
      />
      <div class="board-info">
        <h2 class="board-year">{{ board.year }}</h2>
        <p v-for="member in board.members">
          <b>{{ member.name }}</b> - <span class="function">{{ member.function }}</span>
        </p>
      </div>
    </div>
  </ContentContainer>
</template>

<style scoped lang="scss">
.board {
  border-bottom: 3px solid var(--indi-blue-1);
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5em 0;
  display: grid;
  grid-auto-flow: column;
  column-gap: 10%;

  @media screen and (max-width: 975px) {
    grid-auto-flow: row;
  }

  &:nth-child(odd) .board-info {
    grid-column: 1;
  }

  &:last-child {
    border: none;
  }

  .board-year {
    margin: 0;
  }

  .function {
    color: #b3b3b3;
  }
}
</style>
