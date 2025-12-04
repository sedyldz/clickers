import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [tailwindcss()],
  base: './', // Use relative paths - critical for GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        click: resolve(__dirname, 'click.html'),
      },
      output: {
        // Explicitly ensure .js extension
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Ensure JavaScript files always have .js extension
          if (assetInfo.name && assetInfo.name.endsWith('.js')) {
            return 'assets/[name]-[hash].js';
          }
          return 'assets/[name]-[hash].[ext]';
        }
      }
    }
  },
});

