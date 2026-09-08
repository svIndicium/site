<script setup lang="ts">
import Calendar from '~/components/ActivityCalendar.vue';
import { AGENDA_EMBED_URL } from '~/utils/agenda';
</script>

<template>
  <ContentContainer>
    <h1>Agenda</h1>
    <Calendar title="Aankomende activiteiten" />
    <iframe title="Activiteiten agenda" :src="AGENDA_EMBED_URL" height="600" loading="lazy"></iframe>
  </ContentContainer>
</template>

<style scoped>
iframe {
  border: 0;
  width: 100%;
  width: -webkit-fill-available;
}
</style>
