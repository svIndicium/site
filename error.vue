<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';

const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');
let error = urlParams.get('error');

if (!code) {
  code = '406';
}

if (!error) {
  error = 'No idea what went wrong ';
}

const imageurl = 'https://httpcats.com/' + code + '.jpg';
</script>

<template>
  <ContentContainer>
    <div style="display: grid; justify-content: center">
      <img :src="imageurl" style="height: 400px; max-height: 50vw" />
    </div>
    <h1>{{ error }}</h1>
    <p>Als je denkt dat dit niet klopt. Ben je meer dan welkom om ons te helpen bij de DEVCOM!</p>
  </ContentContainer>
</template>

<style scoped lang="scss">
svg {
  width: 300px;
  height: 300px;
}

h1,
h2,
p {
  text-align: center;
}

.face {
  font-size: 150px;
}
</style>
