<script setup lang="ts">
defineProps(['partner']);

function expandJobOffer(event: MouseEvent) {
  const target = event.target as HTMLElement;
  target.parentElement!.classList.toggle('open');
}
</script>

<template>
  <div v-if="partner.jobOffers.length > 0" class="job-offers-container">
    <!-- Conclusion, hoofdpartner, wilt persee "werken bij" voor hun pagina -->
    <h2>{{ partner.title == 'Conclusion' ? 'Werken bij' : 'Vacatures bij' }} {{ partner.title }}</h2>
    <div class="job-offers container">
      <div class="job-offer" v-for="jobOffer in partner.jobOffers">
        <h3 class="job-offer-title" @click="expandJobOffer">{{ jobOffer.title }}</h3>
        <div class="job-offer-description">
          <p v-for="paragraph in jobOffer.description" v-html="paragraph"></p>
          <a
            v-if="jobOffer.url"
            class="readMoreOutboundBtn button primary rounded indi-green-1"
            style="display: inline-block; margin-bottom: 1em"
            :href="jobOffer.url"
            target="_blank"
          >
            Lees meer
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/main.scss';

.job-offers-container {
  @media screen and (max-width: #{$bp-tablet-md}) {
    // TODO: Make job offers wider on narrow screens
    margin: 3em auto;
  }
  .job-offers {
    .job-offer {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      width: 80%;
      text-align: left;
      margin: 1.5em auto;
      padding: 0 2em;
      background-color: rgba(255, 255, 255, 0.15);
      border-radius: 1.5em;

      @media screen and (max-width: #{$bp-tablet-md}) {
        width: 100%;
        padding: 0 1em;
        margin: 0.5em auto;
      }

      .job-offer-title {
        display: flex;
        align-items: center;
        margin: 0;
        font-size: 1.5em;
        line-height: 4ex;
        cursor: pointer;
      }

      .job-offer-title::after {
        display: inline-block;
        content: '';
        background-color: var(--text-color);
        -webkit-mask-image: url('/assets/icons/arrow-up.svg');
        mask-image: url('/assets/icons/arrow-up.svg');
        height: 12px;
        width: 21px;
        margin-left: auto;
        transition: 0.2s transform ease-out;
      }

      .job-offer-description {
        display: none;
      }

      &.open {
        .job-offer-title::after {
          transform: scaleY(-1);
        }

        .job-offer-description {
          display: block;
        }
      }
    }
  }
}
</style>
