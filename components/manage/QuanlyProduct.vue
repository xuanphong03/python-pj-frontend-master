<script setup>
import {ref} from 'vue'
import spaFetch from "~/plugins/fetch.js";
import CreateOrUpdateProduct from "~/components/manage/CreateOrUpdateProduct.vue";
import { Search } from "@element-plus/icons-vue"

const {$apiUrl} = useNuxtApp()

const tableData = ref([])
const loading = ref(false)
const isUpdate = ref(false)
const refCreateOrUpdateModal = ref()
const search = ref("")

const getProducts = () => {
    loading.value = true
    spaFetch()($apiUrl.PRODUCT, {
        method: 'GET',
        params:{
            ordering: '-creation_time',
            search: search.value,
            query_all: true,
        }
    }).then(res => {
        tableData.value = res.map((item, index) =>{
            return {
                stt: index + 1,
                ...item,
                status: item.type
            }
        })
        loading.value = false
    }).catch( error => {
        loading.value = false
        console.log("error", error.response)
    })
}

const handleAdd = () => {
    isUpdate.value = false
    refCreateOrUpdateModal.value.openModal()
}

const handleEdit = (item) => {
    isUpdate.value = true
    refCreateOrUpdateModal.value.openModal()
    refCreateOrUpdateModal.value.setFormState(item)
}

const deleteRow = (item) => {
    loading.value = true
    spaFetch()(`${$apiUrl.PRODUCT}${item.id}/`, {
        method: 'DELETE',
    }).then(res => {
        tableData.value = tableData.value.filter(x => x.id !== item.id)
        loading.value = false
        ElMessage.success(
            "Xóa thành công"
        )
    }).catch(error => {
        console.log("error", error.response)
        loading.value = false
        ElMessage.error(
            "Xóa thất bại"
        )
    })
}

const handleSuccess = () => {
    search.value = ''
    getProducts()
}

getProducts()

watch(search, () => {
    setTimeout(() => {
        getProducts()
    }, 200)
})
</script>

<template>
    <div class="h-full flex flex-col gap-x-2 p-4">
        <div class="uppercase font-semibold text-2xl">
            Danh sách sản phẩm
        </div>
        <div class="search-container">
            <el-input
            v-model="search"
            placeholder="Tìm kiếm sản phẩm"
            :prefix-icon="Search"
            class="search-input custom-input"
            />
            <el-button type="success" @click="handleAdd" class="add-button custom-button">+ Thêm</el-button>
        </div>
        <el-table v-loading="loading" :data="tableData" max-height="700" border>
            <el-table-column prop="stt" label="STT" width="80"/>
            <el-table-column prop="img" label="Hình ảnh" width="200">
                <template #default="prop">
                    <img :src="prop.row.img" alt="">
                </template>
            </el-table-column>
            <el-table-column prop="name" label="Tên sản phẩm" width="250"/>
            <el-table-column prop="type" label="Loại sản phẩm" width="160"/>
            <el-table-column prop="quantity" label="Số lượng tồn kho" width="200"/>
            <el-table-column prop="price" label="Giá thành" width="200"/>
            <el-table-column prop="description" label="Mô tả" width="400"/>
            <el-table-column fixed="right" label="Hành động" width="120">
                <template #default="scope">
                    <el-button link
                               type="primary"
                               size="large"
                               @click.prevent="handleEdit(scope.row)">
                        Thay đổi
                    </el-button>
                    <el-popconfirm title="Bạn có chắc chắn muốn xoá sản phẩm này?"
                                   width="220"
                                   @confirm="deleteRow(scope.row)">
                        <template #reference>
                            <el-button link
                                       type="danger"
                                       size="large">
                                Xoá
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <span class="text-right mt-4 text-lg">
            Thống kế số lượng sản phẩm: {{tableData.length}}
        </span>
        <CreateOrUpdateProduct ref="refCreateOrUpdateModal" :is-update="isUpdate" @on-success="handleSuccess"/>
    </div>
</template>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
  gap: 10px; /* Adjust the gap between the input and the button */
  padding: 10px 0; /* Adjust the padding as needed */
}

.search-input {
  flex: 1;
}

.add-button {
  white-space: nowrap; /* Prevents text from wrapping */
}

.custom-input ::v-deep(.el-input__inner) {
  background-color: #f0f8ff; /* Light blue background */
  border-color: #1e90ff; /* Dodger blue border */
  color: #333; /* Text color */
}

.custom-input ::v-deep(.el-input__inner::placeholder) {
  color: #aaa; /* Placeholder color */
}

.custom-button {
  background-color: #1e90ff; /* Dodger blue background */
  border-color: #1e90ff; /* Border color */
  color: #fff; /* Text color */
}

.custom-button:hover {
  background-color: #1c86ee; /* Slightly darker blue on hover */
  border-color: #1c86ee; /* Border color on hover */
}
</style>