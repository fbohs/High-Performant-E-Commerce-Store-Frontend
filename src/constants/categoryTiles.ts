export interface CategoryTile {
  readonly slug: string
  readonly label: string
  readonly emoji: string
}

export const CATEGORY_TILES: readonly CategoryTile[] = [
  { slug: 'electronics', label: 'Electronics', emoji: '🔌' },
  { slug: 'fashion', label: 'Fashion', emoji: '👗' },
  { slug: 'home-kitchen', label: 'Home', emoji: '🏠' },
  { slug: 'beauty', label: 'Beauty', emoji: '💄' },
  { slug: 'sports', label: 'Sports', emoji: '⚽' },
  { slug: 'toys', label: 'Toys', emoji: '🧸' },
  { slug: 'books', label: 'Books', emoji: '📚' },
  { slug: 'grocery', label: 'Grocery', emoji: '🛒' },
]
