import {defineStore} from "pinia";

const userLocalStorage = () => {
    if (localStorage.getItem("user")) {
        // @ts-ignore
        return JSON.parse(localStorage.getItem("user"));
    }
    return null;
}

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            user: userLocalStorage(),
            quantityInCart: 0,
            accessToken: localStorage.getItem('accessToken') || null,
            refreshToken: localStorage.getItem('refreshToken') || null,
            search: ""
        }
    },
    getters: {
        getUser: state => state.user,
        getAccessToken: state => state.accessToken,
        getRefreshToken: state => state.refreshToken,
        getQuantityInCart: state => state.quantityInCart,
        getSearch: state => state.getSearch
    },
    actions: {
        setUser(data) {
            this.$state.user = data;
            localStorage.setItem("user", JSON.stringify(data));
        },
        setQuantityInCart(data){
            this.$state.quantityInCart = data;
        },
        setAccessToken(data) {
            this.$state.accessToken = data;
            localStorage.setItem("accessToken", JSON.stringify(data));
        },
        setRefreshToken(data) {
            this.$state.refreshToken = data;
            localStorage.setItem("refreshToken", JSON.stringify(data));
        },
        setSearch(data) {
            this.$state.search = data;
        },
        deleteAuth() {
            this.$state.user = null;
            this.$state.quantityInCart = 0;
            this.$state.accessToken = null;
            this.$state.refreshToken = null;
            this.$state.search = null;
            if (localStorage.getItem("user")) localStorage.removeItem("user");
            if (localStorage.getItem("accessToken")) localStorage.removeItem("accessToken");
            if (localStorage.getItem("refreshToken")) localStorage.removeItem("refreshToken");
        },
        resetCart(){
            this.$state.quantityInCart = 0;
        },
        resetSearch(){
            this.$state.search = "";
        }
    },
})
