<script setup lang="ts">
import AsyncForecast from '@/components/AsyncForecast.vue';
import axios from 'axios';
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { Icon } from '@iconify/vue';
import { useHelper } from '@/utils/usehelper';

const route = useRoute();
const { isCityExist } = useHelper();
const weatherData = ref<any>(null);
const cityNotExist = computed(() => isCityExist());
const getWeatherData = async () => {
    try {
        const response = await axios.get<{ current: {}, forecast: {}, location: {} }>('https://api.weatherapi.com/v1/forecast.json', {
            params: {
                key: import.meta.env.VITE_WEATHER_API_KEY,
                q: `${route.query.lat},${route.query.lng}`,
                days: 7,
                aqi: 'no',
                alerts: 'no'
            }
        });
        weatherData.value = response.data;
        // console.log(weatherData.value);
    } catch (err) {
        console.error('Failed to fetch weather data:', err);
    }
};

onMounted(() => getWeatherData());
</script>

<template>
    <div>
        <div v-if="weatherData" class="flex flex-col flex-1 items-center">
            <div v-if="route.query.preview && cityNotExist" class="py-[12px] bg-background w-full text-center shadow">
                <p class="text-sm sm:text-[16px] px-2">
                    You are currently previewing this city, click the "+"
                    icon to start tracking this city.</p>
            </div>
            <AsyncForecast :weatherData="weatherData" />
        </div>
        <div v-else class="h-[50dvh] flex items-center justify-center">
            <Icon icon="eos-icons:three-dots-loading" width="100" height="100" />
        </div>
    </div>
</template>