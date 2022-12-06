
<script setup lang="ts">
/// <reference types="vite-svg-loader" />
import logo from '@/components/LogoElement.vue'
import HeroBackground from './HeroBackground.vue';



</script>

<template>
  <div class="hero">
    <HeroBackground>
      <div class="hero-content">
        <div class="logo">
          <logo />

        </div>
        <h1 class="fadeInUp">
          Wij zijn dé
          <span class="extra-bold">studie</span>vereniging voor HBO-ICT van
          Hogeschool Utrecht
        </h1>

        <!-- <div class="buttons fadeInUp">
          <a size="l" url="https://leden.conscribo.nl/svIndicium/aanmeldenlidmaatschap">Word lid</a>
          <a url="/activiteiten">Bekijk agenda</a>
        </div> -->
      </div>
    </HeroBackground>
  </div>
</template>


<style lang="scss" scoped>
.hero {
  top: 20px;
  display: flex;
  justify-content: center;
  position: relative;
  width: inherit;
  overflow: hidden;

  .background-view {
    width: inherit;
  }
}

.hero-content {
  z-index: 10;
  position: relative;
  padding: 200px 0 100px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    max-width: 832px;
    margin-bottom: 24px;
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-self: center;

    .btn {
      margin-right: 32px;
    }
  }
}


// --bp-desktop-sm: 1120px;
@media only screen and (max-width: 1120px) {
  .hero {
    top: 30px;
  }

  .hero-content {
    z-index: 10;
    position: relative;

    h1 {
      font-size: 2em;
      margin: 30px;
    }

    .buttons {
      display: flex;
      align-items: center;
      justify-self: center;

      .btn {
        margin-right: 32px;
      }
    }
  }
}
</style>
