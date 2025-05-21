<script setup lang="ts">
import { Icon } from '@iconify/vue';
import BaseModal from '@/components/BaseModal.vue';
import { ref } from 'vue';

const modalActive = ref<boolean>(false);
</script>

<template>
    <header class="sticky top-0 shadow-lg container-w">
        <nav class="flex flex-row justify-center items-center gap-4 py-6">
            <RouterLink :to="{ name: 'home' }">
                <div class="flex items-center gap-4 text-center flex-1">
                    <icon icon="mdi:weather-lightning-rainy" width="35" height="35" />
                    <p class="capitalize">the local weather</p>
                </div>
            </RouterLink>
            <div class="flex gap-3 flex-1 justify-end items-center">
                <icon icon="tabler:info-circle-filled" width="28" height="28"
                    class="hover:text-hover duration-150 cursor-pointer" @click="modalActive = true" />
                <icon icon="pixel:plus-solid" width="20" height="20"
                    class="hover:text-hover duration-150 cursor-pointer" />
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