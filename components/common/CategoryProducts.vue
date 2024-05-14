<script setup>

import {CaretRight} from "@element-plus/icons-vue";
import {SwiperSlide} from "swiper/vue";
import MenuNewProducts from "~/components/common/MenuNewProducts.vue";
import MenuHotDealProducts from "~/components/common/MenuHotDealProducts.vue";
import MenuGundamProducts from "~/components/common/MenuGundamProducts.vue";
import MenuT1Products from "~/components/common/MenuT1Products.vue";


const props = defineProps({
    visible: {
        type: Boolean,
        default() {
            return false
        }
    }
})

const categorys = ref ([
    {
        img: 'https://herogame.vn/upload/images//full/2822023141559_8783663fdaa2fefc3c9.70356810_gundam-icon-23.jpg',
        img1: 'https://herogame.vn/upload/images//full/282202314135_3247663fda981ae5c53.15829670_pngwing.com%20(1).png',
        name: 'Gundam - Figure',

        categoruDrops: [
            {
                content: 'Gundam',
                link: '/category/gundam'
            },
            {
                content: 'Pokemon',
                link: '/category/pokemon'
            },
            {
                content: 'Doraemon',
                link: '/category/doraemon'
            },
            {
                content: 'Onepiece',
                link: '/category/onepiece'
            },
            {
                content: 'Dragon Ball',
                link: '/category/dragonball'
            },
            {
                content: 'Mô hình khác',
                link: '/category/other'
            },
        ]

    },
    {
        img: 'data:image/jpeg;base64,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',
        img1: 'data:image/png;base64,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',
        name: 'T1 store',
        categoruDrops: [
            {
                content: 'Đồng phục T1',
                link: '/category/t1Clothes'
            },
            {
                content: 'Balo T1',
                link: '/category/t1Backpack'
            },
            {
                content: 'Handmade',
                link: '/category/t1Handmade'
            },
            {
                content: 'Mô hình T1',
                link: '/category/t1Figure'
            },
        ]

    },
])
</script>

<template>
    <div class="w-full mt-4 flex">
        <div class="w-1/6 bg-white z-100  ">
            <div class="p-3 bg-red-600 font-semibold text-white">
                Danh mục
            </div>

            <div v-for="(category, index) in categorys"
                     :key="index"
                 class="p-3 bg-gray-100 flex items-center gap-4 cursor-pointer relative category-wrap justify-between hover:bg-red-600 hover:text-white flex-items-hover">
                <div class="flex items-center gap-3">
                    <img class="w-6 h-6 img" :src="category.img" alt="">
                    <img class="w-6 h-6 img1 hidden" :src="category.img1" alt="">
                    {{category.name ? category.name : ''}}
                </div>
                <el-icon class="" ><CaretRight/></el-icon>
                <div class="w-full bg-white absolute left-full top-0 hidden category-drop">
                    <div v-for="(categoryDrop, index ) in category.categoruDrops"
                         :key="index"
                         class="w-full bg-gray-100 p-3 flex items-center gap-4 cursor-pointer relative justify-between category-drop-item z-[9999999]" @click="$router.push(categoryDrop.link)">
                        <div>
                            {{categoryDrop.content}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full mt-5 hover:mt-2 border-solid border-gray-500 border-2 rounded-xl p-4">
                <img class="w-full h-full rounded-xl" src="https://herogame.vn/upload/images/full/64ab8a45d60e8Untitled-2.png" alt="">
            </div>
        </div>

        <div class="w-5/6 bg-white text-fuchsia-400 pl-4 flex flex-col gap-y-3">
           <slot/>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.category-wrap{
    .category-drop{
        background-color: white;
        color: black;
        .category-drop-1{
            .category-drop-1-item{
                background-color: white;
                color: black;
                &:hover{
                    background-color: rgb(220 38 38);
                    color: white;
                }
            }
        }

        .category-drop-item{

            &:hover{
                background-color: rgb(220 38 38);
                color: white;
                .category-drop-1{
                    display: block;
                }
            }
        }

    }

    &:hover{
        .category-drop{
            display: flex;
            flex-direction: column;
        }
        .img{
            display: none;
        }
        .img1{
            display: block;
        }
    }
}

</style>