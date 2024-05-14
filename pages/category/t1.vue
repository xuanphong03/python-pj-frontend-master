<script setup>
import CategoryProducts from "~/components/common/CategoryProducts.vue";
import { ref } from 'vue'
import {ShoppingCart} from "@element-plus/icons-vue";
import {fakeProducts} from "@/constants/fakeData.js"
import spaFetch from "~/plugins/fetch.js";


const { $apiUrl } = useNuxtApp()

const products = ref(fakeProducts)
const router = useRouter()
const value = ref('Option1')
const loading = ref(false)

const formState = reactive({
    page: 1,
    size: 20,
    total: 0
})

const getProducts = () =>{
    loading.value = true
    spaFetch(false)($apiUrl.PRODUCT,{
        method: 'GET',
        params:{
            page: formState.page,
            pageSize: formState.size,
        },

    }).then( res => {
        products.value = res.results.map(item =>{
            return {
                ...item,
                status: item.type
            }
        })
        loading.value = false
        formState.total = res.count
    }).catch( error => {
        loading.value = false
        console.log("error", error.response)
    })
}

const advertising =
    {
        img1:'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/425437770_3724705651096906_6248671884443984155_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=783fdb&_nc_eui2=AeG95qnpifBZVXj1QhVBwS61CJjagTVwokEImNqBNXCiQQ0-EMsZLH55IhXpiaABfJBndSsdLSXgwcEneghG7aGA&_nc_ohc=79Cfa-sJk2gAX_CnQLF&_nc_ht=scontent.fhan15-1.fna&oh=00_AfC9q1wWAjc-YcTut40ezpw-jRPUyGy-CSWTEzie6KEsoA&oe=65C68267',
        img2:'https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/407085817_886311356236021_5547675702463138587_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=3635dc&_nc_eui2=AeF-H-l-b6xoTw8x6Tj_zMwHUVifLedF6EBRWJ8t50XoQGchUlWtNfBNoT5OsgingoR4Q00RcOBKVoYFeOQRXg9k&_nc_ohc=WgXrxnYrtmkAX_vVGbR&_nc_ht=scontent.fhan15-2.fna&oh=00_AfCsQ8G-_WDSBvVibdBleNMZ_CAxVXDW3RxxZDf-jUUuhQ&oe=65C80D77 ',
    }


const options = [
    {
        value: 'Option1',
        label: 'Mặc định',
    },
    {
        value: 'Option2',
        label: 'Tên A-Z',
    },
    {
        value: 'Option3',
        label: 'Tên Z-A',
    },
    {
        value: 'Option4',
        label: 'Giá giảm dần',
    },
    {
        value: 'Option5',
        label: 'Giá tăng dần',
    },
]

const handleClick = (item) => {
    router.push(item && item.id ? `/product/${item.id}` : '')
}

const handleChangePage = (value) => {
    products.value = []
    getProducts()
}

getProducts()
</script>

<template>
    <div>
        <div v-loading="loading" class="w-4/5 flex flex-col items-center justify-center  mx-auto">
            <CategoryProducts>
                <img :src="advertising && advertising.img1 ? advertising.img1 : ''"
                     alt="">
                <div class="flex items-center justify-center h-10 bg-red-600 my-4 text-white font-semibold">
                    T1 SHOP - PHÂN PHỐI CHÍNH HÃNG CÁC SẢN PHẨM CỦA T1, ĐỒ HANMADE T1
                </div>
                <img :src="advertising && advertising.img2 ? advertising.img2 : ''" alt="">
                <div class="flex h-16 items-center bg-gray-500 px-8">
                    <div>
                        <span class="text-white">
                        Sắp xếp theo:
                        </span>
                        <el-select
                            v-model="value"
                            class="m-2"
                            default-first-option
                            size="small"
                            style="width: 120px;"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            />
                        </el-select>
                    </div>
                </div>
                <div class="w-full grid grid-cols-4 gap-4">
                    <div v-for="(product, index) in products"
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
                    </div>
                </div>
                <el-pagination
                    v-model:current-page="formState.page"
                    :page-size="formState.size"
                    layout="prev, pager, next"
                    :total="formState.total"
                    @currentChange="handleChangePage"
                />
            </CategoryProducts>
        </div>
    </div>
</template>

<style lang="scss">

</style>