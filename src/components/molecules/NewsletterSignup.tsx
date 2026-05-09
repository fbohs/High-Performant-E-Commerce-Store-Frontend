'use client'

import { useState } from 'react'
import SendIcon from '@mui/icons-material/Send'

type Status = 'idle' | 'success'

export const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('success')
    setEmail('')
  }

  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-white">
        Stay in the loop
      </h3>
      <p className="mb-3 text-sm text-gray-300">
        Subscribe to get the latest deals and product updates.
      </p>
      <form
        onSubmit={onSubmit}
        className="flex w-full max-w-sm items-stretch overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-white/10 focus-within:ring-2 focus-within:ring-amber-400"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          className="min-w-0 flex-1 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="flex shrink-0 items-center justify-center bg-amber-400 px-4 text-gray-900 hover:bg-amber-500 focus:outline-none focus-visible:bg-amber-500"
        >
          <SendIcon fontSize="small" />
        </button>
      </form>
      {status === 'success' && (
        <p role="status" className="mt-2 text-sm text-amber-300">
          Thanks for subscribing!
        </p>
      )}
    </div>
  )
}
