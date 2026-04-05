import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Fewer legacy polyfills in bundle; aligns with Baseline browsers
    target: 'es2022',
  },
})
