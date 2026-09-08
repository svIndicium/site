<script setup lang="ts">
const { data: commissies } = await useAsyncData('commissies', () =>
  queryCollection('commissies').order('order', 'ASC').all(),
);
</script>

<template>
  <ContentContainer>
    <h1>Commissies</h1>
    <p id="intro">
      Wil jij naast je studie actief bijdragen aan onze studievereniging? Meld je dan aan voor een van onze commissies.
      Naast dat dit super leuk is, staat dit ook goed op je CV!
    </p>
    <ContentCard v-for="commissie in commissies || []" :key="commissie._path">
      <template #image>
        <img class="hover-scale" :src="commissie.imgUrl" :alt="commissie.title" />
      </template>
      <h3>{{ commissie.title }}</h3>
      <ContentRenderer :value="commissie" />
    </ContentCard>
  </ContentContainer>
</template>

<style scoped>
#intro {
  max-width: 600px;
  margin: 0 auto;
}
</style>
