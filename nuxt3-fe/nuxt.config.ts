// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    devtools: { enabled: false },
    modules: ["@element-plus/nuxt", "@pinia/nuxt", "nuxt-auth-sanctum"],
    elementPlus: {},
    pinia: {
        storesDirs: ["./stores/**"],
    },
    css: ["@/assets/app.css"],

    plugins: ["@/plugins/mask.js"],

    runtimeConfig: {
        public: {
            apiBase: process.env.NUXT_PUBLIC_API_BASE,
            sanctum: {
                baseUrl: process.env.NUXT_PUBLIC_API_BASE,
                endpoints: {
                    login: "/api/login",
                    logout: "/api/logout",
                    user: "/api/me",
                },
                redirect: {
                    onLogout: "/login",
                },
                globalMiddleware: {
                    enabled: true,
                    allow404WithoutAuth: true,
                },
            },
        },
    },
});
