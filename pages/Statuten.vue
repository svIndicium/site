<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';
</script>

<template>
  <ContentContainer>
    <div class="center-container">
      <a class="button primary rounded indi-green-1" href="/pdf/Afschrift_Akte_Statutenwijziging_Indicium.pdf">Open in nieuw tablad</a>

      <iframe title="Statuten" src="/pdf/Afschrift_Akte_Statutenwijziging_Indicium.pdf" width="100%" height="800px" />
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

  .button {
    margin-top: 0.5rem;
  }
}

iframe {
  border: none;
  /* make sure the iframe is a4 sized */
  aspect-ratio: 210/297;
  width: 100%;
  max-width: 1000px;
  height: auto;
}
</style>
