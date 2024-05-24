<script setup>
import { ref } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { Locations_Query } from "../queries/listLocationsQuery";

const { result, loading, error } = useQuery(Locations_Query);
</script>
<template>
  <div
    id="locations"
    class="relative z-0 background-container w-full h-screen bg-cover bg-right-bottom bg-[url('https://i.pinimg.com/564x/46/d7/7b/46d77b586d6c00f2533c6e63f15fdd86.jpg')] px-32 lg:px-8 py-8"
  >
    <p class="text-header text-3xl z-20 relative mt-6">Locations (126)</p>
    <div
      class="text-white relative z-20 w-11/12 bg-locationsBackground h-128 mt-4 ml-12 rounded-md border-t border-l border-locations grid grid-cols-2 px-16 lg:px-4 py-8 gap-y-2 overflow-auto"
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
      <!-- <p v-else>{{ result?.locationsByIds[0] }}</p> -->

      <div
        v-else
        v-for="location in result?.locationsByIds"
        :key="location.id"
        class=""
      >
        <router-link
          v-motion-slide-visible-bottom
          class="bg-locationBtn px-2 flex items-center gap-3 h-10 w-96 lg:w-80 border border-transparent hover:border-white cursor-pointer hover:bg-locationBtnActive transition-all duration-300"
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
