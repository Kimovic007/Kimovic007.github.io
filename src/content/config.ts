import { defineCollection, z } from 'astro:content';

// Shared schema for all content collections
const contentSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.string(),
  updatedDate: z.string().optional(),
  heroImage: z.string(),
  heroImageAlt: z.string(),
  author: z.string(),
  authorImage: z.string(),
  authorBio: z.string(),
  tags: z.array(z.string()),
  readingTime: z.string(),
  featured: z.boolean().default(false),
  affiliateProductId: z.string().optional(),
  published: z.boolean().default(true),
});

// Collections for categorized content
const dogsCollection = defineCollection({
  type: 'content',
  schema: contentSchema,
});

const catsCollection = defineCollection({
  type: 'content',
  schema: contentSchema,
});

const productsReviewsCollection = defineCollection({
  type: 'content',
  schema: contentSchema,
});

export const collections = {
  dogs: dogsCollection,
  cats: catsCollection,
  'products-reviews': productsReviewsCollection,
};
