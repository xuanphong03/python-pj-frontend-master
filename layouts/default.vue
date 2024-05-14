<script setup>
import MenuItem from "@/components/common/MenuItem.vue"
import { Search, ShoppingCart } from "@element-plus/icons-vue"
import {useAuthStore} from "~/stores/auth.js";
import spaFetch from "~/plugins/fetch.js";


const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const {$apiUrl} = useNuxtApp()

const search = ref("")
const menu = ref([
    {
        isSubmenu: false,
        title: 'Trang chủ',
        link: '/'
    },
    {
        isSubmenu: true,
        title: 'Gundam - Figure',
        link: '/category/gundam/',
        children: [
            {img: 'https://herogame.vn/upload/images//full/185202319930_259036466157a22b624.17302350_pngwing.com%20(2).png', title: 'Mô hình Pokemon', link: '/category/pokemon/'},
            {img: 'https://herogame.vn/upload/images//full/1852023192517_609666466192db7af76.30878542_1280px-Pok%C3%A9mon_Trading_Card_Game_logo.svg.png', title: 'Thẻ bài TCG', link: '/category/pokemontcg/'},
            {img: 'https://herogame.vn/upload/images//full/1852023192946_7277464661a3ac40c38.45394227_pngegg.png', title: 'Mô hình OnePiece', link: '/category/onepiece/'},
            {img: 'https://herogame.vn/upload/images//full/1852023193347_7807964661b2be0c445.24402127_pngegg%20(1).png', title: 'Mô hình DragonBall', link: '/category/dragonball/'},
            {img: 'https://herogame.vn/upload/images//full/1852023193627_5817664661bcbeafb71.52683629_pngwing.com%20(3).png', title: 'Mô hình Doraemon', link: '/category/doraemon/'},
            {img: 'https://herogame.vn/upload/images//full/185202319460_5670164661e08c6a3c7.81656300_pngwing.com%20(5).png', title: 'Mô hình khác', link: '/category/other/'},
        ],
        mainSubMenu: {img: 'https://herogame.vn/upload/images//full/1852023185051_199356466111b558247.94879207_rx_93_v2_hi_nu_gundam_by_zephyrnic-d5hewkq.png', title: 'Mô hình Gundam', link: '#'},
        colorBg: "bg-amber-600",
        colorItemSM: "bg-yellow-500"
    },
    {
        isSubmenu: true,
        title: 'T1 store',
        link: '/category/t1/',
        children: [
            {img: 'https://i.imgur.com/pBgpztm.jpeg', title: 'Handmade', link: '/category/t1Handmade/'},
            {img: 'https://i.ebayimg.com/images/g/3K8AAOSwBNFlXBbY/s-l1600.png', title: 'Mô hình T1', link: '/category/t1Figure/'},
            {img: 'https://i.imgur.com/CG1Phhk.png', title: 'Balo T1', link: '/category/t1Backpack/'},
        ],
        mainSubMenu: {img: 'https://i.imgur.com/zJvS12E.png', title: 'Đồng phục T1', link: '/category/t1Clothes/'},
        colorBg: "bg-red-500",
        colorItemSM: "bg-black"
    },
    {
        isSubmenu: false,
        title: 'Tin tức - Hướng dẫn',
        link: '#',
    },
    {
        isSubmenu: false,
        title: 'Facebook',
        link: '#',
    },
])

onMounted(() => {
    let prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
        const currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos && currentScrollPos > 120) {
            document.getElementById("navbar").style.top = "-140px";
        } else if (currentScrollPos <= 120) {
            document.getElementById("navbar").style.top = "0px"
        } else {
            document.getElementById("navbar").style.top = "-200px"
        }
        prevScrollpos = currentScrollPos;
    }
})
const handleClick = () => {
    router.push("/")
    console.log(route)
}

const logOut = () => {
    auth.deleteAuth()
    window.location.reload()
}

const getCart = () =>{
    const id = auth.$state.user && auth.$state.user.cart ? auth.$state.user.cart : null
    spaFetch()(`${$apiUrl.CART}${id}/`,{
        method: 'GET'
    }).then( res => {
        auth.setQuantityInCart(res.products.length)
    }).catch( error => {
        console.log("error", error.response)
    })
}

getCart()

watch(search, () => {
    router.push('/category/search/')
    auth.setSearch(search.value)
})
</script>

<template>
    <div class="h-screen relative">
        <div id="navbar">
            <div class="h-[40px] flex items-center justify-end p-2 bg-black text-white">
               <div v-if="!auth.$state.accessToken || !auth.$state.refreshToken">
                   <nuxt-link to="/login" class="cursor-pointer hover:underline hover:text-red-700">
                       Đăng nhập
                   </nuxt-link>
                   <el-divider direction="vertical"/>
                   <nuxt-link to="/register" class="cursor-pointer hover:underline hover:text-red-700">
                       Đăng ký
                   </nuxt-link>
               </div>
                <div v-else>
                    <span>
                        Xin chào, {{auth.$state.user.username}}
                    </span>
                    <el-divider direction="vertical"/>
                    <nuxt-link to="/myorder">
                       <span class="cursor-pointer hover:underline hover:text-red-700">
                            Đơn hàng của tôi
                       </span>
                    </nuxt-link>
                    <el-divider direction="vertical"/>
                    <span class="cursor-pointer hover:underline hover:text-red-700" @click="logOut">
                        Đăng xuất
                    </span>
                </div>
            </div>
            <div class="w-full h-[100px] flex flex-row justify-center items-center space-x-32">
                <div >
                    <img class="w-16 h-16" src="/logo.png" alt="Logo Store">
                </div>
                <div class="w-1/3 border-solid border-4">
                    <el-input
                        v-model="search"
                        placeholder="Nhập từ khoá cần tìm"
                        class="input-with-select"
                        size="large"
                        :suffix-icon="Search"
                    >
                    </el-input>
                </div>
                <el-badge :value="auth.$state.quantityInCart" class="cursor-pointer hover:text-blue-600 transition duration-200" @click="$router.push('/cart')">
                    <el-icon size="40"><ShoppingCart/></el-icon>
                </el-badge>
            </div>
            <div class="flex justify-center text-xl font-bold relative bg-black">
                <MenuItem v-for="(item, index) in menu"
                          :key="index"
                          :item="item"
                          :class="item.isSubmenu ? 'menu-item-wrap' : ''"/>
            </div>
        </div>

        <div class=" mt-[200px]">
            <div v-if="route.href !== '/' "
                class="flex justify-center items-center">
                <div class="w-4/5 bg-red-600 h-8 flex items-center pl-4 py-4 mt-4 text-white gap-x-4">
                    <span @click="handleClick"
                          class="cursor-pointer hover:underline-offset-1 hover:text-black" >
                        Trang chủ
                    </span>
                    <span>
                        >>
                    </span>
                </div>
            </div>
            <slot/>
        </div>

        <div class="w-full">
            <div class="w-full h-24 bg-yellow-300 mt-10 flex justify-center items-center justify-evenly">
                <div class="p-6 border-solid border-black">
                    <p>
                        GIAO HÀNG SIÊU TỐC
                    </p>
                    <p>
                        Thanh toán khi nhận hàng
                    </p>
                </div>
                <div class="p-6 border-solid border-s-2 border-black">
                    <p>
                        GIAO HÀNG SIÊU TỐC
                    </p>
                    <p>
                        Thanh toán khi nhận hàng
                    </p>
                </div>
                <div class="p-6 border-solid border-s-2 border-black">
                    <p>
                        GIAO HÀNG SIÊU TỐC
                    </p>
                    <p>
                        Thanh toán khi nhận hàng
                    </p>
                </div>
                <div class="p-6 border-solid border-s-2 border-black">
                    <p>
                        GIAO HÀNG SIÊU TỐC
                    </p>
                    <p>
                        Thanh toán khi nhận hàng
                    </p>
                </div>
            </div>
            <div class="w-full flex">
                <div class="w-1/5 h-80 p-4 ml-6 ">
                    <div class="flex flex-col gap-2">
                        <p class="font-semibold">
                            VỀ HERO GAME
                        </p>
                        <p>
                            Liên hệ
                        </p>
                        <p>
                            Giới thiệu Herogame
                        </p>
                        <p>
                            MST: 0313404917, GCNDK hộ kinh doanh số 41P8016680, cấp ngày 17/08/2015, cấp bởi Ủy Ban Nhân Dân Quận Phú Nhuận.
                        </p>
                        <p>
                            Cửa hàng kinh doanh các sản phẩm máy chơi game Chính Hãng Nintendo , Playstation, XBox ,... ra mắt 2015
                        </p>
                    </div>
                    <img class="w-52" src="https://herogame.vn/ad-min/assets/js/libs/kcfinder/upload_image/images/logoSaleNoti(1)(1).png" alt="">
                </div>
                <div class="w-1/5 h-80 p-4 ml-6 ">
                    <div class="flex flex-col gap-2">
                        <p class="font-semibold">
                            HỖ TRỢ KHÁCH HÀNG
                        </p>
                        <p>
                            Điều khoản giao dịch
                        </p>
                        <p>
                            Chính sách bảo mật thông tin
                        </p>
                        <p>
                            Phương thức giao hàng
                        </p>
                        <p>
                            Chính sách đổi trả
                        </p>
                        <p>
                            Chính sách bảo hành
                        </p>
                        <p>
                            Phương thức thanh toán
                        </p>
                        <p>
                            Phương thức trả góp
                        </p>
                    </div>
                </div>
                <div class="w-1/5 h-80 p-4 ml-6 ">
                    <div class=" flex flex-col gap-2">
                        <p class="font-semibold">
                            ĐƯỜNG DÂY NÓNG
                        </p>
                        <p>
                            Hotline (9:00 - 20:00)
                        </p>
                        <p class="font-semibold text-red-500">
                            TP. HỒ CHÍ MINH
                        </p>
                        <p class="font-semibold">
                            090.292.3986
                        </p>
                        <p class="font-semibold">
                            090.622.1218
                        </p>
                        <p class="font-semibold text-red-500">
                            HÀ NỘI
                        </p>
                        <p class="font-semibold">
                            0937.666.822
                        </p>
                        <p class="text-red-500">
                            Kỹ Thuật:
                        </p>
                        <p>
                            0983.700.995
                        </p>
                    </div>
                </div>
                <div class="w-1/5 h-80 p-4 ml-6 ">
                    <div class="flex flex-col gap-2">
                        <p class="font-semibold">
                            LIÊN HỆ
                        </p>
                        <p>
                            Giới Thiệu Herogame
                        </p>
                        <p>
                            Hero HCM : 5 Nguyễn Trọng Tuyển, P15 , Q Phú Nhuận
                        </p>
                        <p>
                            Hero HN : 20 Ngọc Khánh ,Q Ba Đình
                        </p>
                        <p>
                            Sales: shop.herogame@gmail.com
                        </p>
                        <p>
                            Khiếu nại & Hỗ trợ : hotro.herogame@gmail.com
                        </p>
                    </div>
                </div>
                <div class="w-1/5 h-80 p-4 ml-6 ">
                    <p class="font-semibold">
                        THEO DÕI T1 SHOP
                    </p>
                </div>

            </div>
        </div>
    </div>
</template>

<style lang="scss" >
.el-message{
    z-index: 9999 !important;
}
</style>