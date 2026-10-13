<script setup lang="ts">
type HeroButtonVariant = 'primary' | 'secondary';
type HeroButtonColor = 'blue-1' | 'blue-2' | 'blue-3' | 'green-1' | 'green-2' | 'green-3' | 'bluegreen-1' | 'bluegreen-2' | 'bluegreen-3';

const props = withDefaults(
  defineProps<{
    /** Target route or external URL. */
    to: string;
    /** `primary` fills the button (default); `secondary` outlines it. */
    variant?: HeroButtonVariant;
    /** Button colour; `blue-1` is the base `.button` look. */
    color?: HeroButtonColor;
    /** Hidden but kept mounted (e.g. a seasonal CTA), so editors can still see it in Studio. */
    hidden?: boolean;
  }>(),
  { variant: 'primary', color: 'blue-1', hidden: false },
);

// Static map (not a constructed `indi-${color}`) so the valid classes are greppable.
const COLOR_CLASSES: Record<HeroButtonColor, string> = {
  'blue-1': '',
  'blue-2': 'indi-blue-2',
  'blue-3': 'indi-blue-3',
  'green-1': 'indi-green-1',
  'green-2': 'indi-green-2',
  'green-3': 'indi-green-3',
  'bluegreen-1': 'indi-bluegreen-1',
  'bluegreen-2': 'indi-bluegreen-2',
  'bluegreen-3': 'indi-bluegreen-3',
};

const classes = computed(() => ['button', props.variant, 'rounded', COLOR_CLASSES[props.color]]);
</script>

<template>
  <NuxtLink v-show="!hidden" :to="to" :class="classes">
    <MDCSlot name="default" :use="$slots.default" unwrap="p" />
  </NuxtLink>
</template>
