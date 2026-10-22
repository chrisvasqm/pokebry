import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { compression } from 'vite-plugin-compression2'

// https://vitejs.dev/config/
export default defineConfig({
  // Writes .gz files next to the build output; nginx serves them with gzip_static instead of compressing per request.
  plugins: [react(), compression({ algorithms: ['gzip'] })],
  build: {
    rollupOptions: {
      output: {
        // React changes less often than app code: its own chunk stays cached across deploys.
        manualChunks: (id) => {
          if (!id.includes('node_modules')) return undefined
          // Matches pnpm's .pnpm store and flat node_modules layouts, with / or \\ separators.
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom|@remix-run[\\/]router)[\\/]/.test(id)) return 'react'
          // Other libraries are left to Rollup, so detail-only modules (tabs, icons) stay in the lazy detail chunk.
          return undefined
        },
      },
    },
  },
  // vite preview inherits server.open; tests must not pop a browser.
  preview: { open: false },
  server: {
    open: true,
  }
})
