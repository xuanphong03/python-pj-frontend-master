// export default defineNuxtPlugin(({ ssrContext }) => {



    const spaFetch = (useHeader = true) => {
        const token = localStorage.getItem('accessToken') || '""'
        const headers = {
            Authorization: `Bearer ${JSON.parse(token)}`, 
            "ngrok-skip-browser-warning": "true"
        }
        return $fetch.create({
            baseURL: 'http://127.0.0.1:8000',
            // baseURL: ' https://2875-104-28-254-74.ngrok-free.app',
            // headers: useHeader ? headers : {},
            headers: useHeader ? {
                Authorization: `Bearer ${JSON.parse(token)}`,
                "ngrok-skip-browser-warning": true
            } : {
                "ngrok-skip-browser-warning": true
            },
            async onResponse(response) {
                // loadStores.setLoading(false)
            },
            async onRequest(response) {
                // if(authStores.$state.token && authStores.$state.token.token)
                // {
                //     header.Authorization = "Bearer " + authStores.$state.token.token
                // }
                // if(window.token)
                // {
                //     header.Authorization = "Bearer " + window.token
                // }
                // loadStores.setLoading(this.loading == false ? false : true)

            },
            async onRequestError({ response }) {
                // loadStores.setLoading(false)
            },
            async onResponseError({ response }) {
                // loadStores.setLoading(false)
            },
        })
    }
export default spaFetch
// });
