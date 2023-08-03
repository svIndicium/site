import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import App from './App.vue';
import 'viewerjs/dist/viewer.css';
import VueViewer from 'v-viewer';

import Home from '@/views/Home.vue';
import Activiteiten from '@/views/Activiteiten.vue';
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

import '@/assets/scss/variables.scss';
import '@/assets/scss/main.scss';
import '@/assets/scss/typography.scss';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { name: 'Home', path: '/', component: Home },
    // { name: 'Activiteiten', path: '/activiteiten', component: Activiteiten },
    { name: 'Over Indicium', path: '/over-indicium', component: OverIndicium },
    { name: 'Bestuur', path: '/bestuur', component: Bestuur },
    { name: 'Lid Worden', path: '/lid-worden', component: LidWorden },
    { name: 'Intro', path: '/intro', component: Intro },
    { name: 'Oud Bestuur', path: '/besturen', component: Besturen },
    { name: 'Commissies', path: '/commissies', component: Commissies },
    { name: 'Dispuut', path: '/dispuut', component: Dispuut },
    { name: 'Partners', path: '/partners', component: Partners },
    { name: 'Partner', path: '/partners/:partner', component: Partner },
    { name: 'Vacatures', path: '/vacatures', component: Placeholder },
    { name: 'Contact', path: '/contact', component: Contact },
    { name: 'Statuten', path: '/statuten', component: Statuten },
    { name: 'HR', path: '/hr', component: HR },
    { name: 'Privacy', path: '/privacyreglement', component: Privacy },
    { name: 'Betaling Gelukt', path: '/pay-success', component: BetalingGelukt },
    { name: 'Betaling Mislukt', path: '/pay-fail', component: BetalingMislukt },
    { name: 'Sandbox', path: '/sandbox', component: Sandbox },
    { name: "I'm a tea pot", path: '/418', component: FourEighteen },
    { name: 'Error', path: '/error', component: Error },
    // quick links page for socials:
    { name: 'Indicium Links', path: '/links', component: Links },
    // and finally the default route, when none of the above matches:
    { name: 'Pagina niet gevonden', path: '/:pathMatch(.*)*', component: FourOFour },
  ],
  scrollBehavior: (to, from, savedPosition) => {
    return { top: savedPosition?.top ?? 0 };
  },
});

const app = createApp(App);
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
