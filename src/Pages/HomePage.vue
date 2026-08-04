<script setup>
import { defineAsyncComponent } from "vue";
import Navbar from "../components/Navbar.vue";
import Hero from "../components/Hero.vue";
import Footer from "../components/Footer.vue";
import { useSeo } from "../composables/useSeo";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_IMAGE,
  DEFAULT_SEO,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "../seo/defaults";

const About = defineAsyncComponent(() => import("../components/About.vue"));
const Episodes = defineAsyncComponent(() => import("../components/Episodes.vue"));
const Characters = defineAsyncComponent(() => import("../components/Characters.vue"));
const Locations = defineAsyncComponent(() => import("../components/Locations.vue"));

useSeo({
  title: DEFAULT_SEO.title,
  description: DEFAULT_DESCRIPTION,
  path: "/",
  image: DEFAULT_IMAGE,
  type: "website",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_TAGLINE,
    inLanguage: "en",
    potentialAction: {
      "@type": "ViewAction",
      target: `${SITE_URL}/#episodes`,
    },
  },
});
</script>
<template>
  <div class="page-shell w-full bg-primary">
    <Navbar />
    <Hero />
    <About />
    <Episodes />
    <Characters />
    <Locations />
    <Footer />
  </div>
</template>
<style>
.page-shell {
  overflow-x: hidden;
  max-width: 100%;
  width: 100%;
}
</style>
