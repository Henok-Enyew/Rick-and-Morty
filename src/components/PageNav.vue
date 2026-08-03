<script setup>
defineProps({
  page: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  rangeLabel: { type: String, default: "" },
  progress: { type: Number, default: 0 },
  accent: { type: String, default: "green" }, // green | gold
});

const emit = defineEmits(["prev", "next", "go"]);
</script>

<template>
  <div
    v-if="totalPages > 1"
    class="page-nav"
    :class="`page-nav--${accent}`"
    role="navigation"
    aria-label="Pagination"
  >
    <button
      type="button"
      class="page-nav__btn"
      aria-label="Previous page"
      @click="emit('prev')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
        <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z" />
      </svg>
    </button>

    <div class="page-nav__center">
      <p class="page-nav__label">
        <span>{{ page + 1 }}</span> / {{ totalPages }}
        <em v-if="rangeLabel">· {{ rangeLabel }}</em>
      </p>

      <div class="page-nav__dots" role="tablist">
        <button
          v-for="n in totalPages"
          :key="n"
          type="button"
          role="tab"
          class="page-nav__dot"
          :class="{ 'is-active': page === n - 1 }"
          :aria-label="`Go to page ${n}`"
          :aria-selected="page === n - 1"
          @click="emit('go', n - 1)"
        />
      </div>

      <div class="page-nav__track" aria-hidden="true">
        <span class="page-nav__fill" :style="{ transform: `scaleX(${progress})` }" />
      </div>
    </div>

    <button
      type="button"
      class="page-nav__btn"
      aria-label="Next page"
      @click="emit('next')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
        <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.page-nav {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.9rem;
  padding-top: 0.85rem;
  border-top: 1px solid rgba(45, 69, 35, 0.55);
}

.page-nav__btn {
  display: grid;
  place-items: center;
  width: 2.35rem;
  height: 2.35rem;
  border-radius: 0.6rem;
  border: 1px solid rgba(45, 69, 35, 0.85);
  background: rgba(18, 28, 14, 0.55);
  color: inherit;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease;
}

.page-nav__btn:hover {
  transform: translateY(-1px);
}

.page-nav--green .page-nav__btn {
  color: #9cff66;
}

.page-nav--green .page-nav__btn:hover {
  border-color: rgba(81, 217, 40, 0.55);
  background: rgba(81, 217, 40, 0.12);
}

.page-nav--gold .page-nav__btn {
  color: #f0d35c;
  border-color: rgba(224, 187, 55, 0.35);
}

.page-nav--gold .page-nav__btn:hover {
  border-color: rgba(240, 211, 92, 0.55);
  background: rgba(224, 187, 55, 0.12);
}

.page-nav--gold {
  border-top-color: rgba(224, 187, 55, 0.28);
}

.page-nav__center {
  display: grid;
  gap: 0.45rem;
  justify-items: center;
  min-width: 0;
}

.page-nav__label {
  margin: 0;
  font-family: var(--font-display);
  font-size: 0.82rem;
  font-weight: 600;
  color: rgba(209, 213, 203, 0.8);
}

.page-nav__label span {
  color: #9cff66;
  font-size: 1rem;
}

.page-nav--gold .page-nav__label span {
  color: #f0d35c;
}

.page-nav__label em {
  font-style: normal;
  font-weight: 500;
  opacity: 0.7;
}

.page-nav__dots {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.35rem;
  max-width: 100%;
}

.page-nav__dot {
  width: 0.5rem;
  height: 0.5rem;
  padding: 0;
  border: 0;
  border-radius: 9999px;
  background: rgba(156, 255, 102, 0.28);
  cursor: pointer;
  transition: transform 0.2s ease, width 0.25s ease, background-color 0.2s ease;
}

.page-nav--gold .page-nav__dot {
  background: rgba(240, 211, 92, 0.28);
}

.page-nav__dot.is-active {
  width: 1.25rem;
  background: #51d928;
  box-shadow: 0 0 10px rgba(81, 217, 40, 0.45);
}

.page-nav--gold .page-nav__dot.is-active {
  background: #e0bb37;
  box-shadow: 0 0 10px rgba(224, 187, 55, 0.45);
}

.page-nav__dot:hover {
  transform: scale(1.15);
}

.page-nav__track {
  width: min(14rem, 70%);
  height: 2px;
  border-radius: 9999px;
  background: rgba(45, 69, 35, 0.7);
  overflow: hidden;
}

.page-nav--gold .page-nav__track {
  background: rgba(224, 187, 55, 0.25);
}

.page-nav__fill {
  display: block;
  height: 100%;
  width: 100%;
  transform-origin: left center;
  transform: scaleX(0);
  background: linear-gradient(90deg, #51d928, #9cff66);
  transition: transform 0.05s linear;
}

.page-nav--gold .page-nav__fill {
  background: linear-gradient(90deg, #e0bb37, #f0d35c);
}

@media (max-width: 767px) {
  .page-nav {
    gap: 0.5rem;
  }

  .page-nav__label em {
    display: none;
  }

  .page-nav__btn {
    width: 2.15rem;
    height: 2.15rem;
  }
}
</style>
