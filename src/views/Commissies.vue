<script setup lang="ts">

import ContentContainer from "@/layouts/ContentContainer.vue";
import commissies from '@/content/commissies.json';
const [commissie] = commissies;

/*function readerCom() {
  for (commissie ; commissies){
    var divElement =
  }
}*/


</script>

<template>
    <content-container>
      <div class="commissie" v-for="commissie in commissies">
        <h1>{{commissie.title}}</h1>
<!--        https://udn.realityripple.com/docs/Web/API/Element/scrollIntoView-->
        <img class="foto" :src="commissie.imgUrl" >
        <p class="description">{{ commissie.description }}</p>
      </div>
    </content-container>
</template>

<style scoped lang="scss">
.commissie:before{
  width: 50%;
  margin: 0 auto;
  padding: 5em 0;

  .foto {
    float: left;
    margin: 0.2em 0.8em 0.8em 0;
    width: 20%;
  }

  .description {
    text-align: left;
    margin: 0;
  }

  :after {
    content: "";
    visibility: hidden;
    display: grid;
    height: 0;
    clear: both;
  }
}
.commissie:after {
  width: 80%;
  margin: 0 auto;
  padding: 5em 0;

  .foto {
    float: left;
    margin: 0.2em 0.8em 0.8em 0;
    width: 20%;
  }

  .description {
    text-align: center;
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
</style>
