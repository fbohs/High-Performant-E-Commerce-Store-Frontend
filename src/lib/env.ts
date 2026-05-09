// Server-side environment loader.
//
// This module reads `process.env` once at import time, validates every required
// variable, and exports a typed, frozen `env` object. Validation failures throw
// with the full list of problems so misconfig surfaces at boot — not on the
// first request that happens to need a missing value.
//
// Do NOT import this from Client Components — server secrets (JWT_SECRET,
// API_KEY) are not present in the browser bundle, so the validation would
// throw at runtime on the client. For browser-safe access to NEXT_PUBLIC_*
// vars, import from `@/lib/publicEnv` instead.

type NodeEnv = 'development' | 'production' | 'test'

export interface Env {
  readonly NEXT_PUBLIC_API_BASE_URL: string
  readonly NEXT_PUBLIC_APP_URL: string
  readonly API_BASE_URL: string
  readonly API_KEY: string
  readonly JWT_SECRET: string
  readonly JWT_EXPIRES_IN: string
  readonly NODE_ENV: NodeEnv
}

const isUrl = (value: string): boolean => {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

const loadEnv = (): Env => {
  const errors: string[] = []

  const requireString = (name: string, value: string | undefined): string => {
    if (!value || value.trim() === '') {
      errors.push(`${name} is required`)
      return ''
    }
    return value
  }

  const requireUrl = (name: string, value: string | undefined): string => {
    const v = requireString(name, value)
    if (v && !isUrl(v)) errors.push(`${name} must be a valid URL (got "${v}")`)
    return v
  }

  const requireMinLength = (name: string, value: string | undefined, min: number): string => {
    const v = requireString(name, value)
    if (v && v.length < min) errors.push(`${name} must be at least ${min} characters`)
    return v
  }

  const NEXT_PUBLIC_API_BASE_URL = requireUrl(
    'NEXT_PUBLIC_API_BASE_URL',
    process.env.NEXT_PUBLIC_API_BASE_URL,
  )
  const NEXT_PUBLIC_APP_URL = requireUrl(
    'NEXT_PUBLIC_APP_URL',
    process.env.NEXT_PUBLIC_APP_URL,
  )
  const API_BASE_URL = requireUrl('API_BASE_URL', process.env.API_BASE_URL)
  const API_KEY = requireString('API_KEY', process.env.API_KEY)
  const JWT_SECRET = requireMinLength('JWT_SECRET', process.env.JWT_SECRET, 32)
  const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '7d'

  const rawNodeEnv = process.env.NODE_ENV ?? 'development'
  if (rawNodeEnv !== 'development' && rawNodeEnv !== 'production' && rawNodeEnv !== 'test') {
    errors.push(`NODE_ENV must be development, production, or test (got "${rawNodeEnv}")`)
  }
  const NODE_ENV = rawNodeEnv as NodeEnv

  if (errors.length > 0) {
    throw new Error(
      [
        'Invalid environment configuration:',
        ...errors.map((e) => `  - ${e}`),
        '',
        'See .env.example for the full list of required variables.',
      ].join('\n'),
    )
  }

  return Object.freeze({
    NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_APP_URL,
    API_BASE_URL,
    API_KEY,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    NODE_ENV,
  })
}

export const env: Env = loadEnv()
