<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { weatherIconMap } from '@/utils/useMockWeatherIcons';
import { Icon } from '@iconify/vue';

const route = useRoute();
const router = useRouter();
const weatherData = ref<any>(null);

const getWeatherData = async () => {
    try {
        const response = await axios.get<{}>('https://api.weatherapi.com/v1/forecast.json', {
            params: {
                key: import.meta.env.VITE_WEATHER_API_KEY,
                q: `${route.query.lat},${route.query.lng}`,
                days: 7,
                aqi: 'no',
                alerts: 'no'
            }
        });
        weatherData.value = response.data;
    } catch (err) {
        console.error('Failed to fetch weather data:', err);
    }
};
onMounted(() => getWeatherData());
</script>
<template>
    <div v-if="weatherData" class="flex flex-col flex-1 items-center">
        <div v-if="route.query.preview" class="py-[12px] bg-background w-full text-center shadow">
            <p class="text-sm sm:text-[16px] px-2">
                You are currently previewing this city, click the "+"
                icon to start tracking this city.</p>
        </div>
        <div class="flex flex-col items-center text-white py-8" v-if="weatherData">
            <h1 class="sm:text-4xl text-3xl mb-2">{{ route.params.city }}</h1>
            <p class="text-sm mb-6">
                {{
                    new Date(weatherData.location.localtime).toLocaleDateString("en-us", {
                        weekday: "short", day:
                            "2-digit", month: "long",
                    })
                }}
                {{ new Date(weatherData.location.localtime).toLocaleTimeString("en-us", { timeStyle: "short", }) }}
            </p>
            <p class="sm:text-6xl text-4xl mb-6">
                {{ Math.round(weatherData.current.temp_c) }}&deg;C
            </p>
            <p>
                Feels like
                {{ Math.round(weatherData.current.feelslike_c) }}&deg;C
            </p>
            <p class="capitalize">
                {{ weatherData.current.condition.text }}
            </p>
            <Icon :icon="weatherIconMap[weatherData.current.condition.text]" class="sm:text-7xl text-6xl my-4" />
        </div>
        <hr class="border-secondary border-opacity-10 border w-full" />
    </div>
    <div v-else class="h-[50dvh] flex items-center justify-center">
        <Icon icon="eos-icons:three-dots-loading" width="100" height="100" />
    </div>
</template>
