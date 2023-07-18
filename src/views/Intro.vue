<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

// this reference line is needed for TS and svg loader. Copy and past where needed
/// <reference types="vite-svg-loader" />
import theeSVG from '@/assets/icons/indicium_418.svg?component';
import ContentContainer from '@/layouts/ContentContainer.vue';
</script>

<template>
  <ContentContainer>
    <img :src="'/assets/images/intro2022.jpeg'" alt="'Intro'" />

    <section class="intro">
      <p>
        Vanuit de Studievereniging Indicium zijn we blij om te zien dat je de keuze hebt gemaakt voor de HBO-ICT
        opleiding <em>(inclusief Open-ICT)</em> Om je een warm welkom te bieden en een startpunt voor nieuwe
        vriendschappen, hebben we een speciaal introductiekamp in het leven geroepen.
      </p>

      <p>
        Dit introductiekamp zal plaatsvinden van dinsdag 22 augustus tot en met vrijdag 25 augustus. De locaties zijn de
        prachtige stad Utrecht en een plek nabij Geldermalsen. Hier krijg je de kans om je medestudenten beter te leren
        kennen en de unieke sfeer van onze vereniging te ervaren. Er wachten je diverse activiteiten, variërend van
        spellen tot sportuitdagingen, en het geheel wordt afgesloten met een gezellig feest!
      </p>

      <p>
        Om deel uit te maken van dit geweldige introductiekamp, dien je jezelf te registreren. Dit kan eenvoudigweg door
        he volgende formulier in te vullen:
      </p>
      <a class="aanmelden" href="https://forms.gle/RGBfuZSz34ao8UgF7">Klik hier om je aan te melden voor introkamp</a>.

      <p>
        Wees er snel bij want er zijn maar een beperkt aantal plekken!<br />
        <a class="" href="https://forms.gle/qfFeLTfoCGJaE3ou9"> Inschrijvingen vol? Klik hier voor de wachtrij!</a>
      </p>

      <p>
        Ons introductiekamp is de perfecte manier om helemaal op te gaan in de vereniging en nieuwe vriendschappen te
        smeden. Een ervaring die je niet wilt missen! Dus meld je snel aan en we kijken ernaar uit je te zien bij het
        introductiekamp!
      </p>

      <p>
        Heb je nog vragen over het introductiekamp of iets anders gerelateerd aan de vereniging? Aarzel niet om ons te
        bereiken via <a class="" href="mailto://introcom@indicium.hu"> introcom@indicium.hu</a>. We staan altijd klaar
        om je te helpen.
      </p>
    </section>
  </ContentContainer>
</template>

<style scoped lang="scss">
img {
  width: 80vw;
  max-width: 400px;
  margin: auto;
  display: flex;
}

.aanmelden {
  background-color: var(--indi-green-1);
  padding: 8px;
  margin: auto;
  border-radius: 8px;
  width: 300px;
  justify-content: center;
  display: flex;
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--text-color);
  text-align: center;
  text-decoration: none;
}
</style>
