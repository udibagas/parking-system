import VueMask from "@devindex/vue-mask";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueMask);
});
