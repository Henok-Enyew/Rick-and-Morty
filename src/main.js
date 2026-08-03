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
    meta: {
      title: "Home",
      description:
        "Explore Rick and Morty characters, episodes, and locations across the multiverse.",
    },
  },
  {
    path: "/Location/:id",
    component: LocationPage,
    name: "LocationPage",
    meta: {
      title: "Location",
      description: "Rick and Morty location details, dimension, and residents.",
    },
  },
  {
    path: "/Episode/:id",
    component: EpisodePage,
    name: "EpisodePage",
    meta: {
      title: "Episode",
      description: "Rick and Morty episode details and cast list.",
    },
  },
  {
    path: "/Character/:id",
    component: CharacterPage,
    name: "CharacterPage",
    meta: {
      title: "Character",
      description: "Rick and Morty character profile and episode appearances.",
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, top: 80, behavior: "smooth" };
    }
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },
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
