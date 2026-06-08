'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../lib/supabase/client'

type Tab = 'profile' | 'favorites' | 'orders'

export default function AccountPage() {
  const router = useRouter()
  const supabase = createClient()

  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>('profile')

  const [userData, setUserData] = useState({
    email: '',
    fullName: '',
  })

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
      })

      setLoading(false)
    }

    loadUser()
  }, [router, supabase])

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

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

                  {[
                    'Sandalia Verona',
                    'Tenis Urban',
                    'Zapato Elegance',
                  ].map((product) => (
                    <div
                      key={product}
                      className="border rounded-2xl p-5"
                    >
                      <div className="h-40 bg-gray-100 rounded-xl mb-4" />

                      <h3 className="font-semibold text-black">
                        {product}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Producto guardado como favorito.
                      </p>
                    </div>
                  ))}

                </div>
              </>
            )}

            {/* ORDERS */}

            {activeTab === 'orders' && (
              <>
                <h2 className="text-2xl font-semibold mb-6">
                  Historial de órdenes
                </h2>

                <div className="space-y-4">

                  {[
                    {
                      id: '#OMA-1001',
                      total: '$210.000',
                      status: 'Entregado',
                    },
                    {
                      id: '#OMA-1002',
                      total: '$180.000',
                      status: 'En proceso',
                    },
                    {
                      id: '#OMA-1003',
                      total: '$120.000',
                      status: 'Entregado',
                    },
                  ].map((order) => (
                    <div
                      key={order.id}
                      className="border rounded-2xl p-5 flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold">
                          {order.id}
                        </p>

                        <p className="text-sm text-gray-500">
                          Total: {order.total}
                        </p>
                      </div>

                      <span className="px-4 py-2 rounded-full bg-[#c1d8f0] text-sm font-medium">
                        {order.status}
                      </span>
                    </div>
                  ))}

                </div>
              </>
            )}

          </section>

        </div>

      </div>
    </main>
  )
}