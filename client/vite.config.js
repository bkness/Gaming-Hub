import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002,
    open: true,
    proxy: {
      '/graphql': {
        target: 'https://video-game-hub-project3.onrender.com',
        secure: false,
        changeOrigin: true
      }
    }
  }
})
