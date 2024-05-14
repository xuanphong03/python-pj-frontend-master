<script setup lang="ts">
import Product from "~/components/common/Product.vue";
import {useAuthStore} from "~/stores/auth";

const auth = useAuthStore()

const search = computed(() => auth.$state.search)
</script>

<template>
    <product advertising="" :search="search">
        KẾT QUẢ TÌM KIẾM
    </product>
</template>

<style lang="scss">

</style>