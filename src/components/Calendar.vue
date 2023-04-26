<script setup lang="ts">
/**
 * There's a bunch more data, but we don't need it
 * Documentation can be found at https://developers.google.com/calendar/api/v3/reference/events/list
 */
type Event<DateTimeFormat extends Date | string> = {
  id: string,
  status: 'confirmed' | string,
  summary: string,
  location: string,
  start: DateTimeFormat extends Date ? Date : {
    dateTime: string,
  } | {
    date: string,
  }
  end: DateTimeFormat extends Date ? Date : {
    dateTime: string,
  } | {
    date: string,
  },
};

const calendarData: { items: Event<string>[] } = await fetch('https://www.googleapis.com/calendar/v3/calendars/c_cb2b2ab9761bec69a9d24fd452f2d970d31755cf1c382272560d81fddca0e5e5@group.calendar.google.com/events?key=AIzaSyBo4AYTvUouRsZbG4KiopyeIng_1UOdNyc&orderBy=startTime&singleEvents=true&timeMin=' + new Date().toISOString()).then(res => res.json());

const events: Event<Date>[] = calendarData.items
  .filter(event => event.status === 'confirmed')
  .map(event => {
    let tempEvent: Event<string | Date>;
    if ('date' in event.start) {
      tempEvent = {
        ...event,
        start: new Date(event.start.date),
      };
    } else {
      tempEvent = {
        ...event,
        start: new Date(event.start.dateTime)}
    }
    if ('date' in event.end) {
      tempEvent = {
        ...event,
        start: new Date(event.end.date),
      };
    } else {
      tempEvent = {
        ...event,
        start: new Date(event.end.dateTime)}
    }
    return tempEvent;
  });
</script>

<template>
  <div class="event" v-for="event in events" :key="event.id">
    <div class="date">
      <span class="day">{{ event.start.toLocaleDateString('nl', { day: 'numeric' }) }}</span>
      <br>
      <span class="month">{{ event.start.toLocaleDateString('nl', { month: 'short' }) }}</span>
    </div>
    <div class="details">
      <div class="title">{{ event.summary }}</div>
      <div class="location">{{ event.location }}</div>
    </div>
  </div>
</template>

<style lang="scss">
.event {
  height: 55px;
  text-align: left;
  margin: 1em 0;
  width: calc(100%/3);

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
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
