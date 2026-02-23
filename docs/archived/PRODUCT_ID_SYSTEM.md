# Product ID System

## Overview

The PetBlog now uses a centralized product system where products are stored in [src/data/products.ts](src/data/products.ts) with unique IDs. Instead of hardcoding affiliate product data in content frontmatter, you reference products by ID.

## Benefits

- **DRY (Don't Repeat Yourself)**: Product data is defined once and reused everywhere
- **Consistency**: All product information stays synchronized across the site
- **Easy Updates**: Change product details in one place
- **Type Safety**: Full TypeScript support for product properties

## How to Use

### 1. Adding a New Product to products.ts

Each product now has an `id` field (optional). Format: `{category}-{product-slug}`

```typescript
{
  id: 'beds-big-barker',
  name: 'Big Barker Orthopedic Dog Bed',
  image: 'https://images.unsplash.com/...',
  price: '$279.99',
  rating: 4.9,
  reviewCount: 3241,
  link: '#',
  description: 'American-made orthopedic bed with 10-year guarantee.',
  badge: 'Top Rated',
  features: ['Memory Foam', '10-Year Guarantee', 'Washable Cover'],
  featured: true
}
```

### 2. Referencing Products in Content

#### New Way (Recommended):
Use `affiliateProductId` in frontmatter:

```yaml
---
title: "Best Dog Beds of 2026"
# ... other frontmatter ...
affiliateProductId: "beds-big-barker"
---
```

#### Old Way (Still Supported):
You can still use the full `affiliateProduct` object:

```yaml
---
title: "Best Dog Beds of 2026"
# ... other frontmatter ...
affiliateProduct:
  name: "Big Barker Orthopedic Dog Bed"
  image: "https://images.unsplash.com/..."
  price: "$279.99"
  rating: 4.9
  link: "#"
  description: "American-made orthopedic bed..."
---
```

### 3. How It Works

The [src/layouts/BlogPostLayout.astro](src/layouts/BlogPostLayout.astro) layout automatically:

1. Checks if `affiliateProductId` exists in frontmatter
2. If yes, fetches the product from `productCategories` by ID
3. Falls back to `affiliateProduct` if provided directly
4. Passes the product to `<AffiliateBox>` for display

```typescript
// In BlogPostLayout.astro
let affiliateProduct = frontmatter.affiliateProduct;
if (frontmatter.affiliateProductId && !affiliateProduct) {
  affiliateProduct = productCategories
    .flatMap(cat => cat.products)
    .find(p => p.id === frontmatter.affiliateProductId);
}
```

## Product ID Naming Convention

IDs follow the pattern: `{category}-{brand-or-name-slug}`

Examples:
- Dog Food: `dog-food-blue-buffalo`, `dog-food-orijen`
- Cat Food: `cat-food-hills`, `cat-food-royal-canin`
- Beds: `beds-big-barker`, `beds-casper`
- Toys: `toys-kong`, `toys-hide-squirrel`
- Accessories: `acc-water-fountain`, `acc-leash`
- Grooming: `groom-hertzko`, `groom-wahl`

## Finding Product IDs

All product IDs are in [src/data/products.ts](src/data/products.ts). Search for products by name or browse by category.

## Example: Creating a Product Review

```markdown
---
title: "Best Cat Food of 2026"
description: "We tested 20+ cat foods to find the best..."
pubDate: "2026-01-29"
heroImage: "..."
heroImageAlt: "..."
author: "Sarah Thompson"
tags: ["cat food", "product reviews", "nutrition"]
readingTime: "12 min read"
featured: true
affiliateProductId: "cat-food-royal-canin"
---

## Introduction

Our top pick is the Royal Canin Indoor Adult, which you can see in the sidebar...
```

The affiliate box will automatically display with:
- Product name: "Royal Canin Indoor Adult"
- Image, price, rating from products.ts
- Features list
- Call-to-action button

## Schema Changes

The content schema ([src/content/config.ts](src/content/config.ts)) now includes:

```typescript
affiliateProductId: z.string().optional(),
```

The old `affiliateProduct` object schema was removed but is still supported via the layout logic for backward compatibility.

## Type Definitions

Updated in [src/data/home.ts](src/data/home.ts):

```typescript
export type FeaturedProduct = {
  id?: string;  // Added
  name: string;
  image: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviewCount: number;
  link: string;
  description: string;
  badge?: string;
  features?: string[];
  featured?: boolean;
};
```
