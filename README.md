# Pet Care Blog 🐾

A content-driven affiliate pet care blog built with Astro.js and Tailwind CSS. Optimized for SEO, performance, and conversions.

## Features

- ✅ **Astro.js 5** - Fast, modern static site generator
- ✅ **Tailwind CSS 4** - Utility-first CSS framework
- ✅ **Markdown Blog** - Easy content management with frontmatter
- ✅ **SEO Optimized** - Meta tags, structured data, Open Graph
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Affiliate Ready** - Product cards, CTAs, disclosure pages
- ✅ **Trust Building** - Testimonials, trust badges, author cards
- ✅ **Newsletter Integration** - Email signup components
- ✅ **Sitemap** - Auto-generated sitemap for SEO
- ✅ **TypeScript** - Type-safe content collections

## Project Structure

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── AffiliateBox.astro      # Sidebar product promotions
│   │   ├── ArticleCard.astro       # Blog post previews
│   │   ├── AuthorCard.astro        # Author bio sections
│   │   ├── Footer.astro            # Site footer
│   │   ├── Header.astro            # Navigation header
│   │   ├── NewsletterCTA.astro     # Email signup forms
│   │   ├── ProductCard.astro       # Affiliate product cards
│   │   ├── RelatedPosts.astro      # Related articles section
│   │   ├── SEO.astro               # Meta tags component
│   │   ├── TableOfContents.astro   # Article TOC
│   │   ├── Testimonials.astro      # Customer reviews
│   │   └── TrustBar.astro          # Trust indicators
│   ├── content/
│   │   ├── blog/                   # Markdown blog posts
│   │   └── config.ts               # Content collection schema
│   ├── layouts/
│   │   ├── BaseLayout.astro        # Main site layout
│   │   └── BlogPostLayout.astro    # Blog post layout
│   ├── pages/
│   │   ├── about.astro             # About page
│   │   ├── blog/
│   │   │   ├── index.astro         # Blog listing
│   │   │   └── [slug].astro        # Dynamic blog posts
│   │   ├── disclosure.astro        # Affiliate disclosure
│   │   ├── index.astro             # Homepage
│   │   └── products.astro          # Product recommendations
│   └── styles/
│       └── global.css              # Tailwind + custom styles
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build for production to `./dist/` |
| `npm run preview` | Preview production build locally |

## Adding New Blog Posts

1. Create a new `.md` file in `src/content/blog/`
2. Add required frontmatter:

```markdown
---
title: "Your Post Title"
description: "A compelling description for SEO"
pubDate: 2026-01-15
heroImage: "https://example.com/image.jpg"
heroImageAlt: "Descriptive alt text"
author: "Author Name"
authorImage: "https://example.com/author.jpg"
authorBio: "Short author bio"
category: "Dogs"
tags: ["tag1", "tag2"]
readingTime: "5 min read"
featured: false
---

Your content here...
```

## Customization

### Site Configuration

Update `astro.config.mjs` to change:
- Site URL
- Sitemap settings
- Image domains

### Styling

Modify `src/styles/global.css` to customize:
- Color scheme (update `@theme` variables)
- Component styles
- Typography

### SEO

Update `src/components/SEO.astro` to modify:
- Default meta tags
- Structured data
- Social media handles

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Netlify

```bash
npm run build
# Deploy the `dist` folder
```

## Affiliate Integration

Replace placeholder affiliate links in:
- Product components
- Blog post frontmatter
- Products page

Update the disclosure page at `/disclosure` with your specific affiliate programs.

## License

MIT License

---

Made with ❤️ for pet lovers everywhere 🐕🐱
