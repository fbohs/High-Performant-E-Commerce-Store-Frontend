import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LocaleState {
  readonly countryCode: string
  setCountry: (code: string) => void
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      countryCode: 'US',
      setCountry: (countryCode) => set({ countryCode }),
    }),
    { name: 'locale-storage' },
  ),
)
