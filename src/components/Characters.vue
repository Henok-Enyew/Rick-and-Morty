<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { Characters_Query } from "../queries/listCharactersQuery";
import { usePagedList } from "../composables/usePagedList";
import PageNav from "./PageNav.vue";

const { result, loading, error } = useQuery(Characters_Query);

const filters = ["All", "Alive", "Dead", "unknown"];
const activeFilter = ref("All");
const sectionRef = ref(null);
const inView = ref(false);
let observer;

const characters = computed(() => result.value?.charactersByIds ?? []);

const filteredCharacters = computed(() => {
  if (activeFilter.value === "All") return characters.value;
  return characters.value.filter(
    (character) => character.status === activeFilter.value
  );
});

const {
  page,
  totalPages,
  pageItems,
  rangeLabel,
  animTick,
  progress,
  next,
  prev,
  goTo,
  pause,
  resume,
} = usePagedList(filteredCharacters, { pageSize: 10, autoMs: 3000 });

function statusClass(status) {
  if (status === "Alive") return "is-alive";
  if (status === "Dead") return "is-dead";
  return "is-unknown";
}

function setFilter(filter) {
  activeFilter.value = filter;
}

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        inView.value = true;
        observer?.disconnect();
      }
    },
    { threshold: 0.1 }
  );
  if (sectionRef.value) observer.observe(sectionRef.value);
});

onUnmounted(() => observer?.disconnect());
</script>

<template>
  <section
    id="characters"
    ref="sectionRef"
    class="characters"
    :class="{ 'is-inview': inView }"
  >
    <div class="characters__glow" aria-hidden="true" />

    <div class="characters__inner">
      <header class="characters__header">
        <div>
          <p class="characters__eyebrow">Multiverse Roster</p>
          <h2 class="characters__title">Characters</h2>
        </div>
        <p class="characters__count">
          <span>{{ rangeLabel }}</span>
          <em>· 100 total</em>
        </p>
      </header>

      <div class="characters__filters" role="tablist" aria-label="Status filter">
        <button
          v-for="filter in filters"
          :key="filter"
          type="button"
          role="tab"
          class="characters__filter"
          :class="{ 'is-active': activeFilter === filter }"
          :aria-selected="activeFilter === filter"
          @click="setFilter(filter)"
        >
          <span
            v-if="filter !== 'All'"
            class="characters__dot"
            :class="statusClass(filter)"
            aria-hidden="true"
          />
          {{ filter === "unknown" ? "Unknown" : filter }}
        </button>
      </div>

      <div
        class="characters__panel"
        @mouseenter="pause"
        @mouseleave="resume"
        @focusin="pause"
        @focusout="resume"
      >
        <div v-if="loading" class="characters__state">
          <span class="characters__spinner" aria-hidden="true" />
          <p>Scanning dimensions…</p>
        </div>

        <p v-else-if="error" class="characters__state characters__state--error">
          {{ error.message }}
        </p>

        <p
          v-else-if="!filteredCharacters.length"
          class="characters__state"
        >
          No characters in this status.
        </p>

        <template v-else>
          <div :key="animTick" class="characters__grid is-paging">
            <router-link
              v-for="(character, index) in pageItems"
              :key="character.id"
              :to="`/Character/${character.id}`"
              class="char-card"
              :style="{ '--i': index }"
            >
              <div class="char-card__media">
                <img
                  :src="character.image"
                  :alt="character.name"
                  loading="lazy"
                  class="char-card__image"
                />
                <span
                  class="char-card__badge"
                  :class="statusClass(character.status)"
                >
                  {{ character.status }}
                </span>
              </div>

              <div class="char-card__body">
                <h3 class="char-card__name" :title="character.name">
                  {{ character.name }}
                </h3>
                <p class="char-card__species">{{ character.species }}</p>
              </div>
            </router-link>
          </div>

          <PageNav
            :page="page"
            :total-pages="totalPages"
            :range-label="rangeLabel"
            :progress="progress"
            accent="green"
            @prev="prev"
            @next="next"
            @go="goTo"
          />
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.characters {
  position: relative;
  isolation: isolate;
  width: 100%;
  overflow: hidden;
  background: #121c0e;
  padding: 2.5rem 5.5rem 2.75rem;
  color: #e8ece4;
}

.characters__glow {
  position: absolute;
  width: 28rem;
  height: 28rem;
  right: -8rem;
  top: 10%;
  border-radius: 9999px;
  background: rgba(81, 217, 40, 0.08);
  filter: blur(60px);
  pointer-events: none;
  z-index: 0;
}

.characters__inner {
  position: relative;
  z-index: 1;
  width: min(68rem, 100%);
  margin: 0 auto;
}

.characters__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.15rem;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.55s ease, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}

.characters.is-inview .characters__header {
  opacity: 1;
  transform: translateY(0);
}

.characters__eyebrow {
  margin: 0 0 0.2rem;
  font-family: var(--font-display);
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(81, 217, 40, 0.95);
}

.characters__title {
  margin: 0;
  color: #9cff66;
  font-size: clamp(1.8rem, 2.8vw, 2.25rem);
}

.characters__count {
  margin: 0;
  font-size: 0.9rem;
  color: rgba(209, 213, 203, 0.75);
}

.characters__count span {
  color: #9cff66;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.98rem;
}

.characters__count em {
  font-style: normal;
  opacity: 0.65;
}

.characters__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.1rem;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.55s ease 0.08s, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.08s;
}

.characters.is-inview .characters__filters {
  opacity: 1;
  transform: translateY(0);
}

.characters__filter {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 2.4rem;
  padding: 0.4rem 0.85rem;
  border: 1px solid rgba(45, 69, 35, 0.9);
  border-radius: 0.6rem;
  background: rgba(23, 35, 18, 0.55);
  color: rgba(229, 231, 235, 0.82);
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.characters__filter:hover {
  transform: translateY(-2px);
  border-color: rgba(81, 217, 40, 0.55);
  color: #fff;
}

.characters__filter.is-active {
  background: rgba(81, 217, 40, 0.16);
  border-color: rgba(156, 255, 102, 0.7);
  color: #fff;
  box-shadow: 0 0 0 1px rgba(81, 217, 40, 0.12), 0 10px 24px rgba(81, 217, 40, 0.1);
}

.characters__dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
}

.characters__dot.is-alive,
.char-card__badge.is-alive {
  background: #22c55e;
}

.characters__dot.is-dead,
.char-card__badge.is-dead {
  background: #ef4444;
}

.characters__dot.is-unknown,
.char-card__badge.is-unknown {
  background: #9ca3af;
}

.characters__panel {
  border: 1px solid rgba(45, 69, 35, 0.7);
  border-radius: 0.95rem;
  background:
    linear-gradient(160deg, rgba(129, 152, 128, 0.14), rgba(18, 28, 14, 0.55));
  backdrop-filter: blur(10px);
  padding: 0.95rem;
  min-height: 18rem;
  overflow: hidden;
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.6s ease 0.12s, transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.12s;
}

.characters.is-inview .characters__panel {
  opacity: 1;
  transform: translateY(0);
}

.characters__grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.85rem;
  padding: 0.15rem 0.35rem 0.35rem 0.15rem;
}

.characters__grid.is-paging {
  animation: page-swap 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.characters__state {
  display: grid;
  place-items: center;
  gap: 0.75rem;
  min-height: 18rem;
  color: rgba(209, 213, 203, 0.8);
  font-size: 0.95rem;
}

.characters__state--error {
  color: #fca5a5;
}

.characters__spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 2px solid rgba(81, 217, 40, 0.2);
  border-top-color: #51d928;
  border-radius: 9999px;
  animation: spin 0.8s linear infinite;
}

.char-card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  border-radius: 0.8rem;
  overflow: hidden;
  border: 1px solid rgba(45, 69, 35, 0.55);
  background: rgba(18, 28, 14, 0.65);
  opacity: 0;
  transform: translateY(16px) scale(0.98);
  transition:
    transform 0.28s ease,
    border-color 0.28s ease,
    box-shadow 0.28s ease,
    background-color 0.28s ease;
}

.characters.is-inview .char-card {
  animation: card-rise 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: calc(0.16s + var(--i) * 0.035s);
}

.char-card:hover {
  transform: translateY(-6px) scale(1.02);
  border-color: rgba(156, 255, 102, 0.55);
  box-shadow: 0 16px 34px rgba(0, 0, 0, 0.32);
  background: rgba(23, 35, 18, 0.9);
}

.char-card__media {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  background: #0d140a;
}

.char-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.45s ease;
}

.char-card:hover .char-card__image {
  transform: scale(1.08);
}

.char-card__badge {
  position: absolute;
  top: 0.55rem;
  left: 0.55rem;
  z-index: 1;
  padding: 0.22rem 0.5rem;
  border-radius: 0.4rem;
  font-family: var(--font-display);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #0b1408;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}

.char-card__badge.is-unknown {
  color: #111827;
}

.char-card__body {
  padding: 0.7rem 0.7rem 0.8rem;
}

.char-card__name {
  margin: 0;
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.25;
  color: #f3f6ef;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.char-card__species {
  margin: 0.25rem 0 0;
  font-size: 0.72rem;
  color: rgba(209, 213, 203, 0.65);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@keyframes card-rise {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes page-swap {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
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

@media (max-width: 1279px) {
  .characters__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 1023px) {
  .characters {
    padding: 2.25rem 1.75rem 2.25rem;
  }

  .characters__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 767px) {
  .characters {
    padding: 1.85rem 0.85rem 2rem;
  }

  .characters__header {
    flex-direction: column;
    align-items: flex-start;
  }

  .characters__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.65rem;
  }

  .characters__panel {
    padding: 0.7rem;
  }

  .char-card__body {
    padding: 0.55rem 0.55rem 0.65rem;
  }

  .char-card__name {
    font-size: 0.82rem;
  }
}

@media (max-width: 420px) {
  .characters__filters {
    gap: 0.4rem;
  }

  .characters__filter {
    min-height: 2.2rem;
    padding: 0.35rem 0.65rem;
    font-size: 0.74rem;
  }
}
</style>
