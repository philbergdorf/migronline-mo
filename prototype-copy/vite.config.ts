import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Keep the copy on a separate origin from the original prototype.
export default defineConfig({
  base: './',
  server: { host: '127.0.0.1', port: 5175, strictPort: true },
  build: { rollupOptions: { input: { main: 'index.html', directions: 'directions.html', fresh: 'fresh.html' } } },
  plugins: [react()],
})
