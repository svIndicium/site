<script setup lang="ts">
useSeoMeta({
  title: 'Over Indicium',
  description: 'Dé studievereniging voor HBO-ICT van Hogeschool Utrecht',
});

const carouselImages = ['/assets/images/Karten-20.webp', '/assets/images/Poolen-12.webp', '/assets/images/DSC_2852.webp'];

const stats = [
  { number: '300+', label: 'Leden' },
  { number: 'HU', label: 'Hogeschool Utrecht' },
  { number: 'ICT', label: 'Voor & door studenten' },
];
</script>

<template>
  <ContentContainer>
    <h1>Over Indicium</h1>
    <div class="carousel">
      <ClientOnly>
        <LazyImageCarousel :images="carouselImages" alt="Over Indicium slider" :slides-per-view="1.5" align="center" height="32em" max-height="32em" fit="cover" hydrate-on-visible />
        <template #fallback>
          <img alt="Over Indicium slider" :src="carouselImages[0]" class="carousel-fallback" loading="eager" fetchpriority="high" decoding="async" width="1600" height="900" />
        </template>
      </ClientOnly>
    </div>
    <div class="text-container">
      <h2>Wie zijn wij?</h2>
      <p>Indicium is de studievereniging voor studenten van het Institute for ICT aan de Hogeschool Utrecht. De vereniging organiseert naast informele activiteiten zoals poolen, bowlen, karten en feestjes met andere verenigingen ook verdiepende activiteiten in de ICT branche zoals lezingen, workshops en inhousedagen. Daarnaast biedt Indicium ook netwerkmogelijkheden voor studenten, waar ze in contact kunnen komen met bedrijven en professionals uit de branche. De vereniging heeft ook een actieve rol in de organisatie van evenementen, zoals minimaal 1 maal per jaar een studiereis naar beurzen door Europa en hackathons.</p>
      <div class="stats-row">
        <div v-for="item in stats" :key="item.label" class="stat-card">
          <span class="stat-card__number">{{ item.number }}</span>
          <span class="stat-card__label">{{ item.label }}</span>
        </div>
      </div>
    </div>
    <div class="text-container">
      <h2>Introkamp</h2>
      <p>Verreweg een van de leukste activiteiten van het jaar is het introkamp vlak voor het begin van het studiejaar. Tijdens het introkamp organiseren de leden van de vereniging activiteiten die gericht zijn op teambuilding en gezelligheid. Tijdens het introkamp maak je door verschillende activiteiten kennis met de stad Utrecht. Daarna verhuist de gezelligheid naar een evenementenlocatie in de buurt van de stad waar de gezelligheid verder gaat door middel van uitdagende activiteiten, teambuilding en een leuk feestje. Kortom, het introkamp is de beste manier om je studententijd in Utrecht te beginnen en vrienden te maken voor de rest van je studie.</p>
      <NuxtLink class="button primary rounded" to="/intro">Meer over het introkamp</NuxtLink>
    </div>
    <div class="text-container">
      <h2>Hoe wij zijn ontstaan</h2>
      <blockquote>"Er moeten toch ook ICT-ers zijn die het wel leuk vinden om gezellige dingen te doen."</blockquote>
      <p>Dit waren de wijze woorden van onze voorzitter William die aan het praten was tegen Nigel onze secretaris. Diezelfde dag werd Olivier door William benaderd of hij het ook leuk lijkt om ICT weer gezellig te maken. Het enige wat er nog ontbrak was iemand die zich goed kon vinden in de cijfers. De zoektocht duurde niet lang. We hadden al snel iemand gevonden die uitstekend kan boekhouden en zo met Sander onze penningmeester erbij hadden we een hecht bestuur gevormd.</p>
    </div>
  </ContentContainer>
</template>

<style scoped>
.carousel { margin:1.5rem auto 0; width:100%; max-width:1080px; height:30em; max-height:30em; border-radius:10px; overflow:hidden; background:var(--secondary-background-color); border:1px solid rgba(var(--indi-blue-1-raw),0.3) }
.carousel-fallback { width:100%; height:100%; object-fit:cover; display:block }
.text-container { max-width:860px; margin:2.25rem auto 0 }
.text-container h2 { position:relative; margin:0 0 0.7rem; padding-bottom:0.4rem }
.text-container h2::after { content:''; position:absolute; left:0; bottom:0; width:3.25rem; height:3px; border-radius:2px; background:var(--indi-blue-1) }
.text-container p { margin:0; line-height:1.78; color:var(--text-color) }
.text-container .button { margin-top:1rem; display:inline-block }
.stats-row { margin-top:1.25rem; display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:1rem }
.stat-card { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:0.35rem; text-align:center; border-radius:10px; padding:1rem 0.75rem; background:var(--secondary-background-color); border:1px solid rgba(var(--indi-blue-1-raw),0.25) }
.stat-card__number { font-family:var(--indicium-font); font-size:1.9rem; line-height:1; color:var(--indi-blue-1) }
.stat-card__label { font-size:0.95rem; color:rgba(var(--text-color-raw),0.82) }
blockquote { margin:0 0 1rem; padding:0.75rem 1rem; border-left:4px solid var(--indi-blue-1); background:var(--secondary-background-color); border-radius:0 8px 8px 0; font-style:italic }
@media (max-width:944px) { .carousel { height:26em; max-height:26em } .stats-row { grid-template-columns:1fr } }
@media (max-width:768px) { .carousel { margin-top:1rem; height:22em; max-height:22em; border-radius:8px } .text-container { margin-top:1.75rem } }
</style>
