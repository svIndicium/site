<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';
</script>

<template>
  <ContentContainer>
    <img :src="'/assets/images/intro2022.jpeg'" alt="'Intro'" />

    <h1 class="big-title">Intro​duct​ie​kamp 2024</h1>

    <section class="intro">
      <div class="warning">
        <p>
          Op dit moment zijn de inschrijvingen voor de introductie 2024 nog niet geopend. We zijn druk bezig met het
          plannen van een onvergetelijke ervaring voor jullie allemaal. Zodra we een definitieve datum hebben, zullen we
          dit op deze pagina bekend maken.
        </p>
      </div>
      <div>
        <p>
          Vanuit de Studievereniging Indicium zijn we blij om te zien dat je de keuze hebt gemaakt voor de HBO-ICT
          opleiding <em class="openict">(inclusief Open-ICT 💖)</em>. Om je een warm welkom te bieden en een startpunt
          voor nieuwe vriendschappen, hebben we een speciaal introductiekamp in het leven geroepen.
        </p>

        <!-- <p>
          Dit introductiekamp zal plaatsvinden van <em class="datum">dinsdag 22 augustus</em> tot en met
          <em class="datum">vrijdag 25 augustus</em>. De locaties zijn de prachtige stad Utrecht en een plek nabij
          Geldermalsen. Hier krijg je de kans om je medestudenten beter te leren kennen en de unieke sfeer van onze
          vereniging te ervaren. Er wachten je diverse activiteiten, variërend van spellen tot sportuitdagingen, en het
          geheel wordt afgesloten met een gezellig feest!
        </p> -->

        <!-- <p style="text-align: center">
          Om deel uit te maken van dit geweldige introductiekamp, dien je jezelf hieronder te registreren.
        </p>
        <div class="buttons">
          <a class="button primary rounded indi-green-1 big heavy" href="https://forms.gle/RGBfuZSz34ao8UgF7"
            >Aanmelden voor introkamp</a
          >
          <a class="button secondary rounded indi-bluegreen-1 big" href="https://forms.gle/qfFeLTfoCGJaE3ou9">
            Inschrijvingen vol? Aanmelden wachtrij!</a
          >

          <a class="button secondary rounded big" href="https://forms.gle/e9q3XpWcCJJSsveB9">
            Aanmelden voor Docenten HU</a
          >
        </div>

        <p style="text-align: center">Wees er snel bij want er zijn maar een beperkt aantal plekken!<br /></p> -->

        <p>
          Ons introductiekamp is de perfecte manier om helemaal op te gaan in de vereniging en nieuwe vriendschappen te
          smeden. Een ervaring die je niet wilt missen! Dus meld je snel aan en we kijken ernaar uit je te zien bij het
          introductiekamp!
        </p>
      </div>

      <div>
        <p>
          Heb je nog vragen over het introductiekamp of iets anders gerelateerd aan de vereniging? Aarzel niet om ons te
          bereiken via <a class="" href="mailto://introcom@indicium.hu"> introcom@indicium.hu</a>. We staan altijd klaar
          om je te helpen.
        </p>
      </div>
    </section>
  </ContentContainer>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';
@media screen and (max-width: #{$bp-mobile-lg}) {
  .big-title {
    font-size: 2.5rem;
    word-break: break-word;
  }
}

em {
  &.openict {
    opacity: 0.84;
    font-size: 0.8em;
  }

  &.datum {
    font-style: normal;
    background-image: linear-gradient(transparent 75%, var(--indi-green-2) 90%);
    border-radius: 5px;
  }
}

.intro {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 0 1rem;

  & > div {
    background-color: var(--secondary-background-color);
    border-radius: 8px;
    width: 100%;
    max-width: 1000px;
    padding: 0.5rem 1.5rem;

    &.warning {
      background-color: var(--indi-warning);
    }
  }
}

img {
  width: 80vw;
  aspect-ratio: 1024/600; // resolution of the image (prevents content shift)
  max-width: 600px;
  margin: 10px auto;
  display: flex;
  border-radius: 5px;
}

.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 0;

  & > .big {
    padding: 16px 8px;
    max-width: 300px;
    font-size: 1.5rem;

    &.heavy {
      font-weight: 500;
    }
  }
}

h1 {
  margin: 0.5rem 0;
}
</style>
