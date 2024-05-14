<script setup>
import {ref } from 'vue'
import {useAuthStore} from "~/stores/auth.js";

const dialogFormVisible = ref(false)
const tableData = ref([])
const auth = useAuthStore()
const headerRowStyle = () => {
    return "header-cell-style";
}

const setTableData = (data) => {
    tableData.value = data.order_details.map((item, index) => {
        return {
            quantityOrderDetail: item.quantity,
            priceOrderDetail: item.product.price * item.quantity,
            stt: index + 1,
            ...item.product
        }
    })
}
const openModal = () => {
    dialogFormVisible.value = true
}
const closeModal = () => {
    dialogFormVisible.value = false
}
defineExpose({
    openModal,
    setTableData
})

</script>

<template>
    <el-dialog v-model="dialogFormVisible" title="Thông tin giỏ hàng" width="1500">
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
                    <el-table-column prop="quantityOrderDetail" label="Số lượng"/>
                    <el-table-column prop="priceOrderDetail" label="Đơn giá"/>
                </el-table>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="closeModal" >Huỷ</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<style lang="scss">

</style>