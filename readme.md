# HomeNest

> Curated reviews, buying guides, and home inspiration — built with Astro + Cloudflare Pages.

A production-ready affiliate + AdSense site template focused on the **home & living** niche. Optimized for SEO, Core Web Vitals, and monetization from day one.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Astro 4](https://astro.build) — hybrid SSR |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com) |
| Edge Functions | Cloudflare Workers (affiliate redirects, click tracking) |
| Styling | Tailwind CSS + @tailwindcss/typography |
| Content | Astro Content Collections (Markdown) |
| Analytics | Google Analytics 4 + Cloudflare Analytics Engine |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:4321

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Configuration

Before going live, update these three files:

**`src/config/site.ts`** — site name, URL, GA4 ID
```ts
export const SITE = {
  name: 'HomeNest',
  url: 'https://yourdomain.com',
  googleAnalyticsId: 'G-XXXXXXXXXX',
  // ...
}
```

**`src/config/adsense.ts`** — AdSense publisher ID and slot IDs
```ts
export const ADSENSE = {
  publisherId: 'ca-pub-XXXXXXXXXX',
  slots: { banner: '...', inArticle: '...', sidebar: '...' },
}
```

**`src/config/affiliate.ts`** — affiliate link map (slug → destination URL)
```ts
export const AFFILIATE_LINKS = {
  'product-slug': 'https://amzn.to/xxxxx',
}
```

Also update `public/ads.txt` with your actual AdSense publisher ID.

---

## Content

Content lives in `src/content/` as Markdown files with frontmatter.

### Adding a blog post

Create `src/content/blog/your-post-slug.md`:

```md
---
title: "Your Post Title"
description: "A compelling meta description under 160 characters."
publishedAt: "2025-06-01"
author: "HomeNest Editors"
tags: ["home decor", "tips"]
image: "/images/your-image.svg"
---

Your content here...
```

### Adding a review

Create `src/content/reviews/product-name.md`:

```md
---
title: "Product Name Review"
description: "One-line summary of the product and verdict."
publishedAt: "2025-06-01"
rating: 4.5
affiliateUrl: "https://amzn.to/xxxxx"
affiliateSlug: "product-slug"
price: "$99.99"
brand: "Brand Name"
pros:
  - "Great build quality"
cons:
  - "Expensive"
verdict: "The one-sentence bottom line."
---
```

### Content types

| Type | Path | Purpose |
|---|---|---|
| `blog` | `src/content/blog/` | Info content — AdSense traffic |
| `reviews` | `src/content/reviews/` | Affiliate product reviews |
| `best` | `src/content/best/` | "Best X" money pages |
| `vs` | `src/content/vs/` | Product comparison pages |

---

## Affiliate Link Cloaking

All affiliate links go through `/go/[slug]` — a server-side redirect handled at the Cloudflare edge.

1. Add the slug and destination to `src/config/affiliate.ts`
2. Use `<CTAButton slug="product-slug" href="..." text="Check Price" />` in content
3. The redirect is tracked via Cloudflare Analytics Engine

This keeps affiliate URLs clean (`/go/roomba-j7-plus`) and lets you swap destinations without editing content.

---

## Deployment

This site deploys to **Cloudflare Pages** via Git integration.

1. Push this repo to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com) → Create project → Connect to Git
3. Set build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Add environment variables if needed (e.g. `NODE_ENV=production`)
5. Deploy — Cloudflare handles CDN, SSL, and edge functions automatically

For the Cloudflare KV namespace (affiliate link storage), create a binding named `AFFILIATE_LINKS` in the Pages dashboard and populate it via the Wrangler CLI.

---

## Project Structure

```
src/
├── components/
│   ├── ads/          # AdBanner, AdInArticle
│   ├── affiliate/    # CTAButton, ProductBox, ComparisonTable, ReviewBox
│   ├── layout/       # Header, Footer, Sidebar
│   └── common/       # Card, Breadcrumb
├── content/          # Markdown content (blog, reviews, best, vs)
├── layouts/          # BaseLayout, BlogLayout, ReviewLayout, LandingLayout
├── lib/              # affiliate.ts, seo.ts, tracking.ts
├── pages/            # Astro routes
│   └── go/[slug].ts  # Affiliate redirect (SSR)
├── config/           # site.ts, adsense.ts, affiliate.ts
└── styles/           # global.css (Tailwind)

functions/            # Cloudflare edge functions
├── go/[slug].ts      # Edge redirect + Analytics Engine logging
└── track-click.ts    # Client-side click event receiver
```

---

## License

MIT
