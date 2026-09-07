import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// When the FastAPI backend is ready, point the dev-server proxy at it so
// relative fetches like `/api/fleet` work without CORS config during dev.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
