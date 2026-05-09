import type { Metadata } from 'next'
import { SignIn } from '@/components/SignIn'

export const metadata: Metadata = {
  title: 'Sign in · ShopHub',
}

export default function SignInPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-md flex-col justify-center px-4 py-10">
      <SignIn />
    </main>
  )
}
