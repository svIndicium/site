import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "./style.css";
import App from "./App.vue";
import Home from "@/views/Home.vue";
import Activiteiten from "@/views/Activiteiten.vue";
import OverIndicium from "@/views/OverIndicium.vue";
import Bestuur from "@/views/Bestuur.vue";
import Contact from "@/views/Contact.vue";
import Placeholder from "@/views/Placeholder.vue";
import fourOFour from "@/views/404.vue";
import fourEighteen from "@/views/418.vue";

import "@/assets/scss/variables.scss";
import "@/assets/scss/main.scss";
import "@/assets/scss/typography.scss";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { name: "Home", path: "/", component: Home },
    { name: "Activiteiten", path: "/activiteiten", component: Activiteiten },
    { name: "Over Indicium", path: "/over-indicium", component: OverIndicium },
    { name: "Bestuur", path: "/bestuur", component: Bestuur },
    { name: "Partners", path: "/partners", component: Placeholder },
    { name: "Vacatures", path: "/vacatures", component: Placeholder },
    { name: "Contact", path: "/contact", component: Contact },
    { name: "Statuten", path: "/statuten", component: Placeholder },
    { name: "Privacy reglement", path: "/privacy", component: Placeholder },
    { name: "I'm a tea pot", path: "/418", component: fourEighteen },
    // and finally the default route, when none of the above matches:
    { path: "/:pathMatch(.*)*", component: fourOFour },
  ],
});

const app = createApp(App);
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router);

// we want to store some data, but not with cookies since this is more cool.
// if you get confused about this, check out the devtools.
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.mount("#app");
