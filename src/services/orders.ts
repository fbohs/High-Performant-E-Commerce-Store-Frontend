import { apiFetch } from '@/services/api'

export interface Order {
  readonly id: number
  readonly status: string
  readonly subtotal: number | string
  readonly total: number | string
  readonly createdAt: string
  readonly promoCode: string | null
}

export interface OrdersPage {
  readonly orders: readonly Order[]
  readonly pagination: { readonly page: number; readonly limit: number }
}

export const listOrders = async (page = 1, limit = 10): Promise<OrdersPage> => {
  return apiFetch<OrdersPage>(`/orders?page=${page}&limit=${limit}`)
}
