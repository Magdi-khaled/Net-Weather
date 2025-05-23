<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { uid } from 'uid';
import BaseModal from '@/components/BaseModal.vue';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type ICity from '@/types/useSavedQuery';
import { useHelper } from '@/utils/usehelper';

const route = useRoute();
const router = useRouter();
const { isCityExist } = useHelper();
const modalActive = ref<boolean>(false);
const savedCities = ref<ICity[]>([]);
const cityNotExist = computed(() => isCityExist(savedCities.value))

const addCity = () => {
    try {
        if (localStorage.getItem('savedCities')) {
            savedCities.value = JSON.parse<[]>(localStorage.getItem('savedCities'));
        }
        const locationObj = {
            id: uid(),
            state: route.params.state,
            city: route.params.city,
            coords: {
                lng: route.query.lng,
                lat: route.query.lat,
            }
        }
        savedCities.value.push(locationObj);
        localStorage.setItem('savedCities', JSON.stringify(savedCities.value));

        let query = Object.assign({}, route.query);
        delete query.preview;
        router.replace({ query })
    } catch (e) {
        console.error(e);
    }
};
</script>

<template>
    <header class="sticky top-0 z-90 shadow-lg container-w head-bg">
        <nav class="flex flex-row justify-center items-center gap-4 py-6">
            <RouterLink :to="{ name: 'home' }">
                <div class="flex items-center gap-4 text-center flex-1">
                    <icon icon="mdi:weather-lightning-rainy" width="35" height="35" />
                    <p class="capitalize">net weather</p>
                </div>
            </RouterLink>
            <div class="flex gap-3 flex-1 justify-end items-center">
                <icon icon="tabler:info-circle-filled" width="28" height="28"
                    class="hover:text-hover duration-150 cursor-pointer" @click="modalActive = true" />
                <icon v-if="route.query.preview && !cityNotExist" icon="pixel:plus-solid" width="17" height="17"
                    class="hover:text-hover duration-150 cursor-pointer" @click="addCity" />
            </div>
        </nav>
        <BaseModal v-model:modal-active="modalActive">
            <div class="text-black">
                <h1 class="text-xl sm:text-2xl mb-1">About:</h1>
                <p class="mb-4">
                    The Local Weather allows you to track the current and
                    future weather of cities of your choosing.
                </p>
                <h2 class="text-xl sm:text-2xl">How it works:</h2>
                <ol class="list-decimal list-inside mb-4">
                    <li>
                        Search for your city by entering the name into the
                        search bar.
                    </li>
                    <li>
                        Select a city within the results, this will take
                        you to the current weather for your selection.
                    </li>
                    <li>
                        Track the city by clicking on the "+" icon in the
                        top right. This will save the city to view at a
                        later time on the home page.
                    </li>
                </ol>

                <h2 class="text-xl sm:text-2xl">Removing a city</h2>
                <p>
                    If you no longer wish to track a city, simply select
                    the city within the home page. At the bottom of the
                    page, there will be am option to delete the city.
                </p>
            </div>
        </BaseModal>
    </header>
</template>