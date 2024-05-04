import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // assuming your backend endpoints start with /api
      '/api': {
        target: 'http://localhost:3000',  // your Express server
        changeOrigin: true,
        secure: false,  // if you're using http during development, set this to false
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
