import { AccountShell } from '@/components/AccountShell'
import { RequireAuth } from '@/components/RequireAuth'

export default function AccountSectionLayout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 md:py-8">
      <RequireAuth>
        <AccountShell>{children}</AccountShell>
      </RequireAuth>
    </main>
  )
}
