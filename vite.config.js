const path = require('path')
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

/**
 * 构建 lib
 * */
export default defineConfig({
  optimizeDeps: {
    exclude: ['vue-demi']
  },
  plugins: [createVuePlugin()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/store.js'),
      name: 'store',
      fileName: (format) => `main.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})

/**
 * 构建文档
*/
// export default defineConfig({
//   plugins: [createVuePlugin()],
//   build: {
//     outDir: "docs"
//   }
// })