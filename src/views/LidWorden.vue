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
function generateConfetti(
  origin: { y: number; x: number }[],
  maxConfettiCount: number = 100,
  startVelocity = 90,
  spread = 0,
) {
  const particleCount: number = Math.floor(maxConfettiCount / origin.length);

  origin.forEach((origin) => {
    const randParticleCount = particleCount - Math.random() * (particleCount / 2),
      randDrift = Math.random() * 1 - 0.5,
      randScale = 0.9 + Math.random() * 0.2;

    confetti({
      angle: calculateAngleToCenter(origin.x, origin.y),
      particleCount: randParticleCount,
      spread: spread || calculateConeAngle(),
      origin: origin,
      startVelocity: startVelocity,
      ticks: 400,
      disableForReducedMotion: true,
      shapes: ['star', 'circle', 'square'],
      drift: randDrift,
      scalar: randScale,
    });
  });
}

const locations = [
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

// Serieus confetti moment
setInterval(() => {
  if (document.querySelector('#cwfForm > p')?.innerHTML?.includes('formulier ontvangen')) {
    if (navigator.hardwareConcurrency <= 6) {
      generateConfetti([{ x: 0.5, y: -0.3 }], 25, 50, 180);
    } // low-end, some phones
    else if (navigator.hardwareConcurrency <= 10) {
      generateConfetti([{ x: 0.5, y: -0.3 }], 50, 50, 180);
      confetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: Math.random(),
          // since they fall down, start a bit higher than random
          y: Math.random() - 0.2,
        },
      });
    } // likely 6-core or modern big.little intel
    else {
      generateConfetti([{ x: 0.5, y: -0.3 }], 100, 50, 180);
      confetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: Math.random(),
          // since they fall down, start a bit higher than random
          y: Math.random() - 0.2,
        },
      });
    } // likely 8-core or more, 200 looks fine so this is bonus
  }
}, 2000);
</script>

<template>
  <ContentContainer>
    <h1>Aanmelden lidmaatschap INDICIUM</h1>
    <ConscriboForm />
    <p>
      Gaat er iets niet helemaal goed? Geen zorgen,
      <a href="https://leden.conscribo.nl/svIndicium/aanmeldenlidmaatschap_v2" target="_blank"
        >open het formulier in een nieuw tabblad</a
      >
      en probeer het nog een keer. 🙂
    </p>
  </ContentContainer>
</template>

<style scoped lang="scss">
@import '../assets/scss/variables.scss';
h1 {
  margin-bottom: 24px;
}

.content-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: var(--panel-background);
}

details {
  margin: 10px;
}

@media screen and (max-width: #{$bp-tablet-lg}) {
  .content-container {
    padding-left: 0;
    padding-right: 0;
    width: 100%;
  }

  p {
    padding: 0 20px;
  }
}

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
}
</style>
