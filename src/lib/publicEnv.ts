// Browser-safe env. Only NEXT_PUBLIC_* vars live here; Next.js inlines these
// at build time so they are available in client bundles. Do not put secrets
// in this file — anything imported here may end up shipped to the browser.

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL

if (!NEXT_PUBLIC_API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not set. See .env.example.')
}
if (!NEXT_PUBLIC_APP_URL) {
  throw new Error('NEXT_PUBLIC_APP_URL is not set. See .env.example.')
}

export const publicEnv = Object.freeze({
  NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_APP_URL,
})

export type PublicEnv = typeof publicEnv
