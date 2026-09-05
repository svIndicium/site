<!-- eslint-disable vue/attribute-hyphenation -->
<!-- the add to calendar button does't work with kebab-case attributes -->
<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import AgendaCalendarButton from '~/components/AgendaCalendarButton.vue';
import {
  AGENDA_DEFAULT_LOCATION_ENTRIES,
  AGENDA_MAX_CONSECUTIVE_SAME,
  AGENDA_PAGE_SIZE,
  agendaEndYear,
  buildAgendaUrl,
  chunkEvents,
  dedupeConsecutiveEvents,
  formatAgendaDay,
  formatAgendaMonth,
  formatAgendaTime,
  getAgendaApiKey,
  resolveAgendaLocation,
  parseAgendaEvents,
  sanitizeAgendaMaxPages,
  sanitizeAgendaPageSize,
  totalAgendaPages,
  type AgendaEvent,
  type AgendaLocationEntry,
  type AgendaRawEvent,
} from '~/composables/useAgenda';

// Embed-settable (e.g. `:activity-calendar{:page-size="3"}`); calendar ID + API key stay constants.
// SSG: static prerender shows the ClientOnly skeleton; the fetch below runs
// client-side at hydration (`server: false`, `timeMin = now`) so served pages
// never freeze build-time data. `events` re-evaluates `Date.now()` per
// computation so already-ended events drop without a refetch.
const props = withDefaults(
  defineProps<{
    title?: string;
    pageSize?: number;
    maxPages?: number;
  }>(),
  { title: 'Agenda' },
);

const effectivePageSize = computed(() =>
  sanitizeAgendaPageSize(props.pageSize ?? AGENDA_PAGE_SIZE),
);
const maxPageCount = computed(() => sanitizeAgendaMaxPages(props.maxPages));


// Throw on HTTP errors so failures render the error state instead of "geen activiteiten".
// Client-only: SSG prerender keeps the skeleton, hydration fetches fresh with
// `timeMin = now` (build-time payload never reused). `status` gates the empty
// branch so the in-flight window shows loading, not "geen activiteiten".
const {
  data: calendarData,
  error: calendarError,
  status: calendarStatus,
} = await useAsyncData<{ items: AgendaRawEvent[] }>(
  'activity-calendar',
  async () => {
    const res = await fetch(buildAgendaUrl(new Date(), undefined, getAgendaApiKey()));
    if (!res.ok) throw new Error(`Agenda laden mislukt (${res.status})`);
    return res.json();
  },
  { server: false },
);

const events = computed<AgendaEvent[]>(() => {
  const items = Array.isArray(calendarData.value?.items) ? calendarData.value.items : [];
  // Fresh "now" per evaluation so served static pages drop already-ended events.
  return parseAgendaEvents(items, Date.now());
});

const dedupedEvents = computed<AgendaEvent[]>(() =>
  dedupeConsecutiveEvents(events.value, AGENDA_MAX_CONSECUTIVE_SAME),
);

// Labels + Maps links editable via content/agenda-locations.yml (`match` → `short` + `query`);
// compiled defaults cover tests/previews. Resolved once per row (see template).
const { data: locationMapping } = await useAsyncData('agenda-locations', () =>
  queryCollection('locations').first(),
);
const locationEntries = computed<AgendaLocationEntry[]>(() => {
  const fromContent = locationMapping.value?.locations;
  return Array.isArray(fromContent) && fromContent.length > 0
    ? fromContent.map((entry) => ({ match: entry.match, short: entry.short, query: entry.query }))
    : AGENDA_DEFAULT_LOCATION_ENTRIES;
});
// Memoized per location string (entries invalidate); template calls this twice
// per row (href + short), so uncached that would be 2 matches/row.
const locationCache = new Map<string, { short: string; href: string }>();
watch(locationEntries, () => locationCache.clear());
function resolveLocation(location: string): { short: string; href: string } {
  const cached = locationCache.get(location);
  if (cached) return cached;
  const resolved = resolveAgendaLocation(location, locationEntries.value);
  locationCache.set(location, resolved);
  return resolved;
}

const cappedEvents = computed<AgendaEvent[]>(() =>
  dedupedEvents.value.slice(0, effectivePageSize.value * maxPageCount.value),
);

const page = ref(1);
const totalPages = computed(() => totalAgendaPages(cappedEvents.value.length, effectivePageSize.value));
// Stacked pages share one grid cell; hidden pages stay measured so the container fits the tallest.
const pages = computed<AgendaEvent[][]>(() => chunkEvents(cappedEvents.value, effectivePageSize.value));
watch(totalPages, (total) => {
  if (page.value > total) page.value = total;
});

function nextPage(): void {
  page.value = Math.min(page.value + 1, totalPages.value);
}

function prevPage(): void {
  page.value = Math.max(page.value - 1, 1);
}

function endYear(event: AgendaEvent): string | null {
  return event.multiday_end ? agendaEndYear(event.start, event.multiday_end) : null;
}
</script>

<template>
  <h2 class="title">{{ props.title }}</h2>
  <ClientOnly>
    <div class="events-container">
      <article v-if="calendarError">
        <p>De agenda kon niet geladen worden. Probeer het later opnieuw.</p>
      </article>
      <div v-else-if="calendarStatus === 'pending'" aria-hidden="true">
        <div v-for="index in effectivePageSize" :key="index" class="event event--placeholder">
          <div class="date"></div>
          <div class="details">
            <p class="placeholder-line"></p>
            <p class="placeholder-line short"></p>
          </div>
        </div>
      </div>
      <article v-else-if="!cappedEvents.length">
        <p>Voorlopig zijn er geen activiteiten.</p>
        <p>Voeg de kalender toe aan je agenda om up-to-date te blijven!</p>
      </article>
      <div v-else class="events-pages">
        <div
          v-for="(pageEvents, index) in pages"
          :key="index"
          class="events-page"
          :class="{ 'events-page--active': page === index + 1 }"
          :aria-hidden="page === index + 1 ? undefined : 'true'"
          :inert="page === index + 1 ? undefined : true"
        >
          <div v-for="event in pageEvents" :key="event.id" class="event">
            <div class="date">
              <span class="day">{{ formatAgendaDay(event.start) }}</span>
              <template v-if="event.multiday_end && !event.multimonth_end">
                <span class="t-m">t/m<br /></span>
                <span class="day">{{ event.multiday_end ? formatAgendaDay(event.multiday_end) : '' }}<br /></span>
              </template>
              <span v-else class="date-spacer" aria-hidden="true" />
              <span class="month">{{ formatAgendaMonth(event.start) }}</span>
              <template v-if="event.multiday_end && event.multimonth_end">
                <span class="t-m">t/m<br /></span>
                <span class="day">{{ event.multiday_end ? formatAgendaDay(event.multiday_end) : '' }}</span>
                <br />
                <span class="month">{{ event.multiday_end ? formatAgendaMonth(event.multiday_end) : '' }}<template v-if="endYear(event)"> {{ endYear(event) }}</template></span>
              </template>
            </div>
            <div class="details">
              <p class="event-title">{{ event.summary }}</p>
              <p v-if="!event.isAllDay">{{ formatAgendaTime(event.start) }} => {{ formatAgendaTime(event.end) }}</p>
              <a
                v-if="event.location"
                class="location"
                :href="resolveLocation(event.location).href"
                target="_blank"
                rel="noopener"
              >
                @{{ resolveLocation(event.location).short }}
              </a>
            </div>
          </div>
        </div>
      </div>
      <nav v-if="totalPages > 1" class="pagination" aria-label="Agenda paginering">
        <button
          class="button primary rounded indi-green-1 pagination-button"
          :class="{ 'pagination-button--hidden': page <= 1 }"
          :disabled="page <= 1"
          aria-label="Vorige agenda-pagina"
          @click="prevPage"
        >
          ←
        </button>
        <span class="pagination-status" aria-live="polite"><span class="sr-only">Pagina {{ page }} van {{ totalPages }}: </span><span aria-hidden="true">{{ page }}/{{ totalPages }}</span></span>
        <button
          class="button primary rounded indi-green-1 pagination-button"
          :class="{ 'pagination-button--hidden': page >= totalPages }"
          :disabled="page >= totalPages"
          aria-label="Volgende agenda-pagina"
          @click="nextPage"
        >
          →
        </button>
      </nav>
    </div>
    <div class="button-container">
      <AgendaCalendarButton />
    </div>
    <template #fallback>
      <div class="events-container events-container--fallback" aria-hidden="true">
        <div v-for="index in effectivePageSize" :key="index" class="event event--placeholder">
          <div class="date"></div>
          <div class="details">
            <p class="placeholder-line"></p>
            <p class="placeholder-line short"></p>
          </div>
        </div>
        <div class="pagination pagination--placeholder" aria-hidden="true">
          <span class="button primary rounded pagination-button pagination-button--hidden">←</span>
          <span class="pagination-status">1/1</span>
          <span class="button primary rounded pagination-button pagination-button--hidden">→</span>
        </div>
        <span class="button button--placeholder">Laden...</span>
      </div>
      <div class="button-container" aria-hidden="true">
        <span class="button button--placeholder-2">Importeer agenda in je kalender</span>
      </div>
    </template>
  </ClientOnly>
</template>

<style scoped>
.event {
  display: grid;
  grid-template-columns: 63px 1fr;
  text-align: left;
  line-height: 1.7;

  .date {
    display: block;
    text-align: center;
    padding: 4px;
    background-color: var(--indi-green-2);
    border-radius: 5px;
    align-self: baseline;

    .day {
      font-size: 32px;
      line-height: 32px;
    }
    .month {
      font-size: 19px;
    }
    /* Replaces the old `<br v-else />`: a br only breaks the line, so the
    spacer takes no height — anything taller stretches the badge. */
    .date-spacer {
      display: block;
      height: 0;
    }

    .button {
      align-self: center;
    }
  }

  .details {
    margin-left: 16px;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-width: 0;
    & p {
      margin: 0;
    }

    .event-title {
      font-weight: bold;
      margin-block-end: 0.2em;
    }

    .location {
      font-style: italic;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.events-container {
  background-color: var(--secondary-background-color);
  border-radius: 4px;
  padding: 16px 14px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Stacked pages share one grid cell; hidden pages stay measured and size the container. */
.events-pages {
  display: grid;
}

.events-page {
  grid-area: 1 / 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  visibility: hidden;
}

.events-page--active {
  visibility: visible;
}

.events-container--fallback {
  .event--placeholder {
    min-height: 99.2px;

    .date {
      min-height: 75.5px;
    }

    .details {
      justify-content: center;

      .placeholder-line {
        margin: 0;
        height: 0.9rem;
        background-color: color-mix(in srgb, var(--text-color) 18%, transparent);
        border-radius: 6px;
        width: 85%;

        &.short {
          width: 55%;
          margin-top: 0.4rem;
        }
      }
    }
  }
}

.button-container {
  display: grid;
  place-items: center;
  text-align: center;
  padding-top: 1em;
  }

.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  /* Pin to the container bottom so the arrows never ride up on short pages. */
  margin-top: auto;

  .pagination-button {
    min-width: 2.75rem;
  }

  /* Fully hidden but space-preserving, so the status never shifts. */
  .pagination-button--hidden {
    visibility: hidden;
  }
}

.button--placeholder {
  opacity: 0.8;
  pointer-events: none;
  background-color: color-mix(in srgb, var(--indi-green-1) 35%, transparent);
  border-radius: 0.5rem;
}

.button--placeholder-2 {
  display: block;
  width: 100%;
  max-width: 100%;
  min-height: 3.25rem;
  padding: 0.9rem 1.25rem;
  border-radius: 0.5rem;
  color: color-mix(in srgb, var(--text-color) 70%, transparent);
  border: 1px solid color-mix(in srgb, var(--indi-green-1) 35%, transparent);
  opacity: 0.8;
  line-height: 1.5;
  pointer-events: none;
}

h2.title {
  margin: 1rem 0;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
