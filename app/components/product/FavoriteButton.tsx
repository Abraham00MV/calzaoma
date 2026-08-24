'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Heart } from 'lucide-react'
import { useFavoritesStore } from '@/app/store/favoritesStore'

export default function FavoriteButton({
  productId,
  className = '',
  size = 20,
}: {
  productId: string
  className?: string
  size?: number
}) {
  const router = useRouter()
  const { favoriteIds, loadFavorites, toggleFavorite, loaded } = useFavoritesStore()
  const [pending, setPending] = useState(false)

  useEffect(() => {
    if (!loaded) loadFavorites()
  }, [loaded, loadFavorites])

  const isFavorite = favoriteIds.includes(productId)

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (pending) return
    setPending(true)
    const ok = await toggleFavorite(productId)
    setPending(false)
    if (!ok) router.push('/login')
  }

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      className={`rounded-full bg-white/90 backdrop-blur-sm p-2 shadow-md hover:scale-110 transition-transform disabled:opacity-50 ${className}`}
    >
      <Heart
        size={size}
        className={isFavorite ? 'text-red-500' : 'text-gray-500'}
        fill={isFavorite ? 'currentColor' : 'none'}
      />
    </button>
  )
}
