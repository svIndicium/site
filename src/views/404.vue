<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';

const excuses = [
  'Sorry. Het was dit of een tentamen en het is het allebei niet geworden',
  'Zit de wifi-kabel er goed in?',
  'Deze error is zo standaard, probeer eens error 418',
  'Herstart je device anders even...',
  'Je houdt hem verkeerd vast',
  'Aan deze pagina zijn we nog niet toegekomen',
  '(╯°□°)╯︵ ┻━┻',
  '(┛ಠ_ಠ)┛彡┻━┻',
  'Dit was niet onderdeel van mijn stageopdracht',
  'Het werkte op mijn PC nog wel',
  'Is er toevallig iemand met verstand van computers die dit kan fixen?',
  'Deze pagina is op vakantie, dat moet soms ook even',
  'Sorry, ik was even verdwaald in de codejungle',
  'Mijn excuses, ik heb een deadline-draak verslagen en was even uitgeput',
  'Het spijt me, ik had een tijdmachine nodig om dit op tijd af te hebben',
  'Verontschuldiging! Mijn kat heeft mijn toetsenbord gegijzeld',
  'Oeps, ik was verdwaald in een eindeloze lus. Gelukkig ben ik er weer!',
  "Sorry, ik was even aan het dagdromen over het oplossen van een Rubik's kubus",
  'Mijn excuses, mijn code heeft last van podiumangst. Hij werkt alleen achter de schermen',
  'Sorry, ik weet geen quotes meer',
  'Deed je dit express?',
];

const faces = [
  '😢',
  '😭',
  '😿',
  '😞',
  '😩',
  '🙁',
  '😟',
  '😦',
  '😨',
  '😰',
  '😮',
  '😪',
  '😵',
  '😔',
  '😕',
  '😑',
  '😬',
  '🤔',
  '😓',
  '😖',
  '😣',
  '😩',
  '😫',
  '😮',
  '😱',
  '😳',
  '🤯',
  '😱',
  '🙀',
  '😧',
  '😦',
  '🤧',
  '😷',
  '🤕',
  '🐍',
];

let excuus = excuses[Math.floor(Math.random() * excuses.length)];
const sadface = faces[Math.floor(Math.random() * faces.length)];
if (sadface === '🐍') excuus = 'Sorry, Peet zat in de server';
</script>

<template>
  <ContentContainer>
    <h1 class="face">{{ sadface }}</h1>
    <h1>Sorry, deze pagina bestaat niet</h1>
    <h2>404 - ODZ: "{{ excuus }}"</h2>
    <p>Als je denkt dat dit niet klopt. Ben je meer dan welkom om ons te helpen bij de DEVCOM!</p>
  </ContentContainer>
</template>

<style scoped lang="scss">
svg {
  width: 300px;
  height: 300px;
}

h1,
h2,
p {
  text-align: center;
}

.face {
  font-size: 150px;
}
</style>
