import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/gugudan/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['BG_img.jpg', '온글잎 박다현체.ttf'],
      manifest: {
        name: 'TES 구구단',
        short_name: '구구단',
        description: '초등학생을 위한 구구단 암기 및 연산 게임',
        theme_color: '#FEFAE0',
        background_color: '#FEFAE0',
        display: 'standalone',
        orientation: 'landscape',
        start_url: '/gugudan/',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})
