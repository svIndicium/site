<!-- eslint-disable vue/attribute-hyphenation -->
<!-- the add to calendar button doesn't work with kebab-case attributes -->
<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';
import 'add-to-calendar-button';
import { AGENDA_ICS_URL, AGENDA_TIME_ZONE } from '~/utils/agenda';

// Full-width fix for the button shadow DOM; re-apply after atcb_cleanup
// wipes styles (e.g. theme toggle). Isolated here so the list component
// stays free of third-party DOM hacks.
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
</script>

<template>
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
</template>
