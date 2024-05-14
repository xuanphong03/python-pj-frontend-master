<script setup>
import CategoryProducts from "~/components/common/CategoryProducts.vue";
import { ref } from 'vue'
import {ShoppingCart} from "@element-plus/icons-vue";
import {fakeProducts} from "@/constants/fakeData.js"
import spaFetch from "~/plugins/fetch.js";


const props = defineProps({
    advertising: {
        type: String,
        default() {
            return ""
        }
    },
    search: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        default: ""
    },
})

const { $apiUrl } = useNuxtApp()

const products = ref(fakeProducts)
const router = useRouter()
const value = ref('')
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
            search: props.search,
            ordering: value.value,
            type: props.type
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

const options = [
    {
        value: '',
        label: 'Mặc định',
    },
    {
        value: 'name',
        label: 'Tên A-Z',
    },
    {
        value: '-name',
        label: 'Tên Z-A',
    },
    {
        value: '-price',
        label: 'Giá giảm dần',
    },
    {
        value: 'price',
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

const handleSelect = (value) => {
    products.value = []
    formState.page = 1
    formState.size = 20
    formState.total = 0
    getProducts()
}

getProducts()

watch(() => props.search, () => {
    setTimeout(() => {
        products.value = []
        formState.page = 1
        formState.size = 20
        formState.total = 0
        getProducts()
    }, 200)
})
</script>

<template>
    <div>
        <div v-loading="loading" class="w-4/5 flex flex-col items-center justify-center  mx-auto">

            <CategoryProducts>
                <img :src="advertising"
                     alt="">
                <div class="flex items-center justify-center p-3 bg-red-600 text-white font-semibold">
                    <slot/>
                </div>
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
                            @change="handleSelect"
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