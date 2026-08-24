'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Package, Trash2 } from 'lucide-react'
import { createClient } from '../lib/supabase/client'
import { useFavoritesStore } from '../store/favoritesStore'
import { mapDbProduct, formatPrice, PublicProduct } from '../lib/products'
import FavoriteButton from '../components/product/FavoriteButton'

type Tab = 'profile' | 'favorites' | 'orders'

export default function AccountPage() {
  const router = useRouter()
  const supabase = createClient()

  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>('profile')

  const [userData, setUserData] = useState({
    email: '',
    fullName: '',
    userId: '',
  })

  const [favoriteProducts, setFavoriteProducts] = useState<PublicProduct[]>([])
  const [favoritesLoading, setFavoritesLoading] = useState(true)

  const { favoriteIds, loadFavorites } = useFavoritesStore()

  const loadFavoritesList = useCallback(async (userId: string) => {
    setFavoritesLoading(true)
    const { data } = await supabase
      .from('favorites')
      .select('product_id, products(*)')
      .eq('user_id', userId)

    const favs = (data ?? [])
      .map((row: any) => (row.products ? mapDbProduct(row.products) : null))
      .filter(Boolean) as PublicProduct[]

    setFavoriteProducts(favs)
    setFavoritesLoading(false)
  }, [supabase])

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      setUserData({
        email: user.email || '',
        fullName:
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          '',
        userId: user.id,
      })

      setLoading(false)
      await loadFavoritesList(user.id)
    }

    loadUser()
  }, [router, supabase, loadFavoritesList])

  useEffect(() => {
    loadFavorites()
  }, [])

  const displayedFavorites = favoriteIds.length > 0
    ? favoriteProducts.filter((p) => favoriteIds.includes(p.id))
    : favoriteProducts

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          Cargando cuenta...
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="bg-white rounded-3xl p-8 shadow-sm border mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>
              <h1 className="text-3xl font-bold text-black">
                Mi Cuenta
              </h1>

              <p className="text-gray-500 mt-2">
                Gestiona tu información y revisa tu actividad.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-5 py-3 rounded-xl font-medium hover:opacity-90 transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[250px_1fr] gap-6">

          {/* SIDEBAR */}

          <aside className="bg-white border rounded-3xl p-4 h-fit">

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-4 py-3 rounded-xl mb-2 transition ${
                activeTab === 'profile'
                  ? 'bg-[#c1d8f0] text-black'
                  : 'hover:bg-gray-100'
              }`}
            >
              Información personal
            </button>

            <button
              onClick={() => setActiveTab('favorites')}
              className={`w-full text-left px-4 py-3 rounded-xl mb-2 transition ${
                activeTab === 'favorites'
                  ? 'bg-[#c1d8f0] text-black'
                  : 'hover:bg-gray-100'
              }`}
            >
              Productos favoritos
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-4 py-3 rounded-xl transition ${
                activeTab === 'orders'
                  ? 'bg-[#c1d8f0] text-black'
                  : 'hover:bg-gray-100'
              }`}
            >
              Historial de órdenes
            </button>

          </aside>

          {/* CONTENT */}

          <section className="bg-white border rounded-3xl p-8">

            {/* PROFILE */}

            {activeTab === 'profile' && (
              <>
                <h2 className="text-2xl font-semibold mb-6">
                  Información personal
                </h2>

                <div className="grid md:grid-cols-2 gap-6">

                  <div>
                    <label className="text-sm text-gray-500 block mb-2">
                      Nombre
                    </label>

                    <input
                      value={userData.fullName}
                      readOnly
                      className="w-full border rounded-xl p-4 bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-500 block mb-2">
                      Correo electrónico
                    </label>

                    <input
                      value={userData.email}
                      readOnly
                      className="w-full border rounded-xl p-4 bg-gray-50"
                    />
                  </div>

                </div>
              </>
            )}

            {/* FAVORITES */}

            {activeTab === 'favorites' && (
              <>
                <h2 className="text-2xl font-semibold mb-6">
                  Productos favoritos
                </h2>

                {favoritesLoading ? (
                  <p className="text-gray-500 text-center py-16">
                    Cargando favoritos...
                  </p>
                ) : displayedFavorites.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center py-16">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Heart size={28} className="text-gray-400" />
                    </div>

                    <p className="text-gray-500 mb-6">
                      Aún no tienes productos favoritos.
                    </p>

                    <button
                      onClick={() => router.push('/product')}
                      className="bg-[#c1d8f0] text-black px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
                    >
                      Explorar productos
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {displayedFavorites.map((product) => (
                      <Link
                        href={`/product/${product.slug}`}
                        key={product.id}
                      >
                        <article className="rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden bg-white relative">
                          <div className="absolute top-3 right-3 z-10">
                            <FavoriteButton productId={product.id} />
                          </div>

                          <div className="h-48 flex items-center justify-center p-4 relative bg-white">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-contain"
                              sizes="(max-width: 640px) 100vw, 50vw"
                            />
                          </div>

                          <div className="p-4">
                            <span className="text-xs text-slate-500">
                              {product.category}
                            </span>
                            <h3 className="font-semibold text-lg">
                              {product.name}
                            </h3>
                            <span className="text-emerald-700 font-bold text-xl">
                              {formatPrice(product.price)}
                            </span>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* ORDERS */}

            {activeTab === 'orders' && (
              <>
                <h2 className="text-2xl font-semibold mb-6">
                  Historial de órdenes
                </h2>

                <div className="flex flex-col items-center justify-center text-center py-16">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Package size={28} className="text-gray-400" />
                  </div>

                  <p className="text-gray-500 mb-6">
                    Esta función estará disponible próximamente.
                  </p>
                </div>
              </>
            )}

          </section>

        </div>

      </div>
    </main>
  )
}