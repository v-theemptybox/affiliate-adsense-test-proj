import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import emdash, { local } from 'emdash/astro';
import { sqlite } from 'emdash/db';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import tailwindConfig from './tailwind.config.mjs';

// CF_PAGES=1 được Cloudflare CI tự động set khi build trên infrastructure của họ
const isCFBuild = process.env.CF_PAGES === '1';

let adapter, database, storage;

if (isCFBuild) {
  // Production: Cloudflare Workers + D1 database + R2 media storage
  const { default: cloudflare } = await import('@astrojs/cloudflare');
  const { d1, r2 } = await import('@emdash-cms/cloudflare');
  adapter = cloudflare({ prerenderEnvironment: 'node' });
  database = d1({ binding: 'DB' });
  storage = r2({ binding: 'MEDIA' });
} else {
  // Local dev: Node.js adapter + SQLite + local filesystem storage
  const { default: node } = await import('@astrojs/node');
  adapter = node({ mode: 'standalone' });
  database = sqlite({ url: 'file:./emdash.db' });
  storage = local({
    directory: './uploads',
    baseUrl: '/_emdash/api/media/file',
  });
}

// PostCSS plugin: chạy TRƯỚC Tailwind, xoá @layer wrappers từ CSS đã compiled trong node_modules.
// Tailwind v3 throw error khi thấy "@layer base" mà không có "@tailwind base" trong cùng file —
// EmDash admin CSS là pre-compiled nên không cần Tailwind xử lý @layer của nó.
const stripNodeModulesLayers = {
  postcssPlugin: 'strip-node-modules-css-layers',
  Once(root, { result }) {
    const from = result.opts?.from ?? '';
    if (!from.includes('node_modules')) return;
    root.walkAtRules('layer', (rule) => {
      rule.replaceWith(rule.nodes ?? []);
    });
  },
};

export default defineConfig({
  output: 'server',
  adapter,
  integrations: [
    react(),
    emdash({ database, storage }),
    sitemap(),
  ],
  site: 'https://yoursite.com',
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    css: {
      postcss: {
        // Thứ tự quan trọng: strip layers trước → Tailwind sau
        plugins: [stripNodeModulesLayers, tailwindcss(tailwindConfig), autoprefixer()],
      },
    },
  },
});
