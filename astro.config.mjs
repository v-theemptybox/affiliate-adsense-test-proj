import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'hybrid',
  adapter: cloudflare({
    mode: 'directory',
    functionPerRoute: false,
    platformProxy: { enabled: false },
  }),
  integrations: [
    sitemap(),
    tailwind({ applyBaseStyles: false }),
  ],
  site: 'https://yoursite.com',
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
