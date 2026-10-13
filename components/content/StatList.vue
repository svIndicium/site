<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /** One card per entry. */
    items?: Array<{ number: string; label: string }>;
  }>(),
  { items: () => [] },
);
</script>

<template>
  <div class="stats-row">
    <div v-for="item in props.items" :key="item.label" class="stat-card">
      <span class="stat-card__number">{{ item.number }}</span>
      <span class="stat-card__label">{{ item.label }}</span>
    </div>
  </div>
</template>

<style scoped>
.stats-row {
  max-width: 860px;
  margin: 1.25rem auto 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  text-align: center;
  border-radius: 10px;
  padding: 1rem 0.75rem;
  background: var(--secondary-background-color);
  border: 1px solid rgba(var(--indi-blue-1-raw), 0.25);
}

.stat-card__number {
  font-family: var(--indicium-font);
  font-size: 1.9rem;
  line-height: 1;
  color: var(--indi-blue-1);
}

.stat-card__label {
  font-size: 0.95rem;
  color: rgba(var(--text-color-raw), 0.82);
}

@media (max-width: 944px) {
  .stats-row {
    grid-template-columns: 1fr;
  }
}
</style>
