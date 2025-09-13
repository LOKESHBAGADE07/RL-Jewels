import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    }
  },
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    // OneDrive/Windows can have flaky file watching; polling stabilizes HMR/refresh
    watch: {
      usePolling: true,
      interval: 300,
    },
  }
});
