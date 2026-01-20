import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: '.', // raíz del frontend
  build: {
    outDir: 'dist',      // carpeta de salida
    emptyOutDir: true,   // limpiar dist antes de build
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // entrada principal
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // alias para src
    },
  },
});
