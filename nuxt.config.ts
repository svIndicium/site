// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Modules
  modules: [
    // '@nuxtjs/sentry', // TODO: Temporarily disabled - needs Nuxt 4 compatible version
    'nuxt-svgo',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
  ],

  // SSG mode for static generation
  ssr: true,

  // Enable devtools in development
  devtools: { enabled: true },

  // App configuration
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Indicium',
      meta: [
        { name: 'description', content: 'Wij zijn dé studievereniging voor HBO-ICT van Hogeschool Utrecht' },
        // Open Graph
        { property: 'og:site_name', content: 'Studievereniging Indicium' },
        { property: 'og:title', content: 'Studievereniging Indicium' },
        { property: 'og:description', content: 'Dé studievereniging voor HBO-ICT van Hogeschool Utrecht' },
        { property: 'og:url', content: 'https://svindicium.nl/' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://svindicium.nl/og-logo.png' },
        { property: 'og:image:alt', content: 'Indicium' },
        // Twitter / X
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' },
        // Preload fonts
        {
          rel: 'preload',
          href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&display=swap',
          as: 'style',
          onload: 'this.onload=null;this.rel="stylesheet"',
        },
        {
          rel: 'preload',
          href: '/fonts/constan.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous',
        },
      ],
      script: [],
      style: [
        // Anti-flicker script - prevents flash of wrong theme on page load
        // Matches colors from variables.scss for consistency
        {
          innerHTML: `
            :root { 
              color-scheme: light;
              background-color: rgb(255, 255, 255);
              color: rgb(51, 51, 51);
            }
            
            @media (prefers-color-scheme: dark) {
              :root {
                color-scheme: dark;
                background-color: rgb(11, 20, 22);
                color: rgb(242, 242, 242);
              }
            }
            
            /* Respect user preference stored in localStorage */
            [data-theme='dark'] {
              color-scheme: dark;
              background-color: rgb(11, 20, 22) !important;
              color: rgb(242, 242, 242) !important;
            }
            
            [data-theme='light'] {
              color-scheme: light;
              background-color: rgb(255, 255, 255) !important;
              color: rgb(51, 51, 51) !important;
            }
          `,
        },
      ],
      noscript: [
        {
          innerHTML: 'JavaScript is required to use this website.',
        },
      ],
    },
  },

  // CSS configuration
  css: ['~/assets/scss/main.scss'],

  // Vue configuration for custom elements
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['add-to-calendar-button'].includes(tag),
    },
  },

  // Build configuration
  build: {
    transpile: ['v-viewer'],
  },
  compatibilityDate: '2024-11-01',

  // Nitro configuration for static site generation
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  // Vite configuration
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use '@/assets/scss/variables' as *;
            @use '@/assets/scss/typography' as *;
          `,
        },
      },
    },
  },

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: false,
  },

  // ESLint module configuration
  eslint: {
    config: {
      stylistic: false, // Disable stylistic rules, using Prettier instead
    },
  },

  // Color mode configuration
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    classSuffix: '-mode', // adds class like .dark-mode, .light-mode to <html>
    dataValue: 'theme', // adds data-theme="dark" or "light" to <html>
    storageKey: 'nuxt-color-mode', // localStorage key
  },

  // SVGO configuration for SVG optimization
  svgo: {
    defaultImport: 'component',
  },
});
