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

const getOrder = () => {
    spaFetch()($apiUrl.ORDER, {
        method: 'GET',
        params: {
            user: auth.$state.user && auth.$state.user.id ? auth.$state.user.id : null,
            pageSize: 20
        }
    }).then(res => {
        tableData.value = res.results.map((item, index) => {
            return {
                stt: index + 1,
                ...item,
            }
        })
        // console.table(tableData.value)
    }).catch(error => {
        console.log("error", error.response)
    })
}

const deleteOrder = (item) => {
    spaFetch()(`${$apiUrl.ORDER}${item.id}/`, {
        method: 'DELETE',
    }).then(res => {

        tableData.value = tableData.value.filter(i => i.id !== item.id)
        ElMessage.success(
            "Huỷ đơn hàng thảnh công"
        )
    }).catch(error => {
        console.log("error", error.response)
        ElMessage.error(
            "Huỷ đơn hàng thất bại"
        )
    })
}

getOrder()

</script>

<template>
    <div class="w-full flex items-center justify-center">
        <div class="w-4/5 mt-4">
            <el-table :data="tableData"
                      height="500"
                      style="width: 100%"
                      :header-cell-class-name="headerRowStyle">
                <el-table-column prop="stt" label="STT" width="80"></el-table-column>
                <el-table-column prop="name" label="Họ và tên" width="180"/>
                <el-table-column prop="phone" label="Số điện thoại đặt hàng"/>
                <el-table-column prop="address" label="Địa chỉ giao hàng"/>
                <el-table-column prop="total_amount" label="Tổng giá trị đơn hàng"/>
                <el-table-column label="Phương thức thanh toán">
                    Thanh toán khi nhận hàng
                </el-table-column>
                <el-table-column>
                    <template #default="prop">
                        <el-button type="danger" class="uppercase" @click="deleteOrder(prop.row)"> Huỷ đơn hàng </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<style lang="scss">
.header-cell-style {
    background-color: #dc2626 !important;
    color: white !important;
}
</style>