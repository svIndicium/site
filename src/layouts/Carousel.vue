<script setup lang="ts">
  import Glide from '@glidejs/glide';
  import { onMounted } from 'vue';

  onMounted(async () => {
    const glide = new Glide('.glide', {
      type: 'carousel',
      autoplay: 5000,
      animationDuration: 800,
      swipeThreshold: false,
      dragThreshold: false,
      hoverpause: false,
    });

    glide.mount();
  });

  defineProps({
    images: Array<string>
  });


</script>

<template>
  <div class="photos">
    <div class="glide">
      <div class="glide__track" data-glide-el="track">
        <ul class="glide__slides">
          <li class="glide__slide" v-for="image in images">
            <img class="image" :src="image">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "@glidejs/glide/src/assets/sass/glide.core";

  * {
    max-height: inherit;
  }

  .image {
    object-fit: cover;
  }

  .photos {
    max-width: 90vw;
    margin: 0 auto;
  }

  .glide {
    cursor: initial;
  }
</style>
