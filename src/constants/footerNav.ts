export interface FooterLink {
  readonly label: string
  readonly href: string
}

export interface FooterSection {
  readonly title: string
  readonly links: readonly FooterLink[]
}

export const FOOTER_SECTIONS: readonly FooterSection[] = [
  {
    title: 'Shop',
    links: [
      { label: 'New Arrivals', href: '/new' },
      { label: 'Best Sellers', href: '/best-sellers' },
      { label: 'Deals', href: '/deals' },
      { label: 'Gift Cards', href: '/gift-cards' },
    ],
  },
  {
    title: 'Customer Service',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Shipping & Delivery', href: '/help/shipping' },
      { label: 'Returns & Refunds', href: '/help/returns' },
      { label: 'Track Order', href: '/orders/track' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Sign In', href: '/account/sign-in' },
      { label: 'Your Orders', href: '/account/orders' },
      { label: 'Wishlist', href: '/account/wishlist' },
      { label: 'Saved Addresses', href: '/account/addresses' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About ShopHub', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Sustainability', href: '/sustainability' },
    ],
  },
]

export const LEGAL_LINKS: readonly FooterLink[] = [
  { label: 'Privacy Policy', href: '/legal/privacy' },
  { label: 'Terms of Service', href: '/legal/terms' },
  { label: 'Cookies', href: '/legal/cookies' },
  { label: 'Accessibility', href: '/legal/accessibility' },
]
