<!-- eslint-disable vue/attribute-hyphenation -->
<!-- the add to calendar button does't work with kebab-case attributes -->
<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import 'add-to-calendar-button';
import {
  AGENDA_DEFAULT_LOCATION_ENTRIES,
  AGENDA_ICS_URL,
  AGENDA_MAX_CONSECUTIVE_SAME,
  AGENDA_PAGE_SIZE,
  AGENDA_TIME_ZONE,
  agendaEndYear,
  buildAgendaUrl,
  chunkEvents,
  dedupeConsecutiveEvents,
  formatAgendaDay,
  formatAgendaMonth,
  formatAgendaTime,
  getAgendaLocationLink,
  matchAgendaShortName,
  parseAgendaEvents,
  sanitizeAgendaPageSize,
  totalAgendaPages,
  type AgendaEvent,
  type AgendaLocationEntry,
  type AgendaRawEvent,
} from '~/composables/useAgenda';

// Embed-settable (e.g. `:activity-calendar{:page-size="3"}`); calendar ID + API key stay constants.
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
const maxPageCount = computed(() =>
  props.maxPages == null ? Number.POSITIVE_INFINITY : Math.max(1, Math.floor(props.maxPages)),
);

// Full-width fix for the button shadow DOM; re-apply after atcb_cleanup wipes styles (e.g. theme toggle).
const calendarButton = ref<HTMLElement | null>(null);
const colorMode = useColorMode();
async function injectCalendarButtonWidth(): Promise<void> {
  if (!import.meta.client) return;
  await nextTick();
  const shadowRoot = calendarButton.value?.shadowRoot;
  if (shadowRoot && !shadowRoot.getElementById('activity-calendar-button-width-style')) {
    const style = document.createElement('style');
    style.id = 'activity-calendar-button-width-style';
    style.textContent = `
      :host {
        display: block;
        width: 100%;
      }

      .atcb-initialized {
        display: block;
        position: relative;
        width: 100% !important;
      }

      .atcb-button-wrapper {
        display: block;
        width: 100%;
      }

      .atcb-button {
        width: -moz-available;
        width: -webkit-fill-available;
        width: stretch;
        max-width: none;
        box-sizing: border-box;
      }
    `;
    shadowRoot.prepend(style);
  }
}
onMounted(() => {
  void injectCalendarButtonWidth();
});
watch(
  () => colorMode.value,
  () => {
    void injectCalendarButtonWidth();
  },
);

// Throw on HTTP errors so failures render the error state instead of "geen activiteiten".
const {
  data: calendarData,
  error: calendarError,
} = await useAsyncData<{ items: AgendaRawEvent[] }>('activity-calendar', async () => {
  const res = await fetch(buildAgendaUrl(new Date()));
  if (!res.ok) throw new Error(`Agenda laden mislukt (${res.status})`);
  return res.json();
});

const events = computed<AgendaEvent[]>(() => {
  const items = Array.isArray(calendarData.value?.items) ? calendarData.value.items : [];
  // Fresh "now" per evaluation so served static pages drop already-ended events.
  return parseAgendaEvents(items, Date.now());
});

const dedupedEvents = computed<AgendaEvent[]>(() =>
  dedupeConsecutiveEvents(events.value, AGENDA_MAX_CONSECUTIVE_SAME),
);

// Shortnames editable via content/agenda-locations.yml; defaults cover tests/previews.
const { data: locationMapping } = await useAsyncData('agenda-locations', () =>
  queryCollection('locations').first(),
);
const locationEntries = computed<AgendaLocationEntry[]>(() => {
  const fromContent = locationMapping.value?.locations;
  return Array.isArray(fromContent) && fromContent.length > 0
    ? fromContent.map((entry) => ({ match: entry.match, short: entry.short }))
    : AGENDA_DEFAULT_LOCATION_ENTRIES;
});
function locationLabel(location: string): string {
  return matchAgendaShortName(location, locationEntries.value);
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
                <span class="day">{{ formatAgendaDay(event.multiday_end!) }}<br /></span>
              </template>
              <br v-else />
              <span class="month">{{ formatAgendaMonth(event.start) }}</span>
              <template v-if="event.multiday_end && event.multimonth_end">
                <span class="t-m">t/m<br /></span>
                <span class="day">{{ formatAgendaDay(event.multiday_end!) }}</span>
                <br />
                <span class="month">{{ formatAgendaMonth(event.multiday_end!) }}<template v-if="endYear(event)"> {{ endYear(event) }}</template></span>
              </template>
            </div>
            <div class="details">
              <p class="title" style="font-weight: bold; margin-block-end: 0.2em">{{ event.summary }}</p>
              <p v-if="!event.isAllDay">{{ formatAgendaTime(event.start) }} => {{ formatAgendaTime(event.end) }}</p>
              <a
                v-if="event.location"
                class="location"
                :href="getAgendaLocationLink(event.location)"
                target="_blank"
                rel="noopener"
              >
                @{{ locationLabel(event.location) }}
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
      <add-to-calendar-button
        ref="calendarButton"
        name="Indicium"
        :startDate="new Date(Date.now() - 86400000).toISOString().split('T')[0]"
        startTime="00:00"
        endTime="00:00"
        :timeZone="AGENDA_TIME_ZONE"
        :icsFile="AGENDA_ICS_URL"
        subscribe
        iCalFileName="Indicium Activiteiten Kalender"
        options="'Apple','Google','iCal','Outlook.com','Microsoft365','MicrosoftTeams'"
        listStyle="modal"
        label="Importeer agenda"
        :lightMode="colorMode.value == 'dark' ? 'dark' : 'light'"
        language="nl"
        style="width: 100%; margin-block-end: 0.5em; --btn-shadow: unset; --btn-shadow-hover: unset"
        hideBranding
      ></add-to-calendar-button>
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
