import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  modules: [
    'nuxt-svgo',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/content',
    'nuxt-studio',
    '@nuxt/icon',

    // Registered last on purpose: the @nuxtjs/mdc module pushes ten
    // `@nuxtjs/mdc > <dep>` entries into vite.optimizeDeps.include, and
    // @nuxt/content's own shim for those ids (dist/module.mjs: "…replace(
    // /^@nuxtjs\/mdc > /, '@nuxt/content > @nuxtjs/mdc > ')") does not catch
    // them — they reach Vite unscoped, and Vite resolves `pkg > dep` with
    // basedir = resolvePackageData("@nuxtjs/mdc", rootDir)?.dir, which is not a
    // project dependency, so it falls back to the root and all ten fail
    // (NUXT_B7002). Re-applying the same rewrite here, after every module has
    // contributed its entries, scopes them under @nuxt/content, whose tree does
    // contain @nuxtjs/mdc. Delete when upstream ordering stops needing it —
    // see docs/tech-debt/05-low-priority.md (TD-056).
    (_options, nuxt) => {
      nuxt.hook('vite:extendConfig', (config) => {
        // `optimizeDeps` is typed read-only, so rewrite the entries in place.
        const include = config.optimizeDeps?.include;
        if (!include) return;
        include.forEach((id, index) => {
          include[index] = id.replace(/^@nuxtjs\/mdc > /, '@nuxt/content > @nuxtjs/mdc > ');
        });
      });
    },
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

  // SSG: no server. Client fetches Google Calendar directly at hydration, so
  // the key is public by design (it ships in the bundle either way).
  // Override with NUXT_PUBLIC_AGENDA_API_KEY. Empty falls back to the
  // placeholder in utils/agenda.ts so prerender never breaks. The sole real
  // mitigation is a Google Cloud referrer restriction (user-side follow-up).
  runtimeConfig: {
    public: {
      agendaApiKey: '',
    },
  },

  // Build configuration
  build: {},
  compatibilityDate: '2026-05-08',

  // Nitro configuration for Cloudflare Workers (Workers Builds runs
  // `pnpm run build` then `wrangler deploy`; wrangler.jsonc provides main +
  // assets, Nitro preset must emit .output/server/index.mjs, not static).
  nitro: {
    preset: 'cloudflare_module',
    prerender: {
      autoSubfolderIndex: false,
      crawlLinks: true,
      routes: ['/'],
    },
  },

  // Vite configuration
  vite: {
    optimizeDeps: {
      include: ['ua-parser-js', 'add-to-calendar-button', 'embla-carousel-vue'],
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

  // Icons. components/LinkCard.vue renders Iconify names from content/*.{yml,md};
  // the editor's picker is scoped to the same two collections (studio.editor
  // .iconLibraries), so what an editor can insert is always what the site resolves.
  // `scan` walks the project for `i-<collection>:<name>` including content files,
  // so the client bundle follows the content automatically — nothing to keep in sync.
  // `mode: 'svg'` inlines the SVG at prerender (no JS needed, no runtime fetching);
  // `fallbackToApi: false` keeps an unknown name from silently calling a third party
  // (an unknown name instead logs `[Icon] failed to load icon` and renders empty).
  icon: {
    mode: 'svg',
    provider: 'server',
    fallbackToApi: false,
    clientBundle: {
      scan: true,
    },
  },

  // Nuxt Studio configuration
  studio: {
    editor: {
      // Icon picker scope. Unset means the picker searches the whole Iconify
      // catalogue (~150 collections) while the site can only resolve the ones
      // installed locally, so an editor could pick an icon that silently renders
      // empty. Keep this list identical to the installed @iconify-json packages:
      // both are Material-derived, so the icon styles match.
      iconLibraries: ['mdi', 'ic'],
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
            include: ['HeroSection', 'HeroButton', 'Home*', 'ActivityCalendar', 'SocialSidebar'],
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
  // Vitest runs with NODE_ENV=test where $production doesn't apply, so
  // silence the same warning there too. Unrelated to agenda work.
  $test: {
    studio: false,
  },
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
        HeroButton: true,
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
