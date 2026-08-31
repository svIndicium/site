<script setup lang="ts">
interface JobOffer {
  title: string;
  url?: string;
  body?: any;
  _path?: string;
}

defineProps<{
  offers: JobOffer[];
}>();

function expandJobOffer(event: MouseEvent) {
  const target = event.target as HTMLElement;
  target.parentElement!.classList.toggle('open');
}
</script>

<template>
  <div v-if="offers && offers.length > 0" class="job-offers-container">
    <h2>Vacatures</h2>
    <div class="job-offers container">
      <div v-for="(jobOffer, index) in offers" :key="jobOffer._path || index" class="job-offer">
        <h3 class="job-offer-title" @click="expandJobOffer">{{ jobOffer.title }}</h3>
        <div class="job-offer-description">
          <ContentRenderer v-if="jobOffer.body" :value="jobOffer" />
          <a
            v-if="jobOffer.url"
            class="readMoreOutboundBtn button primary rounded indi-green-1"
            style="display: inline-block; margin-bottom: 1em"
            :href="jobOffer.url"
            target="_blank"
          >
            Naar de vacature
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.job-offers-container {
  container-type: inline-size;
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

/* Container query (top-level — nested @container is dropped in Vue dev): the
   offer fills its column when the container is narrow, not the viewport.
   Specificity matches the base (.job-offers .job-offer) and comes after it, so
   it wins when the query matches. */
@container (max-width: 768px) {
  .job-offers .job-offer {
    width: 100%;
    padding: 0 1em;
    margin: 0.5em auto;
  }
}

.job-offers-container {
  /* Viewport full-bleed (page-level): bleed the offers to the screen edge on
     small screens. Offer width/padding is handled by the container query. */
  @media screen and (max-width: 768px) {
    margin: 3em 0;

    .job-offers.container {
      --added-padding: 4em;
      margin: 0 calc(-1 * var(--added-padding));
      width: calc(100% + 2 * var(--added-padding));
    }
  }
}
</style>
