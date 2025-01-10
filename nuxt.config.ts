import {
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/fonts", "@nuxt/icon", "@unocss/nuxt", "@pinia/nuxt"],
  css: ["@unocss/reset/tailwind.css"],
  compatibilityDate: "2024-08-26",
  unocss: {
    theme: {
      fontFamily: {
        inter: ["Inter"],
      },
    },
    transformers: [
      transformerCompileClass(),
      transformerDirectives(),
      transformerVariantGroup(),
    ],
  },
});
