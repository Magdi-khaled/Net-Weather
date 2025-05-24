<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { weatherIconMap } from '@/utils/useMockWeatherIcons';
import { Icon } from '@iconify/vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { FreeMode, Navigation, Pagination } from 'swiper/modules';

const modules = [FreeMode, Navigation, Pagination];
const route = useRoute();

const props = defineProps<{ weatherData: any }>();

const swiperInstance = ref(null);
const currentHour = computed(() => new Date().getHours());
const currentDay = computed(() => new Date().getDay());
const prevEl = ref(null);
const nextEl = ref(null);

const hourWeather = (hour: { time: string }) => {
    return new Date(hour.time).toLocaleDateString("en-us", {
        hour: "numeric"
    }).split(' ')
};

const onSwiper = (swiper: any) => {
    swiperInstance.value = swiper;
    if (prevEl.value && nextEl.value && swiper.params.navigation) {
        swiper.params.navigation.prevEl = prevEl.value;
        swiper.params.navigation.nextEl = nextEl.value;
        swiper.navigation.init();
        swiper.navigation.update();
    }

    setTimeout(() => {
        const index = currentHour.value;
        if (swiper && swiper.slideTo && typeof index === 'number') {
            swiper.slideTo(index, 300);
        }
    }, 200);
};
</script>
<template>
    <div class="container-w">
        <div class="flex flex-col items-center text-white py-8" v-if="props.weatherData">
            <h1 class="sm:text-4xl text-3xl mb-2">{{ route.params.city }}</h1>
            <p class="text-sm mb-6">
                {{
                    new Date(props.weatherData.location.localtime).toLocaleDateString("en-us", {
                        weekday: "short", day:
                            "2-digit", month: "long",
                    })
                }}
                {{ new Date(props.weatherData.location.localtime).toLocaleTimeString("en-us", { timeStyle: "short", })
                }}
            </p>
            <p class="sm:text-6xl text-4xl mb-6">
                {{ Math.round(props.weatherData.current.temp_c) }}&deg;C
            </p>
            <p>
                Feels like
                {{ Math.round(props.weatherData.current.feelslike_c) }}&deg;C
            </p>
            <p class="capitalize">
                {{ props.weatherData.current.condition.text }}
            </p>

            <Icon
                :icon="weatherIconMap[props.weatherData.current.condition.text?.trim()] || 'meteocons:partly-cloudy-day-fill'"
                class="sm:text-7xl text-6xl my-4" />
        </div>
        <hr class="border-secondary border-opacity-10 border w-full" />
        <!-- hourly weather -->
        <div class="my-4">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-start border-b border-b-highlight w-fit">Hourly Weather</h2>
                <div class="flex gap-4 justify-end">
                    <div ref="prevEl" class="swiper-button-prevc">
                        <Icon icon="ooui:arrow-previous-ltr" width="16" height="16" />
                    </div>
                    <div ref="nextEl" class="swiper-button-nextc">
                        <Icon icon="ooui:arrow-previous-rtl" width="16" height="16" />
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <Swiper :modules="modules" :free-mode="true" :grab-cursor="true" :slides-per-view="'auto'"
                        :space-between="16" :navigation="{
                            prevEl: prevEl,
                            nextEl: nextEl,
                        }" @swiper="onSwiper" class="px-2 mx-2">
                        <SwiperSlide v-for="(hour, hIndex) in props.weatherData.forecast.forecastday[currentDay]?.hour"
                            :key="hIndex" :id="hIndex === +currentHour ? 'currentHour' : ''" class="!w-auto">
                            <div :class="[
                                'rounded-2xl flex flex-col justify-center items-center gap-4 cursor-pointer',
                                hIndex === currentHour ? 'bg-background py-1 px-5' : ''
                            ]" :title="hour.condition.text">
                                <p class="text-sm whitespace-nowrap">
                                    {{ hourWeather(hour)[1] + ' ' + hourWeather(hour)[2] }}
                                </p>
                                <!-- {{ hour.condition.text?.replaceAll(" ", "") }} -->
                                <Icon :icon="weatherIconMap[hour.condition.text] || 'meteocons:partly-cloudy-day-fill'"
                                    class="sm:text-5xl text-3xl" />
                                <p class="mb-4">{{ hour.temp_c }}&deg;</p>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
        <div class="my-4">
            <h2 class="text-start border-b border-b-highlight w-fit">7 Day Forecast</h2>
            <div class="grid gap-2">
                <div v-for="dayData, index in props.weatherData.forecast.forecastday" :key="index"
                    class="w-full flex items-center">
                    <p class="flex-1 text-sm whitespace-nowrap sm:w-12 w-16 text-start">
                        {{ new Date(dayData.date).toLocaleDateString('en-US', { weekday: 'long' }) }}
                    </p>
                    <div :title="dayData.day.condition.text">
                        <Icon
                            :icon="weatherIconMap[dayData.day.condition.text?.trim()] || 'meteocons:partly-cloudy-day-fill'"
                            class="sm:text-[2.525rem] text-3xl" />
                    </div>
                    <div class="text-start flex flex-1 justify-end gap-3">
                        <p>
                            H: {{ dayData.day.maxtemp_c.toFixed(0) }}&deg;
                        </p>
                        <p>
                            L: {{ dayData.day.mintemp_c.toFixed(0) }}&deg;
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
:deep(.swiper) {

    .swiper-button-prev,
    .swiper-button-next {
        display: none;
    }
}

:deep(.swiper-button-prevc),
:deep(.swiper-button-nextc) {
    position: relative;
    width: 2.25rem;
    height: 2.25rem;
    font-size: medium;
    font-weight: bolder;
    background-color: var(--color-background);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
    z-index: 10;

    &.swiper-button-prev {
        left: 0.65%;
    }

    &.swiper-button-next {
        right: 0.65%;
    }

    &::after {
        font-size: 10px;
        font-weight: 900;
        color: white;
    }

    @media (max-width: 768px) {
        width: 2rem;
        height: 2rem;

        &::after {
            font-size: 8px;
        }
    }
}
</style>