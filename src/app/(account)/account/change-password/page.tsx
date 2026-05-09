import type { Metadata } from 'next'
import { ChangePassword } from '@/components/ChangePassword'

export const metadata: Metadata = {
  title: 'Change password · ShopHub',
}

export default function ChangePasswordPage() {
  return <ChangePassword />
}
