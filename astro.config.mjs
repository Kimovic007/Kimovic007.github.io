// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.symbiopets.me',
  base: '/',
  integrations: [sitemap(), mdx()],
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  },
  image: {
    domains: ['images.unsplash.com'],
    remotePatterns: [{ protocol: 'https' }]
  }
});