affiliate-site/
├── public/                     # asset static (img, favicon, ads.txt)
│   ├── images/
│   └── ads.txt                # required cho AdSense
│
├── src/
│   ├── components/            # UI component tái sử dụng
│   │   ├── ads/               # Adsense components
│   │   │   ├── AdBanner.astro
│   │   │   └── AdInArticle.astro
│   │   │
│   │   ├── affiliate/         # Affiliate UI
│   │   │   ├── CTAButton.astro
│   │   │   ├── ProductBox.astro
│   │   │   ├── ComparisonTable.astro
│   │   │   └── ReviewBox.astro
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   └── Sidebar.astro
│   │   │
│   │   └── common/
│   │       ├── Card.astro
│   │       └── Breadcrumb.astro
│   │
│   ├── layouts/               # layout page
│   │   ├── BaseLayout.astro
│   │   ├── BlogLayout.astro
│   │   ├── ReviewLayout.astro
│   │   └── LandingLayout.astro
│   │
│   ├── pages/                 # routing chính
│   │   ├── index.astro
│   │
│   │   ├── blog/              # info content (AdSense main)
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │
│   │   ├── reviews/           # affiliate pages
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │
│   │   ├── best/              # “money pages”
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │
│   │   ├── vs/                # comparison pages
│   │   │   └── [slug].astro
│   │
│   │   ├── go/                # cloaking affiliate links
│   │   │   └── [slug].ts      # redirect logic (Cloudflare)
│   │
│   │   ├── search.astro
│   │   └── about.astro
│   │
│   ├── content/               # markdown hoặc CMS sync
│   │   ├── blog/
│   │   ├── reviews/
│   │   ├── best/
│   │   └── vs/
│   │
│   ├── lib/                   # business logic
│   │   ├── affiliate.ts       # xử lý link affiliate
│   │   ├── seo.ts             # meta + schema
│   │   └── tracking.ts        # analytics & click tracking
│   │
│   ├── styles/
│   │   └── global.css
│   │
│   └── config/
│       ├── site.ts            # config site
│       ├── adsense.ts         # config ads
│       └── affiliate.ts       # config network affiliate
│
├── functions/                 # Cloudflare Functions
│   ├── go/                    # redirect cloaking
│   │   └── [slug].ts
│   │
│   └── track-click.ts         # tracking affiliate click
│
├── scripts/                   # script build automation
│   ├── generate-sitemap.ts
│   └── import-content.ts
│
├── astro.config.mjs
├── package.json
└── tsconfig.json