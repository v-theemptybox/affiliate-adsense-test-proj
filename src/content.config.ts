import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.string(),
    updatedAt: z.string().optional(),
    image: z.string().optional(),
    author: z.string().optional(),
    tags: z.array(z.string()).default([]),
    noindex: z.boolean().default(false),
  }),
});

const reviewsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reviews' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.string(),
    updatedAt: z.string().optional(),
    image: z.string().optional(),
    rating: z.number().min(0).max(5),
    affiliateUrl: z.string().url(),
    affiliateSlug: z.string(),
    price: z.string().optional(),
    brand: z.string().optional(),
    pros: z.array(z.string()).default([]),
    cons: z.array(z.string()).default([]),
    verdict: z.string().optional(),
  }),
});

const bestCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/best' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.string(),
    updatedAt: z.string().optional(),
    image: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

const vsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/vs' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.string(),
    updatedAt: z.string().optional(),
    product1: z.string(),
    product2: z.string(),
    winner: z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  reviews: reviewsCollection,
  best: bestCollection,
  vs: vsCollection,
};
