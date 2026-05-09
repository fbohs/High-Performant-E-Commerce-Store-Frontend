// Next.js calls `register()` once per server process at boot, before any
// request is handled. We import the env loader here so misconfiguration
// fails fast at startup with a clear error, instead of crashing on the
// first request that happens to read a missing variable.
//
// Only run on the Node.js runtime — the Edge runtime has a different
// `process.env` surface and may not expose every variable.

export const register = async (): Promise<void> => {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('@/lib/env')
  }
}
