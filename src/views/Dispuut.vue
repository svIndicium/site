<script setup lang="ts">
import ContentContainer from '@/layouts/ContentContainer.vue';
import dispuut from '@/content/dispuut.json';

const [disputen] = dispuut;

</script>

<template>
  <ContentContainer>
    <h1>Dispuut</h1>
    <div class="dispuut" v-for="dispuut in dispuut">
      <img class="dispuut-foto" :src="dispuut.imgUrl" :alt="'Foto' + dispuut.title">
      <p class="description">{{ dispuut.description }}</p>
    </div>
  </ContentContainer>
</template>

<style scoped lang="scss">
#dispuut {
  width: 80%;
  margin: 0 auto;

  .dispuut-foto {
    margin-top: 2em;
    margin-bottom: 2em;
    width: 35%;
  }

  .description {
    margin: 2em auto;
    // width: 75%;
  }
}

.dispuut {
  width: 80%;
  margin: 0 auto;
  padding: 5em 0;

  /*.dispuut-foto {
    float: left;
    margin: 0.2em 0.8em 0.8em 0;
    width: 20%;
  }*/

  .description {
    text-align: left;
    margin: 0;
  }

  :after {
    content: "";
    visibility: hidden;
    display: block;
    height: 0;
    clear: both;
  }
}
p {
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

</style>
