import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/rushxr-SDP/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        spot2: resolve(__dirname, 'spot2.html')
      }
    }
  }
})
