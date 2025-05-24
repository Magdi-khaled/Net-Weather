import { Icon } from '@iconify/vue';
<script setup lang="ts">
import { weatherIconMap } from '@/utils/useMockWeatherIcons';
import { Icon } from '@iconify/vue';

const props = defineProps<{
    city: any
}>();
</script>

<template>
    <div class="w-full text-start bg-background sm:px-4 px-2 py-2 border border-hover rounded-lg shadow-md hover:shadow-xl hover:scale-[1.002] 
    cursor-pointer hover:text-highlight transition duration-200 flex justify-between">
        <div class="flex-1 grid gap-[6px]">
            <p class="text-sm text-neutral-300">Humidity: {{ props.city.current.humidity }}% ~
                Wind: {{ props.city.current.wind_degree }}% ~ Feelslike: {{ props.city.current.feelslike_c }}&deg;c </p>
            <h1 class="text-lg">{{ props.city.location.country }}</h1>
            <p class="text-sm text-neutral-300">{{ props.city.location.tz_id }}, {{ props.city.location.name }}, {{
                props.city.location.region }}</p>
        </div>
        <div class="flex flex-col justify-center items-center gap-2 text-xl sm:text-2xl">
            <Icon :icon="weatherIconMap[city.current.condition.text]" />
            <p> {{ city.current.temp_c }}&deg; </p>
        </div>
    </div>
</template>