import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: "2024-10-18",
  ssr: false,
  modules: [
    '@primevue/nuxt-module'
  ],
  primevue: {
    options: {
      theme: {
        preset: Aura
      }
    }
  }
})