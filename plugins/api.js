const apiUrl = {
    // auth
    LOGIN: '/api/login/',
    REGISTER: '/api/register/',
    USER: '/api/user/',

    // product
    PRODUCT: '/api/product/',

    //cart
    CART: '/api/cart/',

    //cartItem
    CART_ITEM: '/api/cart-item/',

    //order
    ORDER: '/api/order/',

}
export default defineNuxtPlugin(nuxtApp => {
    return {
        provide: {
            apiUrl: apiUrl
        }
    }
})


