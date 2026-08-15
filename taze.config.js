import { defineConfig } from 'taze';

//   pnpm taze        # preview (no changes)
//   pnpm taze -w     # write bumps (only minor/patches, no majors)
//   pnpm taze major  # can be used with -w, will write majors (make sure to check locally and allow for downtime if needed)

export default defineConfig({
  // Nuxt/Vue majors are breaking; require explicit `taze major`.
  // We should use pnpm nuxt upgrade --dedupe in most cases, but taze can help with the rest of the deps.
  packageMode: {
    nuxt: 'minor',
    vue: 'minor',
    '@nuxt/content': 'minor',
    '@nuxt/eslint': 'minor',
    '@nuxtjs/color-mode': 'minor',
    '@vueuse/nuxt': 'minor',
    'nuxt-svgo': 'minor',
  },

  // Block surprise majors from build-affecting deps.
  exclude: ['better-sqlite3@^13', 'firebase@^13', 'esbuild'],

  // Only offer versions published >= 7 days ago (supply-chain cooldown).
  maturityPeriod: 7,

  // Pins action updates to the hash and not the version tag (stricter)
  githubActions: {
    style: 'sha',
  },

  // Ignore paths that are not relevant to dependency updates. Not doing so might cause slowdowns.
  ignorePaths: ['**/node_modules/**', '**/.nuxt/**', '**/.output/**', '**/dist/**'],
});
