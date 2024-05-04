import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import { fileURLToPath, URL } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['add-to-calendar-button'].includes(tag),
        },
      },
    }),
    svgLoader({
      defaultImport: 'component',
    }),
    sentryVitePlugin({
      org: 'sv-indicium',
      project: 'frontend',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`,
        manualChunks: {
          'vue-chunk': ['vue'],
          'sentry-chunk': ['@sentry/vue'],
          // 'firebase-chunk': ['firebase/app', 'firebase/analytics'],
          // 'ua-parser-js-chunk': ['ua-parser-js'],
          'add-to-calender-chunk': ['add-to-calendar-button'],
        },
      },
    },
    sourcemap: true,
  },
});
