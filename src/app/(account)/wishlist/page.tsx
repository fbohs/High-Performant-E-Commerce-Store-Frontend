import type { Metadata } from 'next'
import { AccountWishlist } from '@/components/AccountWishlist'

export const metadata: Metadata = {
  title: 'Wishlist · ShopHub',
}

export default function WishlistPage() {
  return <AccountWishlist />
}
