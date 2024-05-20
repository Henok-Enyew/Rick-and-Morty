<script setup>
import { ref, watch } from "vue";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";

const Episodes_Query = gql`
  query Episodes {
    episodesByIds(
      ids: [
        1
        2
        3
        4
        5
        6
        7
        8
        9
        10
        11
        12
        13
        14
        15
        16
        17
        18
        19
        20
        21
        22
        23
        24
        25
        26
        27
        28
        29
        30
        31
        32
        33
        34
        35
        36
        37
        38
        39
        40
        41
        42
        43
        44
        45
        46
        47
        48
        49
        50
        51
      ]
    ) {
      name
      id
      episode
    }
  }
`;

const { result, loading, error } = useQuery(Episodes_Query);
const seasons = [
  "Season 01",
  "Season 02",
  "Season 03",
  "Season 04",
  "Season 05",
];

const activeSeason = ref(1);
</script>
<template>
  <div
    id="episodes"
    class="relative z-0 background-container w-full h-screen bg-cover bg-right-bottom bg-[url('src/assets/Images/Episodes-background.jpg')] px-32 py-8"
  >
    <p class="text-header text-3xl z-20 relative">Episodes (51)</p>
    <div class="z-20 relative flex items-center w-4/5 gap-8 ml-32 mt-4">
      <div
        class="text-gray-200 flex flex-col items-center bg-seasonBackground px-8 cursor-pointer hover:bg-seasonBackgroundActive border border-transparent hover:border-white transition-all duration-300"
        v-for="season in seasons"
        :key="season"
        :class="activeSeason == season[8] ? 'activeSeason' : ''"
        @click="activeSeason = season[8]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="#fff"
          viewBox="0 0 256 256"
        >
          <path
            d="M232,216H183.36A103.95,103.95,0,1,0,128,232H232a8,8,0,0,0,0-16ZM40,128a88,88,0,1,1,88,88A88.1,88.1,0,0,1,40,128Zm88-24a24,24,0,1,0-24-24A24,24,0,0,0,128,104Zm0-32a8,8,0,1,1-8,8A8,8,0,0,1,128,72Zm24,104a24,24,0,1,0-24,24A24,24,0,0,0,152,176Zm-32,0a8,8,0,1,1,8,8A8,8,0,0,1,120,176Zm56-24a24,24,0,1,0-24-24A24,24,0,0,0,176,152Zm0-32a8,8,0,1,1-8,8A8,8,0,0,1,176,120ZM80,104a24,24,0,1,0,24,24A24,24,0,0,0,80,104Zm0,32a8,8,0,1,1,8-8A8,8,0,0,1,80,136Z"
          ></path>
        </svg>

        <p class="-mt-1">{{ season }}</p>
      </div>
    </div>
    <div
      class="text-white relative z-20 w-4/6 bg-episodesBackground h-120 ml-48 mt-8 rounded-md border border-seasonBackgroundActive grid grid-cols-2 px-16 py-8 justify-center gap-y-2"
    >
      <p v-if="loading">Loading</p>
      <p v-if="error">{{ error.message }}</p>
      <!-- <p v-else>{{ result?.episodesByIds[0] }}</p> -->
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
        </router-link>
      </div>
    </div>
  </div>
</template>
<style>
.background-container::before {
  @apply absolute top-0 left-0 w-full h-full z-10;
  content: "";
  backdrop-filter: blur(2px);
  background-color: #121c0ec5;
  /* color: #51d92875; */
}

.activeSeason {
  @apply bg-seasonBackgroundActive border-white;
}
</style>
<!--
  Season
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M232,216H183.36A103.95,103.95,0,1,0,128,232H232a8,8,0,0,0,0-16ZM40,128a88,88,0,1,1,88,88A88.1,88.1,0,0,1,40,128Zm88-24a24,24,0,1,0-24-24A24,24,0,0,0,128,104Zm0-32a8,8,0,1,1-8,8A8,8,0,0,1,128,72Zm24,104a24,24,0,1,0-24,24A24,24,0,0,0,152,176Zm-32,0a8,8,0,1,1,8,8A8,8,0,0,1,120,176Zm56-24a24,24,0,1,0-24-24A24,24,0,0,0,176,152Zm0-32a8,8,0,1,1-8,8A8,8,0,0,1,176,120ZM80,104a24,24,0,1,0,24,24A24,24,0,0,0,80,104Zm0,32a8,8,0,1,1,8-8A8,8,0,0,1,80,136Z"></path></svg>

Episodes
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M216,104H102.09L210,75.51a8,8,0,0,0,5.68-9.84l-8.16-30a15.93,15.93,0,0,0-19.42-11.13L35.81,64.74a15.75,15.75,0,0,0-9.7,7.4,15.51,15.51,0,0,0-1.55,12L32,111.56c0,.14,0,.29,0,.44v88a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V112A8,8,0,0,0,216,104ZM192.16,40l6,22.07-22.62,6L147.42,51.83Zm-66.69,17.6,28.12,16.24-36.94,9.75L88.53,67.37Zm-79.4,44.62-6-22.08,26.5-7L94.69,89.4ZM208,200H48V120H208v80Z"></path></svg> -->
