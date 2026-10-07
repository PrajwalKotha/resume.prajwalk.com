import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // the resume at / and the talking 3D page at /3d
      input: {
        main: resolve(__dirname, 'index.html'),
        '3d': resolve(__dirname, '3d/index.html'),
      },
    },
  },
})
