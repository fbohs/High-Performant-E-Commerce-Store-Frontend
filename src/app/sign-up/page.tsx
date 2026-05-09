import { Suspense } from 'react'
import type { Metadata } from 'next'
import { SignUp } from '@/components/SignUp'

export const metadata: Metadata = {
  title: 'Sign up · ShopHub',
}

export default function SignUpPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-md flex-col justify-center px-4 py-10">
      <Suspense fallback={null}>
        <SignUp />
      </Suspense>
    </main>
  )
}
