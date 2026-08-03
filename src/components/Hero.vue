<script setup>
import { ref } from "vue";
import { useInView } from "../composables/useInView";

const heroRef = ref(null);
const { inView } = useInView(heroRef, {
  threshold: 0.05,
  rootMargin: "0px",
  initial: true,
});
</script>

<template>
  <section
    ref="heroRef"
    class="hero"
    :class="{ 'is-active': inView }"
    aria-label="Rick and Morty hero"
  >
    <div class="hero__media" aria-hidden="true" />
    <div class="hero__veil" aria-hidden="true" />
    <div class="hero__glow hero__glow--one" aria-hidden="true" />
    <div class="hero__glow hero__glow--two" aria-hidden="true" />
    <div class="hero__grid" aria-hidden="true" />

    <div class="hero__content">
      <img
        src="../assets/Images/Logo2.png"
        alt="Rick and Morty"
        class="hero__logo anim-in"
        style="--d: 0.05s"
      />

      <div class="hero__tags anim-in" style="--d: 0.18s">
        <span>Animation</span>
        <span>Adventure</span>
        <span>Comedy</span>
      </div>

      <div class="hero__rating anim-in" style="--d: 0.3s">
        <p class="hero__rating-label">
          IMDb Rating
          <span class="hero__rating-score">9.1</span>
        </p>
        <div class="hero__stars" aria-hidden="true">
          <span v-for="n in 4" :key="n" class="hero__star is-full">★</span>
          <span class="hero__star is-half">★</span>
        </div>
      </div>

      <p class="hero__blurb anim-in" style="--d: 0.42s">
        A genius scientist and his anxious grandson tear through dimensions,
        timelines, and whatever’s left of family dinner.
      </p>

      <div class="hero__meta anim-in" style="--d: 0.52s">
        <p>
          <span class="hero__meta-label">Creators</span>
          Dan Harmon, Justin Roiland
        </p>
        <p>
          <span class="hero__meta-label">Stars</span>
          Chris Parnell, Spencer Grammer, Sarah Chalke
        </p>
      </div>

      <div class="hero__actions anim-in" style="--d: 0.64s">
        <a
          href="https://ww1.goojara.to/e0Mvx4"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-portal"
        >
          <span class="btn-portal__shine" aria-hidden="true" />
          <span class="btn-portal__icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
              <path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z" />
            </svg>
          </span>
          <span class="btn-portal__label">Watch now</span>
        </a>

        <a
          href="https://youtu.be/rLyOul8kau0?si=Wi0L5CEegFXwxq9f"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-ghost"
        >
          <span class="btn-ghost__border" aria-hidden="true" />
          <span class="btn-ghost__label">Trailer</span>
        </a>
      </div>
    </div>

    <a href="#about" class="hero__scroll" aria-label="Scroll to about">
      <span>Scroll</span>
      <i />
    </a>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  isolation: isolate;
  width: 100%;
  min-height: 100vh;
  min-height: 100svh;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  color: #e8ece4;
}

.hero__media {
  position: absolute;
  inset: 0;
  z-index: -3;
  background:
    url("https://i.pinimg.com/originals/0d/53/3a/0d533a8327df5569e02aba4fd3497461.jpg")
    right bottom / cover no-repeat;
  transform: scale(1.06);
  animation: hero-ken 22s ease-in-out infinite alternate;
  animation-play-state: paused;
  will-change: auto;
}

.hero.is-active .hero__media {
  animation-play-state: running;
  will-change: transform;
}

.hero:not(.is-active) .hero__media {
  will-change: auto;
}

.hero__veil {
  position: absolute;
  inset: 0;
  z-index: -2;
  background:
    linear-gradient(90deg, rgba(10, 16, 8, 0.92) 0%, rgba(10, 16, 8, 0.72) 42%, rgba(10, 16, 8, 0.28) 72%, rgba(10, 16, 8, 0.45) 100%),
    linear-gradient(180deg, rgba(18, 28, 14, 0.35) 0%, rgba(18, 28, 14, 0.15) 40%, rgba(18, 28, 14, 0.88) 100%);
}

.hero__glow {
  position: absolute;
  z-index: -1;
  border-radius: 9999px;
  filter: blur(50px);
  pointer-events: none;
  mix-blend-mode: screen;
}

.hero__glow--one {
  width: 28rem;
  height: 28rem;
  left: -6rem;
  bottom: -8rem;
  background: rgba(81, 217, 40, 0.22);
  animation: glow-drift 9s ease-in-out infinite alternate;
  animation-play-state: paused;
}

.hero__glow--two {
  width: 18rem;
  height: 18rem;
  right: 12%;
  top: 18%;
  background: rgba(156, 255, 102, 0.12);
  animation: glow-drift 11s ease-in-out infinite alternate-reverse;
  animation-play-state: paused;
}

.hero.is-active .hero__glow--one,
.hero.is-active .hero__glow--two {
  animation-play-state: running;
}

.hero__grid {
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: 0.08;
  background-image:
    linear-gradient(rgba(156, 255, 102, 0.35) 1px, transparent 1px),
    linear-gradient(90deg, rgba(156, 255, 102, 0.35) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse at 30% 70%, black 10%, transparent 70%);
  pointer-events: none;
}

.hero__content {
  position: relative;
  width: min(42rem, 100%);
  padding: 5.75rem 4rem 4.5rem;
  z-index: 1;
}

.hero__logo {
  width: min(22rem, 78vw);
  height: auto;
  filter: drop-shadow(0 12px 30px rgba(0, 0, 0, 0.45));
  animation: logo-float 5.5s ease-in-out infinite;
  animation-play-state: paused;
}

.hero.is-active .hero__logo {
  animation-play-state: running;
}

.hero__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 1.1rem;
}

.hero__tags span {
  font-family: var(--font-display);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(209, 213, 203, 0.85);
  border: 1px solid rgba(45, 69, 35, 0.9);
  background: rgba(18, 28, 14, 0.72);
  padding: 0.35rem 0.7rem;
  border-radius: 0.4rem;
  transition: color 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
}

.hero__tags span:hover {
  color: #9cff66;
  border-color: rgba(81, 217, 40, 0.65);
  transform: translateY(-2px);
}

.hero__rating {
  margin-top: 1.15rem;
}

.hero__rating-label {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #51d928;
}

.hero__rating-score {
  margin-left: 0.55rem;
  font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 700;
  color: #f3f6ef;
  letter-spacing: -0.03em;
}

.hero__stars {
  display: flex;
  gap: 0.15rem;
  margin-top: 0.2rem;
  color: #ffd700;
  font-size: 1.05rem;
  line-height: 1;
}

.hero__star {
  display: inline-block;
  opacity: 0;
  transform: scale(0.4) rotate(-18deg);
  animation: star-pop 0.45s cubic-bezier(0.22, 1.4, 0.36, 1) forwards;
}

.hero__star:nth-child(1) { animation-delay: 0.75s; }
.hero__star:nth-child(2) { animation-delay: 0.85s; }
.hero__star:nth-child(3) { animation-delay: 0.95s; }
.hero__star:nth-child(4) { animation-delay: 1.05s; }
.hero__star:nth-child(5) { animation-delay: 1.15s; }

.hero__star.is-half {
  background: linear-gradient(90deg, #ffd700 55%, rgba(255, 215, 0, 0.25) 55%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero__blurb {
  margin-top: 1.1rem;
  max-width: 28rem;
  font-size: clamp(0.98rem, 1.7vw, 1.12rem);
  line-height: 1.55;
  color: rgba(220, 226, 214, 0.86);
}

.hero__meta {
  margin-top: 1.35rem;
  display: grid;
  gap: 0.35rem;
  font-size: 0.92rem;
  color: rgba(229, 231, 235, 0.9);
}

.hero__meta-label {
  display: inline-block;
  min-width: 4.6rem;
  margin-right: 0.55rem;
  font-family: var(--font-display);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #51d928;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.85rem;
  margin-top: 1.75rem;
}

.btn-portal,
.btn-ghost {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  min-height: 2.85rem;
  padding: 0.7rem 1.35rem;
  border-radius: 0.65rem;
  text-decoration: none;
  font-family: var(--font-display);
  font-size: 0.92rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  overflow: hidden;
  isolation: isolate;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.btn-portal {
  color: #081008;
  background: linear-gradient(120deg, #6ef23a 0%, #51d928 45%, #2fa816 100%);
  box-shadow:
    0 0 0 1px rgba(156, 255, 102, 0.25),
    0 10px 28px rgba(81, 217, 40, 0.28);
}

.btn-portal__shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    115deg,
    transparent 20%,
    rgba(255, 255, 255, 0.45) 45%,
    transparent 70%
  );
  transform: translateX(-130%);
  animation: shine-sweep 3.4s ease-in-out infinite;
  animation-play-state: paused;
  pointer-events: none;
}

.hero.is-active .btn-portal__shine {
  animation-play-state: running;
}

.btn-portal__icon {
  display: grid;
  place-items: center;
  transition: transform 0.25s ease;
}

.btn-portal:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow:
    0 0 0 1px rgba(156, 255, 102, 0.4),
    0 16px 36px rgba(81, 217, 40, 0.4);
}

.btn-portal:hover .btn-portal__icon {
  transform: translateX(2px) scale(1.08);
}

.btn-portal:active {
  transform: translateY(-1px) scale(0.99);
}

.btn-ghost {
  color: #e8ece4;
  background: rgba(18, 28, 14, 0.72);
  border: 1px solid transparent;
}

.btn-ghost__border {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(120deg, #51d928, rgba(156, 255, 102, 0.2), #51d928);
  background-size: 220% 220%;
  animation: border-shift 3s linear infinite;
  animation-play-state: paused;
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.hero.is-active .btn-ghost__border {
  animation-play-state: running;
}

.btn-ghost__label {
  position: relative;
  z-index: 1;
}

.btn-ghost::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(81, 217, 40, 0.16);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 0;
}

.btn-ghost:hover {
  transform: translateY(-3px);
  color: #9cff66;
}

.btn-ghost:hover::before {
  transform: scaleX(1);
}

.hero__scroll {
  position: absolute;
  right: 1.75rem;
  bottom: 1.5rem;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.45rem;
  color: rgba(209, 213, 203, 0.7);
  text-decoration: none;
  font-family: var(--font-display);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition: color 0.2s ease;
}

.hero__scroll i {
  width: 1px;
  height: 2.2rem;
  background: linear-gradient(180deg, #51d928, transparent);
  position: relative;
  overflow: hidden;
}

.hero__scroll i::after {
  content: "";
  position: absolute;
  left: 0;
  width: 100%;
  height: 35%;
  background: #9cff66;
  animation: scroll-line 1.6s ease-in-out infinite;
  animation-play-state: paused;
}

.hero.is-active .hero__scroll i::after {
  animation-play-state: running;
}

.hero__scroll:hover {
  color: #9cff66;
}

.anim-in {
  opacity: 0;
  transform: translateY(22px);
  animation: rise-in 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: var(--d, 0s);
}

@keyframes rise-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes hero-ken {
  from { transform: scale(1.06) translate3d(0, 0, 0); }
  to { transform: scale(1.12) translate3d(-1.5%, -1%, 0); }
}

@keyframes glow-drift {
  from { transform: translate3d(0, 0, 0) scale(1); }
  to { transform: translate3d(8%, -6%, 0) scale(1.12); }
}

@keyframes logo-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes star-pop {
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

@keyframes shine-sweep {
  0%, 55% { transform: translateX(-130%); }
  75%, 100% { transform: translateX(130%); }
}

@keyframes border-shift {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}

@keyframes scroll-line {
  0% { top: -40%; }
  100% { top: 120%; }
}

@media (max-width: 1023px) {
  .hero {
    align-items: flex-start;
  }

  .hero__content {
    padding: 5.5rem 2.5rem 3rem;
  }
}

@media (max-width: 767px) {
  .hero {
    align-items: flex-start;
    min-height: 100svh;
  }

  .hero__content {
    width: 100%;
    padding: 4.35rem 1.1rem 3.25rem;
  }

  .hero__logo {
    width: min(15rem, 72vw);
  }

  .hero__tags {
    margin-top: 0.75rem;
  }

  .hero__rating {
    margin-top: 0.75rem;
  }

  .hero__blurb {
    margin-top: 0.85rem;
  }

  .hero__meta {
    max-width: 18rem;
    margin-top: 0.95rem;
  }

  .hero__actions {
    margin-top: 1.15rem;
  }

  .hero__scroll {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    bottom: 1.1rem;
  }

  .btn-portal,
  .btn-ghost {
    flex: 1 1 auto;
    min-width: 9.5rem;
  }
}
</style>
