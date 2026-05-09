import { publicEnv } from '@/lib/publicEnv'
import { useAuthStore, type AuthUser } from '@/stores/useAuthStore'
import { apiFetch } from '@/services/api'

export type AuthErrorCode =
  | 'invalid_credentials'
  | 'invalid_email_format'
  | 'weak_password'
  | 'email_taken'
  | 'network'
  | 'unknown'

export class AuthError extends Error {
  readonly code: AuthErrorCode
  readonly details?: readonly string[]

  constructor(code: AuthErrorCode, message: string, details?: readonly string[]) {
    super(message)
    this.code = code
    this.name = 'AuthError'
    this.details = details
  }
}

export interface AuthResult {
  readonly user: AuthUser
  readonly token: string
}

export interface RegisteredUser {
  readonly user: AuthUser
}

export interface RegisterInput {
  readonly email: string
  readonly password: string
  readonly name?: string
  readonly phone?: string
}

interface ApiErrorBody {
  readonly error?: string
  readonly message?: string
  readonly details?: readonly string[]
}

interface RawUser {
  readonly id: string
  readonly email: string
  readonly name: string | null
}

const parseErrorBody = async (res: Response): Promise<ApiErrorBody> => {
  try {
    return (await res.json()) as ApiErrorBody
  } catch {
    return {}
  }
}

const classify = (status: number, body: ApiErrorBody): AuthError => {
  const fallbackMessage = body.error ?? body.message ?? `Request failed (${status}).`

  if (status === 401) {
    return new AuthError('invalid_credentials', 'Email or password is incorrect.')
  }
  if (status === 409) {
    return new AuthError('email_taken', body.error ?? 'An account already exists for this email.')
  }
  if (status === 400) {
    if (body.error === 'Invalid email format') {
      return new AuthError('invalid_email_format', 'Please enter a valid email address.')
    }
    if (body.error === 'Password does not meet requirements') {
      return new AuthError(
        'weak_password',
        'Password does not meet requirements.',
        body.details,
      )
    }
  }
  return new AuthError('unknown', fallbackMessage)
}

const normalizeUser = (raw: RawUser): AuthUser => ({
  id: raw.id,
  email: raw.email,
  name: raw.name?.trim() ? raw.name : raw.email.split('@')[0],
})

const postJson = async <T>(path: string, payload: unknown): Promise<T> => {
  let res: Response
  try {
    res = await fetch(`${publicEnv.NEXT_PUBLIC_API_BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new AuthError(
      'network',
      'Could not reach the server. Check your connection and try again.',
    )
  }

  if (!res.ok) {
    throw classify(res.status, await parseErrorBody(res))
  }

  return (await res.json()) as T
}

export const signInRequest = async (
  email: string,
  password: string,
): Promise<AuthResult> => {
  const data = await postJson<{ readonly token: string; readonly user: RawUser }>(
    '/auth/login',
    { email, password },
  )
  return { token: data.token, user: normalizeUser(data.user) }
}

export const signUpRequest = async (input: RegisterInput): Promise<RegisteredUser> => {
  const payload: RegisterInput = {
    email: input.email,
    password: input.password,
    ...(input.name?.trim() ? { name: input.name.trim() } : {}),
    ...(input.phone?.trim() ? { phone: input.phone.trim() } : {}),
  }
  const data = await postJson<{ readonly user: RawUser }>('/auth/register', payload)
  return { user: normalizeUser(data.user) }
}

// Best-effort revoke + clear: hits POST /auth/logout to blacklist the JWT's
// jti server-side, then clears the local store. If the server call fails
// (network, 5xx), we still sign out locally — the user clicked sign out and
// expects to be signed out regardless of backend availability.
export const signOutAndRevoke = async (): Promise<void> => {
  try {
    await apiFetch<{ readonly message: string }>('/auth/logout', { method: 'POST' })
  } catch {
    // ignore; local sign-out runs in finally
  } finally {
    useAuthStore.getState().signOut()
  }
}
