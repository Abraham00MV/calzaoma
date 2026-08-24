import { create } from 'zustand'
import { createClient } from '@/app/lib/supabase/client'
import type { AuthChangeEvent } from '@supabase/supabase-js'

interface FavoritesState {
  favoriteIds: string[]
  userId: string | null
  loaded: boolean
  loadFavorites: () => Promise<void>
  toggleFavorite: (productId: string) => Promise<boolean>
  resetFavorites: () => void
}

const supabase = createClient()

export const useFavoritesStore = create<FavoritesState>()((set, get) => ({
  favoriteIds: [],
  userId: null,
  loaded: false,

  loadFavorites: async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      set({ favoriteIds: [], userId: null, loaded: true })
      return
    }
    set({ userId: user.id })
    const { data } = await supabase
      .from('favorites')
      .select('product_id')
      .eq('user_id', user.id)
    set({ favoriteIds: (data ?? []).map((r: any) => r.product_id), loaded: true })
  },

  toggleFavorite: async (productId: string) => {
    const { userId, favoriteIds } = get()
    if (!userId) return false

    const isFav = favoriteIds.includes(productId)

    // Optimistic update
    set({
      favoriteIds: isFav
        ? favoriteIds.filter((id) => id !== productId)
        : [...favoriteIds, productId],
    })

    const { error } = isFav
      ? await supabase
          .from('favorites')
          .delete()
          .eq('user_id', userId)
          .eq('product_id', productId)
      : await supabase
          .from('favorites')
          .insert({ user_id: userId, product_id: productId })

    if (error) {
      // Rollback on error
      set({
        favoriteIds: isFav
          ? [...get().favoriteIds, productId]
          : get().favoriteIds.filter((id) => id !== productId),
      })
      console.error('Error toggling favorite:', error)
    }

    return true
  },

  resetFavorites: () => set({ favoriteIds: [], userId: null, loaded: false }),
}))

supabase.auth.onAuthStateChange((event: AuthChangeEvent) => {
  if (event === 'SIGNED_OUT') useFavoritesStore.getState().resetFavorites()
  if (event === 'SIGNED_IN') useFavoritesStore.getState().loadFavorites()
})
