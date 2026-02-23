# Navigation & Product Display Structure

## Current Navigation Hierarchy

```
Pet Care Blog Root
│
├─ / (Home)
│  ├─ Collections Section (No Change)
│  │  ├─ Dogs
│  │  ├─ Cats  
│  │  └─ Product Reviews
│  ├─ Featured Products (2-column horizontal cards)
│  └─ Header Navigation
│     ├─ Home
│     ├─ Dogs → /collection/dogs
│     ├─ Cats → /collection/cats
│     ├─ Tags → /tags
│     ├─ Products → /products
│     └─ About
│
├─ /tags
│  ├─ Nutrition (Category)
│  │  ├─ nutrition (4 articles)
│  │  ├─ dog food (2 articles)
│  │  ├─ diet (1 article)
│  │  └─ ...
│  ├─ Training (Category)
│  │  ├─ training (3 articles)
│  │  ├─ puppy training (2 articles)
│  │  └─ ...
│  ├─ Health (Category)
│  ├─ Care (Category)
│  └─ Lifestyle (Category)
│
├─ /collection/dogs
│  ├─ All Dog Posts
│  ├─ Popular Tags in this Collection
│  └─ Navigation to Other Collections
│
├─ /collection/cats
│  ├─ All Cat Posts
│  ├─ Popular Tags in this Collection
│  └─ Navigation to Other Collections
│
├─ /tag/nutrition (Dynamic)
│  ├─ All Articles Tagged "Nutrition"
│  │  ├─ Dog Food Guide
│  │  ├─ Cat Nutrition Tips
│  │  └─ ...
│  ├─ Related Tags
│  │  ├─ diet
│  │  ├─ supplements
│  │  └─ health & wellness
│  └─ Back to /tags
│
├─ /tag/training (Dynamic)
│  ├─ All Articles Tagged "Training"
│  │  ├─ Dog Training Guide
│  │  ├─ Puppy Training Tips
│  │  └─ ...
│  └─ Related Tags
│
├─ /blog/[slug] (UPDATED)
│  ├─ Breadcrumb
│  │  ├─ Home
│  │  ├─ → Collection Name (e.g., "Dogs")
│  │  ├─ → Tag Category (e.g., "Nutrition")
│  │  └─ → Article Title
│  ├─ Post Content
│  └─ Tags at Bottom
│
├─ /products (UPDATED)
│  ├─ Product Hero Section
│  ├─ 2-Column Product Sections
│  │  ├─ Best Dog Food (3-4 top products)
│  │  ├─ Best Cat Food (3-4 top products)
│  │  └─ Best Pet Beds (3-4 top products)
│  └─ View All Buttons → /products/[category]/1
│
├─ /products/[category] (Dynamic)
│  ├─ Category Header with Icon
│  ├─ 2-Column Paginated Products
│  │  ├─ 10 products per page
│  │  └─ 2 cards per row
│  └─ Pagination Controls
│
└─ Other Pages
   ├─ /blog (Blog Index)
   ├─ /about
   └─ /disclosure
```

## Product Card Component Structure

### ProductCard.astro (Horizontal Layout - UPDATED)
**Layout:** Side-by-side image (40%) + content (60%)
```
┌─────────────────────────────────────────────┐
│  Image (40%)  │  Category Label             │
│  (4:3 ratio) │  Product Title              │
│  w/ Badge   │  ⭐ Rating + Reviews        │
│  & Hover    │  Description (2 lines)      │
│  Zoom       │  Feature Chips (max 3)      │
│             │  Price | Save % | Button    │
└─────────────────────────────────────────────┘
```

**Props:**
- `name`: Product name
- `image`: Product image URL
- `price`: Current price (string or number)
- `originalPrice?`: Original price for discount calculation
- `rating`: Star rating (0-5)
- `reviewCount`: Number of reviews
- `description`: Product description
- `features[]`: Array of feature strings (first 3 displayed as chips)
- `badge?`: Optional badge label (e.g., "Best Seller")
- `category?`: Category label for header (defaults to "Top Pick")
- `link`: Affiliate link

### Grid Layouts (UPDATED - All 2-Column)
- **ProductGrid:** `grid-cols-1 md:grid-cols-2` (2 columns on desktop)
- **ProductCategorySection:** `grid-cols-1 md:grid-cols-2` (2 columns on desktop)
- **ProductsSection:** `grid-cols-1 md:grid-cols-2` (2 columns on desktop)
- **Pagination:** 10 products per page on category pages

**Gap Spacing:** `gap-6 md:gap-8` for responsive sizing

## Component Props Flow - Products

```
ProductCard.astro (Horizontal Layout)
    ├─ Props received from grid components
    ├─ Price parsing (handles string/number formats)
    ├─ Savings % calculation (if originalPrice exists)
    ├─ Star rating rendering (full + half stars)
    ├─ Feature chips (max 3, filtered from features array)
    └─ Renders:
       ├─ Image section (left, 40% width)
       ├─ Content section (right, 60% width)
       │  ├─ Category label + Title
       │  ├─ Star rating display
       │  ├─ Description (2-line clamp)
       │  ├─ Feature chips
       │  └─ Price + Savings + Button
       └─ Hover effects (image zoom, shadow lift)

ProductGrid.astro
    ├─ Input: products[], categoryLabel
    ├─ Grid: 2 columns (mobile: 1, desktop: 2)
    └─ Maps products → ProductCard with category

ProductCategorySection.astro
    ├─ Section per category (alternating bg)
    ├─ Category header + "View All" button
    ├─ ProductCard rendering with category={title}
    └─ Used on: /products main page

ProductsSection.astro
    ├─ Featured products on homepage
    ├─ 2-column grid
    ├─ ProductCard rendering with category="Top Picks"
    └─ Link to /products

ProductCategoryLayout.astro
    ├─ Paginated category views
    ├─ Sidebar for future filters
    ├─ ProductGrid with 10 items per page
    ├─ Pagination controls
    └─ JSON-LD schema for SEO
```

## Tag Category Organization

```
TAG_CATEGORIES
│
├─ Nutrition
│  ├─ nutrition
│  ├─ dog food
│  ├─ cat food
│  ├─ diet
│  ├─ supplements
│  └─ health & wellness
│
├─ Training
│  ├─ training
│  ├─ dog training
│  ├─ puppy training
│  ├─ cat training
│  ├─ behavior
│  ├─ obedience
│  └─ behavioral training
│
├─ Health
│  ├─ pet health
│  ├─ health
│  ├─ wellness
│  ├─ veterinary
│  ├─ medical
│  ├─ disease
│  └─ preventive care
│
├─ Care
│  ├─ care
│  ├─ pet tips
│  ├─ grooming
│  ├─ hygiene
│  ├─ maintenance
│  ├─ lifestyle
│  └─ new owner
│
└─ Lifestyle
   ├─ lifestyle
   ├─ enrichment
   ├─ play
   ├─ exercise
   ├─ activities
   ├─ travel
   └─ pet gear
```

## Front Matter to Navigation & Product Mapping

```
Front Matter (Blog Posts)
│
├─ title: "The Ultimate Guide..."
├─ tags: ["nutrition", "dog food", "pet health"]
│         ↓
│         First tag category determined via getTagCategory()
│         ↓
│         Used in breadcrumb: Dogs / Nutrition / Article
│
└─ Rendered in:
   ├─ Breadcrumb navigation
   ├─ Collection page (Dogs)
   ├─ Tag pages (/tag/nutrition, /tag/dog-food)
   └─ Tag clouds

Product Data (/src/data/products.ts)
│
├─ productCategories[]
│  ├─ id: "dog-food", "cat-food", "beds"
│  ├─ title: "Best Dog Food" (displayed in cards)
│  ├─ products[]
│  │  ├─ name: "Blue Buffalo..."
│  │  ├─ price: "$54.99" (string or number)
│  │  ├─ originalPrice?: "$69.99" (triggers savings calc)
│  │  ├─ rating: 4.8
│  │  ├─ reviewCount: 2547
│  │  ├─ features: ["Real Chicken", "No Preservatives", ...]
│  │  ├─ badge?: "Best Seller"
│  │  └─ featured?: true
│  └─ Used in:
│     ├─ /products (ProductsSection, ProductCategorySection)
│     ├─ /products/[category]/[page] (paginated)
│     └─ Homepage featured products
```

## URL Pattern Summary

| Type | Pattern | Example | Layout | Dynamic? |
|------|---------|---------|--------|----------|
| Home | `/` | / | Featured products (2-col) | No |
| All Tags | `/tags` | /tags | Tag cloud by category | No |
| Tag Filter | `/tag/[tag]` | /tag/nutrition | 2-column article cards | Yes |
| Collection | `/collection/[coll]` | /collection/dogs | Article grid | Yes |
| Post | `/blog/[slug]` | /blog/dog-food-guide | Full article + metadata | Yes |
| Products Home | `/products` | /products | Category sections (2-col) | No |
| Products Category | `/products/[cat]/[page]` | /products/dog-food/1 | Paginated 2-col cards | Yes |

## Link Updates in Components

**Header.astro** (Navigation)
```
Dogs → /collection/dogs
Cats → /collection/cats
Tags → /tags
Products → /products
```

**ProductCard.astro** (Affiliate Links)
```
"Check Price" button → external affiliate link
Clickable title/image → external affiliate link
```

**ProductCategoryLayout** (Pagination)
```
/products/[category]      → First page (10 items)
/products/[category]/1    → First page (same)
/products/[category]/2    → Second page
/products/[category]/[n]  → Page n
```
