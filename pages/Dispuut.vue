<script setup lang="ts">
const { data: disputen } = await useAsyncData('dispuut', () => queryCollection('dispuut').all());
</script>

<template>
  <ContentContainer>
    <h1>Disputen</h1>
    <ContentCard v-for="dispuut in disputen || []" :key="dispuut._path" class="dispuut-card">
      <template #image>
        <img class="hover-scale" :alt="`Logo ${dispuut.title}`" :src="dispuut.imgUrl" />
      </template>
      <h2>{{ dispuut.title }}</h2>
      <ContentRenderer :value="dispuut" />
      <a
        v-if="dispuut.website"
        :href="dispuut.website"
        target="_blank"
        rel="noopener noreferrer"
        class="button primary rounded"
      >
        Website
      </a>
      <a
        v-if="dispuut.instagram"
        :href="dispuut.instagram"
        target="_blank"
        rel="noopener noreferrer"
        class="button primary indi-green-1 rounded instagram-btn"
      >
        Instagram
      </a>
    </ContentCard>
  </ContentContainer>
</template>

<style scoped>
.dispuut-card {
  border-bottom: 3px solid var(--indi-blue-1);
  padding: 2em 0;
  max-width: 1100px;

  &:last-child {
    border: none;
  }
}

/* :deep() must be top-level (not nested) so it compiles to
   .dispuut-card[data-v-…] img — nested puts the scope attr on a separate
   element that doesn't exist between the card and the slot img. */
.dispuut-card :deep(img) {
  min-width: 320px;
  height: 100%;
  width: auto;
  background-image: linear-gradient(to bottom right, var(--indi-blue-1), var(--indi-blue-2));
}

.instagram-btn {
  margin-left: 1em;
}
</style>
