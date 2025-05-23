<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import { watch } from 'vue';

const modalActive = defineModel<Boolean>('modalActive');
watch(modalActive, (newVal) => {
    newVal ? document.body.style.overflow = 'hidden' : document.body.style.overflow = 'auto';
});
</script>

<template>
    <Teleport to="body">
        <Transition name="modal-outer">
            <div v-if="modalActive"
                class="fixed z-99 w-full bg-[#00000096] h-screen top-0 left-0 flex justify-center px-3 sm:px-8">
                <Transition name="modal-inner">
                    <div v-if="modalActive" class="p-4 bg-highlight rounded-md border-[2px] border-secondary self-center max-w-screen-md
                        text-start text-sm sm:text-md">
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

<style scoped lang="scss">
.modal {
    &-outer {

        &-enter-active,
        &-leave-active {
            transition: opacity 0.2s cubic-bezier(0.52, 0.02, 0.19, 1.02);
        }

        &-enter-from,
        &-leave-to {
            opacity: 0;
        }
    }

    &-inner {
        &-enter-active {
            transition: all 0.2s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.1s;
        }

        &-leave-active {
            transition: opacity 0.2s cubic-bezier(0.52, 0.02, 0.19, 1.02),
                transform 0.2s cubic-bezier(0.52, 0.02, 0.19, 1.02);
        }

        &-enter-from {
            opacity: 0;
            transform: scale(0.8);
        }

        &-leave-to {
            transform: scale(0.8);
        }
    }
}
</style>