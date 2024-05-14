<script setup>
import CategoryProducts from "~/components/common/CategoryProducts.vue";
import {Monitor, ShoppingCart} from "@element-plus/icons-vue";
import {ref} from 'vue'
import {Swiper, SwiperSlide} from "swiper/vue";
import {Autoplay, Navigation} from "swiper/modules";
import {fakeProducts} from "~/constants/fakeData.js";
import spaFetch from "~/plugins/fetch.js";
import {useAuthStore} from "~/stores/auth.js";


const {$apiUrl} = useNuxtApp()
const route = useRoute()
const router = useRouter()

const id = route.params ? route.params.id : null

const modules = ref([Autoplay, Navigation])
const products = ref(fakeProducts)
const dataDetail = ref(null)
const loading = ref(false)
const loadingAdd = ref(false)
const auth = useAuthStore()

const num = ref(1)
const textarea2 = ref('')
const activeName = ref('first')
const detailInfo = ref(
    {
        name: 'Mô hình Gundam MG 1/100 ASW-G-08 Gundam Barbatos - Bandai - GDMG0004',
        description: '1 2 3 test mic alo alo',
        price: '1 ti dong :)))',
        type: 'Gundam',
        detailIMg: [
            {
                img: 'https://herogame.vn/upload/images/img_10_04_2023/mo-hinh-gundam-mg-1-100-asw-g-08-gundam-barbatos-bandai-gdmg0004-1_434072_6433dfd319b4d1.71893000.jpg',
            },
            {
                img: 'https://herogame.vn/upload/images/img_10_04_2023/mo-hinh-gundam-mg-1-100-asw-g-08-gundam-barbatos-bandai-gdmg0004-1_434072_6433dfd319b4d1.71893000.jpg',
            },
            {
                img: 'https://herogame.vn/upload/images/img_10_04_2023/mo-hinh-gundam-mg-1-100-asw-g-08-gundam-barbatos-bandai-gdmg0004-1_434072_6433dfd319b4d1.71893000.jpg',
            },
            {
                img: 'https://herogame.vn/upload/images/img_10_04_2023/mo-hinh-gundam-mg-1-100-asw-g-08-gundam-barbatos-bandai-gdmg0004-1_434072_6433dfd319b4d1.71893000.jpg',
            },
            {
                img: 'https://herogame.vn/upload/images/img_10_04_2023/mo-hinh-gundam-mg-1-100-asw-g-08-gundam-barbatos-bandai-gdmg0004-1_434072_6433dfd319b4d1.71893000.jpg',
            },
            {
                img: 'https://herogame.vn/upload/images/img_10_04_2023/mo-hinh-gundam-mg-1-100-asw-g-08-gundam-barbatos-bandai-gdmg0004-1_434072_6433dfd319b4d1.71893000.jpg',
            },
        ],
    }
)
const zoomImg = () => {
    // console.log($("#zoom_01"))
    // $("#zoom_01").ezPlus()
}

const getProducts = () => {
    spaFetch(false)($apiUrl.PRODUCT, {
        method: 'GET',
        params: {
            page: 3,
            pageSize: 10,
        }
    }).then(res => {
        products.value = res.results.map(item => {
            return {
                ...item,
                status: item.type
            }
        })
    }).catch(error => {
        console.log("error", error.response)
    })
}
const getDetail = () => {
    loading.value = true
    spaFetch(false)(`${$apiUrl.PRODUCT}${id}/`, {
        method: 'GET'
    }).then(res => {

        dataDetail.value = res
        loading.value = false
    }).catch(error => {
        console.log("error", error.response)
        loading.value = false
    })
}

const zoomIn = (event) => {
    const pre = document.getElementById("preview");
    pre.style.visibility = "visible";
    if ($('#zoom1').is(':hover')) {
        pre.style.backgroundImage = `url('${dataDetail.value && dataDetail.value.img ? dataDetail.value.img : null}')`;
    }
    const posX = event.offsetX;
    const posY = event.offsetY;
    pre.style.backgroundPosition = (-posX * 3.8) + "px " + (-posY * 3.5) + "px";
}

const zoomOut = () => {
    const pre = document.getElementById("preview");
    pre.style.visibility = "hidden";
}

const handleAddProductToCart = () => {
    if (!auth.$state.accessToken || !auth.$state.refreshToken) {
        return router.push('/login')
    }
    if (loadingAdd.value) {
        return
    }
    loadingAdd.value = true
    spaFetch()($apiUrl.CART_ITEM, {
        method: 'POST',
        body: {
            "product": id,
            "quantity": num.value,
        }
    }).then(res => {
        ElMessage.success(
            "Thêm vào giỏ hàng thành công"
        )
        loadingAdd.value = false
        getUser()
    }).catch(error => {
        console.log("error", error.response)
        if (error.status === 400) {
            ElMessage.error(
                {
                    message: "Số lượng hàng trong kho không đủ",
                }
            )
        } else {
            ElMessage.error(
                "Thêm vào giỏ hàng thất bại"
            )
        }
        loadingAdd.value = false
    })
}

const handleChange = (value, oldValue) => {
    if (!value) {
        return num.value = oldValue
    }
}
const getUser = () => {
    const idUser = auth.$state.user && auth.$state.user.id ? auth.$state.user.id : null
    spaFetch()(`${$apiUrl.USER}${idUser}/`, {
        method: 'GET'
    }).then(res => {
        auth.setUser(res)
        getCart()
    }).catch(error => {
        console.log("error", error.response)
    })
}

const getCart = () => {
    const id = auth.$state.user && auth.$state.user.cart ? auth.$state.user.cart : null
    spaFetch()(`${$apiUrl.CART}${id}/`, {
        method: 'GET'
    }).then(res => {
        auth.setQuantityInCart(res.products.length)
    }).catch(error => {
        console.log("error", error.response)
    })
}

getCart()
getDetail()
getProducts()
</script>

<template>
    <div class="flex flex-col">
        <div class="w-4/5 flex flex-col items-center justify-center  mx-auto">
            <div class="w-full bg-red-600 text-white h-8 flex items-center pl-4 py-4 mt-4">
                Trang chủ >> {{ detailInfo.type }} >> {{ dataDetail && dataDetail.name ? dataDetail.name : '' }}
            </div>
            <CategoryProducts>
                <div v-loading="loading" class="w-full flex mt-4">
                    <div class="flex flex-col">
                        <div class="w-[421px] ">
                            <div class="w-full h-[421px] bg-black">
                                <div id="samples" class="relative">
                                    <img id="zoom1"
                                         :src="dataDetail && dataDetail.img ? dataDetail.img : ''"
                                         alt=""
                                         @mousemove="zoomIn"
                                         @mouseout="zoomOut">
                                    <div id="preview"></div>
                                </div>
                            </div>
                            <div class="flex w-full justify-center my-2  ">
                                <div
                                    class="flex items-center gap-x-3 font-semibold text-[#17649a] hover:text-[#0275d8]">
                                    <el-icon size="20">
                                        <Monitor/>
                                    </el-icon>
                                    Click để xem gallery
                                </div>
                            </div>
                        </div>

<!--                        <div class="flex w-[421px] flex-wrap">-->
<!--                            <div v-for="(dImg, index) in detailInfo.detailIMg"-->
<!--                                 :key="index"-->
<!--                            >-->
<!--                                <img class="w-[105px] h-[105px] p-2" :src="dImg.img" alt="">-->
<!--                            </div>-->
<!--                        </div>-->
                    </div>

                    <div class="ml-9 flex flex-col gap-y-3">
                        <div class="text-[1.85rem] text-[#17649a] font-semibold">
                            {{ dataDetail && dataDetail.name ? dataDetail.name : '' }}
                        </div>

                        <div class="text-[1.15rem] text-black font-semibold">
                            {{ dataDetail && dataDetail.name ? dataDetail.name : '' }}
                        </div>

                        <div class="text-black italic">
                            {{ dataDetail && dataDetail.description ? dataDetail.description : '' }}
                        </div>

                        <div class="flex text-black text-lg items-baseline">
                            Giá tiền :
                            <div class="font-semibold text-red-500 text-2xl ml-10">
                                {{ dataDetail && dataDetail.price ? dataDetail.price : 0 }} đ
                            </div>
                        </div>

                        <div class="flex text-black text-lg items-baseline">
                            Trạng thái :
                            <div class="font-semibold text-green-500 text-lg ml-4 uppercase"> Còn Hàng</div>
                        </div>

                        <div class="flex text-black text-lg items-baseline">
                            Danh mục :
                            <div
                                class="font-semibold text-blue-700 text-lg ml-4 underline hover:text-blue-500 cursor-pointer">
                                {{ dataDetail && dataDetail.type ? dataDetail.type : '' }}
                            </div>
                        </div>

                        <div class="flex text-black text-lg items-baseline flex-wrap gap-y-1">
                            Từ khoá :
                            <div
                                class="font-semibold text-white text-lg ml-4 bg-blue-600 px-2 rounded-lg hover:bg-blue-500">
                                {{ dataDetail && dataDetail.type ? dataDetail.type : '' }}
                            </div>
                            <div
                                class="font-semibold text-white text-lg ml-4 bg-blue-600 px-2 rounded-lg hover:bg-blue-500">
                                {{ dataDetail && dataDetail.name ? dataDetail.name : '' }}
                            </div>
                        </div>
                        <div class="flex my-10 gap-x-32 ">
                            <el-input-number class="h-20" v-model="num" size="large" :min="1" @change="handleChange"/>
                            <div
                                class="flex h-20 bg-red-600 items-center justify-center px-10 gap-x-6 hover:bg-red-500 cursor-pointer"
                                @click="handleAddProductToCart" v-loading="loadingAdd">
                                <el-icon color="white" size="40">
                                    <ShoppingCart/>
                                </el-icon>
                                <p class="uppercase text-white text-2xl">Thêm vào giỏ</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w-full mt-">
                    <el-tabs
                        v-model="activeName"
                        type="border-card"
                        class="demo-tabs"
                        stretch
                    >
                        <el-tab-pane label="Đánh giá" name="first">
                            <div class="flex justify-between mb-4">
                                <p>0 bình luận</p>
                                <p>Sắp xếp theo</p>
                            </div>
                            <el-input
                                v-model="textarea2"
                                :autosize="{ minRows: 2, maxRows: 4 }"
                                type="textarea"
                                placeholder="Nhập bình luận ..."
                            />
                            <div class="mt-4 text-right">
                                <el-button type="primary" plain>Đăng</el-button>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="Quyền lợi" name="second">
                            <el-descriptions :column="1" title="Được gì khi mua máy tại HEROGAME ?">
                                <el-descriptions-item>- Giảm giá 100k khi mua MÁY lần sau</el-descriptions-item>
                                <el-descriptions-item>- Phụ kiện zin theo máy</el-descriptions-item>
                                <el-descriptions-item>- Đổi máy mới trong 7 ngày khi máy gặp lỗi của NSX, hoàn tiền 100%
                                    khi không còn máy đổi
                                </el-descriptions-item>
                                <el-descriptions-item>- Tích lũy điểm giảm giá cho những đơn hàng sau
                                </el-descriptions-item>
                                <el-descriptions-item>- Bảo hành phần mềm trong suốt quá trình sử dụng
                                </el-descriptions-item>
                                <el-descriptions-item>- Hỗ trợ sửa chữa cho khách hàng khi máy hết BH
                                </el-descriptions-item>
                                <el-descriptions-item>- Hỗ trợ đổi máy/ lên đời khi vẫn còn BH</el-descriptions-item>
                                <el-descriptions-item>- Cập nhập Firmware mới liên tục cho các dòng máy
                                </el-descriptions-item>
                            </el-descriptions>
                        </el-tab-pane>
                        <el-tab-pane label="Thanh toán" name="third">
                            <el-descriptions :column="1" title="Thanh toán">
                                <el-descriptions-item>- Áp dụng thanh toán quẹt thẻ ATM/VISA/MASTER
                                </el-descriptions-item>
                                <el-descriptions-item>- Có thanh toán chuyển khoản online / Momo</el-descriptions-item>
                            </el-descriptions>
                            <el-descriptions :column="1" title="">
                                <el-descriptions-item><span class="text-[#ff0000] font-semibold text-xl ml-16">CHI NHÁNH HỒ CHÍ MINH</span>
                                </el-descriptions-item>
                                <el-descriptions-item><span
                                    class="text-black font-semibold">NGÂN HÀNG VIETCOMBANK</span></el-descriptions-item>
                                <el-descriptions-item label="Số tài khoản:"><span class="text-black font-semibold">83860101002</span>
                                </el-descriptions-item>
                                <el-descriptions-item label="Chủ tài khoản:"><span class="text-black font-semibold">NGUYỄN KỲ NAM</span>
                                </el-descriptions-item>
                            </el-descriptions>
                            <el-descriptions :column="1" title="">
                                <el-descriptions-item><span class="text-[#ff0000] font-semibold text-xl ml-16">CHI NHÁNH HÀ NỘI</span>
                                </el-descriptions-item>
                                <el-descriptions-item><span class="text-black font-semibold">NGÂN HÀNG VIETCOMBANK (Chi nhánh: Tây Hà Nội)</span>
                                </el-descriptions-item>
                                <el-descriptions-item label="Số tài khoản:"><span class="text-black font-semibold">83860101002</span>
                                </el-descriptions-item>
                                <el-descriptions-item label="Chủ tài khoản:"><span class="text-black font-semibold">NGUYỄN KỲ NAM</span>
                                </el-descriptions-item>
                                <el-descriptions-item><span class="text-[#ff0000] font-semibold text-lg">* Lưu ý : Chuyển khoản với cú pháp là : "Số điện thoại" - Sau khi chuyển khoản vui lòng liên hệ Zalo hoặc fan page để xác nhận.</span>
                                </el-descriptions-item>
                            </el-descriptions>
                        </el-tab-pane>
                    </el-tabs>
                </div>
                <div class="w-full">
                    <div
                        class=" w-full bg-red-600 flex h-[45px] justify-center items-center text-white font-semibold text-lg rounded-xl">
                        Có thể bạn thích
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
                            <div
                                class="w-full bg-white border border-solid border-gray-300 rounded-xl overflow-hidden cursor-pointer">
                                <div class="w-full relative">
                                    <img class="w-full h-full" :src="product.img" alt="">
                                    <div
                                        class="w-full py-2 text-center text-white bg-blue-500 uppercase font-semibold absolute bottom-0">
                                        {{ product.status }}
                                    </div>
                                </div>
                                <div class=" h-[5rem] text-sm p-3 text-center font-semibold hover:text-blue-800 ">
                                    {{ product.name }}
                                </div>
                                <div
                                    class="p-2 text-center border-solid border-t-gray-200 border border-b-blue-300 border-b-2 text-red-600 font-semibold">
                                    {{ product.price }}đ
                                </div>
                                <div
                                    class="py-2 hover text-center font-bold text-blue-600 uppercase flex justify-center items-center gap-1 hover:text-white hover:bg-red-600 transition duration-200">
                                    <el-icon size="20">
                                        <ShoppingCart/>
                                    </el-icon>
                                    Thêm vào giỏ
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </CategoryProducts>
        </div>
    </div>


</template>

<style lang="scss">
.demo-tabs > .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 15px;
    font-weight: 600;
}

.demo-tabs .el-tabs__item {
    font-size: 18px;
    font-weight: 300;
}

.el-descriptions__title {
    color: red;
}

#preview {
    visibility: hidden;
    border: 2px solid black;
    border-radius: 5px;
    width: 100%;
    height: 421px;
    background-repeat: no-repeat;
    background-size: 2105px 2105px;
    position: absolute;
    z-index: 999999;
    right: -105%;
    top: 0;
}

#samples {
    text-align: center;
}

#samples img {
    display: block;
    border: 2px solid #6A6462;
}

#samples img:hover {
    cursor: zoom-in;
    border: 0;
    -moz-box-shadow: 2px 2px 7px 2px rgba(130, 130, 130, 1), -1px -1px 7px 2px rgba(130, 130, 130, 1);
    -webkit-box-shadow: 2px 2px 7px 2px rgba(130, 130, 130, .7), -1px -1px 7px 2px rgba(130, 130, 130, 1);
    box-shadow: 2px 2px 7px 2px rgba(130, 130, 130, .7), -2px -2px 7px 2px rgba(130, 130, 130, 1);
}

@media screen and (max-width: 767px) {
    #samples img {
        display: inline-block;
    }
}


</style>