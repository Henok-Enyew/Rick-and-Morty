<!-- Locations page -->

<script setup>
import { computed, ref, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { Locations_Query } from "../queries/listLocationsQuery";
import { usePagedList } from "../composables/usePagedList";
import { useInView } from "../composables/useInView";
import { useMediaQuery } from "../composables/useMediaQuery";
import PageNav from "./PageNav.vue";

const { result, loading, error } = useQuery(Locations_Query);

const activeType = ref("All");
const sectionRef = ref(null);
const revealed = ref(false);
const isMobile = useMediaQuery("(max-width: 767px)");
const pageSize = computed(() => (isMobile.value ? 5 : 10));

const { inView: isActive } = useInView(sectionRef, {
  threshold: 0.08,
  rootMargin: "80px 0px",
});

watch(isActive, (visible) => {
  if (visible) revealed.value = true;
});

const locations = computed(() => result.value?.locationsByIds ?? []);

const typeFilters = computed(() => {
  const counts = new Map();
  for (const location of locations.value) {
    const type = location.type || "Unknown";
    counts.set(type, (counts.get(type) || 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([type]) => type);
});

const filteredLocations = computed(() => {
  if (activeType.value === "All") return locations.value;
  return locations.value.filter(
    (location) => (location.type || "Unknown") === activeType.value
  );
});

const autoMs = computed(() => (isMobile.value ? 4500 : 3000));

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
} = usePagedList(filteredLocations, {
  pageSize,
  autoMs,
  enabled: isActive,
});

function setType(type) {
  activeType.value = type;
}

function truncateLocationName(value, max = 15) {
  if (!value) return "";
  const str = String(value);
  if (str.length <= max) return str;
  const keep = Math.max(0, max - 3);
  return `${str.slice(0, keep)}...`;
}
</script>

<template>
  <section
    id="locations"
    ref="sectionRef"
    class="locations section-stage"
    :class="{ 'is-inview': revealed, 'is-active': isActive }"
  >
    <div class="locations__inner">
      <header class="locations__header">
        <div>
          <p class="locations__eyebrow">Coordinate Index</p>
          <h2 class="locations__title">Locations</h2>
        </div>
        <p class="locations__count">
          <span>{{ rangeLabel }}</span>
          <em>· 126 total</em>
        </p>
      </header>

      <div class="locations__filters" role="tablist" aria-label="Location type">
        <button
          type="button"
          role="tab"
          class="locations__filter"
          :class="{ 'is-active': activeType === 'All' }"
          :aria-selected="activeType === 'All'"
          @click="setType('All')"
        >
          All
        </button>
        <button
          v-for="type in typeFilters"
          :key="type"
          type="button"
          role="tab"
          class="locations__filter"
          :class="{ 'is-active': activeType === type }"
          :aria-selected="activeType === type"
          @click="setType(type)"
        >
          {{ type }}
        </button>
      </div>

      <div
        class="locations__panel"
        @mouseenter="pause"
        @mouseleave="resume"
        @focusin="pause"
        @focusout="resume"
      >
        <div v-if="loading" class="locations__state">
          <span class="locations__spinner" aria-hidden="true" />
          <p>Triangulating coordinates…</p>
        </div>

        <p v-else-if="error" class="locations__state locations__state--error">
          {{ error.message }}
        </p>

        <p v-else-if="!filteredLocations.length" class="locations__state">
          No locations in this category.
        </p>

        <template v-else>
          <div :key="animTick" class="locations__grid is-paging">
        <router-link
              v-for="(location, index) in pageItems"
              :key="location.id"
          :to="`/Location/${location.id}`"
              class="place-card"
              :style="{ '--i': index }"
            >
              <span class="place-card__icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z" />
          </svg>
              </span>

              <div class="place-card__body">
                <h3 class="place-card__name" :title="location.name">
                  {{ truncateLocationName(location.name, 15) }}
                </h3>
                <p class="place-card__meta">
                  <span>{{ location.type || "Unknown" }}</span>
                  <span class="place-card__sep">·</span>
                  <span>{{ location.dimension || "Unknown dimension" }}</span>
                </p>
              </div>

              <span class="place-card__action" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
                </svg>
              </span>
        </router-link>
          </div>

          <PageNav
            :page="page"
            :total-pages="totalPages"
            :range-label="rangeLabel"
            :progress="progress"
            accent="gold"
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
.locations {
  position: relative;
  isolation: isolate;
  width: 100%;
  min-height: 100vh;
  min-height: 100svh;
  overflow: hidden;
  padding: 2.5rem 5.5rem 2.75rem;
  color: #e8ece4;
  background: transparent;
  content-visibility: auto;
  contain-intrinsic-size: auto 900px;
}

.locations__inner {
  position: relative;
  z-index: 1;
  width: min(68rem, 100%);
  margin: 0 auto;
}

.locations__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.15rem;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.55s ease, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}

.locations.is-inview .locations__header {
  opacity: 1;
  transform: translateY(0);
}

.locations__eyebrow {
  margin: 0 0 0.2rem;
  font-family: var(--font-display);
  font-size: 0.74rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(224, 187, 55, 0.95);
}

.locations__title {
  margin: 0;
  color: #f0d35c;
  font-size: clamp(1.8rem, 2.8vw, 2.25rem);
}

.locations__count {
  margin: 0;
  font-size: 0.9rem;
  color: rgba(209, 213, 203, 0.75);
}

.locations__count span {
  color: #f0d35c;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.98rem;
}

.locations__count em {
  font-style: normal;
  opacity: 0.65;
}

.locations__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.1rem;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.55s ease 0.08s, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.08s;
}

.locations.is-inview .locations__filters {
  opacity: 1;
  transform: translateY(0);
}

.locations__filter {
  display: inline-flex;
  align-items: center;
  min-height: 2.4rem;
  padding: 0.4rem 0.85rem;
  border: 1px solid rgba(224, 187, 55, 0.28);
  border-radius: 0.6rem;
  background: rgba(18, 28, 14, 0.55);
  color: rgba(229, 231, 235, 0.82);
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.locations__filter:hover {
  transform: translateY(-2px);
  border-color: rgba(224, 187, 55, 0.55);
  color: #fff;
}

.locations__filter.is-active {
  background: rgba(224, 187, 55, 0.16);
  border-color: rgba(240, 211, 92, 0.75);
  color: #fff;
  box-shadow: 0 0 0 1px rgba(224, 187, 55, 0.12), 0 10px 24px rgba(224, 187, 55, 0.1);
}

.locations__panel {
  border: 1px solid rgba(224, 187, 55, 0.35);
  border-radius: 0.95rem;
  background: rgba(18, 28, 14, 0.82);
  padding: 0.9rem;
  min-height: 18rem;
  overflow: hidden;
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.6s ease 0.12s, transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.12s;
}

.locations.is-inview .locations__panel {
  opacity: 1;
  transform: translateY(0);
}

.locations__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem;
}

.locations__grid.is-paging {
  animation: page-swap 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.locations__state {
  display: grid;
  place-items: center;
  gap: 0.75rem;
  min-height: 18rem;
  color: rgba(209, 213, 203, 0.8);
  font-size: 0.95rem;
}

.locations__state--error {
  color: #fca5a5;
}

.locations__spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 2px solid rgba(224, 187, 55, 0.2);
  border-top-color: #e0bb37;
  border-radius: 9999px;
  animation: spin 0.8s linear infinite;
}

.place-card {
  position: relative;
  display: grid;
  grid-template-columns: 2.25rem 1fr 2.1rem;
  align-items: center;
  gap: 0.8rem;
  padding: 0.85rem 0.95rem;
  text-decoration: none;
  color: inherit;
  border-radius: 0.7rem;
  border: 1px solid rgba(224, 187, 55, 0.22);
  background: linear-gradient(120deg, rgba(224, 187, 55, 0.14), rgba(18, 28, 14, 0.4));
  overflow: hidden;
  opacity: 0;
  transform: translateY(14px);
  transition:
    border-color 0.25s ease,
    background-color 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.locations.is-inview .place-card {
  animation: card-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: calc(0.18s + var(--i) * 0.035s);
}

.place-card::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: 3px;
  background: linear-gradient(180deg, #f0d35c, #e0bb37);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.place-card:hover {
  transform: translateY(-3px);
  border-color: rgba(240, 211, 92, 0.55);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.28);
  background: linear-gradient(120deg, rgba(224, 187, 55, 0.22), rgba(18, 28, 14, 0.55));
}

.place-card:hover::before {
  opacity: 1;
}

.place-card__icon {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.55rem;
  background: rgba(224, 187, 55, 0.14);
  color: #f0d35c;
}

.place-card__name {
  margin: 0;
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.25;
  color: #f3f6ef;
  min-width: 0; /* required for ellipsis inside grid */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.place-card__meta {
  margin: 0.28rem 0 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.72rem;
  color: rgba(209, 213, 203, 0.62);
  min-width: 0; /* required so meta doesn't force the action column */
}

.place-card__sep {
  opacity: 0.5;
}

.place-card__action {
  display: grid;
  place-items: center;
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 9999px;
  background: rgba(224, 187, 55, 0.14);
  color: #f0d35c;
  transition: transform 0.25s ease, background-color 0.25s ease, color 0.25s ease;
}

.place-card:hover .place-card__action {
  transform: scale(1.08);
  background: #e0bb37;
  color: #1a1505;
}

@keyframes card-in {
  to {
    opacity: 1;
    transform: translateY(0);
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

@media (max-width: 1023px) {
  .locations {
    padding: 2.25rem 1.75rem 2.25rem;
  }

  .locations__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 767px) {
  .locations {
    padding: 1.85rem 0.85rem 2rem;
  }

  .locations__header {
    flex-direction: column;
    align-items: flex-start;
  }

  .locations__filter {
    font-size: 0.72rem;
    padding: 0.35rem 0.7rem;
  }

  .place-card {
    gap: 0.65rem;
    padding: 0.75rem 0.8rem;
  }

  .place-card__name {
    font-size: 0.9rem;
  }
}
</style>
