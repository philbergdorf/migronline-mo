import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Keep version 2 on a separate origin from the other prototypes.
export default defineConfig({
  base: './',
  server: { host: '127.0.0.1', port: 5176, strictPort: true },
  build: { rollupOptions: { input: { main: 'index.html', directions: 'directions.html', fresh: 'fresh.html' } } },
  plugins: [react()],
})
