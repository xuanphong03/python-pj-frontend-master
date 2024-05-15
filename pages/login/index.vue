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
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="flex bg-white shadow-md rounded-lg overflow-hidden" style="max-width: 2000px;"> <!-- Adjusted max width here -->
            <!-- Hình ảnh bên cạnh -->
            <div class="hidden md:flex md:w-full h-full image-container">
        <img src="https://i.pinimg.com/564x/eb/99/03/eb9903edf95a3ba63be54e45cf53ad3a.jpg" alt="Background Image">
    </div>
            <!-- Form đăng nhập -->
            <div class="w-full md:w-full p-16 space-y-8 flex flex-col justify-center " > <!-- Adjusted padding and flex classes -->
                <h1 class="text-3xl font-bold text-center uppercase">Đăng nhập</h1>
                <el-form ref="form" :rules="rules" label-position="top" :model="formLabelAlign">
                    <el-form-item prop="username" label="Tài khoản">
                        <el-input v-model="formLabelAlign.username" @keypress.enter="handleLogin" />
                    </el-form-item>
                    <el-form-item prop="password" label="Mật khẩu">
                        <el-input v-model="formLabelAlign.password" type="password" @keypress.enter="handleLogin" show-password />
                    </el-form-item>
                <el-form-item>
                    <div class="w-full flex items-center justify-between">
                        <div class="flex items-center gap-x-1 text-sm">
                            Chưa tạo tài khoản? <nuxt-link to="/register" class="cursor-pointer text-blue-500 hover:underline"> Đăng ký    </nuxt-link>
                        </div>
                        <div>__</div>
                        <a href="#" class="text-sm text-blue-500 hover:underline"> Quên mật khẩu? </a>
                    </div>
                </el-form-item>
                    <el-button type="primary" class="w-full py-3 text-white rounded-md" @click="handleLogin" :loading="loading">Đăng nhập</el-button>
                </el-form>
                <div class="relative pt-4">
                    <div class="flex justify-center">
                        <span class="px-2 text-sm text-gray-500 bg-white"> Hoặc đăng nhập với </span>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button class="flex items-center justify-center w-full text-sm font-medium text-gray-600 rounded-md">
                        <img alt="svgImg" class="w-8 h-8 mr-2" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCI+CjxwYXRoIGZpbGw9IiNmYmMwMmQiIGQ9Ik00My42MTEsMjAuMDgzSDQyVjIwSDI0djhoMTEuMzAzYy0xLjY0OSw0LjY1Ny02LjA4LDgtMTEuMzAzLDhjLTYuNjI3LDAtMTItNS4zNzMtMTItMTIJczUuMzczLTEyLDEyLTEyYzMuMDU5LDAsNS44NDIsMS4xNTQsNy45NjEsMy4wMzlsNS42NTctNS42NTdDMzQuMDQ2LDYuMDUzLDI5LjI2OCw0LDI0LDRDMTIuOTU1LDQsNCwxMi45NTUsNCwyNHM4Ljk1NSwyMCwyMCwyMAlzMjAtOC45NTUsMjAtMjBDNDQsMjIuNjU5LDQzLjg2MiwyMS4zNSw0My42MTEsMjAuMDgzeiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNlNTM5MzUiIGQ9Ik02LjMwNiwxNC42OTFsNi41NzEsNC44MTlDMTQuNjU1LDE1LjEwOCwxOC45NjEsMTIsMjQsMTJjMy4wNTksMCw1Ljg0MiwxLjE1NCw3Ljk2MSwzLjAzOQlsNS42NTctNS42NTdDMzQuMDQ2LDYuMDUzLDI5LjI2OCw0LDI0LDRDMTYuMzE4LDQsOS42NTYsOC4zMzcsNi4zMDYsMTQuNjkxeiI+PC9wYXRoPjxwYXRoIGZpbGw9IiM0Y2FmNTAiIGQ9Ik0yNCw0NGM1LjE2NiwwLDkuODYtMS45NzcsMTMuNDA5LTUuMTkybC02LjE5LTUuMjM4QzI5LjIxMSwzNS4wOTEsMjYuNzE1LDM2LDI0LDM2CWMtNS4yMDIsMC05LjYxOS0zLjMxNy0xMS4yODMtNy45NDZsLTYuNTIyLDUuMDI1QzkuNTA1LDM5LjU1NiwxNi4yMjcsNDQsMjQsNDR6Ij48L3BhdGg+PHBhdGggZmlsbD0iIzE1NjVjMCIgZD0iTTQzLjYxMSwyMC4wODNMNDMuNTk1LDIwTDQyLDIwSDI0djhoMTEuMzAzYy0wLjc5MiwyLjIzNy0yLjIzMSw0LjE2Ni00LjA4Nyw1LjU3MQljMC4wMDEtMC4wMDEsMC4wMDItMC4wMDEsMC4wMDMtMC4wMDJsNi4xOSw1LjIzOEMzNi45NzEsMzkuMjA1LDQ0LDM0LDQ0LDI0QzQ0LDIyLjY1OSw0My44NjIsMjEuMzUsNDMuNjExLDIwLjA4M3oiPjwvcGF0aD4KPC9zdmc+"/>
                    </button>
                    <button class="flex items-center justify-center w-full text-sm font-medium text-gray-600 rounded-md">
                        <img alt="Facebook Logo" class="w-8 h- mr-2" src="data:image/png;base64,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"/>

                    </button>
                    <button class="flex items-center justify-center w-full text-sm font-medium text-gray-600 rounded-md">
                        <img alt="GitHub Logo" class="w-8 h-8 mr-2" src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png"/>
                    </button>
                </div>
                <!-- <el-button class="flex items-center justify-center w-full text-sm font-medium text-gray-600 rounded-md">
                <img alt="svgImg" class="w-7 h-7 mr-2" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCI+CjxwYXRoIGZpbGw9IiNmYmMwMmQiIGQ9Ik00My42MTEsMjAuMDgzSDQyVjIwSDI0djhoMTEuMzAzYy0xLjY0OSw0LjY1Ny02LjA4LDgtMTEuMzAzLDhjLTYuNjI3LDAtMTItNS4zNzMtMTItMTIJczUuMzczLTEyLDEyLTEyYzMuMDU5LDAsNS44NDIsMS4xNTQsNy45NjEsMy4wMzlsNS42NTctNS42NTdDMzQuMDQ2LDYuMDUzLDI5LjI2OCw0LDI0LDRDMTIuOTU1LDQsNCwxMi45NTUsNCwyNHM4Ljk1NSwyMCwyMCwyMAlzMjAtOC45NTUsMjAtMjBDNDQsMjIuNjU5LDQzLjg2MiwyMS4zNSw0My42MTEsMjAuMDgzeiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNlNTM5MzUiIGQ9Ik02LjMwNiwxNC42OTFsNi41NzEsNC44MTlDMTQuNjU1LDE1LjEwOCwxOC45NjEsMTIsMjQsMTJjMy4wNTksMCw1Ljg0MiwxLjE1NCw3Ljk2MSwzLjAzOQlsNS42NTctNS42NTdDMzQuMDQ2LDYuMDUzLDI5LjI2OCw0LDI0LDRDMTYuMzE4LDQsOS42NTYsOC4zMzcsNi4zMDYsMTQuNjkxeiI+PC9wYXRoPjxwYXRoIGZpbGw9IiM0Y2FmNTAiIGQ9Ik0yNCw0NGM1LjE2NiwwLDkuODYtMS45NzcsMTMuNDA5LTUuMTkybC02LjE5LTUuMjM4QzI5LjIxMSwzNS4wOTEsMjYuNzE1LDM2LDI0LDM2CWMtNS4yMDIsMC05LjYxOS0zLjMxNy0xMS4yODMtNy45NDZsLTYuNTIyLDUuMDI1QzkuNTA1LDM5LjU1NiwxNi4yMjcsNDQsMjQsNDR6Ij48L3BhdGg+PHBhdGggZmlsbD0iIzE1NjVjMCIgZD0iTTQzLjYxMSwyMC4wODNMNDMuNTk1LDIwTDQyLDIwSDI0djhoMTEuMzAzYy0wLjc5MiwyLjIzNy0yLjIzMSw0LjE2Ni00LjA4Nyw1LjU3MQljMC4wMDEtMC4wMDEsMC4wMDItMC4wMDEsMC4wMDMtMC4wMDJsNi4xOSw1LjIzOEMzNi45NzEsMzkuMjA1LDQ0LDM0LDQ0LDI0QzQ0LDIyLjY1OSw0My44NjIsMjEuMzUsNDMuNjExLDIwLjA4M3oiPjwvcGF0aD4KPC9zdmc+"/>
                <span>Sign in with Google</span>
            </el-button>
                        <el-button class="flex items-center justify-center w-full text-sm font-medium text-gray-600 rounded-md">
                <img alt="Facebook Logo" class="w-5 h-5 mr-2" src="data:image/png;base64,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"/>
                <span>Sign in with Facebook</span>
            </el-button>
            <el-button class="flex items-center w-full text-sm font-medium text-gray-600 rounded-md">
                <img alt="GitHub Logo" class="w-5 h-5 mr-2" src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_1280.png"/>
                <span>Sign in with GitHub</span>
            </el-button> -->
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.image-container {
            padding: 15px;
            height: 100%; /* Đảm bảo ảnh chiếm toàn bộ chiều cao phần tử chứa */
            width: 100%;  /* Đảm bảo ảnh chiếm toàn bộ chiều rộng phần tử chứa */
            object-fit: cover; /* Đảm bảo ảnh được cắt đúng */
            box-sizing: border-box; /* Đảm bảo padding không làm tăng kích thước tổng thể của ảnh */
        }
.bg-cover {
  background-size: cover;
  background-position: center;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hidden {
  display: none;
}

.md\:flex {
  @media (min-width: 768px) {
    display: flex;
  }
}

.object-cover {
  object-fit: cover;
}

.shadow-md {
  box-shadow: 0 45px 45px rgba(0, 0, 0, 0.1);
}

.rounded-lg {
  border-radius: 0.5rem;
}

.overflow-hidden {
  overflow: hidden;
}

.text-center {
  text-align: center;
}

.text-3xl {
  font-size: 1.875rem;
}

.font-bold {
  font-weight: 700;
}

.uppercase {
  text-transform: uppercase;
}

.space-y-8 > * + * {
  margin-top: 2rem;
}

.w-full {
  width: 100%;
}

.p-16 {
  padding: 4rem;
}

.pt-4 {
  padding-top: 1rem;
}

.text-white {
  color: #fff;
}

.bg-white {
  background-color: #fff;
}

.text-gray-500 {
  color: #6b7280;
}

.text-blue-500 {
  color: #3b82f6;
}

.text-gray-600 {
  color: #4b5563;
}

.hover\:underline:hover {
  text-decoration: underline;
}

.cursor-pointer {
  cursor: pointer;
}

.rounded-md {
  border-radius: 0.375rem;
}

.el-button.primary {
  background-color: #409eff;
  border-color: #409eff;
}

.el-button.primary:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
}

.el-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}

.el-button > img {
  margin-right: 0.5rem;
}
</style>


<!-- <template>
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
</template> -->
