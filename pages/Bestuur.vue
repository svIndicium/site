<script setup lang="ts">
// The current board is derived: the newest one (highest boardNumber), so
// editors never maintain an isCurrent flag.
const { data: currentBoard } = await useAsyncData('currentBoard', () =>
  queryCollection('boards').order('boardNumber', 'DESC').first(),
);
</script>

<template>
  <ContentContainer>
    <h1>Bestuur {{ currentBoard?.boardNumber }}</h1>
    <img
      v-if="currentBoard?.groupPhoto"
      id="group-photo"
      class="hover-scale"
      :src="`/assets/boards/${currentBoard.groupPhoto}`"
      :alt="`Groepsfoto ${currentBoard.boardNumber}e bestuur`"
      width="1200"
      height="800"
      decoding="async"
      fetchpriority="high"
    />
    <div v-for="member in currentBoard?.members || []" :key="member.email" class="member">
      <img
        class="member-photo hover-scale"
        :src="member.photo ? `/assets/boards/${member.photo}` : '/assets/misc/placeholder-person.svg'"
        :alt="member.name"
        :title="member.figcaption || undefined"
        width="400"
        height="500"
        loading="lazy"
        decoding="async"
      />
      <h3>{{ member.name }}</h3>
      <h4>{{ member.function }}</h4>
      <address>
        <a :href="`mailto:${member.email}`">{{ member.email }}</a>
      </address>
      <h5 v-if="member.responsibilities">Verantwoordelijkheden:</h5>
      <p v-if="member.responsibilities">{{ member.responsibilities.join(', ') }}</p>
    </div>
  </ContentContainer>
</template>

<style scoped>
h1 {
  text-align: center;
}

.member {
  max-width: 1170px;
  margin: 2em 3em;

  & h5 {
    font-size: 1.1em;
  }

  & p {
    margin-top: 0em;
    font-size: 1em;
  }

  .member-photo {
    float: left;
    margin: 0 3em 0 0;
    width: 100%;
    max-width: 320px;
    height: auto;
    border-radius: 10px;
    background-color: var(--secondary-background-color);
  }

  &:nth-child(even) {
    .member-photo {
      float: right;
      margin: 0 0 0 3em;
    }

    & h3,
    & h4,
    & h5,
    & p,
    & address {
      text-align: right;
    }
  }
}

@media screen and (max-width: 768px) {
  .member {
    margin: 2em auto;

    &:nth-child(even) {
      .member-photo {
        margin: 0 auto 1em;
      }

      & h3,
      & h4 {
        text-align: center;
      }
    }
  }

  .member-photo {
    margin: 0 auto 1em;
    display: block;
  }

  h3,
  h4 {
    text-align: center;
  }
}

@media screen and (max-width: 562px) {
  .member-photo {
    margin: 0 auto;
  }
}

#group-photo {
  display: block;
  margin: 2em auto;
  width: min(100%, 720px);
  height: auto;
  border-radius: 10px;
  background-color: var(--secondary-background-color);
}
</style>
