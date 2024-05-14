<script setup>
import { reactive, ref } from 'vue'
import spaFetch from "~/plugins/fetch.js";
import {useAuthStore} from "~/stores/auth.js";

const props = defineProps({
    data: {
        type: Object,
        default: null
    },
    isUpdate: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits(['on-success'])

const {$apiUrl} = useNuxtApp()
const auth = useAuthStore()
const dialogFormVisible = ref(false)
const formRef = ref()
const loading = ref(false)
const title = ref("")

const formLabelWidth = '130px'

const form = reactive({
    "name": "",
    "img": "",
    "price": 0,
    "description": "",
    "quantity": 0,
    "type": ""
})

const rules = reactive({
    name: [
        {
            required: true,
            message: 'Vui lòng điền thông tin',
            trigger: 'blur',
        },
    ],
    img: [{
        required: true,
        message: 'Vui lòng điền thông tin',
        trigger: 'blur',
    }],
    type: [{
        required: true,
        message: 'Vui lòng điền thông tin',
        trigger: 'blur',
    }],
});

const openModal = () => {
    dialogFormVisible.value = true
}
const closeModal = () => {
    dialogFormVisible.value = false
    formRef.value.resetFields()
}

const submit = async () => {
    if (props.isUpdate) {
        await updateProduct()
    } else {
        await addProduct()
    }
}

const addProduct = async () => {
    await formRef.value.validate(async (valid, fields) => {
        if (valid) {
            loading.value = true
            spaFetch()($apiUrl.PRODUCT, {
                method: 'POST',
                body: {
                    ...form
                }
            }).then(res => {
                emits('on-success')
                loading.value = false
                dialogFormVisible.value = false
                ElMessage.success(
                    "Thêm thành công"
                )
            }).catch(error => {
                console.log("error", error.response)
                loading.value = false
                ElMessage.error(
                    "Thêm thất bại"
                )
            })
        }
    });
}

const updateProduct = async () => {
    await formRef.value.validate(async (valid, fields) => {
        if (valid) {
            loading.value = true
            spaFetch()(`${$apiUrl.PRODUCT}${form.id}/`, {
                method: 'PATCH',
                body: {
                    ...form
                }
            }).then(res => {
                emits('on-success')
                loading.value = false
                dialogFormVisible.value = false
                ElMessage.success(
                    "Cập nhât thành công"
                )
            }).catch(error => {
                console.log("error", error.response)
                loading.value = false
                ElMessage.error(
                    "Cập nhât thất bại"
                )
            })
        }
    });
}

const setFormState = (data) => {
    form.id = data.id
    form.name = data.name
    form.type = data.type
    form.price = data.price
    form.img = data.img
    form.quantity = data.quantity
    form.description = data.description
}

watch(dialogFormVisible, (value) => {
    if (!value) {
        formRef.value.resetFields()
        if (form.id) delete form.id
    }
})

watch(() => props.isUpdate, (value) => {
    if (!value) {
        title.value = "Thêm sản phẩm"
    } else {
        title.value = "Cập nhật sản phẩm"
    }
}, {immediate: true})

defineExpose({
    openModal,
    setFormState
})
</script>

<template>
    <el-dialog v-model="dialogFormVisible" :title="title" width="600">
        <el-form :model="form"
                 ref="formRef"
                 :rules="rules">
            <el-form-item prop="name" label="Tên sản phẩm" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item prop="type" label="Loại sản phẩm" :label-width="formLabelWidth">
                <el-input v-model="form.type" autocomplete="off" />
            </el-form-item>
            <el-form-item prop="img" label="Ảnh" :label-width="formLabelWidth">
                <el-input v-model="form.img" autocomplete="off" />
            </el-form-item>
            <el-form-item prop="price" label="Giá sản phẩm" :label-width="formLabelWidth">
                <el-input-number v-model="form.price" />
            </el-form-item>
            <el-form-item prop="quantity" label="Số lượng" :label-width="formLabelWidth">
                <el-input-number v-model="form.quantity" />
            </el-form-item>
            <el-form-item prop="description" label="Mô tả" :label-width="formLabelWidth">
                <el-input v-model="form.description"
                          type="textarea"
                          :autosize="{ minRows: 3, maxRows: 6 }"
                          autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="closeModal" >Huỷ</el-button>
                <el-button type="primary" @click="submit" :loading="loading">
                    Xác nhận
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<style lang="scss">

</style>