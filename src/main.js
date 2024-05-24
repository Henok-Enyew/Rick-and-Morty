import "./style.css";
import { createApp, provide, h } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import App from "./App.vue";
import HomePage from "./Pages/HomePage.vue";
import LocationPage from "./Pages/LocationPage.vue";
import CharacterPage from "./Pages/CharacterPage.vue";
import EpisodePage from "./Pages/EpisodePage.vue";
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
