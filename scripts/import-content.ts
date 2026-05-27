// Script để sync content từ external CMS (ex: Notion, Contentful) vào src/content/
// Chạy: npm run import

import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

interface ContentItem {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  body: string;
  [key: string]: unknown;
}

async function importFromCMS(): Promise<ContentItem[]> {
  // TODO: Replace with actual CMS API call
  // Example: Notion, Contentful, Sanity, etc.
  console.log('No CMS configured — skipping import.');
  return [];
}

function toFrontmatter(data: Record<string, unknown>): string {
  return Object.entries(data)
    .filter(([k]) => k !== 'body' && k !== 'slug')
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
    .join('\n');
}

async function run() {
  const items = await importFromCMS();

  for (const item of items) {
    const { slug, body, ...meta } = item;
    const dir = join(process.cwd(), 'src', 'content', 'blog');
    mkdirSync(dir, { recursive: true });

    const content = `---\n${toFrontmatter(meta)}\n---\n\n${body}`;
    const outPath = join(dir, `${slug}.md`);
    writeFileSync(outPath, content, 'utf-8');
    console.log(`Written: ${outPath}`);
  }

  console.log(`Import complete: ${items.length} items.`);
}

run().catch(console.error);
