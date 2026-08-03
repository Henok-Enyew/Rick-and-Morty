<script setup>
import { computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { useRoute } from "vue-router";
import { Location_Query } from "../queries/locationQuery";
import DetailNav from "../components/DetailNav.vue";
import PortalOverlay from "../components/PortalOverlay.vue";
import DetailSkeleton from "../components/DetailSkeleton.vue";
import FetchErrorOverlay from "../components/FetchErrorOverlay.vue";
import Footer from "../components/Footer.vue";
import { useSeo, buildTitle } from "../composables/useSeo";
import { DEFAULT_IMAGE, SITE_URL } from "../seo/defaults";

const route = useRoute();
const { result, loading, error, refetch } = useQuery(Location_Query, () => ({
  id: route.params.id,
}));

const location = computed(() => result.value?.location);
const residents = computed(() =>
  (location.value?.residents ?? []).filter((resident) => resident?.id)
);
const residentCount = computed(() => residents.value.length);

const seo = computed(() => {
  const loc = location.value;
  if (!loc) {
    return {
      title: buildTitle("Location"),
      description:
        "Explore a Rick and Morty location, its dimension, type, and resident roster.",
      path: `/Location/${route.params.id}`,
      image: DEFAULT_IMAGE,
      type: "article",
    };
  }

  return {
    title: buildTitle(loc.name),
    description: `${loc.name} — ${loc.type || "Unknown type"} in ${loc.dimension || "an unknown dimension"}. ${residentCount.value} residents catalogued.`,
    path: `/Location/${loc.id || route.params.id}`,
    image: DEFAULT_IMAGE,
    type: "article",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Place",
      name: loc.name,
      description: `${loc.type || "Location"} in ${loc.dimension || "Unknown dimension"}`,
      url: `${SITE_URL}/Location/${loc.id || route.params.id}`,
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
  <div class="detail detail--location">
    <div class="detail__media" aria-hidden="true" />
    <div class="detail__veil" aria-hidden="true" />

    <DetailNav back-label="All locations" />

    <main class="detail__main">
      <DetailSkeleton v-if="!location" variant="location" />

      <template v-else>
        <section class="place-hero">
          <p class="detail__eyebrow">Coordinate File</p>
          <h1>{{ location.name }}</h1>

          <div class="place-hero__meta">
            <span class="meta-chip">
              <strong>Type</strong>
              {{ location.type || "Unknown" }}
            </span>
            <span class="meta-chip">
              <strong>Dimension</strong>
              {{ location.dimension || "Unknown" }}
            </span>
            <span class="meta-chip">
              <strong>Created</strong>
              {{ formatDate(location.created) }}
            </span>
            <span class="meta-chip">
              <strong>Residents</strong>
              {{ residentCount }}
            </span>
          </div>
        </section>

        <section class="detail-panel">
          <div class="detail-panel__head">
            <h2>Residents</h2>
            <p>Local fauna, flora, and existential threats.</p>
          </div>

          <div v-if="residentCount" class="cast-grid">
            <router-link
              v-for="resident in residents"
              :key="resident.id"
              :to="`/Character/${resident.id}`"
              class="cast-card"
            >
              <div class="cast-card__media">
                <img
                  :src="resident.image"
                  :alt="resident.name"
                  loading="lazy"
                />
                <span
                  class="cast-card__badge"
                  :class="statusClass(resident.status)"
                >
                  {{ resident.status }}
                </span>
              </div>
              <div class="cast-card__body">
                <h3>{{ resident.name }}</h3>
                <p>{{ resident.species }} · {{ resident.gender }}</p>
              </div>
            </router-link>
          </div>

          <p v-else class="detail__empty">
            This place is empty… suspiciously empty.
          </p>
        </section>
      </template>
    </main>

    <Footer
      figma-url="https://www.figma.com/design/OMn7u5chFuQXKFWLl2QBCJ/Location-Page?node-id=0%3A1&t=EKKAtHgoEALZ5v79-1"
    />

    <PortalOverlay
      :show="loading && !error"
      accent="gold"
      message="Locking coordinates…"
    />

    <FetchErrorOverlay
      :show="!!error && !location && !loading"
      accent="gold"
      :message="error?.message || 'Failed to fetch this location'"
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
    url("https://i.pinimg.com/564x/46/d7/7b/46d77b586d6c00f2533c6e63f15fdd86.jpg")
    center / cover no-repeat;
}

.detail__veil {
  position: fixed;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(180deg, rgba(18, 28, 14, 0.88) 0%, rgba(18, 28, 14, 0.94) 55%, #121c0e 100%),
    radial-gradient(ellipse at 75% 12%, rgba(224, 187, 55, 0.16), transparent 42%);
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
  color: rgba(224, 187, 55, 0.95);
}

.place-hero {
  margin-bottom: 1.5rem;
  animation: rise 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.place-hero h1 {
  margin: 0 0 1rem;
  max-width: 36rem;
  font-size: clamp(2rem, 5vw, 3.1rem);
  line-height: 1.08;
  color: #f0d35c;
  text-shadow: 0 0 36px rgba(224, 187, 55, 0.2);
}

.place-hero__meta {
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
  border: 1px solid rgba(224, 187, 55, 0.3);
  background: rgba(18, 28, 14, 0.55);
  font-size: 0.82rem;
  color: rgba(229, 231, 235, 0.88);
}

.meta-chip strong {
  font-family: var(--font-display);
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #f0d35c;
}

.detail-panel {
  border: 1px solid rgba(224, 187, 55, 0.35);
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
  color: #f0d35c;
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
  scrollbar-color: rgba(224, 187, 55, 0.4) transparent;
}

.cast-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  border-radius: 0.8rem;
  overflow: hidden;
  border: 1px solid rgba(224, 187, 55, 0.22);
  background: rgba(18, 28, 14, 0.7);
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.cast-card:hover {
  transform: translateY(-5px);
  border-color: rgba(240, 211, 92, 0.55);
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
