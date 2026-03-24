import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002,
    host: '0.0.0.0', // Listen on all interfaces (IPv4 and IPv6)
    open: true,
    cors: {
      origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
      credentials: true,
    },
  },
  base: '/',
  // Use this app's own public folder only (no parent paths). Clone/deploy-safe.
  publicDir: path.resolve(__dirname, 'public'),
});
