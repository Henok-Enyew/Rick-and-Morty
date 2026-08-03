<script setup>
defineProps({
  variant: {
    type: String,
    default: "episode", // episode | character | location
  },
});
</script>

<template>
  <div class="skeleton" :class="`skeleton--${variant}`" aria-hidden="true">
    <!-- Episode / Location hero -->
    <section v-if="variant !== 'character'" class="skeleton__hero">
      <div class="bone bone--eyebrow" />
      <div class="bone bone--code" :class="{ 'bone--title-lg': variant === 'location' }" />
      <div v-if="variant === 'episode'" class="bone bone--title" />
      <div class="skeleton__chips">
        <div v-for="n in 4" :key="n" class="bone bone--chip" />
      </div>
    </section>

    <!-- Character hero -->
    <section v-else class="skeleton__char">
      <div class="bone bone--portrait" />
      <div class="skeleton__char-info">
        <div class="bone bone--eyebrow" />
        <div class="bone bone--title-lg" />
        <div class="skeleton__stats">
          <div v-for="n in 4" :key="n" class="bone bone--stat" />
        </div>
        <div class="bone bone--location" />
      </div>
    </section>

    <section class="skeleton__panel">
      <div class="skeleton__panel-head">
        <div class="bone bone--heading" />
        <div class="bone bone--sub" />
      </div>

      <div v-if="variant === 'character'" class="skeleton__rows">
        <div v-for="n in 6" :key="n" class="bone bone--row" />
      </div>

      <div v-else class="skeleton__grid">
        <div v-for="n in 10" :key="n" class="skeleton__card">
          <div class="bone bone--thumb" />
          <div class="bone bone--line" />
          <div class="bone bone--line bone--line-short" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.skeleton {
  width: 100%;
  animation: skeleton-in 0.35s ease both;
}

.skeleton__hero {
  margin-bottom: 1.5rem;
}

.skeleton__chips,
.skeleton__stats {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 1rem;
}

.skeleton__char {
  display: grid;
  grid-template-columns: minmax(14rem, 18rem) 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.skeleton__char-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skeleton__panel {
  border: 1px solid rgba(45, 69, 35, 0.55);
  border-radius: 1rem;
  background: rgba(18, 28, 14, 0.45);
  padding: 1.1rem;
}

.skeleton--location .skeleton__panel {
  border-color: rgba(224, 187, 55, 0.28);
}

.skeleton__panel-head {
  margin-bottom: 1rem;
  display: grid;
  gap: 0.45rem;
}

.skeleton__grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.85rem;
}

.skeleton__card {
  display: grid;
  gap: 0.45rem;
}

.skeleton__rows {
  display: grid;
  gap: 0.6rem;
}

.bone {
  position: relative;
  overflow: hidden;
  border-radius: 0.55rem;
  background: rgba(81, 217, 40, 0.08);
}

.skeleton--location .bone {
  background: rgba(224, 187, 55, 0.1);
}

.bone::after {
  content: "";
  position: absolute;
  inset: 0;
  transform: translateX(-120%);
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.08),
    transparent
  );
  animation: shimmer 1.4s ease-in-out infinite;
}

.bone--eyebrow {
  width: 7rem;
  height: 0.7rem;
}

.bone--code {
  width: min(16rem, 55%);
  height: 3.4rem;
  margin-top: 0.55rem;
  border-radius: 0.7rem;
}

.bone--title {
  width: min(22rem, 70%);
  height: 1.6rem;
  margin-top: 0.7rem;
}

.bone--title-lg {
  width: min(26rem, 85%);
  height: 2.4rem;
  margin-top: 0.45rem;
}

.bone--chip {
  width: 7.5rem;
  height: 2rem;
}

.bone--portrait {
  aspect-ratio: 1 / 1;
  width: 100%;
  border-radius: 1rem;
}

.bone--stat {
  width: calc(50% - 0.35rem);
  height: 3.4rem;
  flex: 1 1 42%;
}

.bone--location {
  width: 100%;
  height: 3.2rem;
  margin-top: 0.35rem;
}

.bone--heading {
  width: 14rem;
  height: 1.3rem;
}

.bone--sub {
  width: 18rem;
  height: 0.8rem;
}

.bone--thumb {
  aspect-ratio: 1 / 1;
  width: 100%;
  border-radius: 0.7rem;
}

.bone--line {
  width: 90%;
  height: 0.7rem;
}

.bone--line-short {
  width: 60%;
}

.bone--row {
  width: 100%;
  height: 3.6rem;
  border-radius: 0.7rem;
}

@keyframes shimmer {
  100% {
    transform: translateX(120%);
  }
}

@keyframes skeleton-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 1279px) {
  .skeleton__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 1023px) {
  .skeleton__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .skeleton__char {
    grid-template-columns: minmax(12rem, 15rem) 1fr;
  }
}

@media (max-width: 767px) {
  .skeleton__char {
    grid-template-columns: 1fr;
  }

  .bone--portrait {
    max-width: 18rem;
    margin: 0 auto;
  }

  .skeleton__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .bone--sub {
    width: 70%;
  }
}
</style>
