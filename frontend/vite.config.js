import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/download': {
        target: 'https://backend-youtubeh264.onrender.com',
        changeOrigin: true,
        secure: false,
      },
      '/file': {
        target: 'https://backend-youtubeh264.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
