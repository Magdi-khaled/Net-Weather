<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
const modalActive = defineModel<Boolean>('modalActive');

</script>

<template>
    <Teleport to="body">
        <Transition name="modal-outer">
            <div v-show="modalActive"
                class="absolute w-full bg-[#00000096] h-screen top-0 left-0 flex justify-center px-3 sm:px-8">
                <Transition name="modal-inner">
                    <div v-if="modalActive"
                        class="p-4 bg-white self-center max-w-screen-md text-start text-sm sm:text-md">
                        <slot />
                        <div class="w-full flex justify-end">
                            <BaseButton @click="modalActive = false">
                                Close
                            </BaseButton>
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>
<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
    transition: opacity 0.2s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
    opacity: 0;
}

.modal-inner-enter-active {
    transition: all 0.2s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.1s;
}

.modal-inner-leave-active {
    transition: opacity 0.2s cubic-bezier(0.52, 0.02, 0.19, 1.02),
        transform 0.2s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.modal-inner-leave-to {
    transform: scale(0.8);
}
</style>