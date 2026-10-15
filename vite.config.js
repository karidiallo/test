import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Preview remains under https://karidiallo.github.io/test/.
// For the final production build on digitalmap.pl, run:
// DIGITALMAP_PRODUCTION=true npm run build
const isProductionDomain = process.env.DIGITALMAP_PRODUCTION === 'true'

export default defineConfig({
  plugins: [react()],
  base: isProductionDomain ? '/' : '/test/',
  server: {
    host: true,
  },
})
