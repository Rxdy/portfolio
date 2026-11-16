/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true, // expose sur 0.0.0.0 pour Docker
    port: 5173,
    watch: {
      // Le polling est indispensable au hot reload via un volume Docker
      usePolling: true,
    },
    proxy: {
      // Relaie vers le service backend (nom résolu via le réseau Docker Compose)
      '/api': {
        target: 'http://backend:3000',
        changeOrigin: true,
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test/setup.ts'],
    include: ['src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,vue}'],
      // les fichiers de traduction ne sont que des textes (aucune logique) : vitest 4 les compte désormais à 0 %
      exclude: ['src/**/*.spec.ts', 'src/main.ts', 'src/vite-env.d.ts', 'src/test/**', 'src/i18n/locales/**'],
      thresholds: { statements: 100, branches: 100, functions: 100, lines: 100 },
    },
  },
})
