<script setup lang="ts">
import DataNotFound from '@/assets/icons/data-not-found.svg?component';

// Query all boards newest-first (boardNumber is the chronological order).
// The current board is derived — the highest boardNumber — so editors never
// maintain an isCurrent flag.
const { data: allBoards } = await useAsyncData('allBoards', () =>
  queryCollection('boards').order('boardNumber', 'DESC').all(),
);

const currentBoardNumber = computed(() =>
  Math.max(0, ...(allBoards.value?.map((b) => b.boardNumber) ?? [])),
);
</script>

<template>
  <ContentContainer>
    <h1>Indicium Besturen</h1>

    <div class="timeline">
      <div
        v-for="(board, index) in allBoards"
        :key="board.year"
        class="timeline-entry"
        :class="{ reverse: index % 2 === 1 }"
      >
        <div class="timeline-marker">
          <div class="timeline-dot" />
        </div>
        <div class="timeline-image">
          <img
            v-if="board.groupPhoto"
            :src="'/assets/boards/' + board.groupPhoto"
            :alt="board.boardNumber === currentBoardNumber ? 'Huidig Bestuur' : 'Groepsfoto'"
          />
          <DataNotFound v-else class="placeholder" />
        </div>
        <div class="timeline-content">
          <span v-if="board.boardNumber === currentBoardNumber" class="badge">Huidig Bestuur</span>
          <h2 class="board-year">{{ board.year }}</h2>
          <ContentRenderer v-if="board.body" :value="board" />
          <ul class="members">
            <li v-for="member in board.members" :key="member.name">
              <strong>{{ member.name }}</strong>
              <span class="function">{{ member.function }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </ContentContainer>
</template>

<style scoped>
/* ── Timeline container with central vertical line ── */
.timeline {
  position: relative;
  max-width: 1100px;
  margin: 2rem auto 0;
  padding-bottom: 2rem;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 1em;
    bottom: 0;
    width: 3px;
    background: var(--indi-blue-2);
    transform: translateX(-50%);
    border-radius: 99px;
  }
}

/* ── Each board entry: 3-column grid ── */
.timeline-entry {
  display: grid;
  grid-template-columns: 1fr 48px 1fr;
  gap: 0 2rem;
  padding-bottom: 3rem;
  position: relative;

  /* Current board highlight */
  &.current {
    .timeline-content {
      background: var(--secondary-background-color);
      padding: 1.5rem;
      border-radius: 10px;
    }

    .timeline-dot {
      width: 20px;
      height: 20px;
      background: var(--indi-blue-1);
      box-shadow: 0 0 0 4px rgba(var(--indi-blue-1-raw), 0.3);
    }
  }

  /* Reversed: image right, content left */
  &.reverse {
    .timeline-image {
      grid-column: 3;
      grid-row: 1;
    }

    .timeline-content {
      grid-column: 1;
      grid-row: 1;
      text-align: right;

      .members {
        align-items: flex-end;
      }
    }
  }
}

/* ── Center column: dot on the timeline line ── */
.timeline-marker {
  grid-column: 2;
  grid-row: 1;
  display: flex;
  justify-content: center;
  padding-top: 1rem;
}

.timeline-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--indi-blue-1);
  border: 3px solid var(--root-background-color);
  z-index: 1;
  flex-shrink: 0;
}

/* ── Image column ── */
.timeline-image {
  grid-column: 1;
  grid-row: 1;

  & img,
  & .placeholder {
    width: 100%;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    border-radius: 10px;
    background: var(--secondary-background-color);
    display: block;
    transition: transform 0.3s ease;
  }

  & img:hover {
    transform: scale(1.03);
  }
}

/* ── Content column ── */
.timeline-content {
  grid-column: 3;
  grid-row: 1;
  padding-top: 0.25rem;
}

.badge {
  display: inline-block;
  background: var(--indi-blue-1);
  color: #fff;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.board-year {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
}

.members {
  list-style: none;
  padding: 0;
  margin: 0.75rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  & li {
    display: flex;
    flex-direction: column;
  }

  .function {
    color: #b3b3b3;
    font-size: 0.9rem;
  }
}

/* ── Mobile: single column, timeline on the left ── */
@media screen and (max-width: 944px) {
  .timeline {
    &::before {
      left: 15px;
    }
  }

  .timeline-entry {
    grid-template-columns: 40px 1fr;
    grid-template-rows: auto auto;
    gap: 0 1rem;

    /* Reset reversed entries to normal stack on mobile */
    &.reverse {
      .timeline-image {
        grid-column: 2;
        grid-row: 1;
      }

      .timeline-content {
        grid-column: 2;
        grid-row: 2;
        text-align: left;

        .members {
          align-items: flex-start;
        }
      }
    }
  }

  .timeline-marker {
    grid-column: 1;
    grid-row: 1 / -1;
  }

  .timeline-image {
    grid-column: 2;
    grid-row: 1;
  }

  .timeline-content {
    grid-column: 2;
    grid-row: 2;
    padding-top: 1rem;
  }
}
</style>
