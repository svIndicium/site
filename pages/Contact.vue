<script setup lang="ts">
import IndiciumMap from '@/components/Map.vue';

import ContentContainer from '@/layouts/ContentContainer.vue';
</script>

<template>
  <ContentContainer>
    <div class="two-columns">
      <div class="contact-info">
        <h1>Contact</h1>
        <ul>
          <li>
            <span class="medium">Adres</span>:
            <a href="https://goo.gl/maps/oCNHCibfBjtaSENT8">Heidelberglaan 15, 3584 CS Utrecht</a>
          </li>
          <li><span class="medium">Lokaal</span>: HL15-4.092</li>
          <li><span class="medium">KVK</span>: 68788878</li>
        </ul>
        <p>Of stuur een e-mail aan onze secretaris. De secretaris is het eerste contactpersoon voor leden:</p>
        <a href="mailto:secretaris@indicium.hu" class="btn l">secretaris@indicium.hu</a>
        <p>Voor e-mails gericht aan het hele bestuur kun je mailen naar:</p>
        <a href="mailto:bestuur@indicium.hu" class="btn l">bestuur@indicium.hu</a>
        <div id="contact-external">
          <p>Bedrijven en/of potenti&euml;le partners kunnen contact opnemen via:</p>
          <a href="mailto:secretaris-extern@indicium.hu" class="btn l">secretaris-extern@indicium.hu</a>
        </div>
      </div>
      <IndiciumMap class="map" />
    </div>
  </ContentContainer>
</template>

<style scoped lang="scss">

.two-columns {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  min-height: 500px;
  justify-content: space-around;
  margin: 24px 30px;

  .map {
    background-color: var(--secondary-background-color);
    background-image: url('/assets/misc/map-loading.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    min-width: 400px;
    min-height: 400px;
    flex-grow: 1;
    border-radius: 4px;
    overflow: hidden;
  }

  .contact-info {
    background-color: var(--secondary-background-color);
    border-radius: 4px;
    padding: 16px 14px;
    flex-grow: 1;
    max-width: 400px;
    text-align: left;
    position: relative;

    p {
      margin-top: 15px;
      margin-bottom: 5px;
    }

    h1 {
      margin-top: 0;
    }

    #contact-external {
      margin-top: 2.5rem;
      p, a {
        font-size: 16px;
      }

    }

  }
}
</style>
