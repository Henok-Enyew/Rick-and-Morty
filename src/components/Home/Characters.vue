<script setup>
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
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
      ]
    ) {
      name
      status
      image
      id
    }
  }
`;
// const Characters_Query = gql`
// charactersByIds(ids:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51]){
//       name
//       status
//       image
//     }

// `;
const { result, loading, error } = useQuery(Characters_Query);

// const charact = [
//   {
//     name: "Rick Sanchez",
//     status: "Alive",
//     image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
//   },
//   {
//     name: "Morty Smith",
//     status: "Alive",
//     image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
//   },
// ];
</script>
<template>
  <div class="w-full h-screen bg-primary text-white px-20 pt-8" id="characters">
    <p class="text-header text-3xl z-20 relative mb-4">Characters (826)</p>

    <div
      class="grid grid-cols-5 gap-4 bg-charactersBg px-8 py-4 overflow-x-scroll w-11/12 h-144 ml-8 rounded-md"
    >
      <p v-if="loading">Loading</p>
      <p v-if="error">{{ error.message }}</p>
      <!-- <p v-else>{{ result.charactersByIds[0] }}</p> -->

      <router-link
        v-else
        class="bg-secondary40 w-40 pb-1 hover:bg-secondary40Active border border-transparent hover:border-white transition-all duration-300 transform hover:rotate-3 hover:scale-105"
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
  </div>
</template>
<style></style>
