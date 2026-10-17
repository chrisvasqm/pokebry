import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // vite preview inherits server.open; tests must not pop a browser.
  preview: { open: false },
  server: {
    open: true,
  }
})
