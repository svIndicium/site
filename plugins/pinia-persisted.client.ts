import type { Pinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = nuxtApp.$pinia as Pinia;
  pinia.use(piniaPluginPersistedstate);
});
