<script setup>
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import {ShoppingCart} from "@element-plus/icons-vue";
import {fakeProducts} from '@/constants/fakeData.js'
import spaFetch from "~/plugins/fetch.js";

const { $apiUrl } = useNuxtApp()

const modules = ref([Autoplay, Navigation])
const products = ref(fakeProducts)
const router = useRouter()

const getProducts = () => {
    spaFetch(false)($apiUrl.PRODUCT, {
        method: 'GET',
        params: {
            page: 1,
            pageSize: 10,
        }
        // body: {
        //     username: 'admin',
        //     password: '123456'
        // }
    }).then(res => {
        products.value = res.results.map(item => {
            return {
                ...item,
                image: item.img,
                status: item.type
            }
        })
    }).catch(error => {
        console.log("error", error.response._data)
    })
}

const handleClick = (item) => {
    router.push(item && item.id ? `/product/${item.id}` : "#")
}

getProducts()

</script>

<template>
    <swiper
        :loop="true"
        :slides-per-view="4"
        :spaceBetween="20"
        :autoplay="{
            delay: 1500,
            disableOnInteraction: true,
        }"
        :navigation="true"
        :modules="modules"
        class="w-full "
    >
        <swiper-slide v-for="(product, index) in products"
                            :key="index"
                      class="mt-4 hover:mt-1 card-new-product">
            <div class="w-full bg-white border border-solid border-gray-300 rounded-xl overflow-hidden cursor-pointer" @click="handleClick(product)">
                <div class="w-full relative">
                    <img class="w-full h-full" :src="product.image" alt="">
                    <div class="w-full py-2 text-center text-white bg-blue-500 uppercase font-semibold absolute bottom-0">
                        {{ product.status }}
                    </div>
                </div>
                <div class=" h-[5rem] text-sm p-3 text-center font-semibold hover:text-blue-800 ">
                    <span>{{ product.name }}</span>
                </div>
                <div class="p-2 text-center border-solid border-t-gray-200 border border-b-blue-300 border-b-2 text-red-600 font-semibold">
                    {{ product.price }}đ
                </div>
                <div class="py-2 hover text-center font-bold text-blue-600 uppercase flex justify-center items-center gap-1 hover:text-white hover:bg-red-600 transition duration-200">
                    <el-icon size="20"> <ShoppingCart/> </el-icon>
                    Thêm vào giỏ
                </div>
            </div>
        </swiper-slide>
    </swiper>
</template>

<style scoped>
.card-new-product{
    transition: all 0.3s;
}
</style>