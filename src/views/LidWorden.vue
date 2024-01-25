<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';
import ConscriboForm from '@/components/ConscriboForm.vue';
import confetti from 'canvas-confetti';

// takes a position and calculates the angle needed to point to the middle of the screen
function calculateAngleToCenter(x: number, y: number): number {
  const deltaX = window.innerWidth / 2 - x * window.innerWidth;
  const deltaY = window.innerHeight / 2 - y * window.innerHeight;

  const angleRadians = Math.atan2(deltaY, deltaX);
  const angleDegrees = -(angleRadians * (180 / Math.PI));

  return angleDegrees;
}

// calculates the angle needed to cover the screen with a cone if pointing from a corner to the screen center
function calculateConeAngle(): number {
  const aspectRatio = window.innerWidth / window.innerHeight;
  const coneAngle = 90 * aspectRatio + 5;
  return coneAngle;
}

// this is overengineered and I like it.
const generateConfetti = (origin: { y: number; x: number }[], maxConfettiCount: number = 100): void => {
  const particleCount: number = Math.floor(maxConfettiCount / locations.length);

  locations.forEach((location) => {
    const randParticleCount = particleCount - Math.random() * (particleCount / 2),
      randDrift = Math.random() * 1 - 0.5,
      randScale = 0.9 + Math.random() * 0.2;

    confetti({
      angle: calculateAngleToCenter(location.x, location.y),
      particleCount: randParticleCount,
      spread: calculateConeAngle(),
      origin: location,
      startVelocity: 90,
      ticks: 400,
      disableForReducedMotion: true,
      shapes: ['star', 'circle', 'square'],
      drift: randDrift,
      scalar: randScale,
    });
  });
};

let locations = [
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
];

// Most modern phones have 8 cores, 8 threads, so return 8.
// So its safe to assume that 10 or more is a laptop or desktop device.
// The browser may adjust this number based on capability.
if (navigator.hardwareConcurrency <= 6) generateConfetti(locations, 100); // low-end, some phones
else if (navigator.hardwareConcurrency <= 10)
  generateConfetti(locations, 200); // likely 6-core or modern big.little intel
else generateConfetti(locations, 400); // likely 8-core or more, 200 looks fine so this is bonus
</script>

<template>
  <ContentContainer>
    <h1>Aanmelden lidmaatschap INDICIUM</h1>

    <ConscriboForm />
    <div>
      Gaat er iets niet helemaal goed? Geen zorgen,
      <a href="https://leden.conscribo.nl/svIndicium/aanmeldenlidmaatschap" target="_blank"
        >open het formulier in een nieuw tabblad</a
      >
      en probeer het nog een keer. 🙂
    </div>
  </ContentContainer>
</template>

<style scoped lang="scss">
h1 {
  margin-bottom: 24px;
}

.content-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgb(227, 227, 227);
}

details {
  margin: 10px;
}

iframe {
  flex-grow: 1;
  border: none;
  width: 100%;
  height: 100%;
  filter: var(--filter);
}

$breakpoints: (
  large: 850px,
  medium: 749px,
  small-medium: 641px,
  small: 500px,
  extra-small: 411px,
  extra-extra-small: 365px,
  tiny: 277px,
);

$min-heights: (
  large: 1000px,
  medium: 1230px,
  small-medium: 1320px,
  small: 1380px,
  extra-small: 1500px,
  extra-extra-small: 1600px,
  tiny: 1700px,
);

.signupContainer {
  background-color: var(--secondary-background-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  min-height: 900px;
  max-width: 1200px;
  border-radius: 4px;
  margin-bottom: 48px;

  // because we can't access the height of the iframe using TS
  @each $breakpoint, $width in $breakpoints {
    $min-height: map-get($min-heights, $breakpoint);

    @media screen and (max-width: $width) {
      min-height: $min-height;
    }
  }
}

.newtab-button {
  background-color: var(--indi-blue-1);
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 8px;
  color: var(--text-color);
  font-weight: 600;
}
</style>
