/**
 * DISABLED: Pure blog mode
 * Product data system is disabled while the site operates as a pure content blog.
 * To restore, uncomment the imports below and restore the productCategories array.
 * See docs/archived/PRODUCT_ID_SYSTEM.md for restoration instructions.
 */

import type { FeaturedProduct } from './home';

/*
ORIGINAL IMPORTS - COMMENTED OUT FOR RESTORATION:
import { dogFoodCategory } from './product-categories/dog-food.ts';
import { catFoodCategory } from './product-categories/cat-food.ts';
import { bedsCategory } from './product-categories/beds.ts';
import { toysCategory } from './product-categories/toys.ts';
import { accessoriesCategory } from './product-categories/accessories.ts';
import { groomingCategory } from './product-categories/grooming.ts';
*/

export type ProductCategory = {
  id: string;
  title: string;
  icon: string;
  description: string;
  /** Array of featured and regular products in this category */
  products: FeaturedProduct[];
  alternate?: boolean;
};

// Empty array for pure blog mode - prevents import errors
export const productCategories: ProductCategory[] = [];

/*
ORIGINAL EXPORT - COMMENTED OUT FOR RESTORATION:
export const productCategories: ProductCategory[] = [
  dogFoodCategory,
  catFoodCategory,
  bedsCategory,
  toysCategory,
  accessoriesCategory,
  groomingCategory
];
*/
