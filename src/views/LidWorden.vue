<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import ContentContainer from '@/layouts/ContentContainer.vue';
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

function adjustContainerHeight() {
  const signupContainer = document.querySelector('.signupContainer') as HTMLElement | null;
  const iframe = document.querySelector('iframe') as HTMLIFrameElement | null;
  if (signupContainer && iframe) {
    const iframeBody = iframe.contentDocument?.body;
    if (iframeBody) {
      const height = Math.max(iframeBody.clientHeight, iframeBody.scrollHeight);
      signupContainer.style.minHeight = `${height}px`;
    }
  }
}

onMounted(() => {
  adjustContainerHeight();
  window.addEventListener('resize', adjustContainerHeight);
});

onUnmounted(() => {
  window.removeEventListener('resize', adjustContainerHeight);
});
</script>

<template>
  <ContentContainer>
    <h1>Aanmelden lidmaatschap INDICIUM</h1>
    <details>
      <summary>Lijst BIC codes</summary>
      <p>ING: INGBNL2A</p>
      <p>Rabobank: RABONL2U</p>
      <p>Knab bank: KNABNL2H</p>
      <p>Abn Amro: ABNANL2A</p>
      <p>Bunq: BUNQNL2A</p>
      <p>SNS: SNSBNL2A</p>
      <p>Triodos: TRIONL2U</p>
      <p>Asn Bank: ASNBNL21</p>
      <p>Regiobank: RBRBNL21</p>
    </details>

    <div class="signupContainer">
      <iframe src="https://leden.conscribo.nl/svIndicium/aanmeldenlidmaatschap"></iframe>
    </div>
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

.newtab-button {
  background-color: var(--indi-blue-1);
  padding: 8px;
  margin-bottom: 16px;
  border-radius: 8px;
  color: var(--text-color);
  font-weight: 600;
}
</style>
