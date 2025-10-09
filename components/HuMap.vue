<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts"></script>

<template>
  <div class="map">
    <iframe
      title="Locatie Studievereniging Indicium"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2451.7310543306226!2d5.173675415856721!3d52.08462557973417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c6693e9a2d0c9f%3A0xa9867c6558813da4!2sHogeschool%20Utrecht%2C%20Heidelberglaan%2015%2C%203584%20CS%20Utrecht!5e0!3m2!1sen!2snl!4v1568892960255!5m2!1sen!2snl"
      style="border: 0"
      allowfullscreen
    />
  </div>
</template>

<style lang="scss" scoped>
.map {
  border-radius: 4px;
  position: relative;

  iframe {
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: #{bp-tablet-sm}) {
    margin-top: 16px;
  }
}
</style>
