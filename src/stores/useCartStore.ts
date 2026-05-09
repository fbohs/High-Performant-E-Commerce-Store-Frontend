import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  readonly id: string
  readonly quantity: number
}

interface CartState {
  readonly items: readonly CartItem[]
  addItem: (id: string) => void
  removeItem: (id: string) => void
  clear: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (id) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === id ? { ...i, quantity: i.quantity + 1 } : i,
              ),
            }
          }
          return { items: [...state.items, { id, quantity: 1 }] }
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    { name: 'cart-storage' },
  ),
)

export const useCartCount = (): number =>
  useCartStore((s) => s.items.reduce((acc, i) => acc + i.quantity, 0))
