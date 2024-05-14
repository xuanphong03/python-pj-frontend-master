<script setup >
definePageMeta({
    layout: "custom"
})
import {useAuthStore} from "~/stores/auth.js";


const auth = useAuthStore()
const { $apiUrl } = useNuxtApp()
const config = useRuntimeConfig();
const router = useRouter()

const form = ref();
const loading = ref(false);

const formLabelAlign = reactive({
    username: '',
    password: '',
})

const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('Vui lòng nhập mật khẩu!'))
    } else {
        callback()
    }
}

const validateUsername = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('Vui lòng nhập tài khoản!'))
    } else {
        callback()
    }
}

const rules = reactive({
    username: [{
            trigger: 'blur',
            validator: validateUsername,
        }],
    password: [{
        trigger: 'blur',
        validator: validatePass,
    }],
});


const handleLogin = async () => {
    await form.value.validate(async (valid, fields) => {
        if (valid) {
            loading.value = true
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const raw = JSON.stringify({
                "username": formLabelAlign.username,
                "password": formLabelAlign.password
            });
            fetch(config.public.baseURL+$apiUrl.LOGIN,{
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            }).then( async res => {
                loading.value = false
                const result = await res.json()
                if (res.ok) {
                    auth.setAccessToken(result.access)
                    auth.setRefreshToken(result.refresh)
                    auth.setUser(result.user)
                    if (result.user.is_superuser) await router.push('/manage')
                    else await router.push('/')
                }
                else {
                    console.log("error", result)
                    ElMessage.error(
                        "Tài khoản hoặc mật khẩu không chính xác!"
                    )
                }
            })
        }
    });
};

auth.deleteAuth()
</script>

<template>
    <div class="flex items-center min-h-screen bg-gray-100 bg-[url('https://www.bandai.com/media/magefan_blog/HBXbanner_Videosize_1920x1080.jpg')] bg-cover">
        <div class="w-full max-w-md p-8 space-y-6 rounded-xl bg-white shadow-md ml-72 mb-80">
            <h1 class="text-2xl font-bold text-center uppercase">Đăng nhập</h1>
            <el-form
                ref="form"
                :rules="rules"
                label-position="top"
                :model="formLabelAlign"
            >
                <el-form-item prop="username"
                              label="Tài khoản">
                    <el-input v-model="formLabelAlign.username"
                              @keypress.enter="handleLogin"/>
                </el-form-item>
                <el-form-item prop="password" label="Mật khẩu">
                    <el-input v-model="formLabelAlign.password"
                              type="password"
                              @keypress.enter="handleLogin"
                              show-password/>
                </el-form-item>
                <el-form-item>
                    <div class="w-full flex items-center justify-between">
                        <div class="flex items-center gap-x-1 text-sm">
                            Chưa có tài khoản? <nuxt-link to="/register" class="cursor-pointer text-blue-500 hover:underline"> Đăng ký </nuxt-link>
                        </div>
                        <a href="#" class="text-sm text-blue-500 hover:underline"> Quên mật khẩu? </a>
                    </div>
                </el-form-item>
                <el-button
                    type="primary"
                    class="w-full py-2 text-white rounded-md"
                    @click="handleLogin"
                    :loading="loading">
                    Đăng nhập
                </el-button>
            </el-form>
            <div class="relative pt-1">
                <div class="flex justify-center">
                  <span class="px-2 text-sm text-gray-500 bg-white"> Hoặc đăng nhập với </span>
                </div>
            </div>
            <el-button class="flex items-center justify-center w-full text-sm font-medium text-gray-600 rounded-md">
                <img alt="svgImg" class="w-7 h-7 mr-2" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCI+CjxwYXRoIGZpbGw9IiNmYmMwMmQiIGQ9Ik00My42MTEsMjAuMDgzSDQyVjIwSDI0djhoMTEuMzAzYy0xLjY0OSw0LjY1Ny02LjA4LDgtMTEuMzAzLDhjLTYuNjI3LDAtMTItNS4zNzMtMTItMTIJczUuMzczLTEyLDEyLTEyYzMuMDU5LDAsNS44NDIsMS4xNTQsNy45NjEsMy4wMzlsNS42NTctNS42NTdDMzQuMDQ2LDYuMDUzLDI5LjI2OCw0LDI0LDRDMTIuOTU1LDQsNCwxMi45NTUsNCwyNHM4Ljk1NSwyMCwyMCwyMAlzMjAtOC45NTUsMjAtMjBDNDQsMjIuNjU5LDQzLjg2MiwyMS4zNSw0My42MTEsMjAuMDgzeiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNlNTM5MzUiIGQ9Ik02LjMwNiwxNC42OTFsNi41NzEsNC44MTlDMTQuNjU1LDE1LjEwOCwxOC45NjEsMTIsMjQsMTJjMy4wNTksMCw1Ljg0MiwxLjE1NCw3Ljk2MSwzLjAzOQlsNS42NTctNS42NTdDMzQuMDQ2LDYuMDUzLDI5LjI2OCw0LDI0LDRDMTYuMzE4LDQsOS42NTYsOC4zMzcsNi4zMDYsMTQuNjkxeiI+PC9wYXRoPjxwYXRoIGZpbGw9IiM0Y2FmNTAiIGQ9Ik0yNCw0NGM1LjE2NiwwLDkuODYtMS45NzcsMTMuNDA5LTUuMTkybC02LjE5LTUuMjM4QzI5LjIxMSwzNS4wOTEsMjYuNzE1LDM2LDI0LDM2CWMtNS4yMDIsMC05LjYxOS0zLjMxNy0xMS4yODMtNy45NDZsLTYuNTIyLDUuMDI1QzkuNTA1LDM5LjU1NiwxNi4yMjcsNDQsMjQsNDR6Ij48L3BhdGg+PHBhdGggZmlsbD0iIzE1NjVjMCIgZD0iTTQzLjYxMSwyMC4wODNMNDMuNTk1LDIwTDQyLDIwSDI0djhoMTEuMzAzYy0wLjc5MiwyLjIzNy0yLjIzMSw0LjE2Ni00LjA4Nyw1LjU3MQljMC4wMDEtMC4wMDEsMC4wMDItMC4wMDEsMC4wMDMtMC4wMDJsNi4xOSw1LjIzOEMzNi45NzEsMzkuMjA1LDQ0LDM0LDQ0LDI0QzQ0LDIyLjY1OSw0My44NjIsMjEuMzUsNDMuNjExLDIwLjA4M3oiPjwvcGF0aD4KPC9zdmc+"/>
                <span>Sign in with Google</span>
            </el-button>
        </div>
    </div>
</template>

<style lang="scss">

</style>