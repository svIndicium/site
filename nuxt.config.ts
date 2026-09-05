// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Modules
  modules: [
    // '@nuxtjs/sentry', // TODO: Temporarily disabled - needs Nuxt 4 compatible version
    'nuxt-svgo',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/content',
    'nuxt-studio',
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
        // Prose* components are @nuxt/content's markdown renderers (e.g. ProseH1
        // renders a `# heading`), globally registered and surfaced by Studio as
        // insertable components. They're redundant with Studio's native heading
        // commands, so exclude them from the editor's component list.
        exclude: ['Prose*'],
        // Group the homepage MDC components under a single labelled group in the
        // editor's component list.
        groups: [
          {
            label: 'Home',
            include: ['HeroSection', 'Home*', 'ActivityCalendar', 'SocialSidebar'],
          },
        ],
        ungrouped: 'omit',
      },
    },
    // Pin the repository so prod builds (e.g. local `pnpm generate`) resolve
    // it without relying on CI env vars. Matches the deployed repo; CI env
    // detection still takes precedence when set.
    repository: {
      provider: 'github',
      owner: 'svIndicium',
      repo: 'site',
      branch: 'main',
    },
  },

  // Studio is only needed in dev/editing; keep it out of the static prod
  // build (also silences the "setup authentication" warning on generate).
  $production: {
    studio: false,
  },

  // Redirect for Nuxt Studio UX
  routeRules: {
    '/boards/**': { redirect: '/besturen' },
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
