import { defineStore } from 'pinia';

export const stateStore = defineStore({
  id: 'state',
  state: () => ({
    authentication: {
      loggedin: false,
    },
    settings: {
      theme: 'auto',
    },
    state: {
      navLevel: 0,  // 0 is closed
    },
  }),
  actions: {
    refreshTheme() {
      if (this.darkModeActive) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    },
  },
  getters: {
    darkModeActive: (state) => {
      if (state.settings.theme == 'dark') return true;
      if (
        state.settings.theme == 'auto' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme:dark)').matches
      )
        return true;
      return false;
    },
  },
  persist: {
    storage: sessionStorage,
    paths: ['authentication', 'settings'],
  },
});
