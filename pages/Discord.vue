<!-- https://discord.gg/zYEEEpJhkr -->
<script setup lang="ts">
definePageMeta({ layout: 'minimal' });

onMounted(() => {
  const ref = new URLSearchParams(globalThis.location.search).get('ref');
  globalThis.location.href = 'https://discord.gg/zYEEEpJhkr' + (ref ? '?ref=' + ref : '');
});
</script>

<template>
  <div class="discord-redirect">
    <p>Redirecting to <a href="https://discord.gg/zYEEEpJhkr">HBO-ICT Discord</a>...</p>
    <iframe
      title="HBO-ICT Discord"
      src="https://discord.com/widget?id=748875787180179457&theme=dark"
      width="100%"
      height="100%"
      class="discord-frame"
      sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
    ></iframe>
  </div>
</template>

<style scoped>
.discord-redirect {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  height: 100dvh;
}

.discord-frame {
  max-width: 600px;
  max-height: 800px;
}
</style>
