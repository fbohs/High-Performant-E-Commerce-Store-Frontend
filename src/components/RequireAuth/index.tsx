'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CircularProgress } from '@mui/material'
import { useAuthStore } from '@/stores/useAuthStore'

interface Props {
  readonly children: React.ReactNode
}

export const RequireAuth: React.FC<Props> = ({ children }) => {
  const user = useAuthStore((s) => s.user)
  const router = useRouter()
  // Start as `false` on both server and client so we never touch the persist
  // API during render. The effect below flips it to `true` after mount.
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const persistApi = useAuthStore.persist
    if (!persistApi) {
      // No persist middleware (or not attached) — treat the store as ready.
      setHydrated(true)
      return
    }
    if (persistApi.hasHydrated()) {
      setHydrated(true)
      return
    }
    const unsub = persistApi.onFinishHydration(() => setHydrated(true))
    return unsub
  }, [])

  useEffect(() => {
    if (hydrated && !user) router.replace('/sign-in')
  }, [hydrated, user, router])

  if (!hydrated || !user) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <CircularProgress aria-label="Loading" />
      </div>
    )
  }

  return <>{children}</>
}
