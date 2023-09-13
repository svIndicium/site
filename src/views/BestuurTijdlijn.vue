<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

// this reference line is needed for TS and svg loader. Copy and past where needed
/// <reference types="vite-svg-loader" />
import ContentContainer from '@/layouts/ContentContainer.vue';
import { previousBoards } from '@/content/boards.json';
import DataNotFound from '@/assets/icons/data-not-found.svg?component';
</script>

<template>
  <ContentContainer>
    <h1>Indicium Besturen</h1>
    <div class="board" v-for="board in previousBoards">
      <img v-if="board.groupPhoto" :src="'/assets/boards/' + board.groupPhoto" alt="Groepsfoto" />
      <DataNotFound v-else />
      <div class="board-info">
        <h2 class="board-year">{{ board.year }}</h2>
        <i v-if="board.caption" class="board-caption">{{ board.caption }}</i>
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
