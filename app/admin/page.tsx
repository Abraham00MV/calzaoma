'use client'

import { useRouter } from 'next/navigation'
import { Package } from 'lucide-react'

export default function AdminPage() {
  const router = useRouter()

  return (
    <main className="min-h-[85vh] bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">
            Panel de administración
          </h1>

          <p className="text-gray-500 mt-2">
            productos de CalzaOma.
          </p>
        </div>

        {/* Dashboard */}
        <div className="grid md:grid-cols-2 gap-6">

          <button
            onClick={() => router.push('/admin/products')}
            className="bg-white border border-gray-200 rounded-2xl p-8 text-left hover:shadow-lg transition"
          >
            <Package
              size={42}
              className="text-[#c1d8f0] mb-4"
            />

            <h2 className="text-xl font-semibold text-black">
              Productos
            </h2>

            <p className="text-gray-500 mt-2">
              Crear, editar y administrar el catálogo.
            </p>
          </button>

        </div>

      </div>
    </main>
  )
}