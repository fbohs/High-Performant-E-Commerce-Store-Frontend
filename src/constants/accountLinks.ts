export interface AccountLink {
  readonly href: string
  readonly label: string
}

export const ACCOUNT_LINKS: readonly AccountLink[] = [
  { href: '/account', label: 'Your account' },
  { href: '/orders', label: 'Your orders' },
  { href: '/addresses', label: 'Your addresses' },
  { href: '/wishlist', label: 'Your wishlist' },
]
