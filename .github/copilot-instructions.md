# PetBlog - AI Coding Agent Instructions

## Tech Stack
- **Astro 5 SSG** with TypeScript strict mode, MDX support, sitemap integration
- **Tailwind CSS 4** via Vite plugin - use `@theme` tokens in [src/styles/global.css](src/styles/global.css), NOT `@config`
- **Design tokens**: 
  - **Colors**: `--color-forest-green` (#1B3B36), `--color-forest-green-dark` (#142d29), `--color-alabaster` (#F2F0EB), `--color-warm-taupe` (#A89F91), `--color-slate-grey` (#4A4A4A), `--color-champagne` (#D4AF37), `--color-champagne-muted` (#C5A059)
  - **Typography**: `--font-heading` (Playfair Display), `--font-sans` (Montserrat)
- **Images**: Unsplash allowlisted in [astro.config.mjs](astro.config.mjs); prefer `public/` for local assets

## Visual Identity: Quiet Luxury
- **Primary anchor**: Deep Forest Green (`--color-forest-green`) for headings, footers, primary buttons, text overlays
- **Background**: Alabaster (`--color-alabaster`) for section backgrounds
- **Borders/dividers**: Warm Taupe (`--color-warm-taupe`) for thin lines and separators
- **Body text**: Slate Grey (`--color-slate-grey`) for paragraphs
- **Accents**: Champagne (`--color-champagne`) for highlights, badges, hover states
- **Typography style**: Editorial Magazine - high-contrast serif headings with clean sans-serif body

## Content Architecture
- **Three collections** in `src/content/`: `dogs/`, `cats/`, `products-reviews/` - identical Zod schema in [src/content/config.ts](src/content/config.ts)
- **Folder-based slugs**: `dogs/dog-food-guide/index.md` → `/blog/dog-food-guide`
- **Always merge collections** when listing posts - see [src/pages/index.astro](src/pages/index.astro):
  ```ts
  const allPosts = [...dogsPosts, ...catsPosts, ...productsPosts];
  ```
- **Single blog route**: [src/pages/blog/[slug].astro](src/pages/blog/%5Bslug%5D.astro) handles ALL collections - omitting any causes 404s
- **Collection prop required**: pass `collection` to `BlogPostLayout` for breadcrumbs

## Tag System
- **5 categories** in [src/utils/tags.ts](src/utils/tags.ts): Nutrition, Training, Health, Care, Lifestyle
- **Lowercase tags only**: `getTagCategory()` normalizes input
- **First tag = category**: breadcrumbs derive category from first frontmatter tag
- **Collection display names**: use `COLLECTIONS` constant (`products-reviews` → `"Product Reviews"`)

## Navigation Routes
| Route | Purpose | Source |
|-------|---------|--------|
| `/blog/[slug]` | All posts (merged collections) | [src/pages/blog/[slug].astro](src/pages/blog/%5Bslug%5D.astro) |
| `/collection/[collection]` | Filter by dogs/cats/products-reviews | [src/pages/collection/[collection].astro](src/pages/collection/%5Bcollection%5D.astro) |
| `/tag/[tag]` | Filter by any tag | [src/pages/tag/[tag].astro](src/pages/tag/%5Btag%5D.astro) |
| `/tags` | Tag cloud landing page | [src/pages/tags.astro](src/pages/tags.astro) |
| `/products/[category]/[page]` | Paginated product listings | [src/pages/products/[category]/[page].astro](src/pages/products/%5Bcategory%5D/%5Bpage%5D.astro) |

## Products System
- **Static data only**: [src/data/products.ts](src/data/products.ts) imports from `src/data/product-categories/*.ts`
- **Product ID format**: `{category}-{slug}` (e.g., `dog-food-blue-buffalo`)
- **Affiliate linking**: set `affiliateProductId` in frontmatter → `BlogPostLayout` auto-fetches product
- **Filter empty categories**: always use `productCategories.filter(cat => cat.products.length > 0)` before routing

## Content Creation
**Required frontmatter:**
```yaml
title: "Post Title"
description: "SEO description"
pubDate: "2026-01-15"
heroImage: "https://images.unsplash.com/..."
heroImageAlt: "Alt text"
author: "Dr. Sarah Mitchell"  # from src/data/about.ts
authorImage: "..."
authorBio: "..."
tags: ["nutrition", "dog food"]  # lowercase
readingTime: "12 min read"
```
**Optional:** `featured`, `affiliateProductId`, `updatedDate`, `published`

**Authors**: Use names from [src/data/about.ts](src/data/about.ts): Dr. Sarah Mitchell, Emily Chen, Michael Torres, Jessica Williams

## Development
- `npm run dev` - localhost:4321
- `npm run build` - production build (validates schemas)
- `npx astro sync` - after schema changes

## Critical Patterns
1. **Components receive data via props** - no internal `getCollection()` calls
2. **Product reviews** go in `products-reviews/` collection with `affiliateProductId`
3. **Custom button classes**: `.btn-primary`, `.btn-secondary`, `.btn-affiliate` in global.css
4. **Section utility**: `.section-padding`, `.container-blog` for consistent spacing

## JSON-LD Structured Data
`BlogPostLayout` auto-generates `BlogPosting` schema - see [src/layouts/BlogPostLayout.astro](src/layouts/BlogPostLayout.astro#L47-L70):
```ts
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": frontmatter.title,
  "datePublished": frontmatter.pubDate,
  "author": { "@type": "Person", "name": frontmatter.author }
  // ... publisher, mainEntityOfPage
};
```
No manual schema creation needed for blog posts.

## Common Pitfalls
| Issue | Cause | Fix |
|-------|-------|-----|
| 404 on blog posts | Missing collection in `[slug].astro` | Add to `getStaticPaths` |
| No affiliate product | Invalid `affiliateProductId` | Match exact ID from product-categories |
| Build fails | Tailwind `@config` used | Use `@theme` directive instead |
| Wrong breadcrumb label | Raw folder name used | Use `COLLECTIONS` constant |
