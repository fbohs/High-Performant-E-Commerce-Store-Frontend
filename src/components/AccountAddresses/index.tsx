'use client'

import { useEffect, useState } from 'react'
import { Alert, Chip, CircularProgress } from '@mui/material'
import { ApiError } from '@/services/api'
import { listAddresses, type Address } from '@/services/addresses'

export const AccountAddresses: React.FC = () => {
  const [addresses, setAddresses] = useState<readonly Address[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    listAddresses()
      .then((list) => {
        if (!cancelled) setAddresses(list)
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : 'Could not load your addresses.')
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="flex flex-col gap-4">
      <header>
        <h1 className="text-2xl font-semibold text-gray-900">Your addresses</h1>
        <p className="text-sm text-gray-600">
          Saved delivery addresses linked to your account.
        </p>
      </header>

      {error && <Alert severity="error">{error}</Alert>}

      {addresses === null && !error ? (
        <div className="flex min-h-[30vh] items-center justify-center">
          <CircularProgress aria-label="Loading addresses" />
        </div>
      ) : addresses && addresses.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-gray-600">
          You haven&apos;t added any addresses yet.
        </div>
      ) : addresses && addresses.length > 0 ? (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {addresses.map((addr) => (
            <li
              key={addr.id}
              className="flex flex-col gap-1 rounded-lg border border-gray-200 bg-white p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">
                  {addr.label ?? 'Address'}
                </span>
                {addr.isDefault && <Chip label="Default" size="small" color="primary" />}
              </div>
              <p className="text-sm text-gray-700">{addr.line1}</p>
              {addr.line2 && <p className="text-sm text-gray-700">{addr.line2}</p>}
              <p className="text-sm text-gray-700">
                {addr.city}, {addr.state} {addr.postalCode}
              </p>
              <p className="text-sm text-gray-500">{addr.country}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}
