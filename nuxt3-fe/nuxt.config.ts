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

    runtimeConfig: {
        public: {
            sanctum: {
                baseUrl:
                    process.env.NUXT_PUBLIC_SANCTUM_BASE_URL ||
                    "http://localhost:9000", // Laravel API
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
