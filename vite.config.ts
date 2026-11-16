import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    watch: {
      ignored: ['**/*.mp4', '**/Video-13023.mp4', '**/.git/**', '**/test_screenshots/**'],
    },
  },
});
