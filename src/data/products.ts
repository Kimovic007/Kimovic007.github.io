import type { FeaturedProduct } from './home';
import { dogFoodCategory } from './product-categories/dog-food.ts';
import { catFoodCategory } from './product-categories/cat-food.ts';
import { bedsCategory } from './product-categories/beds.ts';
import { toysCategory } from './product-categories/toys.ts';
import { accessoriesCategory } from './product-categories/accessories.ts';
import { groomingCategory } from './product-categories/grooming.ts';

export type ProductCategory = {
  id: string;
  title: string;
  icon: string;
  description: string;
  /** Array of featured and regular products in this category */
  products: FeaturedProduct[];
  alternate?: boolean;
};

export const productCategories: ProductCategory[] = [
  dogFoodCategory,
  catFoodCategory,
  bedsCategory,
  toysCategory,
  accessoriesCategory,
  groomingCategory
];
