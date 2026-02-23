# PetBlog - AI Coding Agent Instructions

> **MODE: Pure Content Blog** — Affiliate/product systems are dormant. See "Dormant Systems" section for restoration.

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
| `/disclosure` | Editorial Policy page | [src/pages/disclosure.astro](src/pages/disclosure.astro) |

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
**Optional:** `featured`, `updatedDate`, `published`

**Authors**: Use names from [src/data/about.ts](src/data/about.ts): Dr. Sarah Mitchell, Emily Chen, Michael Torres, Jessica Williams

## Development
- `npm run dev` - localhost:4321
- `npm run build` - production build (validates schemas)
- `npx astro sync` - after schema changes

## GitHub Pages Deployment (GitHub Actions)
- **Workflow file**: [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
- **Pages source**: Settings → Pages → Source = **GitHub Actions**
- **Custom domain**: set `site` to `https://www.symbiopets.me` and keep `base: '/'` in [astro.config.mjs](astro.config.mjs)
- **Deploys** on push to `main` and publishes `dist/`

## Critical Patterns
1. **Components receive data via props** - no internal `getCollection()` calls
2. **Product reviews** go in `products-reviews/` collection (editorial content only, no affiliate links)
3. **Custom button classes**: `.btn-primary`, `.btn-secondary` in global.css
4. **Section utility**: `.section-padding`, `.container-blog` for consistent spacing

## JSON-LD Structured Data
`BlogPostLayout` auto-generates `BlogPosting` schema - see [src/layouts/BlogPostLayout.astro](src/layouts/BlogPostLayout.astro):
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
| Build fails | Tailwind `@config` used | Use `@theme` directive instead |
| Wrong breadcrumb label | Raw folder name used | Use `COLLECTIONS` constant |

---

## Dormant Systems (Affiliate Marketing)

The following systems are **disabled but preserved** for future restoration:

### Archived Files
- **Documentation**: `docs/archived/PRODUCT_ID_SYSTEM.md`
- **Product pages**: `src/pages/_archived/products.astro`, `src/pages/_archived/products/`

### Commented-Out Components
These render empty fragments with `<!-- Disabled: pure blog mode -->`:
- `AffiliateBox.astro` - Sidebar promotional boxes
- `ProductCard.astro` - Product cards with pricing
- `ProductGrid.astro` - Product grid layouts
- `ProductsSection.astro` - Homepage product section
- `SingleProduct.astro` - MDX-embeddable product cards
- `ProductHero.astro` - Products page hero
- `ProductCategorySection.astro` - Category product groups
- `ProductTableOfContents.astro` - Product category navigation

### Commented-Out Data
- `src/data/products.ts` - exports empty `productCategories[]`
- `src/data/home.ts` - exports empty `featuredProducts[]`
- Product category files in `src/data/product-categories/` remain intact

### Dormant Schema Field
```ts
// In src/content/config.ts
affiliateProductId: z.string().optional(), // DORMANT
```

### Restoration Steps
1. Uncomment imports in `src/data/products.ts` and `src/data/home.ts`
2. Restore component code from git history or commented blocks
3. Move pages from `src/pages/_archived/` back to `src/pages/`
4. Uncomment `AffiliateBox` and `ProductsSection` in layouts/pages
5. Restore `.btn-affiliate` class in `global.css`
6. Update Header/Footer navigation links
7. Restore affiliate disclosure in Footer and disclosure page
