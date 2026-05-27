import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
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
  type: 'content',
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
  type: 'content',
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
  type: 'content',
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
