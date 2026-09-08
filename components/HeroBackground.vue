<script setup lang="ts">
import HeroCircuit from '@/assets/icons/hero.svg?component';

// MDX-editable via ::hero-section (e.g. `::hero-section{:hero-background-color="black"}`);
// unset props fall back to the themed colors below.
const props = withDefaults(
  defineProps<{
    /** Resting backdrop. */
    backgroundColor?: string;
    /** Resting trace color (static traces, reduced motion). */
    traceColor?: string;
    /** Pulse color for modules 1 and 4. */
    primaryColor?: string;
    /** Pulse color for module 3. */
    secondaryColor?: string;
    /** Pulse color for modules 2 and 5. */
    tertiaryColor?: string;
    /** Dash flow on/off; off renders the resting pattern. */
    animated?: boolean;
    /** Seconds per dash-flow loop; higher is slower. */
    flowDurationSeconds?: number;
  }>(),
  {
    backgroundColor: 'var(--hero-bg-color)',
    traceColor: 'var(--pcb-trace-color)',
    primaryColor: 'var(--indi-blue-1)',
    secondaryColor: 'var(--indi-green-1)',
    tertiaryColor: 'var(--indi-blue-green-1)',
    animated: true,
    flowDurationSeconds: 12,
  },
);

const flowDuration = computed(() => {
  const seconds = Number.isFinite(props.flowDurationSeconds) ? props.flowDurationSeconds : 12;
  return `${Math.min(120, Math.max(1, seconds))}s`;
});
</script>

<template>
  <div class="background-view">
    <HeroCircuit class="HeroCircuit" :class="{ 'HeroCircuit--static': !props.animated }" />
  </div>
</template>

<style scoped>
/* Inner SVG nodes come from the child component, so :deep() is required. */
.HeroCircuit {
  scale: 4;
  position: absolute;
  width: 100%;
  height: 100%;
}

.HeroCircuit :deep(path),
.HeroCircuit :deep(rect),
.HeroCircuit :deep(circle),
.HeroCircuit :deep(polyline) {
  stroke: var(--pulse, v-bind('props.traceColor'));
}

/* Modules are the top-level g siblings carrying stroke-dasharray (defs is
not a g, so nth-of-type 1-5 are the five pulse groups). Varied triplet
assignment so consecutive pulses read as alternating, not uniform. */
.HeroCircuit :deep(g[stroke-dasharray]:nth-of-type(1)) {
  --pulse: v-bind('props.primaryColor');
}

.HeroCircuit :deep(g[stroke-dasharray]:nth-of-type(2)) {
  --pulse: v-bind('props.tertiaryColor');
}

.HeroCircuit :deep(g[stroke-dasharray]:nth-of-type(3)) {
  --pulse: v-bind('props.secondaryColor');
}

.HeroCircuit :deep(g[stroke-dasharray]:nth-of-type(4)) {
  --pulse: v-bind('props.primaryColor');
}

.HeroCircuit :deep(g[stroke-dasharray]:nth-of-type(5)) {
  --pulse: v-bind('props.tertiaryColor');
}

.HeroCircuit :deep(g[stroke-dasharray]) {
  animation-name: hero-trace-flow;
  animation-duration: v-bind(flowDuration);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.background-view {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: v-bind('props.backgroundColor');
}
/* Static rendering always parks on a period-aligned offset. */
.HeroCircuit--static :deep(g[stroke-dasharray]) {
  animation: none;
  stroke-dashoffset: 0;
}

@media (prefers-reduced-motion: reduce) {
  .HeroCircuit :deep(g[stroke-dasharray]) {
    animation: none;
    stroke-dashoffset: 0;
  }
}

.background-view .HeroCircuit {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

/* Dash period is the dasharray sum in hero.svg (8+960+24+960+16+400=2368).
Spanning exactly 3 periods keeps the loop restart seamless. */
@keyframes hero-trace-flow {
  from {
    stroke-dashoffset: 7104;
  }
  to {
    stroke-dashoffset: 0;
  }
}

</style>
