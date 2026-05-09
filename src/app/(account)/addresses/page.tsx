import type { Metadata } from 'next'
import { AccountAddresses } from '@/components/AccountAddresses'

export const metadata: Metadata = {
  title: 'Addresses · ShopHub',
}

export default function AddressesPage() {
  return <AccountAddresses />
}
