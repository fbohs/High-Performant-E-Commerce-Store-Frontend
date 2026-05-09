'use client'

import { useEffect, useState } from 'react'
import { Alert, Chip, CircularProgress } from '@mui/material'
import { ApiError } from '@/services/api'
import { listOrders, type Order } from '@/services/orders'

const STATUS_COLORS: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  PENDING: 'warning',
  PROCESSING: 'info',
  SHIPPED: 'info',
  DELIVERED: 'success',
  CANCELLED: 'error',
}

const formatAmount = (value: number | string): string => {
  const n = typeof value === 'string' ? Number(value) : value
  if (!Number.isFinite(n)) return String(value)
  return `$${n.toFixed(2)}`
}

const formatDate = (iso: string): string => {
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString()
}

export const AccountOrders: React.FC = () => {
  const [orders, setOrders] = useState<readonly Order[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    listOrders()
      .then((data) => {
        if (!cancelled) setOrders(data.orders)
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : 'Could not load your orders.')
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="flex flex-col gap-4">
      <header>
        <h1 className="text-2xl font-semibold text-gray-900">Your orders</h1>
        <p className="text-sm text-gray-600">All orders you&apos;ve placed.</p>
      </header>

      {error && <Alert severity="error">{error}</Alert>}

      {orders === null && !error ? (
        <div className="flex min-h-[30vh] items-center justify-center">
          <CircularProgress aria-label="Loading orders" />
        </div>
      ) : orders && orders.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-gray-600">
          You haven&apos;t placed any orders yet.
        </div>
      ) : orders && orders.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {orders.map((order) => (
            <li
              key={order.id}
              className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4"
            >
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Order #{order.id}</span>
                <span className="text-base font-semibold text-gray-900">
                  {formatAmount(order.total)}
                </span>
                <span className="text-xs text-gray-500">
                  Placed {formatDate(order.createdAt)}
                </span>
              </div>
              <Chip
                label={order.status}
                color={STATUS_COLORS[order.status] ?? 'default'}
                size="small"
              />
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}
