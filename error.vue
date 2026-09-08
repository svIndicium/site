<script setup lang="ts">
const props = defineProps<{
  error: { statusCode?: number; message?: string };
}>();

const code = props.error?.statusCode ?? 500;
const message = props.error?.message || 'Er ging iets mis';

const handleBack = () => clearError({ redirect: '/' });
</script>

<template>
  <ContentContainer>
    <ErrorDisplay>
      <h1>{{ code }}</h1>
      <p>{{ message }}</p>
      <button @click="handleBack">Terug naar home</button>
    </ErrorDisplay>
  </ContentContainer>
</template>
