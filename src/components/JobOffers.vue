<script setup lang="ts">
import { ref } from "vue";

defineProps(["partner"]);

const expandedOffers = ref(new Set());

function toggleJobOffer(jobId: number) {
  if (expandedOffers.value.has(jobId)) {
    expandedOffers.value.delete(jobId);
  } else {
    expandedOffers.value.add(jobId);
  }
}
</script>

<template>
  <div v-if="partner.jobOffers.length > 0" class="job-offers-container">
    <h2>
      {{ partner.title === "Conclusion" ? "Werken bij" : "Vacatures bij" }} {{ partner.title }}
    </h2>
    <div class="job-offers">
      <div class="job-offer" v-for="(jobOffer, index) in partner.jobOffers" :key="index">
        <div class="job-offer-header" @click="toggleJobOffer(index)">
          <h3 class="job-offer-title">{{ jobOffer.title }}</h3>
          <span class="toggle-icon" :class="{ open: expandedOffers.has(index) }"></span>
        </div>
        <div class="job-offer-description" :class="{ open: expandedOffers.has(index) }">
          <p v-html="jobOffer.description[0]"></p>
          <div v-if="expandedOffers.has(index)">
            <p v-for="(paragraph, i) in jobOffer.description.slice(1)" :key="i" v-html="paragraph"></p>
          </div>
          <a
            v-if="jobOffer.url"
            class="read-more-btn"
            :href="jobOffer.url"
            target="_blank"
          >
            Naar de vacature →
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.job-offers-container {
  max-width: 900px;
  margin: 3em auto;
  padding: 1em;
  text-align: center;

  h2 {
    font-size: 1.8em;
    margin-bottom: 1em;
    color: var(--text-color);
  }
}

.job-offers {
  display: flex;
  flex-direction: column;
  gap: 1.5em;
}

.job-offer {
  background: var(--secondary-background-color);
  padding: 1.5em;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }

  .job-offer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  .job-offer-title {
    font-size: 1.4em;
    font-weight: bold;
    margin: 0;
    color: var(--text-color);
  }

  .toggle-icon {
    width: 20px;
    height: 20px;
    background-image: url("/assets/icons/arrow-up.svg");
    background-size: contain;
    background-repeat: no-repeat;
    transition: transform 0.2s ease-in-out;
    //filter: var(--root-background-color);
  }

  .toggle-icon.open {
    transform: rotate(180deg);
  }

  .job-offer-description {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
    opacity: 0;
    color: var(--text-color);

    &.open {
      max-height: 500px;
      opacity: 1;
      margin-top: 1em;
    }

    p {
      margin: 0.5em 0;
      line-height: 1.5;
    }
  }

  .read-more-btn {
    display: inline-block;
    margin-top: 1em;
    padding: 0.5em 1em;
    background-color: var(--button-bg, #2c7a7b);
    color: var(--button-text, white);
    font-weight: bold;
    border-radius: 5px;
    text-decoration: none;
    transition: background 0.2s;

    &:hover {
      background-color: var(--button-hover-bg, #225b5c);
    }
  }
}

@media screen and (max-width: 768px) {
  .job-offer {
    padding: 1em;
  }

  .job-offer-title {
    font-size: 1.2em;
  }
}
</style>
