<script setup>
import {ref} from 'vue'
import spaFetch from "~/plugins/fetch.js";
import { Search } from "@element-plus/icons-vue"

const {$apiUrl} = useNuxtApp()

const tableData = ref([])
const loading = ref(false)
const search = ref("")

const getUser = () => {
    loading.value = true
    spaFetch()($apiUrl.USER, {
        method: 'GET',
        params:{
            ordering: '-date_joined',
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

getUser()

watch(search, () => {
    setTimeout(() => {
        getUser()
    }, 200)
})
</script>

<template>
    <div class="h-full flex flex-col gap-x-2 p-4">
        <div class="uppercase font-semibold text-2xl">
            Danh sách tài khoản
        </div>
        <div class="search-container">
            <el-input
            v-model="search"
            placeholder="Tìm kiếm sản phẩm"
            :prefix-icon="Search"
            class="search-input custom-input"
            />
        </div>
        <el-table v-loading="loading" border :data="tableData"
                  height="500"
                  style="width: 100%">
            <el-table-column prop="stt" label="STT" width="80"></el-table-column>
            <el-table-column prop="username" label="Tài khoản" width="520"/>
            <el-table-column prop="is_superuser" label="Vai trò" width="520">
                <template #default="scope">
                    <div>
                        {{scope.row.is_superuser ? 'Quản trị viên' : 'Người dùng'}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="is_active" label="Trạng thái" width="520">
                <template #default="scope">
                    <div>
                        {{scope.row.is_active ? 'Hoạt động' : 'Chặn'}}
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <span class="text-right mt-4 text-lg">
            Tổng số tài khoản: {{tableData.length}}
        </span>
    </div>
</template>

<style scoped>
.search-container {
  display: flex;
  align-items: center;
  gap: 10px; /* Adjust the gap between the input and the button */
  padding: 10px 0; /* Adjust the padding as needed */
}
</style>