<script setup lang="ts">

import ContentContainer from '@/layouts/ContentContainer.vue';
</script>

<template>
  <ContentContainer>
    <h1>Development commissie</h1>
    <div id="commissie-info" class="container">
      <div class="details">
        <img class="commissie-picture" src="/assets/images/devcom.jpg" alt="Foto Devcom" />
        <div class="description">
          <p>De development commissie bestaat uit [n] studenten en heeft een essentiële rol voor de
            studievereniging. Naast gezelligheid tijdens commissievergaderingen is de commissie constant
            bezig met het up-to-date houden van de website met bijvoorbeeld nieuwe functies of nieuwe
            partners.</p>
          <p>De devcom houdt zich bezig met:</p>
          <ul>
            <li>
              <strong>De website</strong>: hier komen nieuwe en huidige studenten voor het eerst in aanraking met de vereniging.
              Deze website speelt een belangrijke rol in de werving en behoud van partners en leden.
            </li>
            <li>
              <strong>Het ledenportaal</strong>: de plek voor leden om tickets te halen voor activiteiten, foto’s in te
              zien en gegevens bij te werken.
            </li>
            <li>
              <strong>Updates</strong>: voornamelijk controle van code op fouten die geëxploiteerd kunnen worden en
              het updaten van bijvoorbeeld libraries.
            </li>
            <li>
              <strong>Nieuwe functionaliteiten</strong>: elk jaar werken we hard een nieuwe functionaliteiten om het
              gebruik van het ledenportaal en de website te verbeteren en waarde te creëren voor de
              vereniging.
            </li>
            <li>
              <strong>Pagina’s up-to-date houden</strong>: met steeds weer nieuwe partners, foto’s en activiteiten is
              het belangrijk om regelmatig de informatie op de website aan te passen.
            </li>
            <li>
              <strong>Bugs fixen</strong>: we maken er genoeg, dus dan moeten we het ook zelf oplossen. Als iemand
              het vraagt was het Devin
            </li>
            <li>
              <strong>1 april grappen</strong>: NFT’s tot een Windows 95 websitedesign, zo gek als we het bedenken
              en kunnen, altijd leuk!
            </li>
          </ul>

          <h3>Wie zoeken we?</h3>
          <p>HBO-ICT studenten, jou dus! Of je nou SD, BIM, CSC, TI of AI doet, er is altijd wel een plekje voor jou
            binnen het team! Je moet vooral open staan om nieuwe dingen te proberen en te leren. Jouw werk
            komt direct op de website te staan voor studenten, ouders, docenten en partners!</p>

          <h3>Wat krijg je ervoor terug?</h3>
          <p>Naast super veel gezelligheid doe je natuurlijk ook veel ervaring op. In de development
            commissie valt er altijd wat te leren voor studenten van elke richting. Bovendien staat het goed
            op je CV en kan je na elke aanpassing trots zijn dat jouw code direct op het internet staat om
            gezien te worden. Tot slot krijg je voor je harde werk aan het einde van het jaar een mooie persoonlijke
            commissietrui en kans om mee te gaan naar de skybox bij FC Utrecht!</p>
        </div>
      </div>
    </div>
  </ContentContainer>

</template>

<style scoped lang="scss">
@import '@/assets/scss/main.scss';


#commissie-info {
  margin: 2em auto;

  li {
    margin: 1rem 0;
  }

  .details {
    display: flex;
    gap: 8%;
    align-items: start;
    justify-content: center;

    @media screen and (max-width: #{$bp-tablet-md}) {
      flex-wrap: wrap;
    }

    .commissie-picture {
      margin-top: 1.5rem;
      max-width: #{$bp-mobile-lg};
      height: auto;
    }

    .description {
      text-align: left;
    }
  }
}

</style>
