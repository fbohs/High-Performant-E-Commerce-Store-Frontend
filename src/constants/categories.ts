export interface Category {
  readonly slug: string
  readonly label: string
}

export const CATEGORIES: readonly Category[] = [
  { slug: 'all', label: 'All Categories' },
  { slug: 'electronics', label: 'Electronics' },
  { slug: 'fashion', label: 'Fashion' },
  { slug: 'home-kitchen', label: 'Home & Kitchen' },
  { slug: 'books', label: 'Books' },
  { slug: 'toys', label: 'Toys & Games' },
  { slug: 'beauty', label: 'Beauty' },
  { slug: 'sports', label: 'Sports & Outdoors' },
  { slug: 'grocery', label: 'Grocery' },
]
