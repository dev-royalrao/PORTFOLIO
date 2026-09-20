import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' so the build works on GitHub Pages / any subpath without config
export default defineConfig({ plugins: [react()], base: './' })
