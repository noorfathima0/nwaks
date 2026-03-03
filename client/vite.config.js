import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      modernPolyfills: true,
    }),
  ],
  server: {
    host: true, // or '0.0.0.0'
    port: 5173,
    strictPort: true,
    open: true,
    cors: true,
    allowedHosts: [
      'fe37-2409-40f2-11aa-7fd9-d9d5-e8bd-9575-8513.ngrok-free.app',
      '.ngrok-free.app', // This allows all ngrok subdomains
      'localhost',
      '.localhost',
      '127.0.0.1',
      '.local' // for local development
    ],
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },
  preview: {
    host: true,
    port: 5173,
    strictPort: true,
    open: true,
    allowedHosts: [
      'fe37-2409-40f2-11aa-7fd9-d9d5-e8bd-9575-8513.ngrok-free.app',
      '.ngrok-free.app',
      'localhost',
      '.localhost',
      '127.0.0.1'
    ],
  },
})