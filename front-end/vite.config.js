import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://special-goldfish-v69v647jgrjhpgpj-5050.app.github.dev',
        changeOrigin: true,
      },
    },
  },
})
