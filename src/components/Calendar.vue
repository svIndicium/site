<script setup lang="ts">
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { stateStore } from '@/stores/state';
import 'add-to-calendar-button';
const state = stateStore();
const { darkModeActive } = storeToRefs(state);
const maxCalEvents = ref(7);
/**
 * There's a bunch more data, but we don't need it
 * Documentation can be found at https://developers.google.com/calendar/api/v3/reference/events/list
 */
type Event<DateTimeFormat extends Date | string> = {
  id: string;
  status: 'confirmed' | string;
  summary: string;
  location: string;
  start: DateTimeFormat extends Date
    ? Date
    :
        | {
            dateTime: string;
          }
        | {
            date: string;
          };
  end: DateTimeFormat extends Date
    ? Date
    :
        | {
            dateTime: string;
          }
        | {
            date: string;
          };
};

const calendarData: { items: Event<string>[] } = await fetch(
  'https://www.googleapis.com/calendar/v3/calendars/c_cb2b2ab9761bec69a9d24fd452f2d970d31755cf1c382272560d81fddca0e5e5@group.calendar.google.com/events?key=AIzaSyBo4AYTvUouRsZbG4KiopyeIng_1UOdNyc&orderBy=startTime&singleEvents=true&timeMin=' +
    new Date().toISOString(),
).then((res) => res.json());

//This function is wrong
const events: Event<Date>[] = Array.from(calendarData.items)
  .filter((event) => event.status === 'confirmed')
  .map((event) => {
    let tempEvent: Event<string | Date> = event;
    if ('date' in event.start) {
      tempEvent = {
        ...tempEvent,
        start: new Date(event.start.date),
      };
    } else {
      tempEvent = {
        ...tempEvent,
        start: new Date(event.start.dateTime),
      };
    }
    if ('date' in event.end) {
      tempEvent = {
        ...tempEvent,
        end: new Date(event.end.date),
      };
    } else {
      tempEvent = {
        ...tempEvent,
        end: new Date(event.end.dateTime),
      };
    }
    return tempEvent;
  });
// console.log(events);


const visibleEvents = computed<Event<Date>[]>(() => {
  return Array.from(events.values()).slice(0, maxCalEvents.value);
});

const shouldShowMoreLink = computed<boolean>(() => {
  return maxCalEvents.value === 7 && Array.from(events.values()).length > 7;
});

function getLocationLink(location: string): string {
  const locationMappings: { [key: string]: string } = {
    hideout: 'https://goo.gl/maps/jgiRSbRDpSzCqoiWA',
    hl15: 'https://goo.gl/maps/fjbPzpTAYB6CMwSv5',
    pl101: 'https://goo.gl/maps/UtboneV2dUFEmGeRA',
    pl99: 'https://goo.gl/maps/q4CDYQcyiBYCwGkC7',
    ucs: 'https://goo.gl/maps/MeUEBY4ahNgi6WmW8',
  };

  const lowercaseLocation = location.toLowerCase().replaceAll(' ', '');
  if (lowercaseLocation in locationMappings) {
    return locationMappings[lowercaseLocation];
  } else {
    return `https://maps.google.com/?q=${encodeURIComponent(location)}`;
  }
}

function showMoreEvents(): void {
  maxCalEvents.value = maxCalEvents.value + 7;
}

function extractHourAndMinutes(timeString: string) {
  const regex = /(\d{2}:\d{2}):\d{2}/;
  const match = timeString.match(regex);
  return match ? match[1] : null;
}
</script>

<template>
  <div class="events-container">
    <div class="event" v-for="event in visibleEvents" :key="event.id">
      <div class="date">
        <span class="day">{{ event.start.toLocaleDateString('nl', { day: 'numeric' }) }}</span>
        <br />
        <span class="month">{{ event.start.toLocaleDateString('nl', { month: 'short' }) }}</span>
      </div>
      <div class="details">
        <p class="title">{{ event.summary }}</p>
        <a v-if="event.location" class="location" :href="getLocationLink(event.location)" target="_blank">
          @{{ event.location }}
        </a>
      </div>
    </div>
    <a class="button" v-if="events.length > 7" @click="showMoreEvents">laat meer zien</a>
    <!-- note: startdate and times HAVE TO BE INCLUDED -->
    <add-to-calendar-button
      name="Indicium"
      startDate="2023-1-1"
      startTime="00:00"
      endTime="00:00"
      timeZone="Europe/Amsterdam"
      icsFile="https://calendar.google.com/calendar/ical/c_cb2b2ab9761bec69a9d24fd452f2d970d31755cf1c382272560d81fddca0e5e5%40group.calendar.google.com/public/basic.ics"
      subscribe
      iCalFileName="Indicium Activiteiten Calender"
      options="'Apple','Google','iCal','Outlook.com','Microsoft365','MicrosoftTeams'"
      listStyle="modal"
      label="Voeg toe aan agenda"
      :lightMode="darkModeActive ? 'dark' : 'light'"
      language="nl"
    ></add-to-calendar-button>
  </div>
</template>

<style scoped lang="scss">
.event {
  display: grid;
  grid-template-columns: 63px 1fr;
  text-align: left;

  .date {
    display: block;
    text-align: center;
    padding: 4px;
    background-color: var(--indi-green-2);
    border-radius: 5px;
    max-height: 60px;

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

    p {
      margin: 0;
    }

    .location {
      font-style: italic;
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

.button-container {
  text-align: center;
  padding-top: 1em;
}

.button {
  display: inline-block;
  color: var(--text-color);
  background-color: var(--indi-green-2);
  padding: 0.5em 0.8em;
  border-radius: 8px;
  text-decoration: none;
}
</style>
