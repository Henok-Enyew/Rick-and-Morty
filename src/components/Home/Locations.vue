<script setup>
import { ref } from "vue";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";

// const Locations_Query = gql`
//   query Episodes {
//     episodesByIds(
//       ids: [
//         1
//         2
//         3
//         4
//         5
//         6
//         7
//         8
//         9
//         10
//         11
//         12
//         13
//         14
//         15
//         16
//         17
//         18
//         19
//         20
//         21
//         22
//         23
//         24
//         25
//         26
//         27
//         28
//         29
//         30
//         31
//         32
//         33
//         34
//         35
//         36
//         37
//         38
//         39
//         40
//         41
//         42
//         43
//         44
//         45
//         46
//         47
//         48
//         49
//         50
//         51
//       ]
//     ) {
//       name
//       id
//       episode
//     }
//   }
// `;

// const { result, loading, error } = useQuery(Episodes_Query);

const locations = [
  {
    name: "Earth",
    id: 1,
  },
  {
    name: "Abadango",
    id: 2,
  },
  {
    name: "Citidal of rocks",
    id: 3,
  },
  {
    name: "Citidal of rocks",
    id: 4,
  },
  {
    name: "Citidal of rocks",
    id: 5,
  },
  {
    name: "Citidal of rocks",
    id: 6,
  },
  {
    name: "Earth",
    id: 7,
  },
  {
    name: "Abadango",
    id: 8,
  },
  {
    name: "Citidal of rocks",
    id: 9,
  },
  {
    name: "Citidal of rocks",
    id: 10,
  },
  {
    name: "Citidal of rocks",
    id: 11,
  },
  {
    name: "Citidal of rocks",
    id: 12,
  },
];
</script>
<template>
  <div
    id="locations"
    class="relative z-0 background-container w-full h-screen bg-cover bg-right-bottom bg-[url('src/assets/Images/Locations-background.jpg')] px-32 py-8"
  >
    <p class="text-header text-3xl z-20 relative mt-6">Locations (126)</p>
    <div
      class="text-white relative z-20 w-11/12 bg-locationsBackground h-128 mt-4 ml-12 rounded-md border-t border-l border-locations grid grid-cols-2 px-16 py-8 justify-center gap-y-2"
    >
      <div v-for="location in locations" :key="location.id" class="">
        <router-link
          class="bg-locationBtn px-2 flex items-center gap-3 h-10 w-72 border border-transparent hover:border-white cursor-pointer hover:bg-locationBtnActive transition-all duration-300"
          :to="`/Location/${location.id}`"
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
            {{ location.name }}
          </p>
        </router-link>
      </div>

      <!-- <p v-if="loading">Loading</p>
      <p v-if="error">{{ error.message }}</p>
      <p v-else>{{ result?.episodesByIds[0] }}</p>
      <div
        v-else
        v-for="episode in result?.episodesByIds.filter(
          (arr) => arr.episode[2] == activeSeason
        )"
        :key="episode"
        class=""
      >
        <router-link
          class="bg-seasonBackground px-2 flex flex-col items-center w-72 rounded-full border border-transparent hover:border-white cursor-pointer hover:bg-seasonBackgroundActive transition-all duration-300"
          :to="`/Location/${Loaction.id}`"
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
        </router-link>
      </div> -->
    </div>
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
</style>
<!--
  Season
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,216H183.36A103.95,103.95,0,1,0,128,232H232a8,8,0,0,0,0-16ZM40,128a88,88,0,1,1,88,88A88.1,88.1,0,0,1,40,128Zm88-24a24,24,0,1,0-24-24A24,24,0,0,0,128,104Zm0-32a8,8,0,1,1-8,8A8,8,0,0,1,128,72Zm24,104a24,24,0,1,0-24,24A24,24,0,0,0,152,176Zm-32,0a8,8,0,1,1,8,8A8,8,0,0,1,120,176Zm56-24a24,24,0,1,0-24-24A24,24,0,0,0,176,152Zm0-32a8,8,0,1,1-8,8A8,8,0,0,1,176,120ZM80,104a24,24,0,1,0,24,24A24,24,0,0,0,80,104Zm0,32a8,8,0,1,1,8-8A8,8,0,0,1,80,136Z"></path></svg>

Episodes
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M216,104H102.09L210,75.51a8,8,0,0,0,5.68-9.84l-8.16-30a15.93,15.93,0,0,0-19.42-11.13L35.81,64.74a15.75,15.75,0,0,0-9.7,7.4,15.51,15.51,0,0,0-1.55,12L32,111.56c0,.14,0,.29,0,.44v88a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V112A8,8,0,0,0,216,104ZM192.16,40l6,22.07-22.62,6L147.42,51.83Zm-66.69,17.6,28.12,16.24-36.94,9.75L88.53,67.37Zm-79.4,44.62-6-22.08,26.5-7L94.69,89.4ZM208,200H48V120H208v80Z"></path></svg> -->
