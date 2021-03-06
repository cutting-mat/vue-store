import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/**
 * 构建文档
*/
export default defineConfig({
  plugins: [vue()],
  base: '/vue-store/',
  build: {
    outDir: "docs"
  }
})
