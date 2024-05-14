<script setup>
import { reactive, ref } from 'vue'
import spaFetch from "~/plugins/fetch.js";
import {useAuthStore} from "~/stores/auth.js";

const props = defineProps({
    orderDetails: {
        type: Array,
        default: []
    }
})
const {$apiUrl} = useNuxtApp()
const auth = useAuthStore()
const dialogFormVisible = ref(false)
const formRef = ref()
const loading = ref(false)
const formLabelWidth = '200px'

const form = reactive({
    name: '',
    phone: '',
    address: '',
    method: '1',
})

const rules = reactive({
    name: [
        {
            required: true,
            message: 'Vui lòng điền thông tin',
            trigger: 'blur',
        },
    ],
    phone: [{
        required: true,
        message: 'Vui lòng điền thông tin',
        trigger: 'blur',
    }],
    address: [{
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
    await formRef.value.validate(async (valid, fields) => {
        if (valid) {
            loading.value = true
            spaFetch()($apiUrl.ORDER, {
                method: 'POST',
                body: {
                    "name": form.name,
                    "phone": form.phone,
                    "address": form.address,
                    "order_details": props.orderDetails.map(i => {
                        return {
                            product: i.idProduct,
                            quantity: i.quantityCart,
                        }
                    })
                }
            }).then(res => {
                deleteCart()
                ElMessage.success(
                    "Đặt hàng thành công"
                )
            }).catch(error => {
                console.log("error", error.response)
                loading.value = false
                ElMessage.error(
                    "Đặt hàng thất bại"
                )
            })
        }
    });
}

const deleteCart = () => {
    const id = auth.$state.user && auth.$state.user.cart ? auth.$state.user.cart : null
    spaFetch()(`${$apiUrl.CART}${id}/`, {
        method: 'DELETE',
    }).then(res => {
        loading.value = false
        window.location.reload()
    }).catch(error => {
        console.log("error", error.response)
    })
}
watch(dialogFormVisible, (value) => {
    if (!value) {
        formRef.value.resetFields()
    }
})
defineExpose({
    openModal
})
</script>

<template>
    <el-dialog v-model="dialogFormVisible" title="Thông tin thanh toán" width="600">
        <el-form :model="form"
                    ref="formRef"
                    :rules="rules">
            <el-form-item prop="name" label="Họ và tên " :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item prop="phone" label="Số điện thoại " :label-width="formLabelWidth">
                <el-input v-model="form.phone" autocomplete="off" />
            </el-form-item>
            <el-form-item prop="address" label="Địa chỉ giao hàng " :label-width="formLabelWidth">
                <el-input v-model="form.address" autocomplete="off" />
            </el-form-item>
            <el-form-item prop="method" label="Phương thức thanh toán" :label-width="formLabelWidth">
                <el-radio-group v-model="form.method" class="flex flex-col" style="align-items: start">
                    <el-radio label="1" size="large">Thanh toán khi nhận hàng</el-radio>
                    <el-radio disabled label="2" size="large">Thanh toán qua ngân hàng</el-radio>
                </el-radio-group>
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