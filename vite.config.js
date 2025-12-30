import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/algorithmst-26/', // Base URL for GitHub Pages
  server: {
    port: 3006,
  }
})
