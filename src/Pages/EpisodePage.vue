<script setup>
import { computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { useRoute } from "vue-router";
import { Episode_Query } from "../queries/episodeQuery";
import DetailNav from "../components/DetailNav.vue";
import PortalOverlay from "../components/PortalOverlay.vue";
import DetailSkeleton from "../components/DetailSkeleton.vue";
import FetchErrorOverlay from "../components/FetchErrorOverlay.vue";
import Footer from "../components/Footer.vue";
import { useSeo, buildTitle } from "../composables/useSeo";
import { DEFAULT_IMAGE, SITE_URL } from "../seo/defaults";

const route = useRoute();
const { result, loading, error, refetch } = useQuery(Episode_Query, () => ({
  id: route.params.id,
}));

const episode = computed(() => result.value?.episode);
const castCount = computed(() => episode.value?.characters?.length ?? 0);

const seo = computed(() => {
  const ep = episode.value;
  if (!ep) {
    return {
      title: buildTitle("Episode"),
      description:
        "Explore Rick and Morty episode details, air dates, and the full cast from this timeline.",
      path: `/Episode/${route.params.id}`,
      image: DEFAULT_IMAGE,
      type: "article",
    };
  }

  return {
    title: buildTitle(`${ep.episode} — ${ep.name}`),
    description: `Rick and Morty ${ep.episode}: ${ep.name}. Aired ${ep.air_date}. Meet ${castCount.value} characters from this episode.`,
    path: `/Episode/${ep.id || route.params.id}`,
    image: DEFAULT_IMAGE,
    type: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "TVEpisode",
      name: ep.name,
      episodeNumber: ep.episode,
      datePublished: ep.air_date,
      url: `${SITE_URL}/Episode/${ep.id || route.params.id}`,
      partOfSeries: {
        "@type": "TVSeries",
        name: "Rick and Morty",
      },
    },
  };
});

useSeo(seo);

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function statusClass(status) {
  if (status === "Alive") return "is-alive";
  if (status === "Dead") return "is-dead";
  return "is-unknown";
}
</script>

<template>
  <div class="detail detail--episode">
    <div class="detail__media" aria-hidden="true" />
    <div class="detail__veil" aria-hidden="true" />

    <DetailNav back-label="All episodes" />

    <main class="detail__main">
      <DetailSkeleton v-if="!episode" variant="episode" />

      <template v-else>
        <section class="episode-hero">
          <p class="detail__eyebrow">Broadcast File</p>
          <p class="episode-hero__code">{{ episode.episode }}</p>
          <h1 class="episode-hero__title">{{ episode.name }}</h1>

          <div class="episode-hero__meta">
            <span class="meta-chip">
              <strong>Aired</strong>
              {{ episode.air_date }}
            </span>
            <span class="meta-chip">
              <strong>Logged</strong>
              {{ formatDate(episode.created) }}
            </span>
            <span class="meta-chip">
              <strong>Cast</strong>
              {{ castCount }} weirdos
            </span>
          </div>
        </section>

        <section class="detail-panel">
          <div class="detail-panel__head">
            <h2>Characters in this episode</h2>
            <p>Tap a face. Enter their chaos.</p>
          </div>

          <div v-if="castCount" class="cast-grid">
            <router-link
              v-for="character in episode.characters"
              :key="character.id"
              :to="`/Character/${character.id}`"
              class="cast-card"
            >
              <div class="cast-card__media">
                <img
                  :src="character.image"
                  :alt="character.name"
                  loading="lazy"
                />
                <span class="cast-card__badge" :class="statusClass(character.status)">
                  {{ character.status }}
                </span>
              </div>
              <div class="cast-card__body">
                <h3>{{ character.name }}</h3>
                <p>{{ character.species }} · {{ character.gender }}</p>
              </div>
            </router-link>
          </div>

          <p v-else class="detail__empty">No characters found in this timeline.</p>
        </section>
      </template>
    </main>

    <Footer
      figma-url="https://www.figma.com/design/i3GtKBaZb4uL4Cd1tc3jcH/Episode-Page?node-id=0%3A1&t=XVOXk91BUPT24iHv-1"
    />

    <PortalOverlay
      :show="loading && !error"
      message="Cueing the episode…"
    />

    <FetchErrorOverlay
      :show="!!error && !episode"
      :message="error?.message || 'Failed to fetch'"
      @retry="refetch"
    />
  </div>
</template>

<style scoped>
.detail {
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  min-height: 100svh;
  color: #e8ece4;
  background: #121c0e;
}

.detail__media {
  position: fixed;
  inset: 0;
  z-index: -2;
  background:
    url("https://www.looper.com/img/gallery/the-most-terrible-things-rick-morty-have-ever-done/cronenberg-the-world-1497028481.jpg")
    center / cover no-repeat;
}

.detail__veil {
  position: fixed;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(180deg, rgba(18, 28, 14, 0.88) 0%, rgba(18, 28, 14, 0.94) 55%, #121c0e 100%),
    radial-gradient(ellipse at 20% 10%, rgba(81, 217, 40, 0.16), transparent 45%);
  backdrop-filter: blur(3px);
}

.detail__main {
  width: min(72rem, 100%);
  margin: 0 auto;
  padding: 1.75rem 1.5rem 2.5rem;
  min-height: 32rem;
}

.detail__error,
.detail__empty {
  padding: 2rem 1rem;
  text-align: center;
  color: rgba(232, 236, 228, 0.8);
}

.detail__error {
  color: #fca5a5;
}

.detail__eyebrow {
  margin: 0 0 0.35rem;
  font-family: var(--font-display);
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(81, 217, 40, 0.95);
}

.episode-hero {
  margin-bottom: 1.5rem;
  animation: rise 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.episode-hero__code {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.04em;
  color: #9cff66;
  text-shadow: 0 0 40px rgba(81, 217, 40, 0.25);
}

.episode-hero__title {
  margin: 0.55rem 0 1rem;
  max-width: 28rem;
  font-size: clamp(1.45rem, 3vw, 2rem);
  font-weight: 700;
  line-height: 1.2;
}

.episode-hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.meta-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.75rem;
  border-radius: 0.55rem;
  border: 1px solid rgba(45, 69, 35, 0.85);
  background: rgba(18, 28, 14, 0.55);
  font-size: 0.82rem;
  color: rgba(229, 231, 235, 0.88);
}

.meta-chip strong {
  font-family: var(--font-display);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #9cff66;
}

.detail-panel {
  border: 1px solid rgba(57, 118, 37, 0.55);
  border-radius: 1rem;
  background: rgba(18, 28, 14, 0.58);
  backdrop-filter: blur(12px);
  padding: 1.1rem;
  animation: rise 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.08s both;
}

.detail-panel__head {
  margin-bottom: 1rem;
}

.detail-panel__head h2 {
  margin: 0;
  color: #9cff66;
  font-size: clamp(1.2rem, 2.2vw, 1.5rem);
}

.detail-panel__head p {
  margin: 0.3rem 0 0;
  font-size: 0.88rem;
  color: rgba(209, 213, 203, 0.7);
}

.cast-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.85rem;
  max-height: 34rem;
  overflow-y: auto;
  padding-right: 0.2rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(81, 217, 40, 0.35) transparent;
}

.cast-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  border-radius: 0.8rem;
  overflow: hidden;
  border: 1px solid rgba(45, 69, 35, 0.55);
  background: rgba(18, 28, 14, 0.7);
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.cast-card:hover {
  transform: translateY(-5px);
  border-color: rgba(156, 255, 102, 0.55);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.3);
}

.cast-card__media {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: #0d140a;
}

.cast-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.cast-card:hover .cast-card__media img {
  transform: scale(1.08);
}

.cast-card__badge {
  position: absolute;
  top: 0.45rem;
  left: 0.45rem;
  padding: 0.2rem 0.45rem;
  border-radius: 0.35rem;
  font-family: var(--font-display);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #0b1408;
}

.cast-card__badge.is-alive { background: #22c55e; }
.cast-card__badge.is-dead { background: #ef4444; }
.cast-card__badge.is-unknown { background: #9ca3af; color: #111827; }

.cast-card__body {
  padding: 0.65rem 0.7rem 0.75rem;
}

.cast-card__body h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 0.88rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cast-card__body p {
  margin: 0.2rem 0 0;
  font-size: 0.72rem;
  color: rgba(209, 213, 203, 0.65);
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1279px) {
  .cast-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 1023px) {
  .detail__main {
    padding: 1.5rem 1.1rem 2rem;
  }

  .cast-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 767px) {
  .detail__main {
    padding: 1.25rem 0.85rem 1.75rem;
  }

  .cast-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    max-height: none;
  }
}
</style>
