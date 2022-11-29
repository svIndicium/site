<script setup lang="ts">

</script>

<template>
  <div class="header">
    <h1> (</h1>
    <h2>//</h2>
    <h1> O W O </h1>
    <h2>//</h2>
    <h1>)</h1>
  </div>
  <router-view></router-view>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: center;

  h1 {
    font-size: 50px;
  }

  h2 {
    margin: 50px 20px 0 20px;
    font-size: 50px;
    color: pink;
  }
}
</style>
