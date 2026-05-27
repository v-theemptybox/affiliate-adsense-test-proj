import { SITE } from '@/config/site';

interface SEOInput {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  noindex?: boolean;
  type?: 'website' | 'article' | 'product';
}

export function buildSEO(input: SEOInput = {}) {
  const { title, description, image, canonical, noindex = false, type = 'website' } = input;
  const fullTitle = title ? `${title} | ${SITE.name}` : SITE.name;
  return {
    title: fullTitle,
    description: description || SITE.description,
    canonical,
    noindex,
    og: {
      title: fullTitle,
      description: description || SITE.description,
      image: image || SITE.defaultOgImage,
      type,
    },
  };
}

export function buildProductSchema(product: {
  name: string;
  description: string;
  url: string;
  price?: number;
  currency?: string;
  rating?: number;
  reviewCount?: number;
  image?: string;
  brand?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    url: product.url,
    ...(product.brand && { brand: { '@type': 'Brand', name: product.brand } }),
    ...(product.image && { image: product.image }),
    ...(product.price && {
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: product.currency ?? 'USD',
        availability: 'https://schema.org/InStock',
      },
    }),
    ...(product.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        bestRating: 5,
        reviewCount: product.reviewCount ?? 1,
      },
    }),
  };
}

export function buildArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
  author?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    ...(article.image && { image: article.image }),
    author: { '@type': 'Person', name: article.author ?? SITE.author },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
  };
}

export function buildReviewSchema(review: {
  itemName: string;
  rating: number;
  reviewBody: string;
  url: string;
  publishedAt: string;
  author?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    url: review.url,
    datePublished: review.publishedAt,
    author: { '@type': 'Person', name: review.author ?? SITE.author },
    reviewBody: review.reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
    },
    itemReviewed: {
      '@type': 'Product',
      name: review.itemName,
    },
  };
}

export function buildFAQSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}
