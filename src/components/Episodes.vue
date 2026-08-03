<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { Episodes_Query } from "../queries/listEpisodesQuery";

const { result, loading, error } = useQuery(Episodes_Query);

const seasons = [1, 2, 3, 4, 5];
const activeSeason = ref(1);
const sectionRef = ref(null);
const inView = ref(false);
let observer;

const seasonEpisodes = computed(() => {
  const list = result.value?.episodesByIds ?? [];
  return list.filter((ep) => String(ep.episode?.[2]) === String(activeSeason.value));
});

function episodeNumber(code) {
  const match = code?.match(/E(\d+)/i);
  return match ? match[1] : "--";
}

function setSeason(season) {
  activeSeason.value = season;
}

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        inView.value = true;
        observer?.disconnect();
      }
    },
    { threshold: 0.12 }
  );
  if (sectionRef.value) observer.observe(sectionRef.value);
});

onUnmounted(() => observer?.disconnect());
</script>

<template>
  <section
    id="episodes"
    ref="sectionRef"
    class="episodes"
    :class="{ 'is-inview': inView }"
  >
    <div class="episodes__media" aria-hidden="true" />
    <div class="episodes__veil" aria-hidden="true" />

    <div class="episodes__inner">
      <header class="episodes__header">
        <div>
          <p class="episodes__eyebrow">Broadcast Log</p>
          <h2 class="episodes__title">Episodes</h2>
        </div>
        <p class="episodes__count">
          <span>{{ seasonEpisodes.length || "—" }}</span>
          in Season {{ activeSeason }}
          <em>· 51 total</em>
        </p>
      </header>

      <div class="episodes__seasons" role="tablist" aria-label="Seasons">
        <button
          v-for="season in seasons"
          :key="season"
          type="button"
          role="tab"
          class="episodes__season"
          :class="{ 'is-active': activeSeason === season }"
          :aria-selected="activeSeason === season"
          @click="setSeason(season)"
        >
          <span class="episodes__season-num">S{{ season }}</span>
          <span class="episodes__season-label">Season {{ season }}</span>
        </button>
      </div>

      <div class="episodes__panel">
        <div v-if="loading" class="episodes__state">
          <span class="episodes__spinner" aria-hidden="true" />
          <p>Opening the portal…</p>
        </div>

        <p v-else-if="error" class="episodes__state episodes__state--error">
          {{ error.message }}
        </p>

        <div v-else class="episodes__grid">
          <router-link
            v-for="(episode, index) in seasonEpisodes"
            :key="episode.id"
            :to="`/Episode/${episode.id}`"
            class="episode-card"
            :style="{ '--i': index }"
          >
            <div class="episode-card__code">
              <span class="episode-card__ep">E{{ episodeNumber(episode.episode) }}</span>
              <span class="episode-card__season">{{ episode.episode }}</span>
            </div>

            <div class="episode-card__body">
              <h3 class="episode-card__name">{{ episode.name }}</h3>
              <p v-if="episode.air_date" class="episode-card__meta">
                Aired {{ episode.air_date }}
              </p>
            </div>

            <span class="episode-card__action" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 256 256">
                <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
              </svg>
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.episodes {
  position: relative;
  isolation: isolate;
  width: 100%;
  overflow: hidden;
  padding: 2.5rem 5.5rem 2.75rem;
  color: #e8ece4;
}

.episodes__media {
  position: absolute;
  inset: 0;
  z-index: -2;
  background:
    url("https://www.looper.com/img/gallery/the-most-terrible-things-rick-morty-have-ever-done/cronenberg-the-world-1497028481.jpg")
    center / cover no-repeat fixed;
}

.episodes__veil {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(180deg, rgba(18, 28, 14, 0.82) 0%, rgba(18, 28, 14, 0.88) 55%, rgba(18, 28, 14, 0.94) 100%),
    radial-gradient(ellipse at 15% 20%, rgba(81, 217, 40, 0.14), transparent 45%);
  backdrop-filter: blur(2px);
}

.episodes__inner {
  position: relative;
  z-index: 1;
  width: min(68rem, 100%);
  margin: 0 auto;
}

.episodes__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.55s ease, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}

.episodes.is-inview .episodes__header {
  opacity: 1;
  transform: translateY(0);
}

.episodes__eyebrow {
  margin: 0 0 0.2rem;
  font-family: var(--font-display);
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(81, 217, 40, 0.95);
}

.episodes__title {
  margin: 0;
  color: #9cff66;
  font-size: clamp(1.8rem, 2.8vw, 2.25rem);
}

.episodes__count {
  margin: 0;
  font-size: 0.9rem;
  color: rgba(209, 213, 203, 0.75);
}

.episodes__count span {
  color: #9cff66;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.15rem;
}

.episodes__count em {
  font-style: normal;
  opacity: 0.65;
}

.episodes__seasons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-bottom: 1.15rem;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.55s ease 0.08s, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.08s;
}

.episodes.is-inview .episodes__seasons {
  opacity: 1;
  transform: translateY(0);
}

.episodes__season {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 2.55rem;
  padding: 0.45rem 0.9rem;
  border: 1px solid rgba(45, 69, 35, 0.9);
  border-radius: 0.65rem;
  background: rgba(18, 28, 14, 0.55);
  color: rgba(229, 231, 235, 0.82);
  cursor: pointer;
  transition:
    background-color 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.episodes__season-num {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  color: #9cff66;
}

.episodes__season-label {
  font-size: 0.82rem;
  font-weight: 500;
}

.episodes__season:hover {
  transform: translateY(-2px);
  border-color: rgba(81, 217, 40, 0.55);
  color: #fff;
}

.episodes__season.is-active {
  background: rgba(81, 217, 40, 0.16);
  border-color: rgba(156, 255, 102, 0.7);
  color: #fff;
  box-shadow: 0 0 0 1px rgba(81, 217, 40, 0.15), 0 10px 28px rgba(81, 217, 40, 0.12);
}

.episodes__panel {
  border: 1px solid rgba(57, 118, 37, 0.55);
  border-radius: 0.9rem;
  background: rgba(18, 28, 14, 0.55);
  backdrop-filter: blur(12px);
  padding: 0.85rem;
  min-height: 22rem;
  max-height: 28rem;
  overflow: hidden;
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.6s ease 0.14s, transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.14s;
}

.episodes.is-inview .episodes__panel {
  opacity: 1;
  transform: translateY(0);
}

.episodes__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem;
  max-height: 26rem;
  overflow-y: auto;
  padding-right: 0.25rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(81, 217, 40, 0.35) transparent;
}

.episodes__state {
  display: grid;
  place-items: center;
  gap: 0.75rem;
  min-height: 20rem;
  color: rgba(209, 213, 203, 0.8);
  font-size: 0.95rem;
}

.episodes__state--error {
  color: #fca5a5;
}

.episodes__spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 2px solid rgba(81, 217, 40, 0.2);
  border-top-color: #51d928;
  border-radius: 9999px;
  animation: spin 0.8s linear infinite;
}

.episode-card {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.85rem;
  padding: 0.85rem 0.95rem;
  text-decoration: none;
  color: inherit;
  border-radius: 0.7rem;
  border: 1px solid rgba(45, 69, 35, 0.55);
  background:
    linear-gradient(120deg, rgba(57, 118, 37, 0.28), rgba(18, 28, 14, 0.35));
  overflow: hidden;
  opacity: 0;
  transform: translateY(14px);
  transition:
    border-color 0.25s ease,
    background-color 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.episodes.is-inview .episode-card {
  animation: card-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: calc(0.2s + var(--i) * 0.045s);
}

.episode-card::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: 3px;
  background: linear-gradient(180deg, #9cff66, #51d928);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.episode-card:hover {
  transform: translateY(-3px);
  border-color: rgba(156, 255, 102, 0.55);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.28);
  background:
    linear-gradient(120deg, rgba(81, 217, 40, 0.22), rgba(18, 28, 14, 0.5));
}

.episode-card:hover::before {
  opacity: 1;
}

.episode-card__code {
  display: grid;
  gap: 0.1rem;
  min-width: 3.4rem;
}

.episode-card__ep {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.03em;
  color: #9cff66;
}

.episode-card__season {
  font-size: 0.68rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(209, 213, 203, 0.6);
}

.episode-card__name {
  margin: 0;
  font-family: var(--font-display);
  font-size: 0.98rem;
  font-weight: 600;
  line-height: 1.25;
  color: #f3f6ef;
}

.episode-card__meta {
  margin: 0.25rem 0 0;
  font-size: 0.75rem;
  color: rgba(209, 213, 203, 0.62);
}

.episode-card__action {
  display: grid;
  place-items: center;
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 9999px;
  background: rgba(81, 217, 40, 0.15);
  color: #9cff66;
  transition: transform 0.25s ease, background-color 0.25s ease, color 0.25s ease;
}

.episode-card:hover .episode-card__action {
  transform: scale(1.08);
  background: #51d928;
  color: #0b1408;
}

@keyframes card-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 1023px) {
  .episodes {
    padding: 2.25rem 1.75rem 2.25rem;
  }

  .episodes__grid {
    grid-template-columns: 1fr;
    max-height: 24rem;
  }

  .episodes__panel {
    max-height: 26rem;
  }
}

@media (max-width: 767px) {
  .episodes {
    padding: 1.85rem 0.85rem 2rem;
  }

  .episodes__media {
    background-attachment: scroll;
  }

  .episodes__header {
    flex-direction: column;
    align-items: flex-start;
  }

  .episodes__season-label {
    display: none;
  }

  .episodes__season {
    min-width: 3.2rem;
    justify-content: center;
    padding-inline: 0.7rem;
  }

  .episode-card {
    gap: 0.65rem;
    padding: 0.75rem 0.8rem;
  }

  .episode-card__name {
    font-size: 0.92rem;
  }
}
</style>
