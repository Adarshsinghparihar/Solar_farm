import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // <-- This ensures relative asset paths
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true
  },
  preview: {
    host: '0.0.0.0',
    port: 8080,
    strictPort: true
  }
})
