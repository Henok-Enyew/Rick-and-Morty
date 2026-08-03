<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { SwiperSlide, Swiper } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay, Mousewheel } from "swiper/modules";

const modules = [Navigation, Autoplay, Mousewheel];
const aboutRef = ref(null);
const inView = ref(false);
let observer;

const photos = [
  "https://i.pinimg.com/564x/22/54/c5/2254c5d6a60c3373096d1e1d9248612f.jpg",
  "https://i.pinimg.com/564x/f2/83/6c/f2836c465d821c92b5267faa7daaefb2.jpg",
  "https://i.pinimg.com/564x/fa/5f/d1/fa5fd1957d475692ea4fc01a5acd0487.jpg",
  "https://i.pinimg.com/564x/13/44/0c/13440cc8bfd3425b044e82c8cc2c696a.jpg",
  "https://i.pinimg.com/564x/de/06/c3/de06c312d9dbf6f6e87dc9d77a122210.jpg",
  "https://i.pinimg.com/564x/b0/a4/de/b0a4de7caeb162b485e169078df2b53c.jpg",
  "https://i.pinimg.com/564x/c3/8b/70/c38b70817258087e874eea09b8a926a3.jpg",
  "https://i.pinimg.com/736x/52/df/77/52df7712b50f08b8174e25dec1415330.jpg",
];

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        inView.value = true;
        observer?.disconnect();
      }
    },
    { threshold: 0.2 }
  );
  if (aboutRef.value) observer.observe(aboutRef.value);
});

onUnmounted(() => observer?.disconnect());
</script>

<template>
  <section
    id="about"
    ref="aboutRef"
    class="about"
    :class="{ 'is-inview': inView }"
  >
    <img
      src="../assets/Images/Portal.png"
      alt=""
      class="about__portal"
      aria-hidden="true"
    />

    <h2 class="about__title">About</h2>

    <div class="about__card">
      <div class="about__media">
        <swiper
          :loop="true"
          :navigation="true"
          :modules="modules"
          :autoplay="{
            delay: 2500,
            disableOnInteraction: false,
          }"
          :mousewheel="true"
          class="about__swiper"
        >
          <swiper-slide v-for="photo in photos" :key="photo">
            <img :src="photo" alt="Rick and Morty still" class="about__slide" />
          </swiper-slide>
        </swiper>
      </div>

      <p class="about__copy">
        "Rick and Morty" follows the adventures of an eccentric scientist, Rick
        Sanchez, and his easily influenced grandson, Morty Smith, as they
        journey through alternate dimensions and bizarre galaxies. Fueled by
        Rick's insatiable curiosity and penchant for chaos, the duo navigates a
        universe filled with strange creatures, existential crises, and
        mind-bending concepts. Through its blend of sharp humor, inventive
        storytelling, and philosophical undertones, the show explores themes of
        family, identity, and the nature of existence. With its cult following
        and critical acclaim, "Rick and Morty" has become a beloved and
        influential staple of modern pop culture.
      </p>
    </div>
  </section>
</template>

<style scoped>
.about {
  position: relative;
  width: 100%;
  min-height: 100vh;
  min-height: 100svh;
  overflow: hidden;
  background: #121c0e;
  padding: 3.5rem 8rem 3rem;
}

.about__portal {
  position: absolute;
  width: 40%;
  right: -4rem;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.95;
  pointer-events: none;
  animation: portal-spin 28s linear infinite;
  filter: drop-shadow(0 0 28px rgba(81, 217, 40, 0.25));
}

.about__title {
  position: relative;
  z-index: 2;
  margin: 0 0 1.1rem;
  color: #9cff66;
  font-size: clamp(2.1rem, 3.4vw, 2.75rem);
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.about.is-inview .about__title {
  opacity: 1;
  transform: translateY(0);
}

.about__card {
  position: absolute;
  left: 50%;
  top: 54%;
  transform: translate(-50%, -46%) translateY(28px);
  width: 80%;
  height: 78%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 2rem;
  color: #fff;
  background: rgba(23, 35, 18, 0.35);
  backdrop-filter: blur(18px);
  border-top: 2px solid #9cff66;
  border-left: 1px solid #9cff66;
  border-radius: 0.9rem;
  box-shadow: 0 0 0 1px rgba(81, 217, 40, 0.08);
  opacity: 0;
  transition:
    opacity 0.7s ease 0.12s,
    transform 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.12s,
    box-shadow 0.4s ease;
}

.about.is-inview .about__card {
  opacity: 1;
  transform: translate(-50%, -50%);
  animation: card-glow 4.5s ease-in-out infinite 1s;
}

.about__media {
  opacity: 0;
  transform: translateX(-24px) scale(0.96);
  transition:
    opacity 0.7s ease 0.28s,
    transform 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.28s;
}

.about.is-inview .about__media {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.about__swiper {
  width: min(24rem, 100%);
}

.about__slide {
  display: block;
  width: min(18rem, 100%);
  height: 30rem;
  margin: 0 auto;
  object-fit: cover;
  border-radius: 0.55rem;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
}

.about__copy {
  margin: 0;
  padding-right: 0.5rem;
  font-size: clamp(1.05rem, 1.35vw, 1.2rem);
  line-height: 1.75;
  color: rgba(236, 240, 230, 0.94);
  opacity: 0;
  transform: translateY(22px);
  transition:
    opacity 0.7s ease 0.42s,
    transform 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.42s;
}

.about.is-inview .about__copy {
  opacity: 1;
  transform: translateY(0);
}

@keyframes portal-spin {
  from {
    transform: translateY(-50%) rotate(0deg);
  }
  to {
    transform: translateY(-50%) rotate(360deg);
  }
}

@keyframes card-glow {
  0%,
  100% {
    box-shadow:
      0 0 0 1px rgba(81, 217, 40, 0.08),
      0 18px 50px rgba(0, 0, 0, 0.22);
  }
  50% {
    box-shadow:
      0 0 0 1px rgba(156, 255, 102, 0.22),
      0 22px 60px rgba(81, 217, 40, 0.12);
  }
}

@media (max-width: 1023px) {
  .about {
    padding: 3rem 2.5rem 2.5rem;
  }

  .about__portal {
    width: 60%;
    right: -7rem;
    height: 66%;
    object-fit: contain;
  }

  .about__card {
    grid-template-columns: 1fr;
    width: 88%;
    height: 80%;
    overflow-y: auto;
    padding: 1.5rem 2rem;
    align-content: start;
  }

  .about__slide {
    width: 15rem;
    height: 24rem;
  }
}

@media (max-width: 767px) {
  .about {
    padding: 3rem 0.85rem 2rem;
  }

  .about__portal {
    width: 60%;
    right: -5rem;
  }

  .about__title {
    margin-left: 0.35rem;
  }

  .about__card {
    width: 92%;
    height: 82%;
    padding: 1rem 0.85rem 1.25rem;
  }

  .about__swiper {
    width: 18rem;
    margin: 0 auto;
  }

  .about__slide {
    width: 14rem;
    height: 22rem;
  }

  .about__copy {
    font-size: 1.05rem;
    padding: 0 0.15rem 0.5rem;
  }
}
</style>

<style>
.about .swiper-button-prev {
  left: 0.75rem !important;
  opacity: 1 !important;
}

.about .swiper-button-next {
  right: 0.75rem !important;
}

.about .swiper-button-prev,
.about .swiper-button-next {
  color: #51d928 !important;
  transition: color 0.3s ease;
}

.about .swiper-button-prev:hover,
.about .swiper-button-next:hover {
  color: #41ae20 !important;
}

@media (max-width: 1023px) {
  .about .swiper-button-prev,
  .about .swiper-button-next {
    display: none !important;
  }
}

@media (max-width: 767px) {
  .about .swiper-button-prev {
    left: 0.25rem !important;
  }

  .about .swiper-button-next {
    right: 0.25rem !important;
  }
}
</style>
