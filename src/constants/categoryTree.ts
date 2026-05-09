export interface CategoryNode {
  readonly slug: string
  readonly label: string
  readonly children?: readonly CategoryNode[]
}

export const CATEGORY_TREE: readonly CategoryNode[] = [
  {
    slug: 'electronics',
    label: 'Electronics',
    children: [
      { slug: 'electronics/phones', label: 'Phones' },
      { slug: 'electronics/laptops', label: 'Laptops' },
      { slug: 'electronics/audio', label: 'Audio' },
      { slug: 'electronics/cameras', label: 'Cameras' },
    ],
  },
  {
    slug: 'fashion',
    label: 'Fashion',
    children: [
      { slug: 'fashion/men', label: 'Men' },
      { slug: 'fashion/women', label: 'Women' },
      { slug: 'fashion/kids', label: 'Kids' },
      { slug: 'fashion/shoes', label: 'Shoes' },
    ],
  },
  {
    slug: 'home-kitchen',
    label: 'Home & Kitchen',
    children: [
      { slug: 'home-kitchen/furniture', label: 'Furniture' },
      { slug: 'home-kitchen/cookware', label: 'Cookware' },
      { slug: 'home-kitchen/decor', label: 'Décor' },
      { slug: 'home-kitchen/bedding', label: 'Bedding' },
    ],
  },
  {
    slug: 'beauty',
    label: 'Beauty',
    children: [
      { slug: 'beauty/skincare', label: 'Skincare' },
      { slug: 'beauty/makeup', label: 'Makeup' },
      { slug: 'beauty/fragrance', label: 'Fragrance' },
    ],
  },
  {
    slug: 'sports',
    label: 'Sports & Outdoors',
    children: [
      { slug: 'sports/fitness', label: 'Fitness' },
      { slug: 'sports/outdoor', label: 'Outdoor Gear' },
      { slug: 'sports/cycling', label: 'Cycling' },
    ],
  },
  {
    slug: 'toys',
    label: 'Toys & Games',
    children: [
      { slug: 'toys/board-games', label: 'Board Games' },
      { slug: 'toys/educational', label: 'Educational' },
      { slug: 'toys/outdoor-play', label: 'Outdoor Play' },
    ],
  },
  {
    slug: 'books',
    label: 'Books',
    children: [
      { slug: 'books/fiction', label: 'Fiction' },
      { slug: 'books/non-fiction', label: 'Non-Fiction' },
      { slug: 'books/childrens', label: "Children's" },
    ],
  },
  {
    slug: 'grocery',
    label: 'Grocery',
    children: [
      { slug: 'grocery/pantry', label: 'Pantry' },
      { slug: 'grocery/snacks', label: 'Snacks' },
      { slug: 'grocery/beverages', label: 'Beverages' },
    ],
  },
]
