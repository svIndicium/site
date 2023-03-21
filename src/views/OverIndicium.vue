<script setup lang="ts">
  import ContentContainer from '@/layouts/ContentContainer.vue';
  import Carousel from '@/layouts/Carousel.vue';

  const images = [
    "/assets/images/borrel2019.JPG",
    "/assets/images/sebTappen.JPG",
    "/assets/images/fotoOff.JPG",
  ];

</script>

<template>
    <ContentContainer>
      <div class="carousel">
        <Carousel :images="images" />
      </div>
      <div>
        <h1>Over Indicium</h1>
        <p>Indicium is de studievereniging voor studenten van het Institute for ICT aan de Hogeschool Utrecht. De vereniging organiseert naast informele activiteiten zoals poolen, bowlen, karten en feestjes met andere verenigingen ook verdiepende activiteiten in de ICT branche zoals lezingen, workshops en inhousedagen. Daarnaast biedt Indicium ook netwerkmogelijkheden voor studenten, waar ze in contact kunnen komen met bedrijven en professionals uit de branche. De vereniging heeft ook een actieve rol in de organisatie van evenementen, zoals 2 maal per jaar een studiereis naar beurzen door Europa en hackathons. </p>
        <h2>Introkamp</h2>
        <p>Verreweg een van de leukste activiteiten van het jaar is het introkamp vlak voor het begin van het studiejaar. Tijdens het introkamp organiseren de leden van de vereniging activiteiten die gericht zijn op teambuilding en gezelligheid. Tijdens het introkamp maak je door verschillende activiteiten kennis met de stad Utrecht. Daarna verhuist de gezelligheid naar een evenementenlocatie in de buurt van de stad waar de gezelligheid verder gaat door middel van uitdagende activiteiten, teambuilding en een leuk feestje.
        Kortom, het introkamp is de beste manier om je studententijd in Utrecht te beginnen en vrienden te maken voor de rest van je studie.
        </p>
      </div>
    </ContentContainer>
</template>

<style scoped>
  .carousel {
    margin: 0 auto;
    margin-top: 2em;
    max-height: 32em;  /* gewoon fotoshoppen, niet moeilijk doen */
    max-width: 1200px;
  }

  p {
    width: 70%;
    margin: 0 auto;
  }
</style>
