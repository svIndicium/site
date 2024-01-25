<script setup lang="ts">
const conscriboForm = document.createElement("script");

conscriboForm.setAttribute(
  "src",
  "https://leden.conscribo.nl/svindicium/jsForm/load/aanmeldenlidmaatschap_kopie/cwfForm",
);
conscriboForm.async = true;

document.head.appendChild(conscriboForm);

// TODO: client-side checks

</script>

<template>
  <div id="cwfForm">Formulier wordt geladen ...</div>

</template>

<style scoped lang="scss">
// TODO: Dit is matig. Moeten we zelf mooi maken.
@import "https://leden.conscribo.nl/common_resources/css/WebForm.css";

</style>
