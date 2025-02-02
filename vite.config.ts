import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import {VitePWA} from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  plugins: [react(),
    VitePWA({ registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest:{
        name: "Метро",
        short_name: "Метро",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#D4212D",
        orientation: "portrait-primary",
        icons: [
          {
            src: "/metro-icon.png",
            type: "image/png",
            sizes: "192x192"
          },
        ],
      }
    })],
});
