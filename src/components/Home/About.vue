<script setup>
import { SwiperSlide, Swiper } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay, Mousewheel } from "swiper/modules";

const modules = [Navigation, Autoplay, Mousewheel];

const photos = [
  "Rick and Morty-1.jpg",
  "Rick and Morty-2.jpg",
  "Rick and Morty-3.jpg",
  "Rick and Morty-4.jpg",
  "Rick and Morty-5.jpg",
  "Rick and Morty-6.jpg",
];
</script>
<template>
  <div
    class="w-full bg-primary h-screen relative overflow-hidden px-32"
    id="about"
  >
    <img
      src="../../assets/Images/Portal.png"
      alt=""
      class="absolute w-2/5 -right-16 top-1/2 -translate-y-1/2 opacity-95 lg:h-4/6 lg:w-3/5 lg:-right-28"
    />
    <p class="text-header text-3xl mt-12 mb-4">About</p>
    <div
      class="text-white w-4/5 absolute left-1/2 -translate-x-1/2 bg-primaryLight bg-opacity-30 backdrop-blur-xl h-4/5 border-t-2 border-l border-header rounded-xl grid grid-cols-2 items-center lg:grid-cols-1 lg:items-center lg:px-16 lg:overflow-y-scroll"
    >
      <div v-motion-pop-visible class="py-8 pl-10 w-9/12">
        <swiper
          :loop="true"
          :navigation="true"
          :modules="modules"
          :autoplay="{
            delay: 2500,
            disableOnInteraction: false,
          }"
          :mousewheel="true"
          class="mySwiper"
        >
          <swiper-slide v-for="photo in photos" :key="photo">
            <img
              :src="`src/assets/Images/Carousel/${photo}`"
              alt="photo"
              class="w-72 !opacity-100 h-128 ml-8 lg:w-60 lg:h-96"
            />
          </swiper-slide>
        </swiper>
      </div>
      <div class="self-center pr-8 lg:text-md" v-motion-pop-visible>
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
      </div>
    </div>
  </div>
</template>
<style>
.swiper-button-prev {
  @apply left-0 !opacity-100;
}

.swiper-button-next {
  @apply right-3;
}

.swiper-button-prev,
.swiper-button-next {
  @apply text-secondary transition-all duration-300 lg:hidden;
}

.swiper-button-prev:hover,
.swiper-button-next:hover {
  @apply text-secondaryDarker;
}
</style>
