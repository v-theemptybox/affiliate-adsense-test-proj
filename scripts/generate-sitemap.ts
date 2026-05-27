import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const SITE_URL = 'https://yoursite.com';

// Astro's @astrojs/sitemap integration handles this automatically during build.
// This script is for manual generation or CI override if needed.

async function generateSitemap() {
  const staticUrls = [
    { loc: '/', changefreq: 'daily', priority: '1.0' },
    { loc: '/blog', changefreq: 'daily', priority: '0.9' },
    { loc: '/reviews', changefreq: 'weekly', priority: '0.9' },
    { loc: '/best', changefreq: 'weekly', priority: '0.9' },
    { loc: '/about', changefreq: 'monthly', priority: '0.5' },
  ];

  const urls = staticUrls
    .map(
      ({ loc, changefreq, priority }) => `
  <url>
    <loc>${SITE_URL}${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  const outPath = join(process.cwd(), 'public', 'sitemap.xml');
  writeFileSync(outPath, xml, 'utf-8');
  console.log(`Sitemap written to ${outPath}`);
}

generateSitemap().catch(console.error);
