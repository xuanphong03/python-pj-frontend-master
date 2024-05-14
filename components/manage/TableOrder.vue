<script setup>
import {ref} from 'vue'
import spaFetch from "~/plugins/fetch.js";
import { Search } from "@element-plus/icons-vue"
import ModalDetailCart from "~/components/manage/ModalDetailCart.vue";

const {$apiUrl} = useNuxtApp()

const tableData = ref([])
const loading = ref(false)
const refModalDetailCart = ref()
const search = ref("")

const getOrder = () => {
    loading.value = true
    spaFetch()($apiUrl.ORDER, {
        method: 'GET',
        params:{
            ordering: '-created_at',
            search: search.value,
            query_all: true,
        }
    }).then(res => {
        tableData.value = res.map((item, index) =>{
            return {
                stt: index + 1,
                ...item,
            }
        })
        loading.value = false
    }).catch( error => {
        loading.value = false
        console.log("error", error.response)
    })
}

const openModal = (item) => {
    refModalDetailCart.value.openModal()
    refModalDetailCart.value.setTableData(item)
}

getOrder()

watch(search, () => {
    setTimeout(() => {
        getOrder()
    }, 200)
})
</script>

<template>
    <div class="h-full flex flex-col gap-x-2 p-4">
        <div class="uppercase font-semibold text-2xl">
            Danh sách sản phẩm
        </div>
        <div class="w-full py-4 flex justify-between items-center">
            <el-input
                v-model="search"
                placeholder="Nhập nội dung tìm kiếm"
                :prefix-icon="Search"
                style="width: 400px"
            />
        </div>
        <el-table v-loading="loading" border :data="tableData"
                  height="500"
                  style="width: 100%">
            <el-table-column prop="stt" label="STT" width="80"></el-table-column>
            <el-table-column prop="name" label="Họ và tên" width="250"/>
            <el-table-column prop="phone" label="Số điện thoại đặt hàng" width="250"/>
            <el-table-column prop="address" label="Địa chỉ giao hàng" width="250"/>
            <el-table-column prop="total_amount" label="Tổng giá trị đơn hàng" width="250"/>
            <el-table-column label="Phương thức thanh toán" width="250">
                Thanh toán khi nhận hàng
            </el-table-column>
            <el-table-column fixed="right" label="Hành động" width="250">
                <template #default="scope">
                    <el-button type="primary"
                               size="small"
                               @click="openModal(scope.row)">
                        Chi tiết đơn hàng
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <span class="text-right mt-4 text-lg">
            Tổng số đơn hàng: {{tableData.length}}
        </span>
        <ModalDetailCart ref="refModalDetailCart"/>
    </div>
</template>

<style scoped>

</style>