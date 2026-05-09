import type { Metadata } from 'next'
import { AccountProfile } from '@/components/AccountProfile'

export const metadata: Metadata = {
  title: 'Account · ShopHub',
}

export default function AccountPage() {
  return <AccountProfile />
}
