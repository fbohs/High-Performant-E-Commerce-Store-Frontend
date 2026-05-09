import { apiFetch } from '@/services/api'

export interface Address {
  readonly id: number
  readonly label: string | null
  readonly line1: string
  readonly line2: string | null
  readonly city: string
  readonly state: string
  readonly country: string
  readonly postalCode: string
  readonly isDefault: boolean
}

export const listAddresses = async (): Promise<readonly Address[]> => {
  const data = await apiFetch<{ readonly addresses: readonly Address[] }>(
    '/users/me/addresses',
  )
  return data.addresses
}
