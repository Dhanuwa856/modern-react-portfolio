import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // සයිට් එකේ වේගය වැඩි කිරීමට (Optimization)
  build: {
    minify: 'terser',
    cssMinify: true,
  }
})