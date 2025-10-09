<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';

const route = useRoute();
const code = (route.query.code as string) || '406';
const error = (route.query.error as string) || 'Geen idee wat er mis ging ';

const imageurl = 'https://httpcats.com/' + code + '.jpg';
</script>

<template>
  <ContentContainer>
    <div style="display: grid; justify-content: center">
      <img :src="imageurl" :alt="`HTTP Error ${code}`" style="height: 400px; max-height: 50vw" />
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
