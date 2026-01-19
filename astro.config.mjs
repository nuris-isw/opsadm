// @ts-check
import { defineConfig } from 'astro/config'

import alpinejs from '@astrojs/alpinejs'
import icon from 'astro-icon'
import tailwindcss from '@tailwindcss/vite'

import node from '@astrojs/node';

export default defineConfig({
  integrations: [
    alpinejs(),
    icon(),
  ],

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  adapter: node({
    mode: 'standalone',
  }),
})