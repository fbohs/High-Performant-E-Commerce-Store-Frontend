import type { Metadata } from 'next'
import { AccountOrders } from '@/components/AccountOrders'

export const metadata: Metadata = {
  title: 'Orders · ShopHub',
}

export default function OrdersPage() {
  return <AccountOrders />
}
