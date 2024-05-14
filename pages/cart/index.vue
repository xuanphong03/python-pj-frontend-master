<script setup>
import {ref} from 'vue'
import spaFetch from "~/plugins/fetch.js";
import {useAuthStore} from "~/stores/auth.js";
import ModalPayment from "~/components/common/ModalPayment.vue";

const {$apiUrl} = useNuxtApp()

const auth = useAuthStore()


const tableData = ref([])
const refModalPayment = ref()

const headerRowStyle = () => {
    return "header-cell-style";
}

const getCart = () => {
    const id = auth.$state.user && auth.$state.user.cart ? auth.$state.user.cart : null
    spaFetch()(`${$apiUrl.CART}${id}/`, {
        method: 'GET'
    }).then(res => {
        auth.setQuantityInCart(res.products.length)
        tableData.value = res.products.map((item, index) => {
            return {
                ...item.product,
                stt: index + 1,
                id: item.id,
                idProduct: item.product.id,
                quantityCart: item.quantity,
                priceCart: item.product.price * item.quantity
            }
        })
        // console.table(tableData.value)
    }).catch(error => {
        console.log("error", error.response)
    })
}
const handleChange = (value, item, oldValue) => {
    if (!value) {
        return item.quantityCart = oldValue
    }
    spaFetch()(`${$apiUrl.CART_ITEM}${item.id}/`, {
        method: 'PATCH',
        body: {
            "quantity": value,
        }
    }).then(res => {
        item.priceCart = value * item.price
    }).catch(error => {
        item.quantityCart = oldValue
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
    })
}

const deleteItemCart = (item) => {
    spaFetch()(`${$apiUrl.CART_ITEM}${item.id}/`, {
        method: 'DELETE',
    }).then(res => {
        tableData.value = tableData.value.filter(i => i.id !== item.id)
        auth.setQuantityInCart(auth.$state.quantityInCart - 1)
        ElMessage.success(
            "Xoá sản phấm thảnh công"
        )
    }).catch(error => {
        console.log("error", error.response)
        ElMessage.error(
            "Xoá sản phấm thất bại"
        )
    })
}

const openModal = () => {
    refModalPayment.value.openModal()
}

getCart()

</script>

<template>
    <div class="w-full flex items-center justify-center">
        <div class="w-4/5 mt-4">
            <el-table :data="tableData"
                      height="500"
                      style="width: 100%"
                      :header-cell-class-name="headerRowStyle"
                      show-summary
                      sum-text="Tổng">
                <el-table-column prop="stt" label="STT" width="80"></el-table-column>
                <el-table-column prop="img" label="Hình Ảnh" width="180">
                    <template #default="prop">
                        <img :src="prop.row.img" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="Sản phẩm"/>
                <el-table-column prop="quantityCart" label="Số lượng">
                    <template #default="prop">
                        <el-input-number v-model="prop.row.quantityCart" :min="1"
                                         @change="(value, oldValue) => handleChange(value, prop.row, oldValue)"/>
                    </template>
                </el-table-column>
                <el-table-column prop="priceCart" label="Đơn giá">
                    <!--                 <template #default="prop">-->
                    <!--                     <div>-->
                    <!--                         {{prop.row.price * prop.row.quantityCart}}-->
                    <!--                     </div>-->
                    <!--                 </template>-->
                </el-table-column>
                <el-table-column>
                    <template #default="prop">
                        <el-button type="danger" class="uppercase" @click="deleteItemCart(prop.row)"> xoá </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="w-full flex justify-end mt-4">
                <el-button type="success"
                           class="uppercase"
                           style="width: 200px; height: 70px; font-size: larger"
                            @click="openModal">
                    Thanh Toán
                </el-button>
            </div>
        </div>
        <ModalPayment ref="refModalPayment" :order-details="tableData"/>
    </div>
</template>

<style lang="scss">
.header-cell-style {
    background-color: #dc2626 !important;
    color: white !important;
}
</style>