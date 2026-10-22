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
        // Libraries change less often than app code: separate chunks stay cached across deploys.
        manualChunks: (id) => {
          if (!id.includes('node_modules')) return undefined
          if (/node_modules\/\.pnpm\/(react|react-dom|scheduler|react-router|react-router-dom|@remix-run\+router)@/.test(id)) return 'react'
          if (/node_modules\/\.pnpm\/(@chakra-ui|@emotion|framer-motion)/.test(id)) return 'ui'
          return 'vendor'
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
