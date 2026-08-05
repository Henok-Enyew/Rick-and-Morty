<script setup>
import { defineAsyncComponent } from "vue";
import Navbar from "../components/Navbar.vue";
import Hero from "../components/Hero.vue";
import Footer from "../components/Footer.vue";
import BackgroundLayer from "../components/BackgroundLayer.vue";
import { useSectionBackgrounds } from "../composables/useSectionBackgrounds";
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

const SECTION_IDS = ["hero", "about", "episodes", "characters", "locations"];

const { activeSection } = useSectionBackgrounds(SECTION_IDS);

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
  <div class="page-shell w-full">
    <BackgroundLayer :active-section="activeSection" />
    <div class="page-shell__content">
      <Navbar />
      <Hero />
      <About />
      <Episodes />
      <Characters />
      <Locations />
      <Footer />
    </div>
  </div>
</template>

<style>
.page-shell {
  position: relative;
  overflow-x: hidden;
  max-width: 100%;
  width: 100%;
  background: transparent;
}

.page-shell__content {
  position: relative;
  z-index: 1;
}
</style>
