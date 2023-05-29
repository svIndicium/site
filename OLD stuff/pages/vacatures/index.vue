<template>
  <div class="container">
    <div v-if="isLoading">
      <Loading />
    </div>
    <div v-else class="vacancy-container">
      <div v-for="(vacancy, i) in vacancies" :key="i" class="vacancy">
        <div class="logo">
          <div class="logo-container">
            <img :src="getPartner(vacancy.partner).logo" :alt="getPartner(vacancy.partners).name + ' logo'" />
          </div>
        </div>
        <div class="text">
          <h4>{{ vacancy.title }}</h4>
          <p>{{ getDescription(vacancy.description.short) }}</p>
          <Button :url="'/vacatures/' + vacancy.id + '-' + vacancy.slug"> Lees meer </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

import axios from 'axios';
import content from '../../content/content.json';
import Button from '@/components/interactions/button.vue';
import Loading from '@/components/Loading.vue';

@Component({
  components: {
    Loading,
    Button,
  },
})
export default class Index extends Vue {
  isLoading = true;
  vacancies = [];
  partners = {};

  mounted() {
    this.fetchVacancies();
  }

  fetchVacancies() {
    axios.get('https://old.indicium.hu/json/vacancies?filter[status]=published&page%5Bsize%5D=9').then((response) => {
      const vacancies = response.data.data;
      const shownVacancies = vacancies.map((vacancy: any) => ({
        id: vacancy.id,
        title: vacancy.attributes.title,
        description: {
          short: this.stripHTMLFromString(vacancy.attributes.shortdescription),
          long: vacancy.attributes.longdescription,
        },
        date: new Date(vacancy.attributes.date).getTime() / 1000,
        email: vacancy.attributes.email,
        phone: vacancy.attributes.phone,
        address: vacancy.attributes.address,
        partner: vacancy.attributes.partner,
        slug: vacancy.attributes.slug,
      }));

      this.$set(this, 'isLoading', false);
      this.$set(this, 'vacancies', shownVacancies);
    });
  }

  stripHTMLFromString(str = '') {
    return str
      .replace(/(<([^>]+)>)/gi, '')
      .replace(/\n|\r/g, ' ')
      .replace('&nbsp;', ' ');
  }

  getDescription(description: string) {
    const text = description.slice(0, 140).trim();
    if (description.length > 140) {
      return `${text}...`;
    }
    return text;
  }

  getPartner(oldId: string) {
    switch (oldId) {
      case '9':
        return content.partners[3];
      case '10':
        return content.partners[5];
      default:
        return content.partners[0];
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';

.vacancy-container {
  display: grid;

  @media screen and (max-width: #{bp-desktop-sm}) {
    grid-template-columns: 50% 50%;
  }

  @media screen and (max-width: #{bp-tablet-sm}) {
    grid-template-columns: 100%;
  }

  grid-template-columns: 33% 33% 33%;

  .vacancy {
    position: relative;
    margin: 8px;
    padding: 48px;
    border-radius: 8px;
    box-shadow: 0 0 20px 0 rgba(124, 124, 124, 0.3);
    transition: box-shadow 300ms;
    max-width: 360px;

    .logo {
      display: block;
      width: 100%;
      height: 100px;

      .logo-container {
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
