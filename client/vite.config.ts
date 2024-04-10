import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression2';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@components', replacement: '/src/components' },
      { find: '@icons', replacement: '/src/icons' },
    ],
  },
  plugins: [
    svgr(),
    react(),
    compression(),
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
  // optimizeDeps: {
  //   exclude: ['react-virtualized'],
  // },
});
