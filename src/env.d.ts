/// <reference path="../.astro/types.d.ts" />
/// <reference types="@cloudflare/workers-types" />

// Cloudflare bindings — phải khớp với wrangler.jsonc
interface Env {
  DB: D1Database;
  MEDIA: R2Bucket;
}
