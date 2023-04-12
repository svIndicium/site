<script setup lang="ts">
import IndiciumMap from "@/components/Map.vue"

import ContentContainer from '@/layouts/ContentContainer.vue';
</script>

<template>
  <ContentContainer>
    <div class="two-columns">
      <div class="contact-info">
        <h1>Contact</h1>
        <ul>
          <li>
            <span class="medium">Adres</span>: <a href="https://goo.gl/maps/oCNHCibfBjtaSENT8">Heidelberglaan 15, 3584 CS Utrecht</a>
          </li>
          <li>
            <span class="medium">Lokaal</span>: HL15-4.092
          </li>
          <li>
            <span class="medium">KVK</span>: 68788878
          </li>
        </ul>
        <p>Of stuur direct een e-mail naar het bestuur:</p>
        <a href="mailto:bestuur@indicium.hu" class="btn l">bestuur@indicium.hu</a>
      </div>
      <IndiciumMap class="map" />
    </div>
  </ContentContainer>
</template>

<style scoped lang="scss">
.two-columns {
    margin: 10px 0;
    display: flex;
    width: 100%;
    justify-content: space-around;

    .map {
        flex-grow: 1;
        margin: 0 30px;

        @media screen and (max-width: 768px) {
          display: none;
        }
    }

    .contact-info {
        text-align: left;
        margin: 0 30px;
    }
}
</style>
