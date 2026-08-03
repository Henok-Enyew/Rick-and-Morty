<script setup>
import { computed } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { useRoute } from "vue-router";
import { Character_Query } from "../queries/characterQuery";
import DetailNav from "../components/DetailNav.vue";
import PortalLoader from "../components/PortalLoader.vue";
import Footer from "../components/Footer.vue";

const route = useRoute();
const { result, loading, error } = useQuery(Character_Query, () => ({
  id: route.params.id,
}));

const character = computed(() => result.value?.character);
const episodeCount = computed(() => character.value?.episode?.length ?? 0);

function statusClass(status) {
  if (status === "Alive") return "is-alive";
  if (status === "Dead") return "is-dead";
  return "is-unknown";
}

function episodeNumber(code) {
  const match = code?.match(/E(\d+)/i);
  return match ? match[1] : "--";
}

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
</script>

<template>
  <div class="detail detail--character">
    <div class="detail__media" aria-hidden="true" />
    <div class="detail__veil" aria-hidden="true" />

    <DetailNav back-label="All characters" />

    <main class="detail__main">
      <PortalLoader v-if="loading" message="Materializing subject…" />

      <p v-else-if="error" class="detail__error">{{ error.message }}</p>

      <template v-else-if="character">
        <section class="char-hero">
          <div class="char-hero__portrait">
            <img :src="character.image" :alt="character.name" />
            <span class="char-hero__badge" :class="statusClass(character.status)">
              {{ character.status }}
            </span>
          </div>

          <div class="char-hero__info">
            <p class="detail__eyebrow">Subject File</p>
            <h1>{{ character.name }}</h1>

            <div class="stat-grid">
              <div class="stat">
                <span>Species</span>
                <strong>{{ character.species }}</strong>
              </div>
              <div class="stat">
                <span>Gender</span>
                <strong>{{ character.gender }}</strong>
              </div>
              <div class="stat">
                <span>Status</span>
                <strong>{{ character.status }}</strong>
              </div>
              <div class="stat">
                <span>Appearances</span>
                <strong>{{ episodeCount }}</strong>
              </div>
            </div>

            <div class="location-block">
              <p class="location-block__label">Last known location</p>
              <router-link
                v-if="character.location?.id"
                :to="`/Location/${character.location.id}`"
                class="location-link"
              >
                <span class="location-link__icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z" />
                  </svg>
                </span>
                <span class="location-link__text">{{ character.location.name }}</span>
                <span class="location-link__arrow" aria-hidden="true">→</span>
              </router-link>
              <p v-else class="detail__empty">Unknown coordinates</p>
            </div>
          </div>
        </section>

        <section class="detail-panel">
          <div class="detail-panel__head">
            <h2>
              Episodes {{ character.name.split(" ")[0] }} crashed
            </h2>
            <p>{{ episodeCount }} timeline intersections logged.</p>
          </div>

          <div v-if="episodeCount" class="episode-list">
            <router-link
              v-for="ep in character.episode"
              :key="ep.id"
              :to="`/Episode/${ep.id}`"
              class="episode-row"
            >
              <div class="episode-row__code">
                <span class="episode-row__ep">E{{ episodeNumber(ep.episode) }}</span>
                <span>{{ ep.episode }}</span>
              </div>
              <div class="episode-row__body">
                <h3>{{ ep.name }}</h3>
                <p>
                  Aired {{ ep.air_date }}
                  <span>·</span>
                  Logged {{ formatDate(ep.created) }}
                </p>
              </div>
              <span class="episode-row__action" aria-hidden="true">→</span>
            </router-link>
          </div>

          <p v-else class="detail__empty">No episode data in this dimension.</p>
        </section>
      </template>
    </main>

    <Footer
      figma-url="https://www.figma.com/design/V4IVycz1ON6JD3fPuYhJ67/Character-Page?node-id=0%3A1&t=QaAV9PpkHZK2oOLO-1"
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
    url("https://e1.pxfuel.com/desktop-wallpaper/976/559/desktop-wallpaper-rick-and-morty-live-rick-and-morty-thumbnail.jpg")
    center / cover no-repeat;
}

.detail__veil {
  position: fixed;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(180deg, rgba(18, 28, 14, 0.9) 0%, rgba(18, 28, 14, 0.95) 60%, #121c0e 100%),
    radial-gradient(ellipse at 75% 15%, rgba(81, 217, 40, 0.14), transparent 42%);
  backdrop-filter: blur(3px);
}

.detail__main {
  width: min(72rem, 100%);
  margin: 0 auto;
  padding: 1.75rem 1.5rem 2.5rem;
}

.detail__error,
.detail__empty {
  padding: 1.5rem 0.5rem;
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

.char-hero {
  display: grid;
  grid-template-columns: minmax(14rem, 18rem) 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  animation: rise 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.char-hero__portrait {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid rgba(81, 217, 40, 0.35);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35), 0 0 30px rgba(81, 217, 40, 0.12);
  background: #0d140a;
}

.char-hero__portrait img {
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

.char-hero__badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  padding: 0.3rem 0.6rem;
  border-radius: 0.4rem;
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #0b1408;
}

.char-hero__badge.is-alive { background: #22c55e; }
.char-hero__badge.is-dead { background: #ef4444; }
.char-hero__badge.is-unknown { background: #9ca3af; color: #111827; }

.char-hero__info h1 {
  margin: 0 0 1rem;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  line-height: 1.1;
  color: #f3f6ef;
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem;
  margin-bottom: 1.15rem;
}

.stat {
  padding: 0.7rem 0.8rem;
  border-radius: 0.65rem;
  border: 1px solid rgba(45, 69, 35, 0.8);
  background: rgba(18, 28, 14, 0.55);
}

.stat span {
  display: block;
  margin-bottom: 0.2rem;
  font-family: var(--font-display);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(156, 255, 102, 0.8);
}

.stat strong {
  font-size: 0.98rem;
  font-weight: 600;
  color: #f3f6ef;
}

.location-block__label {
  margin: 0 0 0.45rem;
  font-family: var(--font-display);
  font-size: 0.74rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(224, 187, 55, 0.9);
}

.location-link {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.7rem;
  padding: 0.75rem 0.9rem;
  border-radius: 0.7rem;
  border: 1px solid rgba(224, 187, 55, 0.35);
  background: linear-gradient(120deg, rgba(224, 187, 55, 0.16), rgba(18, 28, 14, 0.45));
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.location-link:hover {
  transform: translateY(-2px);
  border-color: rgba(240, 211, 92, 0.6);
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.25);
}

.location-link__icon {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background: rgba(224, 187, 55, 0.16);
  color: #f0d35c;
}

.location-link__text {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.95rem;
}

.location-link__arrow {
  color: #f0d35c;
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
  font-size: clamp(1.15rem, 2.2vw, 1.45rem);
}

.detail-panel__head p {
  margin: 0.3rem 0 0;
  font-size: 0.88rem;
  color: rgba(209, 213, 203, 0.7);
}

.episode-list {
  display: grid;
  gap: 0.6rem;
  max-height: 28rem;
  overflow-y: auto;
  padding-right: 0.2rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(81, 217, 40, 0.35) transparent;
}

.episode-row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.85rem;
  padding: 0.8rem 0.9rem;
  border-radius: 0.7rem;
  border: 1px solid rgba(45, 69, 35, 0.55);
  background: linear-gradient(120deg, rgba(57, 118, 37, 0.25), rgba(18, 28, 14, 0.4));
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.episode-row:hover {
  transform: translateY(-2px);
  border-color: rgba(156, 255, 102, 0.5);
  box-shadow: 0 12px 26px rgba(0, 0, 0, 0.25);
}

.episode-row__code {
  display: grid;
  gap: 0.1rem;
  min-width: 3.2rem;
}

.episode-row__ep {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 800;
  line-height: 1;
  color: #9cff66;
}

.episode-row__code span:last-child {
  font-size: 0.66rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(209, 213, 203, 0.55);
}

.episode-row__body h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
}

.episode-row__body p {
  margin: 0.25rem 0 0;
  font-size: 0.74rem;
  color: rgba(209, 213, 203, 0.62);
}

.episode-row__action {
  color: #9cff66;
  font-size: 1.1rem;
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

@media (max-width: 1023px) {
  .detail__main {
    padding: 1.5rem 1.1rem 2rem;
  }

  .char-hero {
    grid-template-columns: minmax(12rem, 15rem) 1fr;
  }
}

@media (max-width: 767px) {
  .detail__main {
    padding: 1.25rem 0.85rem 1.75rem;
  }

  .char-hero {
    grid-template-columns: 1fr;
  }

  .char-hero__portrait {
    max-width: 18rem;
    margin: 0 auto;
  }

  .episode-list {
    max-height: none;
  }

  .episode-row {
    grid-template-columns: auto 1fr;
  }

  .episode-row__action {
    display: none;
  }
}
</style>
