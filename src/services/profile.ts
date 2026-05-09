import { apiFetch } from '@/services/api'

export interface ProfileUser {
  readonly id: string
  readonly email: string
  readonly name: string | null
  readonly phone: string | null
  readonly role: string
  readonly isVerified?: boolean
  readonly createdAt?: string
}

export interface ProfileUpdate {
  readonly name?: string
  readonly phone?: string
}

export const getProfile = async (): Promise<ProfileUser> => {
  const data = await apiFetch<{ readonly user: ProfileUser }>('/auth/me')
  return data.user
}

export const updateProfile = async (input: ProfileUpdate): Promise<ProfileUser> => {
  const data = await apiFetch<{ readonly user: ProfileUser }>('/auth/me', {
    method: 'PUT',
    body: JSON.stringify(input),
  })
  return data.user
}

export interface ChangePasswordInput {
  readonly currentPassword: string
  readonly newPassword: string
}

export const changePassword = async (input: ChangePasswordInput): Promise<void> => {
  await apiFetch<{ readonly message: string }>('/auth/change-password', {
    method: 'PUT',
    body: JSON.stringify(input),
    // 401 here means "current password is incorrect", not session expiry,
    // so don't sign the user out.
    signOutOn401: false,
  })
}
