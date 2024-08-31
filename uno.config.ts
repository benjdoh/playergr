import { defineConfig, presetUno, transformerCompileClass, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  presets: [presetUno()],
  transformers: [transformerCompileClass(), transformerDirectives(), transformerVariantGroup()],
})
