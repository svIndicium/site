import { defineStore } from 'pinia';

export const stateStore = defineStore('state', {
  state: () => ({
    authentication: {
      loggedin: false,
    },
    settings: {
      theme: 'auto' as 'auto' | 'dark' | 'light',
    },
    state: {
      navLevel: 0, // 0 is closed
    },
  }),
  actions: {
    refreshTheme() {
      // Only run on client side
      if (import.meta.client) {
        if (this.darkModeActive) {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.setAttribute('data-theme', 'light');
        }
      }
    },
  },
  getters: {
    darkModeActive: (state): boolean => {
      if (state.settings.theme === 'dark') return true;
      if (state.settings.theme === 'light') return false;
      // Only check window.matchMedia on client side
      if (
        state.settings.theme === 'auto' &&
        import.meta.client &&
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme:dark)').matches
      )
        return true;
      return false;
    },
  },
  persist: {
    storage: import.meta.client ? localStorage : undefined,
    pick: ['authentication', 'settings'],
  },
});
