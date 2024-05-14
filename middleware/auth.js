import {useAuthStore} from "~/stores/auth.js";
export default defineNuxtRouteMiddleware ((to, from) => {
    const auth = useAuthStore()
    if (auth.$state.accessToken && auth.$state.refreshToken && auth.$state.user && auth.$state.user.is_superuser) {
        return
    }
    return navigateTo("/")
})