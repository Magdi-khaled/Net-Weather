<script setup>
import SiteNavigation from '@/components/SiteNavigation.vue';
</script>

<template>
  <div class="flex flex-col min-h-[100dvh]">
    <SiteNavigation />
    <RouterView />
  </div>
</template>