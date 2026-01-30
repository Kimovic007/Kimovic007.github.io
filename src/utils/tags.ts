/**
 * Tags utility for managing blog tags and their categorization
 */

// Map of collection names (directories) to human-readable names
export const COLLECTIONS = {
  dogs: 'Dogs',
  cats: 'Cats',
  'products-reviews': 'Product Reviews',
} as const;

export type CollectionName = keyof typeof COLLECTIONS;

// Tag categories and their tags
export const TAG_CATEGORIES = {
  Nutrition: [
    'nutrition',
    'dog food',
    'cat food',
    'food',
    'diet',
    'supplements',
    'health & wellness',
    "feeding guide"
  ],
  Training: [
    'training',
    'dog training',
    'puppy training',
    'cat training',
    'behavior',
    'obedience',
    'behavioral training',
    'positive reinforcement',
  ],
  Health: [
    'pet health',
    'health',
    'wellness',
    'veterinary',
    'medical',
    'disease',
    'preventive care',
  ],
  Care: [
    'care',
    'pet tips',
    'grooming',
    'hygiene',
    'maintenance',
    'lifestyle',
    'new owner',
  ],
  Lifestyle: [
    'lifestyle',
    'enrichment',
    'play',
    'exercise',
    'activities',
    'travel',
    'pet gear',
  ],
} as const;

export type TagCategory = keyof typeof TAG_CATEGORIES;

/**
 * Get the tag category for a given tag
 * Returns the category name or null if tag not found
 */
export function getTagCategory(tag: string): TagCategory | null {
  const normalizedTag = tag.toLowerCase();
  
  for (const [category, tags] of Object.entries(TAG_CATEGORIES)) {
    if (tags.some(t => t.toLowerCase() === normalizedTag)) {
      return category as TagCategory;
    }
  }
  
  return null;
}

/**
 * Get all unique tags from a collection of posts
 */
export function getUniqueTags(posts: Array<{ data: { tags: string[] } }>): string[] {
  const tagsSet = new Set<string>();
  
  posts.forEach(post => {
    post.data.tags.forEach(tag => {
      tagsSet.add(tag.toLowerCase());
    });
  });
  
  return Array.from(tagsSet).sort();
}

/**
 * Filter posts by tag
 */
export function filterPostsByTag(
  posts: Array<{ data: { tags: string[] } }>,
  tag: string
): Array<{ data: { tags: string[] } }> {
  const normalizedTag = tag.toLowerCase();
  
  return posts.filter(post =>
    post.data.tags.some(t => t.toLowerCase() === normalizedTag)
  );
}

/**
 * Group tags by category
 */
export function groupTagsByCategory(): Record<TagCategory, string[]> {
  const result: Record<TagCategory, string[]> = {} as Record<TagCategory, string[]>;
  
  for (const [category, tags] of Object.entries(TAG_CATEGORIES)) {
    result[category as TagCategory] = Array.from(tags) as string[];
  }
  
  return result;
}

/**
 * Get all tags
 */
export function getAllTags(): string[] {
  return Object.values(TAG_CATEGORIES).flat();
}

/**
 * Get topic (category name) from an array of tags
 * Returns the first matching TagCategory, or fallback if none match
 */
export function getTopicFromTags(
  tags: string[],
  fallback: string | null = null
): TagCategory | string | null {
  for (const tag of tags) {
    const category = getTagCategory(tag);
    if (category) return category;
  }
  return fallback;
}

/**
 * Get the primary (first) tag for each TAG_CATEGORY
 * Useful for linking to a category's representative tag page
 */
export function getCategoryPrimaryTags(): Record<TagCategory, string> {
  const result: Record<TagCategory, string> = {} as Record<TagCategory, string>;
  
  for (const [category, tags] of Object.entries(TAG_CATEGORIES)) {
    result[category as TagCategory] = tags[0];
  }
  
  return result;
}

/**
 * Check if a tag is a category name (e.g., "training", "nutrition")
 * Returns the category name if it matches, null otherwise
 */
export function isCategoryTag(tag: string): TagCategory | null {
  const normalizedTag = tag.toLowerCase();
  const categoryNames = Object.keys(TAG_CATEGORIES).map(c => c.toLowerCase());
  
  if (categoryNames.includes(normalizedTag)) {
    // Return the properly-cased category name
    return Object.keys(TAG_CATEGORIES).find(
      c => c.toLowerCase() === normalizedTag
    ) as TagCategory;
  }
  return null;
}

/**
 * Get all tags for a category
 * Returns array of tags if category exists, empty array otherwise
 */
export function getCategoryTags(category: TagCategory): readonly string[] {
  return TAG_CATEGORIES[category] || [];
}

/**
 * Filter posts by category - matches ANY tag in the category
 * Use this for category-level filtering (e.g., "Training" shows all training-related posts)
 */
export function filterPostsByCategory(
  posts: Array<{ data: { tags: string[] } }>,
  category: TagCategory
): Array<{ data: { tags: string[] } }> {
  const categoryTags = getCategoryTags(category).map(t => t.toLowerCase());
  
  return posts.filter(post =>
    post.data.tags.some(t => categoryTags.includes(t.toLowerCase()))
  );
}
