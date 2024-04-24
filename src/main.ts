import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';
import 'viewerjs/dist/viewer.css';
import VueViewer from 'v-viewer';

// Sentry production error logger.
import * as Sentry from '@sentry/vue';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD_4U8xu0z-fEqhGQyEt-walZiNSLN0Z9s',
  authDomain: 'svindicium-website.firebaseapp.com',
  databaseURL: 'https://svindicium-website-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'svindicium-website',
  storageBucket: 'svindicium-website.appspot.com',
  messagingSenderId: '18534773268',
  appId: '1:18534773268:web:f816171343e066a079ad01',
  measurementId: 'G-449W2Y5BHP',
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseapp);

import Home from '@/views/Home.vue';
import OverIndicium from '@/views/OverIndicium.vue';
import Sandbox from '@/views/Sandbox.vue';
import Bestuur from '@/views/Bestuur.vue';
import LidWorden from '@/views/LidWorden.vue';
import Intro from '@/views/Intro.vue';
import Besturen from '@/views/BestuurTijdlijn.vue';
import Commissies from '@/views/Commissies.vue';
import Dispuut from '@/views/Dispuut.vue';
import Partners from '@/views/Partners.vue';
import Partner from '@/views/Partner.vue';
import Contact from '@/views/Contact.vue';
import Vcp from '@/views/Vcp.vue';
import Statuten from '@/views/Statuten.vue';
import Privacy from '@/views/Privacy.vue';
import BetalingGelukt from '@/views/BetalingGelukt.vue';
import BetalingMislukt from '@/views/BetalingMislukt.vue';
import HR from '@/views/HR.vue';
import Placeholder from '@/views/Placeholder.vue';
import FourOFour from '@/views/404.vue';
import FourEighteen from '@/views/418.vue';
import Error from '@/views/error.vue';
import Links from './views/Links.vue';
import Discord from './views/Discord.vue';

import { isUAMobile } from '@/utils/userAgentData';

import '@/assets/scss/variables.scss';
import '@/assets/scss/main.scss';
import '@/assets/scss/typography.scss';

// check now, retrieve later for maximum speed
const isMobile = isUAMobile();

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { name: 'Home', path: '/', component: Home },
    // { name: 'Activiteiten', path: '/activiteiten', component: Activiteiten },
    { name: 'Over Indicium', path: '/over-indicium', component: OverIndicium },
    {
      name: 'Lid Worden',
      path: '/lid-worden',
      component: LidWorden,
      beforeEnter: (to, from, next) => {
        if (isMobile) {
          // before enter is used so the page doesn't flicker on mobile
          window.location.replace('https://leden.conscribo.nl/svIndicium/aanmeldenlidmaatschap');
        } else {
          next();
        }
      },
    },
    { name: 'Bestuur', path: '/bestuur', component: Bestuur },
    { name: 'Intro', path: '/intro', component: Intro },
    { name: 'Oud Bestuur', path: '/besturen', component: Besturen },
    { name: 'Commissies', path: '/commissies', component: Commissies },
    { name: 'Dispuut', path: '/dispuut', component: Dispuut },
    { name: 'Partners', path: '/partners', component: Partners },
    { name: 'Partner', path: '/partners/:partner', component: Partner },
    { name: 'Vacatures', path: '/vacatures', component: Placeholder },
    { name: 'Contact', path: '/contact', component: Contact },
    { name: 'Vertrouwens Contact Personen', path: '/vcp', component: Vcp },
    { name: 'Statuten', path: '/statuten', component: Statuten },
    { name: 'HR', path: '/hr', component: HR },
    { name: 'Privacy', path: '/privacyreglement', component: Privacy },
    { name: 'Betaling Gelukt', path: '/pay-success', component: BetalingGelukt },
    { name: 'Betaling Mislukt', path: '/pay-fail', component: BetalingMislukt },
    { name: 'Sandbox', path: '/sandbox', component: Sandbox },
    { name: "I'm a tea pot", path: '/418', component: FourEighteen },
    { name: 'Error', path: '/error', component: Error },
    // quick links page for socials:
    { name: 'Links', path: '/links', component: Links },
    { name: 'Discord', path: '/discord', component: Discord },
    // and finally the default route, when none of the above matches:
    { name: 'Pagina niet gevonden', path: '/:pathMatch(.*)*', component: FourOFour },
  ],
  scrollBehavior: (to, from, savedPosition) => {
    return { top: savedPosition?.top ?? 0 };
  },
});

const app = createApp(App);

// Init sentry after createApp(App) and before app.use(router);
Sentry.init({
  app,
  dsn: 'https://2bfb847cd3d1d790b53925093b61a8f5@o4506729777594368.ingest.sentry.io/4506729846996992', // DSN is a public token!
  integrations: [
    // Add browser profiling integration to the list of integrations
    Sentry.browserTracingIntegration(),
    Sentry.browserProfilingIntegration(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', /^https:\/\/svindicium\.nl\/api/],

  // Set profilesSampleRate to 1.0 to profile every transaction.
  // Since profilesSampleRate is relative to tracesSampleRate,
  // the final profiling rate can be computed as tracesSampleRate * profilesSampleRate
  // For example, a tracesSampleRate of 0.5 and profilesSampleRate of 0.5 would
  // results in 25% of transactions being profiled (0.5*0.5=0.25)
  profilesSampleRate: 1.0,
});

// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router);

router.afterEach((to, from, failure) => {
  if (to.name) {
    document.title = 'Indicium - ' + to.name.toString();
  }
});

// we want to store some data, but not with cookies since this is more cool.
// if you get confused about this, check out the devtools.
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(VueViewer);
app.mount('#app');
