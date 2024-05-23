import "./style.css";
import { createApp, provide, h } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import App from "./App.vue";
import HomePage from "./components/Home/HomePage.vue";
import LocationPage from "./components/LocationPage.vue";
import CharacterPage from "./components/CharacterPage.vue";
import EpisodePage from "./components/EpisodePage.vue";
import { MotionPlugin } from "@vueuse/motion";
const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  uri: "https://rickandmortyapi.com/graphql",
});

const routes = [
  {
    path: "/",
    component: HomePage,
    name: "HomePage",
  },
  {
    path: "/Location/:id",
    component: LocationPage,
    name: "LocationPage",
  },
  {
    path: "/Episode/:id",
    component: EpisodePage,
    name: "EpisodePage",
  },
  {
    path: "/Character/:id",
    component: CharacterPage,
    name: "CharacterPage",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});
app.use(MotionPlugin);
app.use(router);
app.mount("#app");
