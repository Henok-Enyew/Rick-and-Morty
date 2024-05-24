<script setup>
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import { ref, onMounted } from "vue";
const Characters_Query = gql`
  query Characters {
    charactersByIds(
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
        52
        53
        54
        55
        56
        57
        58
        59
        60
        61
        62
        63
        64
        65
        66
        67
        68
        69
        70
        71
        72
        73
        74
        75
        76
        77
        78
        79
        80
        81
        82
        83
        84
        85
        86
        87
        88
        89
        90
        91
        92
        93
        94
        95
        96
        97
        98
        99
        100
      ]
    ) {
      name
      status
      image
      id
    }
  }
`;

const { result, loading, error } = useQuery(Characters_Query);
</script>
<template>
  <div
    class="w-full h-screen bg-primary text-white px-20 lg:px-8 pt-8"
    id="characters"
  >
    <p class="text-header text-3xl z-20 relative mb-4">Characters (826)</p>

    <div
      class="grid grid-cols-5 gap-4 bg-charactersBg px-8 py-4 overflow-y-scroll w-11/12 h-144 ml-8 lg:ml-4 rounded-md"
    >
      <!-- <p v-if="loading">Loading</p> -->
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
      <p v-if="error">{{ error.message }}</p>
      <!-- <p v-else>{{ result.charactersByIds[0] }}</p> -->

      <router-link
        v-motion-slide-visible-bottom
        v-else
        class="bg-secondary40 w-40 lg:w-32 pb-1 hover:bg-secondary40Active border border-transparent hover:border-white transition-all duration-300 transform hover:rotate-3 hover:scale-105"
        v-for="character in result?.charactersByIds"
        :key="character"
        :to="`Character/${character.id}`"
      >
        <img :src="character.image" :alt="character.name" class="w-40 mb-3" />
        <p class="flex items-center justify-center text-sm">
          <span class="mr-2"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              :class="
                character.status == 'Alive'
                  ? 'fill-green-500'
                  : character.status == 'Dead'
                  ? 'fill-red-600'
                  : 'fill-gray-500'
              "
              viewBox="0 0 256 256"
            >
              <path
                d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"
              ></path></svg
          ></span>
          {{
            character.name.length > 15
              ? character.name.slice(0, 15)
              : character.name
          }}
        </p>
      </router-link>
    </div>
    <!-- <button
      v-if="!loading && !error && !allCharactersLoaded"
      @click="loadMore"
      class="bg-secondary40 px-3 py-1 rounded-md mt-2 absolute left-1/2 -translate-x-1/2 hover:bg-secondary40Active transition-all duration-300"
    >
      Load More
    </button> -->
  </div>
</template>
<style></style>
