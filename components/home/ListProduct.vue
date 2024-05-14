<script setup>
// import Product from "~/components/home/Product.vue";
//
// const data = ref([])
// const loading = ref(false)
// const getData = async () => {
//     try {
//         loading.value = true
//         const response = await  $fetch('https://api.vuahanghieu.com/service/category/kinh-mat/products', {
//             method: 'GET',
//             query: {
//                 page: 1,
//                 page_size: 10
//             }
//         })
//
//         data.value = response.products.data
//         loading.value = false
//     } catch (error) {
//         console.log("error: ", error)
//         loading.value = false
//     }
// }
//
// getData()

</script>

<template>
<!--    <div class="w-full h-full overflow-auto">-->
<!--        <div v-if="loading">-->
<!--            Loading...-->
<!--        </div>-->
<!--        <div v-else-if="data && data.length > 0" class="w-full flex flex-row flex-wrap gap-2">-->
<!--            <Product v-for="item in data"-->
<!--                     :key="item.id"-->
<!--                     :title="item.name"-->
<!--                     :img="item.imageM">-->
<!--            </Product>-->
<!--        </div>-->
<!--        <div v-else>-->
<!--            No data-->
<!--        </div>-->
<!--    </div>-->
</template>

<style scoped>

</style>