<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';
import { previousBoards } from '@/content/boards.json';
</script>

<template>
  <ContentContainer>
    <h1>Oud Besturen</h1>
    <div v-for="(board, boardIndex) in previousBoards" :key="boardIndex" class="board">
      <div
        :style="
          'background: url(https://photojournal.jpl.nasa.gov/archive/PIA25889_MAIN_fullres.jpg ), background: url(' +
          board.groupPhoto +
          ');'
        "
      />
      <div class="board-info">
        <h2 class="board-year">{{ board.year }}</h2>
        <p v-for="(member, memberIndex) in board.members" :key="memberIndex">
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

  @media screen and (max-width: #{$bp-tablet-lg}) {
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
