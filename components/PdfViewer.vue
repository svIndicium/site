<script setup lang="ts">
defineProps<{
  src: string;
  title?: string;
  buttonLabel?: string;
}>();
</script>

<template>
  <ContentContainer>
    <div class="center-container">
      <a class="button primary rounded indi-green-1" :href="src">{{ buttonLabel || 'Open in nieuw tablad' }}</a>
      <iframe :title="title || 'PDF'" :src="src" width="100%" height="800px" />
    </div>
  </ContentContainer>
</template>

<style scoped>
.center-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.center-container .button {
  margin-top: 0.5rem;
}

iframe {
  border: none;
  aspect-ratio: 210 / 297;
  width: 100%;
  max-width: 1000px;
  height: auto;
}
</style>
