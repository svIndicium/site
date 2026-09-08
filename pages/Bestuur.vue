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
    <!-- .members is the container: the card grid re-flows to its available
         width (auto-fit / @container), not the viewport. -->
    <div class="members">
      <div v-for="member in currentBoard?.members || []" :key="member.email" class="member">
        <img
          class="member-photo hover-scale"
          :src="member.photo ? `/assets/boards/${member.photo}` : '/assets/misc/placeholder-person.svg'"
          :alt="member.name"
          :title="member.figcaption || undefined"
          width="400"
          height="400"
          loading="lazy"
          decoding="async"
        />
        <div class="member-info">
          <h3>{{ member.name }}</h3>
          <h4>{{ member.function }}</h4>
          <address>
            <a :href="`mailto:${member.email}`">{{ member.email }}</a>
          </address>
          <template v-if="member.responsibilities">
            <h5>Verantwoordelijkheden:</h5>
            <p>{{ member.responsibilities.join(', ') }}</p>
          </template>
        </div>
      </div>
    </div>
  </ContentContainer>
</template>

<style scoped>
h1 {
  text-align: center;
}

/* Card grid. auto-fit wraps to 2–3 columns based on the available width. */
.members {
  container-type: inline-size;
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

/* Clean card: the image runs flush to the card's top (no padding), the rounded
   corners clip the image top, and the straight bottom edge meets the text. */
.member {
  display: flex;
  flex-direction: column;
  background: rgba(var(--secondary-background-color-raw), 0.4);
  border-radius: 12px;
  overflow: hidden;
  box-sizing: border-box;
}

.member-photo {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  display: block;
  background-color: var(--secondary-background-color);
}

.member-info {
  padding: 1rem 1.25rem 1.25rem;

  & h3 {
    position: relative;
    margin: 0 0 0.3rem;
    padding-bottom: 0.4rem;
    font-size: 1.35rem;

    /* small accent underline, like the homepage headings */
    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 3.25rem;
      height: 3px;
      border-radius: 2px;
      background: var(--indi-blue-1);
    }
  }

  & h4 {
    margin: 0 0 0.4rem;
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--indi-blue-1);
    filter: brightness(0.72);
  }

  /* email is secondary — keep it quiet, not a loud link */
  & address {
    font-style: normal;
    margin: 0 0 0.4rem;
    font-size: 0.9rem;

    & a {
      color: var(--text-color);
      opacity: 0.6;
      text-decoration: underline;
      text-decoration-color: rgba(var(--text-color-raw), 0.35);
      text-underline-offset: 2px;
      transition: opacity 0.2s;

      &:hover {
        opacity: 1;
      }
    }
  }

  & h5 {
    font-size: 1em;
    margin: 0.6rem 0 0.1rem;
    opacity: 0.75;
  }

  & p {
    margin-top: 0;
    font-size: 0.95em;
    line-height: 1.5;
  }
}

html[data-theme='dark'] .member-info h4 {
  filter: brightness(1.15);
}

/* Container query (top-level — nested @container is dropped in Vue dev): on
   true mobile the grid is a single centered column. */
@container (max-width: 560px) {
  .member {
    text-align: center;
    max-width: 360px;
    margin: 0 auto;
  }

  .member-info h3::after {
    left: 50%;
    transform: translateX(-50%);
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
