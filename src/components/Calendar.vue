<script setup lang="ts">
import { ref } from 'vue';

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

const events: Event<Date>[] = calendarData.items
  .filter((event) => event.status === 'confirmed')
  .map((event) => {
    let tempEvent: Event<string | Date>;
    if ('date' in event.start) {
      tempEvent = {
        ...event,
        start: new Date(event.start.date),
      };
    } else {
      tempEvent = {
        ...event,
        start: new Date(event.start.dateTime),
      };
    }
    if ('date' in event.end) {
      tempEvent = {
        ...event,
        start: new Date(event.end.date),
      };
    } else {
      tempEvent = {
        ...event,
        start: new Date(event.end.dateTime),
      };
    }
    return tempEvent;
  });
</script>

<template>
  <div class="event" v-for="event in events.slice(0, maxCalEvents)" :key="event.id">
    <div class="date">
      <span class="day">{{ event.start.toLocaleDateString('nl', { day: 'numeric' }) }}</span>
      <br />
      <span class="month">{{ event.start.toLocaleDateString('nl', { month: 'short' }) }}</span>
    </div>
    <div class="details">
      <p class="title">{{ event.summary }}</p>
      <a
        v-if="event.location && event.location.toLowerCase().replaceAll(' ', '').includes('hideout')"
        class="location"
        href="https://goo.gl/maps/jgiRSbRDpSzCqoiWA"
        target="_blank"
        >@{{ event.location }}</a
      >
      <a
        v-else-if="event.location && event.location.toLowerCase().replaceAll(' ', '').includes('hl15')"
        class="location"
        href="https://goo.gl/maps/fjbPzpTAYB6CMwSv5"
        target="_blank"
        >@{{ event.location }}</a
      >
      <a
        v-else-if="event.location && event.location.toLowerCase().replaceAll(' ', '').includes('pl101')"
        class="location"
        href="https://goo.gl/maps/UtboneV2dUFEmGeRA"
        target="_blank"
        >@{{ event.location }}</a
      >
      <a
        v-else-if="event.location && event.location.toLowerCase().replaceAll(' ', '').includes('pl99')"
        class="location"
        href="https://goo.gl/maps/q4CDYQcyiBYCwGkC7"
        target="_blank"
        >@{{ event.location }}</a
      >
      <a
        v-else-if="event.location && event.location.toLowerCase().replaceAll(' ', '').includes('ucs')"
        class="location"
        href="https://goo.gl/maps/MeUEBY4ahNgi6WmW8"
        target="_blank"
        >@{{ event.location }}</a
      >
      <a
        v-else-if="event.location"
        class="location"
        :href="'https://maps.google.com/?q=' + event.location"
        target="_blank"
        >@{{ event.location }}</a
      >
    </div>
  </div>
  <a v-if="maxCalEvents == 7 && events.length > 7" @click="maxCalEvents = 100">laat meer zien</a>
</template>

<style lang="scss">
.event {
  display: flex;
  height: 55px;
  text-align: left;
  margin: 1em 0;

  .date {
    display: inline-block;
    text-align: center;
    height: 55px;
    width: 55px;
    padding: 4px;
    margin-right: 1em;
    background-color: var(--indi-green-1);
    border-radius: 5px;

    .day {
      font-size: 32px;
      line-height: 32px;
    }
    .month {
      font-size: 19px;
    }
  }

  .details {
    height: 55px;
    width: calc(100% - 79px);
    display: flex;
    flex-direction: column;

    p {
      margin: 0;
    }

    .location {
      font-style: italic;
    }
  }
}
</style>
