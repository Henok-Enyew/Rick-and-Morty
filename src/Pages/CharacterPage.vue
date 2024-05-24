<script setup>
import { useQuery } from "@vue/apollo-composable";
import { useRoute } from "vue-router";
import { Character_Query } from "../queries/characterQuery";
const route = useRoute();
const id = route.params.id;

const { result, loading, error } = useQuery(
  Character_Query,
  {},
  {
    variables: { id: id },
  }
);
</script>
<template>
  <div
    class="relative z-0 bg-primary background-container w-full h-screen bg-cover bg-right-bottom bg-[url('https://e1.pxfuel.com/desktop-wallpaper/976/559/desktop-wallpaper-rick-and-morty-live-rick-and-morty-thumbnail.jpg')] overflow-hidden"
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
      class="w-full flex gap-2 z-20 relative text-white px-24 lg:px-8"
    >
      <div class="w-5/12 pt-10">
        <div>
          <div class="border border-gray-400 w-80">
            <img
              :src="result?.character.image"
              :alt="result?.character.image"
              class="w-80"
            />
            <p class="px-4 text-2xl">{{ result?.character.name }}</p>
            <p class="px-4">Status: {{ result?.character.status }}</p>
            <p class="px-4">Species: {{ result?.character.species }}</p>
            <p class="px-4">Gender: {{ result?.character.gender }}</p>
          </div>
          <p class="mt-1">Last known location</p>
          <router-link
            class="bg-locationBtn px-2 flex items-center gap-3 h-10 w-96 xl:w-80 lg:w-72 border border-transparent hover:border-white cursor-pointer hover:bg-locationBtnActive transition-all duration-300"
            :to="`/Location/${result?.character.location.id}`"
          >
            <svg
              width="29"
              height="24"
              viewBox="0 0 29 24"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28.6779 3.84998C27.7883 2.3165 25.3602 2.00685 21.6445 2.92965C19.9425 1.58657 17.8965 0.750125 15.741 0.516139C13.5856 0.282153 11.4078 0.660094 9.45722 1.60666C7.50663 2.55323 5.86214 4.03013 4.71217 5.86815C3.5622 7.70617 2.95326 9.83097 2.95511 11.9991C2.95518 12.5335 2.99213 13.0672 3.0657 13.5965C0.379643 16.3464 -0.566499 18.6073 0.326806 20.1482C0.879747 21.1017 2.04706 21.5846 3.75012 21.5846C4.78512 21.5667 5.81512 21.4366 6.82201 21.1963C7.00018 21.157 7.18081 21.1128 7.36389 21.0735C9.17409 22.5003 11.37 23.3526 13.6687 23.5206C15.9675 23.6886 18.264 23.1646 20.2624 22.0161C22.2608 20.8676 23.8696 19.1472 24.8818 17.0764C25.8939 15.0056 26.263 12.6792 25.9414 10.3968C27.4958 8.79941 28.5354 7.28559 28.8733 6.02243C29.092 5.18319 29.0281 4.4533 28.6779 3.84998ZM14.4993 1.9233C16.8064 1.92647 19.0428 2.72018 20.8358 4.17217C22.6288 5.62416 23.87 7.64673 24.3527 9.90284C22.3867 11.7828 19.6662 13.7943 16.5746 15.5699C13.2079 17.5064 10.1728 18.7572 7.72269 19.4454C6.22134 18.0768 5.16876 16.2863 4.70305 14.3089C4.23734 12.3314 4.38026 10.2594 5.11305 8.36465C5.84585 6.46989 7.13428 4.84089 8.80932 3.69139C10.4844 2.54188 12.4677 1.92557 14.4993 1.9233ZM1.59734 19.4085C1.16482 18.6626 1.88118 17.1279 3.44047 15.3536C3.95085 17.0305 4.83621 18.5693 6.02946 19.8533C3.61496 20.3227 2.01389 20.1187 1.59734 19.4085ZM14.4993 22.0749C12.6151 22.0768 10.7687 21.5465 9.17262 20.5451C11.7137 19.7206 14.5251 18.4488 17.3094 16.849C20.1147 15.2369 22.6091 13.449 24.5652 11.6993C24.5652 11.7988 24.5726 11.8983 24.5726 11.9991C24.57 14.6701 23.508 17.2311 21.6195 19.12C19.731 21.009 17.1703 22.0716 14.4993 22.0749ZM27.4442 5.63537C27.2132 6.4955 26.5497 7.53871 25.5568 8.65934C25.0471 6.97844 24.1603 5.43608 22.9642 4.1498C24.9081 3.77503 26.8962 3.72097 27.4024 4.5897C27.5487 4.84159 27.5622 5.19424 27.4442 5.63537Z"
                fill="white"
              />
            </svg>

            <p class="-mt-1">
              {{ result?.character.location.name }}
            </p>
          </router-link>
        </div>
      </div>
      <div
        class="border-t w-7/12 border-l border-gray-400 rounded-lg py-3 px-2 h-144 overflow-hidden backdrop-blur-md bg-w-light"
      >
        <p class="text-lg mb-2">
          Episodes {{ result?.character.name.split(" ")[0] }} has participated
        </p>
        <div
          class="grid grid-cols-2 gap-4 px-2 h-128 overflow-y-scroll xl:grid-cols-1 lg:grid-cols-1 lg:justify-center"
        >
          <div
            v-for="episode in result?.character.episode"
            :key="episode"
            class=""
          >
            <router-link
              class="bg-seasonBackground px-2 flex flex-col items-center w-72 xl:w-full lg:w-96 rounded-full border-t border-l border-gray-400 hover:border-white cursor-pointer hover:bg-seasonBackgroundActive transition-all duration-300"
              :to="`/Episode/${episode.id}`"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="#fff"
                viewBox="0 0 256 256"
              >
                <path
                  d="M216,104H102.09L210,75.51a8,8,0,0,0,5.68-9.84l-8.16-30a15.93,15.93,0,0,0-19.42-11.13L35.81,64.74a15.75,15.75,0,0,0-9.7,7.4,15.51,15.51,0,0,0-1.55,12L32,111.56c0,.14,0,.29,0,.44v88a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V112A8,8,0,0,0,216,104ZM192.16,40l6,22.07-22.62,6L147.42,51.83Zm-66.69,17.6,28.12,16.24-36.94,9.75L88.53,67.37Zm-79.4,44.62-6-22.08,26.5-7L94.69,89.4ZM208,200H48V120H208v80Z"
                ></path>
              </svg>
              <p class="-mt-1">
                {{ episode.episode }}
              </p>
              <p class="-mt-2 text-xs">
                {{ episode.name }}
              </p>
              <p class="text-xs">
                <span class="opacity-85"> Aired at:</span>
                {{ episode.air_date }}
              </p>
              <p class="text-xs">
                <span class="opacity-85"> Created at:</span>
                {{
                  new Date(episode.created).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                }}
              </p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <footer
      class="h-12 mt-3 bg-w-light w-full z-20 absolute bottom-0 flex justify-center gap-7"
    >
      <p class="flex justify-center items-center gap-2 text-gray-300">
        <a
          href="https://www.figma.com/design/V4IVycz1ON6JD3fPuYhJ67/Character-Page?node-id=0%3A1&t=QaAV9PpkHZK2oOLO-1"
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
          href="https://github.com/Henok-Enyew/Rick-and-Morty"
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
  /* background-color: #121c0ee1; */
  /* color: #e0bb3767; */
}

.bg-w-light {
  background-color: #ffffff1c;
}
</style>
