<script setup>
import { ref } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { useRoute } from "vue-router";
import { Episode_Query } from "../queries/episodeQuery";
const route = useRoute();
const id = route.params.id;

const { result, loading, error } = useQuery(
  Episode_Query,
  {},
  {
    variables: { id: id },
  }
);
</script>
<template>
  <div
    class="relative z-0 background-container bg-primary w-full h-screen bg-cover bg-right-bottom bg-[url('https://www.looper.com/img/gallery/the-most-terrible-things-rick-morty-have-ever-done/cronenberg-the-world-1497028481.jpg')] overflow-hidden"
  >
    <nav class="w-full z-20 relative text-white px-3 py-1">
      <router-link to="/">
        <img
          src="../assets/Images/Logo.png"
          alt="Logo"
          class="h-12 w-14 rounded-full"
      /></router-link>
    </nav>
    <div
      v-if="loading"
      class="z-200 relative h-full w-full flex items-center justify-center"
    >
      <svg
        class="animate-spin z-20 relative w-72 h-72"
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        fill="#fff"
        viewBox="0 0 256 256"
      >
        <path
          d="M134,32V64a6,6,0,0,1-12,0V32a6,6,0,0,1,12,0Zm39.25,56.75A6,6,0,0,0,177.5,87l22.62-22.63a6,6,0,0,0-8.48-8.48L169,78.5a6,6,0,0,0,4.24,10.25ZM224,122H192a6,6,0,0,0,0,12h32a6,6,0,0,0,0-12Zm-46.5,47A6,6,0,0,0,169,177.5l22.63,22.62a6,6,0,0,0,8.48-8.48ZM128,186a6,6,0,0,0-6,6v32a6,6,0,0,0,12,0V192A6,6,0,0,0,128,186ZM78.5,169,55.88,191.64a6,6,0,1,0,8.48,8.48L87,177.5A6,6,0,1,0,78.5,169ZM70,128a6,6,0,0,0-6-6H32a6,6,0,0,0,0,12H64A6,6,0,0,0,70,128ZM64.36,55.88a6,6,0,0,0-8.48,8.48L78.5,87A6,6,0,1,0,87,78.5Z"
        ></path>
      </svg>
    </div>
    <p v-if="error" class="relative z-20 text-white">{{ error.message }}</p>

    <div
      v-else
      class="w-full flex gap-2 z-20 relative text-white px-24 lg:px-8 py-1"
    >
      <div class="w-5/12 py-16">
        <p class="text-6xl">{{ result?.episode.episode }}</p>
        <p class="text-2xl font-thin mb-4">{{ result?.episode.name }}</p>
        <p class="flex items-end gap-3 font-thin">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#fff"
            viewBox="0 0 256 256"
          >
            <path
              d="M232,216H183.36A103.95,103.95,0,1,0,128,232H232a8,8,0,0,0,0-16ZM40,128a88,88,0,1,1,88,88A88.1,88.1,0,0,1,40,128Zm88-24a24,24,0,1,0-24-24A24,24,0,0,0,128,104Zm0-32a8,8,0,1,1-8,8A8,8,0,0,1,128,72Zm24,104a24,24,0,1,0-24,24A24,24,0,0,0,152,176Zm-32,0a8,8,0,1,1,8,8A8,8,0,0,1,120,176Zm56-24a24,24,0,1,0-24-24A24,24,0,0,0,176,152Zm0-32a8,8,0,1,1-8,8A8,8,0,0,1,176,120ZM80,104a24,24,0,1,0,24,24A24,24,0,0,0,80,104Zm0,32a8,8,0,1,1,8-8A8,8,0,0,1,80,136Z"
            ></path>
          </svg>

          Streamed at: {{ result?.episode.air_date }}
        </p>
        <p class="flex items-end gap-3 font-thin">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="#fff"
            viewBox="0 0 256 256"
          >
            <path
              d="M216,104H102.09L210,75.51a8,8,0,0,0,5.68-9.84l-8.16-30a15.93,15.93,0,0,0-19.42-11.13L35.81,64.74a15.75,15.75,0,0,0-9.7,7.4,15.51,15.51,0,0,0-1.55,12L32,111.56c0,.14,0,.29,0,.44v88a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V112A8,8,0,0,0,216,104ZM192.16,40l6,22.07-22.62,6L147.42,51.83Zm-66.69,17.6,28.12,16.24-36.94,9.75L88.53,67.37Zm-79.4,44.62-6-22.08,26.5-7L94.69,89.4ZM208,200H48V120H208v80Z"
            ></path>
          </svg>
          Created at:
          {{
            new Date(result?.episode.created).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          }}
        </p>
      </div>
      <div
        class="border-t border-l border-gray-400 rounded-lg py-3 px-2 h-144 overflow-hidden"
      >
        <p class="text-xl mb-2">Characters in the Episode</p>
        <div class="grid grid-cols-3 gap-4 px-2 h-128 overflow-y-scroll">
          <router-link
            v-for="character in result?.episode.characters"
            :key="character.id"
            :to="`/Character/${character.id}`"
            class="w-48 lg:w-36 max-h-72 bg-w-light border-t border-l border-gray-500 backdrop-blur-md rounded-lg transition-all duration-300 transform hover:scale-95 pb-1"
          >
            <img
              :src="character.image"
              :alt="character.name"
              class="w-48 rounded-lg"
            />
            <p class="pl-2">{{ character.name }}</p>
            <p class="pl-4 text-xs font-thin">
              Species: {{ character.species }}
            </p>
            <p class="pl-4 text-xs font-thin">Gender: {{ character.gender }}</p>
            <p class="pl-4 text-xs font-thin">Status: {{ character.status }}</p>
          </router-link>
        </div>
      </div>
    </div>
    <footer
      class="h-12 bg-w-light w-full z-20 absolute bottom-0 flex justify-center gap-7"
    >
      <p class="flex justify-center items-center gap-2 text-gray-300">
        <a
          href="https://www.figma.com/design/i3GtKBaZb4uL4Cd1tc3jcH/Episode-Page?node-id=0%3A1&t=XVOXk91BUPT24iHv-1"
          target="_blank"
          class="hover:scale-110 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="#f0f0f0"
            viewBox="0 0 256 256"
          >
            <path
              d="M192,96a40,40,0,0,0-24-72H96A40,40,0,0,0,72,96a40,40,0,0,0,1.37,65A44,44,0,1,0,144,196V160a40,40,0,1,0,48-64Zm-64,56H96a24,24,0,0,1,0-48h32Zm40-64H144V40h24a24,24,0,0,1,0,48Z"
            ></path>
          </svg>
        </a>
        <a
          href="https://github.com/Henok-Enyew"
          target="_blank"
          class="hover:scale-110 transition-all duration-300"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 0C8.95536 0 0 9.1875 0 20.5089C0 29.5714 5.73214 37.25 13.6786 39.9643C13.79 39.9885 13.9038 40.0005 14.0179 40C14.7589 40 15.0446 39.4553 15.0446 38.9821C15.0446 38.4911 15.0268 37.2053 15.0179 35.4911C14.3563 35.6461 13.6795 35.727 13 35.7321C9.15179 35.7321 8.27679 32.7411 8.27679 32.7411C7.36607 30.375 6.05357 29.7411 6.05357 29.7411C4.3125 28.5178 6.04464 28.4821 6.17857 28.4821H6.1875C8.19643 28.6607 9.25 30.6071 9.25 30.6071C10.25 32.3571 11.5893 32.8482 12.7857 32.8482C13.5768 32.8324 14.3557 32.6498 15.0714 32.3125C15.25 30.9911 15.7679 30.0893 16.3393 29.5714C11.9018 29.0536 7.23214 27.2946 7.23214 19.4375C7.23214 17.1964 8.00893 15.3661 9.28571 13.9375C9.08036 13.4196 8.39286 11.3304 9.48214 8.50893C9.62825 8.47396 9.77843 8.45895 9.92857 8.46428C10.6518 8.46428 12.2857 8.74107 14.9821 10.6161C18.2585 9.69938 21.7236 9.69938 25 10.6161C27.6964 8.74107 29.3304 8.46428 30.0536 8.46428C30.2037 8.45895 30.3539 8.47396 30.5 8.50893C31.5893 11.3304 30.9018 13.4196 30.6964 13.9375C31.9732 15.375 32.75 17.2054 32.75 19.4375C32.75 27.3125 28.0714 29.0446 23.6161 29.5536C24.3304 30.1875 24.9732 31.4375 24.9732 33.3482C24.9732 36.0893 24.9464 38.3036 24.9464 38.9732C24.9464 39.4553 25.2232 40 25.9643 40C26.0842 40.0005 26.2039 39.9885 26.3214 39.9643C34.2768 37.25 40 29.5625 40 20.5089C40 9.1875 31.0446 0 20 0Z"
              fill="#f0f0f0"
            />
          </svg>
        </a>
      </p>
    </footer>
  </div>
</template>
<style>
.background-container::before {
  @apply absolute top-0 left-0 w-full h-full z-10;
  content: "";
  backdrop-filter: blur(2px);
  background-color: #121c0ee1;
  /* color: #e0bb3767; */
}

.bg-w-light {
  background-color: #ffffff1c;
}
</style>
