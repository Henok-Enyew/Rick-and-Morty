<script setup>
import { ref } from "vue";
const openNav = ref(false);
</script>
<template>
  <div
    class="w-full bg-cover bg-right-bottom h-screen bg-[url('https://i.pinimg.com/originals/0d/53/3a/0d533a8327df5569e02aba4fd3497461.jpg')]"
  >
    <!-- class="w-full bg-cover bg-right-bottom h-screen bg-[url('https://i.pinimg.com/originals/0d/53/3a/0d533a8327df5569e02aba4fd3497461.jpg')] bg-gradient-to-br from-primary to-transparent"></div>  -->

    <nav class="flex justify-between items-center px-3 py-1 w-full">
      <img
        src="../assets/Images/Logo.png"
        alt="Logo"
        class="h-12 w-14 rounded-full"
      />
      <div
        class="text-gray-200 transition-all duration-300 flex gap-4 md:absolute md:flex md:flex-col md:items-center md:h-screen md:bg-primary80 md:top-0 md:right-0 md:w-full md:z-50 md:justify-center"
        :class="openNav ? `md:flex=` : `md:hidden  `"
      >
        <a
          class="hover:text-secondaryDarker duration-300"
          @click="openNav = false"
          href="#about"
          >About</a
        >
        <a
          class="hover:text-secondaryDarker duration-300"
          @click="openNav = false"
          href="#episodes"
          >Episodes</a
        >
        <a
          class="hover:text-secondaryDarker duration-300"
          @click="openNav = false"
          href="#characters"
          >Characters</a
        >
        <a
          class="hover:text-secondaryDarker duration-300"
          @click="openNav = false"
          href="#locations"
          >Location</a
        >
      </div>
      <button class="hidden z-50 md:block mr-3" @click="openNav = !openNav">
        <svg
          v-if="!openNav"
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          fill="#fff"
          viewBox="0 0 256 256"
        >
          <path
            d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"
          ></path>
        </svg>
        <svg
          v-if="openNav"
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          fill="#fff"
          viewBox="0 0 256 256"
        >
          <path
            d="M204.24,195.76a6,6,0,1,1-8.48,8.48L128,136.49,60.24,204.24a6,6,0,0,1-8.48-8.48L119.51,128,51.76,60.24a6,6,0,0,1,8.48-8.48L128,119.51l67.76-67.75a6,6,0,0,1,8.48,8.48L136.49,128Z"
          ></path>
        </svg>
      </button>
    </nav>
    <div class="pl-16 pt-16 md:pl-4 lg:pt-4 lg:pl-12">
      <img
        src="../assets/Images/Logo2.png"
        alt=""
        class="w-96 md:w-64"
        v-motion-slide-visible-top
      />
      <div
        class="text-gray-400 flex gap-2 mt-3 lg:mt-0 md:text-sm"
        v-motion-slide-visible-top
      >
        <p class="border border-forBorders rounded-3xl px-3">Animation</p>
        <p class="border border-forBorders rounded-3xl px-3">Adventure</p>
        <p class="border border-forBorders rounded-3xl px-3">Comedy</p>
      </div>
      <p class="mt-2" v-motion-slide-visible-top>
        <span class="text-secondary ml-3 font-medium text-xl lg:text-md"
          >IMDb Rating-</span
        >
        <span class="text-gray-200 text-4xl lg:text-lg"> 9.1 </span>
      </p>
      <div class="flex gap-3 ml-3 opacity-80" v-motion-slide-visible-top>
        <svg
          class="lg:w-5 lg:h-5 md:h-4 md:w-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#FFD700"
          viewBox="0 0 256 256"
        >
          <path
            d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z"
          ></path>
        </svg>
        <svg
          class="lg:w-5 lg:h-5 md:h-4 md:w-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#FFD700"
          viewBox="0 0 256 256"
        >
          <path
            d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z"
          ></path>
        </svg>
        <svg
          class="lg:w-5 lg:h-5 md:h-4 md:w-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#FFD700"
          viewBox="0 0 256 256"
        >
          <path
            d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z"
          ></path>
        </svg>
        <svg
          class="lg:w-5 lg:h-5 md:h-4 md:w-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#FFD700"
          viewBox="0 0 256 256"
        >
          <path
            d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z"
          ></path>
        </svg>
        <svg
          class="lg:w-5 lg:h-5 md:h-4 md:w-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#FFD700"
          viewBox="0 0 256 256"
        >
          <path
            d="M239.18,97.26A16.38,16.38,0,0,0,224.92,86l-59-4.76L143.14,26.15a16.36,16.36,0,0,0-30.27,0L90.11,81.23,31.08,86a16.46,16.46,0,0,0-9.37,28.86l45,38.83L53,211.75a16.4,16.4,0,0,0,24.5,17.82L128,198.49l50.53,31.08A16.4,16.4,0,0,0,203,211.75l-13.76-58.07,45-38.83A16.43,16.43,0,0,0,239.18,97.26Zm-15.34,5.47-48.7,42a8,8,0,0,0-2.56,7.91l14.88,62.8a.37.37,0,0,1-.17.48c-.18.14-.23.11-.38,0l-54.72-33.65A8,8,0,0,0,128,181.1V32c.24,0,.27.08.35.26L153,91.86a8,8,0,0,0,6.75,4.92l63.91,5.16c.16,0,.25,0,.34.29S224,102.63,223.84,102.73Z"
          ></path>
        </svg>
      </div>
      <div
        class="mt-16 ml-3 lg:mt-4 md:mt-8 md:w-48"
        v-motion-slide-visible-top
      >
        <p class="text-secondary font-thin">
          Creators:
          <span class="text-gray-200 ml-2">Dan Harmon, Justin Roiland</span>
        </p>
        <p class="text-secondary font-thin">
          Stars:
          <span class="text-gray-200 ml-2"
            >Chris Parnell, Spencer Grammer, Sarah Chalke</span
          >
        </p>
      </div>
      <div class="flex items-center gap-4 mt-3 md:mt-64 md:ml-0 ml-3">
        <a
          href="https://ww1.goojara.to/e0Mvx4"
          target="_blank"
          class="text-gray-200 flex items-center gap-2 border border-secondary rounded-md py-1 bg-secondary w-fit px-3 hover:bg-secondaryDarker duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#fff"
            viewBox="0 0 256 256"
          >
            <path
              d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"
            ></path>
          </svg>
          Watch now
        </a>
        <a
          href="https://youtu.be/rLyOul8kau0?si=Wi0L5CEegFXwxq9f"
          target="_blank"
          class="text-gray-200 border border-secondary rounded-md py-1 px-10 hover:bg-secondaryDarker duration-300"
        >
          Trailer
        </a>
      </div>
    </div>
  </div>
</template>
<style>
/* body {
  color: #121c0ed8;
} */
</style>
