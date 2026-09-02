import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Served from https://philbergdorf.github.io/migronline-mo/ on GitHub Pages,
// so the production build needs that base path. Local dev stays at "/".
// Dev runs on 5174 so it can coexist with the original prototype on 5173.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/migronline-mo/' : '/',
  server: { port: 5174 },
  plugins: [react()],
}))
