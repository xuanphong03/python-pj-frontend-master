<script setup>
const props = defineProps({
    data: {
        type: Object,
        default() {
            return null
        }
    },
    colorItemSM: {
        type: String,
        default() {
            return '';
        }
    }
})
</script>

<template>
    <div>
        <div class="w-40 h-40 rounded-2xl menu-item-image overflow-hidden cursor-pointer"
             :class="colorItemSM">
            <div class="w-full h-full" :style="`background-image: url('${data.img}')`"></div>
            <span class="text-white text-lg">
                {{ data && data.title ? data.title : '' }}
            </span>
        </div>
    </div>
</template>

<style scoped>

</style>