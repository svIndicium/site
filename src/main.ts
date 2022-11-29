import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import "./style.css";
import App from "./App.vue";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ name: "Home", path: "/", component: Home },
		{ name: "About", path: "/about", component: About },
	],
});

const app = createApp(App);
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router);

app.mount("#app");
