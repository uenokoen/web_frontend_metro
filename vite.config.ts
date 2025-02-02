import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import {VitePWA} from "vite-plugin-pwa";
import fs from 'fs';
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
  base: "/web_frontend_metro/",
  server: {
    https:{
      key: fs.readFileSync(path.resolve(__dirname, 'create-cert-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'create-cert.pem')),
    },
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Адрес вашего backend-сервера
        changeOrigin: true, // Изменяет заголовок Origin на target
        rewrite: (path) => path.replace(/^\/api/, ''), // Убираем префикс /api из запроса
      },
    },
  },
  plugins: [react(),
    mkcert(),
    VitePWA({ registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest:{
        name: "Метро",
        short_name: "Метро",
        start_url: "/web_frontend_metro/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#D4212D",
        orientation: "portrait-primary",
        icons: [
          {
            src: "/web_frontend_metro/metro-icon.png",
            type: "image/png",
            sizes: "192x192"
          },
        ],
        screenshots: [
          {
            src: "/web_frontend_metro/img.png",
            sizes: "410x593",
            type: "image/png"
          }
        ]
      }
    })],
});
