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
  'Dit is niet onze fout, dit was Devin.',
  'De compileerfee heeft mijn code betoverd',
  'Ik was even in een parallelle wereld waar alles werkt',
  'Mijn toetsenbord weigerde tegen me te praten',
  'De bugs hebben een feestje gevierd in mijn codebase',
  'Ik had een verhitte discussie met mijn IDE over tabs vs. spaties',
  'De servers waren op vakantie in de bergen',
  'Mijn computer is jaloers op al die aandacht voor jouw probleem',
  'Sorry, ik was even afgeleid door een leuke code-meme',
  'Fouten zijn een sociaal construct, ik ben gewoon niet in de meerderheid',
  'Er is niets fout, jij bent fout.',
  'Er is hier geen error. Dit is een feature.',
  'Ik heb geen fouten gemaakt, ik heb gewoon de oplossing nog niet gevonden',
  'cd "404" && npm run fix',
  'Google de fout ofzo, ik weet het zelf ook niet',
  'Volgensmij heeft AI deze fout gemaakt, ik ben onschuldig',
  'Ik heb de code niet geschreven, ik heb alleen de koffie gehaald',
  'blame @devin',
  'Ik zei nog dat Devin niet in productie moest ontwikkelen!',
  'Banaan',
  'Doe eens een dansje, misschien werkt het dan wel',
  'Zoek maar een andere pagina, ik ben op vakantie',
  'Ik heb meer grappige 404 lijntjes geschreven dan code',
  'Joost heeft de server opgegeten',
  'Olivier heeft Joost opgegeten',
  'Rick heeft Olivier weggejaagd',
  'Devin heeft Rick weggejaagd',
  'En toen was er niemand meer om de server te fixen',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  '[object Object]',
  'undefined',
  'null',
  'NaN',
  'Error: undefined is not a function',
  'Error: null is not an object',
  'Error: NaN is not a number',
  'Error: [object Object] is not a valid error',
  'Bijna goed, probeer het nog een keer',
  'Fruitmandje?',
  'Ik heb geen idee wat ik aan het doen ben',
  'De server is verhuisd van US02 naar NK03',
  'Hier moet een grapje komen, maar ik ben niet grappig',
  'Seks, nu ik je aandacht heb, de server doet gek',
  'Wat had je verwacht van een studievereniging?',
  'Wat had je verwacht van Devin?',
  'Deze pagina is niet gevonden, maar de server wel',
  'Maak even eten.',
  'Ik ben even een boek lezen, probeer het later nog eens.',
  'Help, ik ben van de devcommissie en ik heb al maanden geen eten gekregen, stuur hulp! (en eten)',
  'Ik zit even in de HideOut te pilsen',
  'De website is even brak, maar met een reparatiebiertje komt het wel goed',
  'Jij bent een Lidl persoon he?',
  'nl.errors.404subtext',
  'PHP session token not found',
  'SQL error',
  'Het ligt niet aan jou maar aan mij',
  'Ik ben het niet eens met deze foutmelding.',
  'Laat maar, ik ga wel weer naar de kroeg',
  'PHP is kut.',
  'De webserver is net als Devin, hij is er gewoon niet',
  'De website is zo vaak bezocht dat hij op vakantie is gegaan',
  'Deze pagina is zo zeldzaam dat ie op de Rode Lijst staat',
  'De url is geëxpireerd, net als de houdbaarheidsdatum van die pizza in de koelkast',
  'Foutje bedankt, de webserver is op dit moment memes aan het kijken',
  'De website is overspannen en heeft een welverdiende 404-break genomen',
  'Sorry, de webserver heeft net leren lopen en is een beetje verdwaald geraakt',
  'Geen paniek, de server is de weg kwijt maar belt zo de ANWB',
  'De website heeft een jetlag en is in de war met de tijdzones',
  'Jeff gecertificeerde webserver, hij werkt anders maar beter is ie niet',
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
