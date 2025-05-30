import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    tailwindcss(),
    Components({
      resolvers: [
        PrimeVueResolver({
          components: {
            prefix: 'Prime',
          },
        }),
      ],
    }),
    AutoImport({
      imports: [
        'vue', // ref, reactive, computed, etc.
        'vue-router', // useRouter, useRoute
        'pinia', // defineStore, storeToRefs (if using Pinia)
      ],
      dts: 'src/auto-imports.d.ts', // Generates types for IntelliSense
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
