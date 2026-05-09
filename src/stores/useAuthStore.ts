import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AuthUser {
  readonly id: string
  readonly name: string
  readonly email: string
}

interface AuthState {
  readonly user: AuthUser | null
  readonly token: string | null
  signIn: (user: AuthUser, token: string) => void
  signOut: () => void
}
// it should also have add address button
// 			- when user clicks on add address button, it should show the add address form
// 			- by default it should show the add address form
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      signIn: (user, token) => set({ user, token }),
      signOut: () => set({ user: null, token: null }),
    }),
    { name: 'auth-storage' },
  ),
)
