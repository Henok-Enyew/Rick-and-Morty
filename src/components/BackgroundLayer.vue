<script setup>
import { computed } from "vue";
import heroMobile from "../assets/Images/hero-mobile.jpeg";

const props = defineProps({
  activeSection: {
    type: String,
    required: true,
  },
});

const slides = [
  {
    id: "hero",
    kind: "image",
    kenBurns: true,
  },
  {
    id: "about",
    kind: "color",
  },
  {
    id: "episodes",
    kind: "image",
  },
  {
    id: "characters",
    kind: "color",
  },
  {
    id: "locations",
    kind: "image",
  },
];

const activeId = computed(() => props.activeSection || "hero");
</script>

<template>
  <div
    class="bg-layer"
    aria-hidden="true"
    :style="{ '--hero-mobile-image': `url(${heroMobile})` }"
  >
    <div
      v-for="slide in slides"
      :key="slide.id"
      class="bg-layer__slide"
      :class="[
        `bg-layer__slide--${slide.id}`,
        {
          'is-active': activeId === slide.id,
          'is-kenburns': slide.kenBurns && activeId === slide.id,
        },
      ]"
    >
      <div class="bg-layer__media" />
      <div class="bg-layer__veil" />
    </div>
  </div>
</template>

<style scoped>
.bg-layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  background: #121c0e;
}

.bg-layer__slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.9s ease;
  will-change: opacity;
}

.bg-layer__slide.is-active {
  opacity: 1;
}

.bg-layer__media,
.bg-layer__veil {
  position: absolute;
  inset: 0;
}

/* ── Hero ─────────────────────────────────────────── */
.bg-layer__slide--hero .bg-layer__media {
  background:
    url("https://i.pinimg.com/originals/0d/53/3a/0d533a8327df5569e02aba4fd3497461.jpg")
    right bottom / cover no-repeat;
  transform: scale(1.06);
  will-change: auto;
}

.bg-layer__slide--hero.is-kenburns .bg-layer__media {
  animation: bg-ken 22s ease-in-out infinite alternate;
  will-change: transform;
}

.bg-layer__slide--hero .bg-layer__veil {
  background:
    linear-gradient(
      90deg,
      rgba(10, 16, 8, 0.92) 0%,
      rgba(10, 16, 8, 0.72) 42%,
      rgba(10, 16, 8, 0.28) 72%,
      rgba(10, 16, 8, 0.45) 100%
    ),
    linear-gradient(
      180deg,
      rgba(18, 28, 14, 0.35) 0%,
      rgba(18, 28, 14, 0.15) 40%,
      rgba(18, 28, 14, 0.88) 100%
    );
}

/* ── About / Characters (solid cinematic fill) ────── */
.bg-layer__slide--about .bg-layer__media,
.bg-layer__slide--characters .bg-layer__media {
  background: #121c0e;
}

.bg-layer__slide--about .bg-layer__veil,
.bg-layer__slide--characters .bg-layer__veil {
  background: transparent;
}

/* ── Episodes ─────────────────────────────────────── */
.bg-layer__slide--episodes .bg-layer__media {
  background:
    url("https://www.looper.com/img/gallery/the-most-terrible-things-rick-morty-have-ever-done/cronenberg-the-world-1497028481.jpg")
    center / cover no-repeat;
}

.bg-layer__slide--episodes .bg-layer__veil {
  background:
    linear-gradient(
      180deg,
      rgba(18, 28, 14, 0.82) 0%,
      rgba(18, 28, 14, 0.88) 55%,
      rgba(18, 28, 14, 0.94) 100%
    ),
    radial-gradient(ellipse at 15% 20%, rgba(81, 217, 40, 0.14), transparent 45%);
}

/* ── Locations ────────────────────────────────────── */
.bg-layer__slide--locations .bg-layer__media {
  background:
    url("https://i.pinimg.com/564x/46/d7/7b/46d77b586d6c00f2533c6e63f15fdd86.jpg")
    center / cover no-repeat;
}

.bg-layer__slide--locations .bg-layer__veil {
  background:
    linear-gradient(
      180deg,
      rgba(18, 28, 14, 0.84) 0%,
      rgba(18, 28, 14, 0.9) 60%,
      rgba(18, 28, 14, 0.95) 100%
    ),
    radial-gradient(ellipse at 80% 15%, rgba(224, 187, 55, 0.14), transparent 42%);
}

@keyframes bg-ken {
  from {
    transform: scale(1.06) translate3d(0, 0, 0);
  }
  to {
    transform: scale(1.12) translate3d(-1.5%, -1%, 0);
  }
}

@media (max-width: 767px) {
  .bg-layer__slide--hero .bg-layer__media {
    background: var(--hero-mobile-image) center top / cover no-repeat;
    animation: none !important;
    transform: none;
    will-change: auto;
  }

  .bg-layer__slide--hero .bg-layer__veil {
    background: linear-gradient(
      180deg,
      rgba(10, 16, 8, 0.82) 0%,
      rgba(10, 16, 8, 0.5) 28%,
      rgba(10, 16, 8, 0.58) 62%,
      rgba(10, 16, 8, 0.92) 100%
    );
  }
}

@media (prefers-reduced-motion: reduce) {
  .bg-layer__slide {
    transition-duration: 0.01ms;
  }

  .bg-layer__slide--hero .bg-layer__media {
    animation: none !important;
    transform: none;
  }
}
</style>
