const path = require('path')
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/**
 * 构建 lib
 * */ 
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/store.js'),
      name: 'VueStore',
      fileName: (format) => `store.${format}.js`
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
//   plugins: [vue()],
//   build: {
//     outDir: "docs",
//     rollupOptions: {
//       output: {
//         manualChunks(id) {
//           if (id.includes('element-plus')) {
//             return 'element-plus';
//           } else if (id.includes('node_modules')) {
//             return 'vendor';
//           }
//         }
//       }
//     }
//   }
// })