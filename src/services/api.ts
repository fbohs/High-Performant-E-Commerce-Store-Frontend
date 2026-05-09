import { publicEnv } from '@/lib/publicEnv'
import { useAuthStore } from '@/stores/useAuthStore'

export class ApiError extends Error {
  readonly status: number
  readonly details?: readonly string[]

  constructor(status: number, message: string, details?: readonly string[]) {
    super(message)
    this.status = status
    this.details = details
    this.name = 'ApiError'
  }
}

interface ApiErrorBody {
  readonly error?: string
  readonly message?: string
  readonly details?: readonly string[]
}

export interface ApiOptions extends RequestInit {
  // Default true: a 401 from the API is treated as session expiry and clears
  // the auth store. Endpoints where 401 is a *business* response — e.g.
  // /auth/change-password returning "current password is incorrect" — must
  // pass false so an actively-signed-in user isn't kicked out.
  readonly signOutOn401?: boolean
}

export const apiFetch = async <T>(path: string, options?: ApiOptions): Promise<T> => {
  const { signOutOn401 = true, ...init } = options ?? {}

  const token = useAuthStore.getState().token
  const headers = new Headers(init.headers)
  if (init.body !== undefined && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  if (token) headers.set('Authorization', `Bearer ${token}`)

  let res: Response
  try {
    res = await fetch(`${publicEnv.NEXT_PUBLIC_API_BASE_URL}${path}`, { ...init, headers })
  } catch {
    throw new ApiError(0, 'Could not reach the server. Check your connection and try again.')
  }

  if (!res.ok) {
    let body: ApiErrorBody = {}
    try {
      body = (await res.json()) as ApiErrorBody
    } catch {
      // body wasn't JSON; keep empty
    }
    if (res.status === 401 && signOutOn401) useAuthStore.getState().signOut()
    throw new ApiError(
      res.status,
      body.error ?? body.message ?? `Request failed (${res.status}).`,
      body.details,
    )
  }

  if (res.status === 204) return undefined as T
  return (await res.json()) as T
}
