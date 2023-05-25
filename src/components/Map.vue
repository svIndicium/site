<script setup lang="ts"></script>

<template>
  <div class="map">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2451.7310543306226!2d5.173675415856721!3d52.08462557973417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c6693e9a2d0c9f%3A0xa9867c6558813da4!2sHogeschool%20Utrecht%2C%20Heidelberglaan%2015%2C%203584%20CS%20Utrecht!5e0!3m2!1sen!2snl!4v1568892960255!5m2!1sen!2snl"
      frameborder="0"
      style="border: 0"
      allowfullscreen
    />
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

.map {
  border-radius: 4px;
  position: relative;

  @media screen and (max-width: var(--bp-tablet-sm)) {
    width: 80vw;
  }

  iframe {
    width: 100%;
    height: 450px;
  }

  @media screen and (max-width: var(--bp-tablet-sm)) {
    margin-top: 16px;
  }
}
</style>
