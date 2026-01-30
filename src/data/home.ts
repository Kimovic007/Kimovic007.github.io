import type { TagCategory } from '../utils/tags';

export type Category = {
  name: TagCategory | 'All Tags';
  slug: string;
  icon: string;
  count: number;
  color: string;
  href?: string;
};

export type CategoryMeta = Omit<Category, 'count'>;

export type FeaturedProduct = {
  id?: string;
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
  /** Whether this product should be featured on the homepage */
  featured?: boolean;
  /** Whether this product is published and visible */
  published?: boolean;
};

export type QuickTip = {
  title: string;
  description: string;
  iconPath: string;
  iconColorClass: string;
  iconBgClass: string;
};

export const categoryMeta: CategoryMeta[] = [
  { name: 'Nutrition', slug: 'nutrition', icon: '🥗', color: 'from-forest-green to-forest-green-dark' },
  { name: 'Training', slug: 'training', icon: '🎓', color: 'from-forest-green to-forest-green-dark' },
  { name: 'Health', slug: 'health', icon: '❤️', color: 'from-champagne to-champagne-muted' },
  { name: 'Care', slug: 'care', icon: '🐾', color: 'from-warm-taupe to-slate-grey' },
  { name: 'Lifestyle', slug: 'lifestyle', icon: '🏠', color: 'from-forest-green to-champagne' },
  { name: 'All Tags', slug: 'tags', icon: '🏷️', color: 'from-forest-green to-warm-taupe', href: '/tags' },
];

/**
 * Dynamically generates the featured products list by filtering all products
 * from the product catalog where featured === true.
 * This ensures consistency between the products database and homepage display.
 */
import { productCategories } from './products';

// Extract all featured products from all categories by flattening and filtering
export const featuredProducts: FeaturedProduct[] = productCategories
  .flatMap(category => category.products)
  .filter((product): product is FeaturedProduct & { featured: true } => product.featured === true);

export const quickTips: QuickTip[] = [
  {
    title: 'Regular Vet Visits',
    description: 'Annual checkups help catch health issues early and keep vaccinations current.',
    iconPath: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    iconColorClass: 'text-forest-green',
    iconBgClass: 'bg-alabaster'
  },
  {
    title: 'Quality Nutrition',
    description: 'Feed age-appropriate, high-quality food to support overall health and longevity.',
    iconPath: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
    iconColorClass: 'text-forest-green',
    iconBgClass: 'bg-alabaster'
  },
  {
    title: 'Daily Exercise',
    description: 'Physical activity keeps pets fit, reduces behavioral issues, and strengthens your bond.',
    iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
    iconColorClass: 'text-champagne',
    iconBgClass: 'bg-forest-green'
  },
  {
    title: 'Mental Stimulation',
    description: 'Puzzle toys and training sessions keep your pet\'s mind sharp and engaged.',
    iconPath: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    iconColorClass: 'text-champagne',
    iconBgClass: 'bg-forest-green'
  }
];
