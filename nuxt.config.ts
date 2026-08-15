// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Modules
  modules: [// '@nuxtjs/sentry', // TODO: Temporarily disabled - needs Nuxt 4 compatible version
  'nuxt-svgo', '@nuxt/eslint', '@vueuse/nuxt', '@nuxtjs/color-mode', '@nuxt/content', 'nuxt-studio'],

  // SSG mode for static generation
  ssr: true,

  // Enable devtools in development
  devtools: { enabled: true },

  // App configuration
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: { lang: 'nl' },
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
        {
          innerHTML: `
            :root {
              color-scheme: light;
              --text-color-raw: 51,51,51;
              --root-background-color-raw: 255,255,255;
              --secondary-background-color-raw: 242,242,242;
              --text-color: rgb(51,51,51);
              --root-background-color: rgb(255,255,255);
              --secondary-background-color: rgb(242,242,242);
              --hero-bg-color-raw: 242,242,242;
              --pcb-trace-color-raw: 211,211,211;
              --hero-bg-color: rgb(242,242,242);
              --pcb-trace-color: rgb(211,211,211);
              --indi-blue-1: rgb(114,201,225);
              --indi-blue-2: rgb(170,222,237);
              --indi-blue-3: rgb(226,244,249);
              --indi-green-1: rgb(163,207,155);
              --indi-green-2: rgb(199,226,195);
              --indi-green-3: rgb(239,245,235);
              --indi-blue-green-1: rgb(115,195,182);
              --indi-blue-green-2: rgb(171,219,211);
              --indi-blue-green-3: rgb(227,243,240);
              background-color: var(--root-background-color);
              color: var(--text-color);
            }

            @media (prefers-color-scheme: dark) {
              :root {
                color-scheme: dark;
                --text-color-raw: 242,242,242;
                --root-background-color-raw: 11,20,22;
                --secondary-background-color-raw: 47,52,55;
                --text-color: rgb(242,242,242);
                --root-background-color: rgb(11,20,22);
                --secondary-background-color: rgb(47,52,55);
                --hero-bg-color-raw: 0,0,0;
                --pcb-trace-color-raw: 51,51,51;
                --hero-bg-color: rgb(0,0,0);
                --pcb-trace-color: rgb(51,51,51);
                --indi-blue-1: rgb(68,120,135);
                --indi-blue-2: rgb(47,84,94);
                --indi-blue-3: rgb(27,48,54);
                --indi-green-1: rgb(97,124,93);
                --indi-green-2: rgb(67,86,65);
                --indi-green-3: rgb(38,49,37);
                --indi-blue-green-1: rgb(69,117,109);
                --indi-blue-green-2: rgb(48,81,76);
                --indi-blue-green-3: rgb(27,46,43);
                background-color: var(--root-background-color);
                color: var(--text-color);
              }
            }

            [data-theme='dark'] {
              color-scheme: dark;
              --text-color-raw: 242,242,242;
              --root-background-color-raw: 11,20,22;
              --secondary-background-color-raw: 47,52,55;
              --text-color: rgb(242,242,242);
              --root-background-color: rgb(11,20,22);
              --secondary-background-color: rgb(47,52,55);
              --hero-bg-color-raw: 0,0,0;
              --pcb-trace-color-raw: 51,51,51;
              --hero-bg-color: rgb(0,0,0);
              --pcb-trace-color: rgb(51,51,51);
              --indi-blue-1: rgb(68,120,135);
              --indi-blue-2: rgb(47,84,94);
              --indi-blue-3: rgb(27,48,54);
              --indi-green-1: rgb(97,124,93);
              --indi-green-2: rgb(67,86,65);
              --indi-green-3: rgb(38,49,37);
              --indi-blue-green-1: rgb(69,117,109);
              --indi-blue-green-2: rgb(48,81,76);
              --indi-blue-green-3: rgb(27,46,43);
              background-color: var(--root-background-color) !important;
              color: var(--text-color) !important;
            }

            [data-theme='light'] {
              color-scheme: light;
              --text-color-raw: 51,51,51;
              --root-background-color-raw: 255,255,255;
              --secondary-background-color-raw: 242,242,242;
              --text-color: rgb(51,51,51);
              --root-background-color: rgb(255,255,255);
              --secondary-background-color: rgb(242,242,242);
              --hero-bg-color-raw: 242,242,242;
              --pcb-trace-color-raw: 211,211,211;
              --hero-bg-color: rgb(242,242,242);
              --pcb-trace-color: rgb(211,211,211);
              --indi-blue-1: rgb(114,201,225);
              --indi-blue-2: rgb(170,222,237);
              --indi-blue-3: rgb(226,244,249);
              --indi-green-1: rgb(163,207,155);
              --indi-green-2: rgb(199,226,195);
              --indi-green-3: rgb(239,245,235);
              --indi-blue-green-1: rgb(115,195,182);
              --indi-blue-green-2: rgb(171,219,211);
              --indi-blue-green-3: rgb(227,243,240);
              background-color: var(--root-background-color) !important;
              color: var(--text-color) !important;
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
  css: ['~/assets/css/variables.css', '~/assets/css/typography.css', '~/assets/css/main.css'],

  // Vue configuration for custom elements
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('add-'),
    },
  },

  // Build configuration
  build: {},
  compatibilityDate: '2026-05-08',

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
    optimizeDeps: {
      include: ['firebase/app', 'firebase/analytics', 'ua-parser-js', 'add-to-calendar-button', 'embla-carousel-vue'],
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

  // Nuxt Studio configuration
  studio: {
    editor: {
      components: {
        // Group the homepage MDC components under a single labelled group in the
        // editor's component list, and omit every other (non-content) component.
        groups: [
          {
            label: 'Home',
            include: ['HeroSection', 'Home*', 'ActivityCalendar', 'SocialSidebar'],
          },
        ],
        ungrouped: 'omit',
      },
    },
  },

  // Globally register the homepage MDC components so Nuxt Studio lists them in
  // the visual editor's component picker (the '/' slash command). MDC block
  // components are resolved by name, so only global components are insertable.
  hooks: {
    'components:extend': (components) => {
      const mdcContentComponents: Record<string, true> = {
        HeroSection: true,
        HomeGrid: true,
        HomeMain: true,
        HomeAside: true,
        HomeImageCarousel: true,
        HomeTextBlock: true,
        HomePartners: true,
        ActivityCalendar: true,
        SocialSidebar: true,
      };

      components
        .filter((component) => component.pascalName in mdcContentComponents)
        .forEach((component) => {
          component.global = true;
        });
    },
  },
});