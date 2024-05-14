// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: false },
  app: {
    head: {
      link: [
        {rel: "stylesheet", href: "https://www.w3schools.com/w3css/4/w3.css"}
      ],
      script: [
        {
          type: "text/javascript",
          src: 'http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js'
        },
        {
          type: "text/javascript",
          src: 'https://cdn.rawgit.com/igorlino/elevatezoom-plus/1.1.6/src/jquery.ez-plus.js'
        }
      ]
    }
  },
  modules: ['@nuxtjs/tailwindcss', '@element-plus/nuxt', "@pinia/nuxt"],
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      baseURL: 'http://127.0.0.1:8000'
      // baseURL: 'https://2875-104-28-254-74.ngrok-free.app'
    }
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.scss',
  },
  css: ["/assets/css/tailwind.scss"],
  plugins: [
    { src: "~/plugins/jquery", mode: "client" },
  ],

})
