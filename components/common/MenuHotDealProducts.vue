<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { ShoppingCart } from "@element-plus/icons-vue";
import { fakeProducts } from "@/constants/fakeData.js";
import spaFetch from "~/plugins/fetch.js";

const { $apiUrl } = useNuxtApp();

const modules = ref([Autoplay, Navigation]);
const products = ref(fakeProducts);
const router = useRouter();
const getProducts = () => {
  spaFetch(false)($apiUrl.PRODUCT, {
    method: "GET",
    params: {
      page: 2,
      pageSize: 10,
    },
  })
    .then((res) => {
      products.value = res.results.map((item) => {
        return {
          ...item,
          status: item.type,
        };
      });
    })
    .catch((error) => {
      console.log("error", error.response);
    });
};

const handleClick = (item) => {
  router.push(item && item.id ? `/product/${item.id}` : "");
};

getProducts();
</script>

<template>
  <div class="w-full mb-20">
    <div
      class="flex items-center justify-center relative bg-[url('https://theme.hstatic.net/1000026602/1001232314/14/img-banner-index.jpg?v=107')] bg-no-repeat bg-cover bg-center bg-fixed mt-5 w-full h-[400px] rounded-t-xl"
    >
      <div class="absolute inset-0 bg-black opacity-50"></div>
      <h2
        class="relative text-6xl text-[#fff] font-black uppercase text-center"
      >
        Sản phẩm bán chạy
      </h2>
    </div>

    <swiper
      :loop="true"
      :slides-per-view="4"
      :spaceBetween="20"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: true,
      }"
      :navigation="true"
      :modules="modules"
      class="w-full"
    >
      <swiper-slide
        v-for="(product, index) in products"
        :key="index"
        class="mt-4 hover:mt-1 card-new-product"
      >
        <div
          class="w-full bg-white border border-solid border-gray-300 rounded-xl overflow-hidden cursor-pointer"
          @click="handleClick(product)"
        >
          <div class="w-full relative">
            <img class="w-full h-full" :src="product.img" alt="" />
          </div>
          <p
            class="w-full h-[40px] mt-2 text-sm px-2 font-normal hover:text-blue-800 line-clamp-2"
          >
            {{ product.name }}
          </p>
          <span class="p-2 border-solid text-black font-semibold">
            {{
              product.price.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })
            }}
          </span>
          <div
            class="py-2 hover text-center font-bold text-blue-600 uppercase flex justify-center items-center gap-1 hover:text-white hover:bg-black transition duration-200"
          >
            <el-icon size="20"> <ShoppingCart /> </el-icon>
            Thêm vào giỏ
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<style scoped>
.card-new-product {
  transition: all 0.3s;
}
</style>

<!-- ---------------------------------------------------------------------------- -->
<!-- <script setup>
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import {ShoppingCart} from "@element-plus/icons-vue";
import {fakeProducts} from "@/constants/fakeData.js"
import spaFetch from "~/plugins/fetch.js";

const { $apiUrl } = useNuxtApp()

const modules = ref([Autoplay, Navigation])
const products = ref(fakeProducts)
const router = useRouter()
const getProducts = () =>{
    spaFetch(false)($apiUrl.PRODUCT,{
        method: 'GET',
        params:{
            page: 2,
            pageSize: 10,
        }
    }).then( res => {
        products.value = res.results.map(item =>{
            return {
                ...item,
                status: item.type
            }
        })
    }).catch( error => {
        console.log("error", error.response)
    })
}

const handleClick = (item) => {
    router.push(item && item.id ? `/product/${item.id}` : '')
}

getProducts()
</script>

<template>
   <div class="w-full">
       <div class=" w-full bg-red-600 flex h-[45px] ">
           <div class="w-1/6 bg-red-800 flex items-center justify-center">
                <span class="font-semibold flex text-white">
                    Pre-Order
                </span>
           </div>
           <div class="flex items-center justify-center text-white border-x-2 p-4">
               Hot deal
           </div>
       </div>
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
                       <img class="w-full h-full" :src="product.img" alt="">
                       <div class="w-full py-2 text-center text-white bg-blue-500 uppercase font-semibold absolute bottom-0">
                           {{ product.status }}
                       </div>
                   </div>
                   <div class=" h-[5rem] text-sm p-3 text-center font-semibold hover:text-blue-800 ">
                       {{ product.name }}
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
   </div>
</template>

<style scoped>
.card-new-product{
    transition: all 0.3s;
}
</style> -->
