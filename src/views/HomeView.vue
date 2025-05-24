<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityList from "@/components/CityList.vue";
import type API_MAP_RES from '@/types/useAPI_MAP_RES';
import { Icon } from '@iconify/vue';
import type ICity from "@/types/useSavedQuery";

const router = useRouter();
const previewCity = (searchResult: { place_name: any, geometry: any }) => {
  const [city, state, country] = searchResult.place_name.split(",");
  router.push({
    name: "cityView",
    params: { city: city?.replaceAll(" ", ""), state: state?.replaceAll(" ", ""), country: country?.replaceAll(" ", "") },
    query: <{}>{
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true,
    },
  });
};

const mapboxAPIKey = import.meta.env.VITE_MAPBOX_API_KEY;
const loading = ref<boolean>(false);
const searchQuery = ref<string>("");
const savedCites = ref<ICity[]>([]);
const queryTimeout = ref();
const mapboxSearchResults = ref<API_MAP_RES[]>();
const searchError = ref<boolean>(false);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  loading.value = true;
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        loading.value = false;
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
        );
        mapboxSearchResults.value = result.data.features;
      } catch {
        searchError.value = true;
      }
      return;
    }
    mapboxSearchResults.value = undefined;
  }, 800);
};
</script>
<template>
  <main class="container-w">
    <div class="pt-4 mb-8 relative text-sm sm:text-[16px]">
      <input id="searchCity" name="searchCity" type="text" placeholder="Search for city or state" v-model="searchQuery"
        @input="getSearchResults"
        class="w-full py-2 px-1 border-b focus:border-background focus:outline-none focus:shadow-[0_1px_0_0_#c6a2a6]">
      <Icon v-if="loading" icon="eos-icons:bubble-loading" width="25" height="25" class="absolute top-5 right-0" />
      <ul class="absolute bg-background w-full shadow-md top-[66px]" v-if="mapboxSearchResults">
        <p class="py-2" v-if="searchError">
          Sorry, something went wrong, please try again.
        </p>
        <p class="py-2" v-else-if="!searchError && mapboxSearchResults.length === 0">
          No results match your query, try a different term.
        </p>
        <template v-else>
          <li v-for="searchResult in mapboxSearchResults" :key="searchResult.id"
            class="text-start p-2 cursor-pointer hover:bg-secondary hover:opacity-80 transition duration-150"
            @click="previewCity(searchResult)">
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <CityList v-if="savedCites" />
    </div>
  </main>
</template>
