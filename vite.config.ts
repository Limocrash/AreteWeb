import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002,
    host: '0.0.0.0',
    open: true,
    cors: {
      origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
      credentials: true,
    },
  },
  // Base path: '/' for custom domain (aretecracy.org) and local dev
  base: process.env.GITHUB_ACTIONS ? '/' : '/',
  publicDir: path.resolve(__dirname, 'public'),
});
