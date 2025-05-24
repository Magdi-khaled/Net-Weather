<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import CityCard from "@/components/CityCard.vue";
import type ICity from "@/types/useSavedQuery";

const savedCities = ref([]);
const cities = ref<{}[]>([]);
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const getCities = async () => {
    const saved = localStorage.getItem("savedCities");
    if (saved) {
        savedCities.value = JSON.parse(saved);
        const requests = savedCities.value.map((city) =>
            axios.get(
                `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city.coords.lat},${city.coords.lng}&aqi=no`));
        try {
            const weatherData = await Promise.all(requests);
            weatherData.forEach((val) => cities.value.push(val.data));
        } catch (error) {
            console.error("Failed to fetch weather data:", error);
        }
    }
};

onMounted(async () => await getCities());

const router = useRouter();
const goToCityView = (city: ICity) => {
    router.push({
        name: "cityView",
        params: { state: city.state, city: city.city },
        query: {
            id: city.id,
            lat: city.coords.lat,
            lng: city.coords.lng,
        },
    });
};
</script>

<template>
    <div v-for="city, index in cities" :key="index">
        <CityCard :city="city" @click="goToCityView(savedCities[index])" />
    </div>

    <p v-if="cities.length === 0">
        No locations added. To start tracking a location, search in
        the field above.
    </p>
</template>
