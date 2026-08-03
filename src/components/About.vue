<script setup>
import { ref, watch } from "vue";
import { SwiperSlide, Swiper } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import {
  Autoplay,
  EffectCreative,
  Keyboard,
  Pagination,
} from "swiper/modules";
import { useInView } from "../composables/useInView";

const modules = [EffectCreative, Autoplay, Pagination, Keyboard];
const aboutRef = ref(null);
const swiperInstance = ref(null);
const activeIndex = ref(0);
const revealed = ref(false);

const { inView: isActive } = useInView(aboutRef, {
  threshold: 0.12,
  rootMargin: "60px 0px",
});

watch(
  isActive,
  (visible) => {
    if (visible) revealed.value = true;
    const autoplay = swiperInstance.value?.autoplay;
    if (!autoplay) return;
    if (visible) autoplay.start();
    else autoplay.stop();
  },
  { flush: "post" }
);

const photos = [
  {
    src: "https://i.pinimg.com/564x/22/54/c5/2254c5d6a60c3373096d1e1d9248612f.jpg",
    label: "Family Breakfast",
  },
  {
    src: "https://i.pinimg.com/564x/f2/83/6c/f2836c465d821c92b5267faa7daaefb2.jpg",
    label: "Garage Science",
  },
  {
    src: "https://i.pinimg.com/564x/fa/5f/d1/fa5fd1957d475692ea4fc01a5acd0487.jpg",
    label: "Portal Hop",
  },
  {
    src: "https://i.pinimg.com/564x/13/44/0c/13440cc8bfd3425b044e82c8cc2c696a.jpg",
    label: "Citadel Chaos",
  },
  {
    src: "https://i.pinimg.com/564x/de/06/c3/de06c312d9dbf6f6e87dc9d77a122210.jpg",
    label: "Interdimensional Cable",
  },
  {
    src: "https://i.pinimg.com/564x/b0/a4/de/b0a4de7caeb162b485e169078df2b53c.jpg",
    label: "Pickle Trouble",
  },
  {
    src: "https://i.pinimg.com/564x/c3/8b/70/c38b70817258087e874eea09b8a926a3.jpg",
    label: "Meeseeks Mayhem",
  },
  {
    src: "https://i.pinimg.com/736x/52/df/77/52df7712b50f08b8174e25dec1415330.jpg",
    label: "Cronenberg Night",
  },
];

const creativeEffect = {
  prev: {
    shadow: true,
    translate: ["-18%", 8, -180],
    rotate: [0, 0, -12],
    opacity: 0.45,
  },
  next: {
    shadow: true,
    translate: ["108%", 0, -40],
    rotate: [0, 0, 10],
    opacity: 0.2,
  },
};

function onSwiper(swiper) {
  swiperInstance.value = swiper;
  if (!isActive.value) swiper.autoplay?.stop();
}

function onSlideChange(swiper) {
  activeIndex.value = swiper.realIndex;
}
</script>

<template>
  <section
    id="about"
    ref="aboutRef"
    class="about"
    :class="{ 'is-inview': revealed, 'is-active': isActive }"
  >
    <img
      src="../assets/Images/Portal.png"
      alt=""
      class="about__portal"
      aria-hidden="true"
    />
    <div class="about__orb about__orb--a" aria-hidden="true" />
    <div class="about__orb about__orb--b" aria-hidden="true" />

    <div class="about__heading">
      <p class="about__eyebrow">Dimension C-137</p>
      <h2 class="about__title">About</h2>
    </div>

    <div class="about__card">
      <div class="about__gallery">
        <div class="about__counter" aria-live="polite">
          <span class="about__counter-current">
            {{ String(activeIndex + 1).padStart(2, "0") }}
          </span>
          <span class="about__counter-sep">/</span>
          <span>{{ String(photos.length).padStart(2, "0") }}</span>
        </div>

        <swiper
          :modules="modules"
          effect="creative"
          :creative-effect="creativeEffect"
          :grab-cursor="true"
          :loop="true"
          :keyboard="{ enabled: true }"
          :autoplay="{
            delay: 3200,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }"
          :pagination="{ clickable: true }"
          class="about__swiper"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide v-for="photo in photos" :key="photo.src">
            <figure class="about__frame">
              <img
                :src="photo.src"
                :alt="photo.label"
                class="about__image"
                loading="lazy"
                decoding="async"
              />
              <figcaption class="about__caption">{{ photo.label }}</figcaption>
              <span class="about__scan" aria-hidden="true" />
            </figure>
          </swiper-slide>
        </swiper>

        <p class="about__hint">Drag to hop dimensions</p>
      </div>

      <div class="about__story">
        <p class="about__lead">
          A genius scientist. An anxious grandson.
          <em>Infinite timelines.</em>
        </p>
        <p class="about__copy">
          "Rick and Morty" follows the adventures of an eccentric scientist,
          <strong>Rick Sanchez</strong>, and his easily influenced grandson,
          <strong>Morty Smith</strong>, as they journey through alternate
          dimensions and bizarre galaxies. Fueled by Rick's insatiable curiosity
          and penchant for chaos, the duo navigates a universe filled with
          strange creatures, existential crises, and mind-bending concepts.
        </p>
        <p class="about__copy">
          Through its blend of sharp humor, inventive storytelling, and
          philosophical undertones, the show explores themes of family,
          identity, and the nature of existence — a cult classic of modern pop
          culture.
        </p>

        <ul class="about__chips" aria-label="Show themes">
          <li>Multiverse</li>
          <li>Dark comedy</li>
          <li>Found family</li>
          <li>Sci-fi chaos</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  position: relative;
  isolation: isolate;
  width: 100%;
  overflow: hidden;
  background: #121c0e;
  padding: 2.25rem 6rem 2.5rem;
  content-visibility: auto;
  contain-intrinsic-size: auto 720px;
}

.about__portal {
  position: absolute;
  width: 34%;
  right: -4rem;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.85;
  pointer-events: none;
  z-index: 0;
  filter: drop-shadow(0 0 24px rgba(81, 217, 40, 0.18));
}

.about__orb {
  position: absolute;
  border-radius: 9999px;
  filter: blur(55px);
  pointer-events: none;
  z-index: 0;
  mix-blend-mode: screen;
}

.about__orb--a {
  width: 16rem;
  height: 16rem;
  left: 8%;
  bottom: 8%;
  background: rgba(81, 217, 40, 0.16);
  animation: orb-float 8s ease-in-out infinite alternate;
  animation-play-state: paused;
}

.about__orb--b {
  width: 11rem;
  height: 11rem;
  right: 28%;
  top: 14%;
  background: rgba(156, 255, 102, 0.1);
  animation: orb-float 10s ease-in-out infinite alternate-reverse;
  animation-play-state: paused;
}

.about.is-active .about__orb--a,
.about.is-active .about__orb--b {
  animation-play-state: running;
}

.about__heading {
  position: relative;
  z-index: 2;
  margin-bottom: 1rem;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.55s ease, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}

.about.is-inview .about__heading {
  opacity: 1;
  transform: translateY(0);
}

.about__eyebrow {
  margin: 0 0 0.25rem;
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(81, 217, 40, 0.9);
}

.about__title {
  margin: 0;
  color: #9cff66;
  font-size: clamp(1.75rem, 2.6vw, 2.15rem);
}

.about__card {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(16rem, 0.85fr) 1.2fr;
  align-items: center;
  gap: 1.75rem;
  width: min(64rem, 100%);
  margin: 0 auto;
  padding: 1.25rem 1.5rem;
  background: rgba(23, 35, 18, 0.72);
  border-top: 2px solid #9cff66;
  border-left: 1px solid rgba(156, 255, 102, 0.65);
  border-radius: 1rem;
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.7s ease 0.1s,
    transform 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.1s;
}

.about.is-inview .about__card {
  opacity: 1;
  transform: translateY(0);
}

.about.is-active.is-inview .about__card {
  animation: card-glow 5s ease-in-out infinite 1s;
}

.about__gallery {
  position: relative;
  opacity: 0;
  transform: translateX(-20px);
  transition:
    opacity 0.65s ease 0.25s,
    transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.25s;
}

.about.is-inview .about__gallery {
  opacity: 1;
  transform: translateX(0);
}

.about__counter {
  display: flex;
  align-items: baseline;
  gap: 0.3rem;
  margin-bottom: 0.85rem;
  font-family: var(--font-display);
  font-size: 0.95rem;
  letter-spacing: 0.04em;
  color: rgba(209, 213, 203, 0.65);
}

.about__counter-current {
  color: #9cff66;
  font-size: 1.45rem;
  font-weight: 700;
}

.about__counter-sep {
  opacity: 0.5;
}

.about__swiper {
  width: min(13rem, 100%);
  padding-bottom: 1.75rem !important;
}

.about__frame {
  position: relative;
  margin: 0;
  overflow: hidden;
  border-radius: 0.85rem;
  background: #0d140a;
  box-shadow:
    0 18px 40px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(81, 217, 40, 0.2);
}

.about__image {
  display: block;
  width: 100%;
  height: 22rem;
  object-fit: cover;
  transform: scale(1.04);
  transition: transform 0.7s ease;
}

.about__swiper :deep(.swiper-slide-active) .about__image {
  transform: scale(1);
}

.about__caption {
  position: absolute;
  left: 0.85rem;
  bottom: 0.85rem;
  z-index: 2;
  padding: 0.35rem 0.65rem;
  border-radius: 0.4rem;
  background: rgba(12, 18, 10, 0.88);
  color: #e8ece4;
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.about__scan {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(156, 255, 102, 0.12) 50%,
    transparent 100%
  );
  mix-blend-mode: screen;
  opacity: 0;
  transform: translateY(-100%);
}

.about__swiper :deep(.swiper-slide-active) .about__scan {
  animation: scan-pass 2.8s ease-in-out 0.2s;
}

.about__hint {
  margin: 0.15rem 0 0;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(156, 255, 102, 0.55);
  font-family: var(--font-display);
}

.about__story {
  opacity: 0;
  transform: translateY(22px);
  transition:
    opacity 0.7s ease 0.38s,
    transform 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.38s;
}

.about.is-inview .about__story {
  opacity: 1;
  transform: translateY(0);
}

.about__lead {
  margin: 0 0 0.75rem;
  max-width: 26rem;
  font-family: var(--font-display);
  font-size: clamp(1.1rem, 1.6vw, 1.35rem);
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.02em;
  color: #f3f6ef;
}

.about__lead em {
  font-style: normal;
  color: #9cff66;
}

.about__copy {
  margin: 0 0 0.7rem;
  max-width: 34rem;
  font-size: clamp(0.92rem, 1.05vw, 1.02rem);
  line-height: 1.65;
  color: rgba(232, 236, 228, 0.92);
}

.about__copy strong {
  color: #9cff66;
  font-weight: 600;
}

.about__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 1rem 0 0;
  padding: 0;
  list-style: none;
}

.about__chips li {
  padding: 0.3rem 0.6rem;
  border: 1px solid rgba(45, 69, 35, 0.95);
  border-radius: 0.45rem;
  background: rgba(18, 28, 14, 0.45);
  color: rgba(209, 213, 203, 0.88);
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.about__chips li:hover {
  color: #9cff66;
  border-color: rgba(81, 217, 40, 0.7);
  transform: translateY(-2px);
}

.about__swiper :deep(.swiper-pagination) {
  bottom: 0.2rem !important;
}

.about__swiper :deep(.swiper-pagination-bullet) {
  width: 0.55rem;
  height: 0.55rem;
  background: rgba(81, 217, 40, 0.35);
  opacity: 1;
  transition: transform 0.25s ease, background-color 0.25s ease, width 0.25s ease;
}

.about__swiper :deep(.swiper-pagination-bullet-active) {
  width: 1.45rem;
  border-radius: 9999px;
  background: #51d928;
  box-shadow: 0 0 12px rgba(81, 217, 40, 0.55);
}

@keyframes orb-float {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(12px, -18px, 0);
  }
}

@keyframes card-glow {
  0%,
  100% {
    box-shadow:
      0 0 0 1px rgba(81, 217, 40, 0.08),
      0 20px 50px rgba(0, 0, 0, 0.22);
  }
  50% {
    box-shadow:
      0 0 0 1px rgba(156, 255, 102, 0.2),
      0 24px 60px rgba(81, 217, 40, 0.1);
  }
}

@keyframes scan-pass {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  20% {
    opacity: 0.7;
  }
  100% {
    opacity: 0;
    transform: translateY(100%);
  }
}

@media (max-width: 1023px) {
  .about {
    padding: 2rem 1.5rem 2rem;
  }

  .about__portal {
    width: 48%;
    right: -6rem;
  }

  .about__card {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    padding: 1.1rem 1rem 1.25rem;
  }

  .about__swiper {
    margin: 0 auto;
  }

  .about__image {
    height: 15.5rem;
  }
}

@media (max-width: 767px) {
  .about {
    padding: 1.75rem 0.85rem 1.75rem;
  }

  .about__portal {
    width: 60%;
    right: -5rem;
    opacity: 0.65;
  }

  .about__card {
    padding: 0.95rem 0.75rem 1.1rem;
  }

  .about__lead {
    font-size: 1.1rem;
  }

  .about__copy {
    font-size: 0.92rem;
  }

  .about__image {
    height: 14.5rem;
  }
}
</style>
