import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  size: number
  quantity: number
}

interface CartState {
  items: CartItem[]

  // UI State
  isOpen: boolean
  isCheckoutOpen: boolean

  // 🔥 HYDRATION STATE
  hasHydrated: boolean
  setHasHydrated: (state: boolean) => void

  // UI Actions
  openCart: () => void
  closeCart: () => void

  openCheckout: () => void
  closeCheckout: () => void

  // Cart Actions
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string, size: number) => void
  updateQuantity: (id: string, size: number, quantity: number) => void
  clearCart: () => void

  // Helpers
  getTotalPrice: () => number
  getTotalItems: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // UI state
      isOpen: false,
      isCheckoutOpen: false,

      // 🔥 hydration default
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),

      // UI actions
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      openCheckout: () => set({ isCheckoutOpen: true }),
      closeCheckout: () => set({ isCheckoutOpen: false }),

      // Cart logic
      addToCart: (item) => {
        const existingItem = get().items.find(
          (i) => i.id === item.id && i.size === item.size
        )

        if (existingItem) {
          set({
            items: get().items.map((i) =>
              i.id === item.id && i.size === item.size
                ? {
                    ...i,
                    quantity: i.quantity + item.quantity,
                  }
                : i
            ),
            isOpen: true,
          })
        } else {
          set({
            items: [...get().items, item],
            isOpen: true,
          })
        }
      },

      removeFromCart: (id, size) => {
        set({
          items: get().items.filter(
            (item) => !(item.id === id && item.size === size)
          ),
        })
      },

      updateQuantity: (id, size, quantity) => {
        set({
          items: get().items.map((item) =>
            item.id === id && item.size === size
              ? { ...item, quantity }
              : item
          ),
        })
      },

      clearCart: () =>
        set({
          items: [],
        }),

      // Helpers
      getTotalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),

      getTotalItems: () =>
        get().items.reduce(
          (total, item) => total + item.quantity,
          0
        ),
    }),
    {
      name: 'cart-storage',

      // 🔥 CLAVE DEL FIX
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)