<script setup>
import Navbar from "../components/Navbar.vue";
import Hero from "../components/Hero.vue";
import About from "../components/About.vue";
import Episodes from "../components/Episodes.vue";
import Characters from "../components/Characters.vue";
import Locations from "../components/Locations.vue";
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
  <div class="w-full bg-primary">
    <Navbar />
    <Hero />
    <About />
    <Episodes />
    <Characters />
    <Locations />
    <Footer />
  </div>
</template>
<style></style>
