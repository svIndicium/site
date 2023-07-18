<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';
</script>

<template>
  <ContentContainer>
    <img :src="'/public/assets/images/intro2022.jpeg'" alt="'Intro'" />

    <h1>Introductiekamp 2023</h1>

    <section class="intro">
      <div>
        <p>
          Vanuit de Studievereniging Indicium zijn we blij om te zien dat je de keuze hebt gemaakt voor de HBO-ICT
          opleiding <em class="openict">(inclusief Open-ICT 💖)</em>. Om je een warm welkom te bieden en een startpunt
          voor nieuwe vriendschappen, hebben we een speciaal introductiekamp in het leven geroepen.
        </p>

        <p>
          Dit introductiekamp zal plaatsvinden van <em class="datum">dinsdag 22 augustus</em> tot en met
          <em class="datum">vrijdag 25 augustus</em>. De locaties zijn de prachtige stad Utrecht en een plek nabij
          Geldermalsen. Hier krijg je de kans om je medestudenten beter te leren kennen en de unieke sfeer van onze
          vereniging te ervaren. Er wachten je diverse activiteiten, variërend van spellen tot sportuitdagingen, en het
          geheel wordt afgesloten met een gezellig feest!
        </p>

        <p style="text-align: center">
          Om deel uit te maken van dit geweldige introductiekamp, dien je jezelf hieronder te registreren.
        </p>
        <div class="buttons">
          <a class="aanmelden" href="https://forms.gle/RGBfuZSz34ao8UgF7">Aanmelden voor introkamp</a>
          <a class="wachtrij" href="https://forms.gle/qfFeLTfoCGJaE3ou9"> Inschrijvingen vol? Aanmelden wachtrij!</a>
        </div>

        <p style="text-align: center">Wees er snel bij want er zijn maar een beperkt aantal plekken!<br /></p>

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
  }
}

img {
  width: 80vw;
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

  & > .aanmelden {
    box-sizing: border-box;
    background-color: var(--indi-green-1);
    border: 2px solid var(--indi-green-1);
    padding: 16px 8px;
    border-radius: 8px;
    max-width: 300px;
    justify-content: center;
    display: inline-block;
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--text-color);
    text-align: center;
    text-decoration: none;

    &:hover {
      background-color: var(--indi-green-2);
    }
  }

  & > .wachtrij {
    display: inline-block;
    box-sizing: border-box;
    background-color: transparent;
    border: 2px solid var(--indi-blue-1);
    padding: 16px 8px;
    border-radius: 8px;
    max-width: 300px;
    justify-content: center;
    font-size: 1.5rem;
    color: var(--text-color);
    text-align: center;
    text-decoration: none;

    &:hover {
      background-color: var(--indi-blue-3);
    }
  }
}

h1 {
  margin: 0.5rem 0;
}
</style>
