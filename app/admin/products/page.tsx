'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus } from 'lucide-react'
import ProductTable from '@/app/components/admin/ProductTable'
import { createClient } from '@/app/lib/supabase/client'

type Product = {
  id: string
  name: string
  slug: string
  description: string | null
  category: string
  price: number
  stock: number
  image_url: string | null
  featured: boolean
  active: boolean
  created_at: string
  image: File | null

}

export default function AdminProductsPage() {
  const router = useRouter()
  const supabase = createClient()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error loading products:', error)
      } else {
        setProducts(data ?? [])
      }

      setLoading(false)
    }

    loadProducts()
  }, [])

  return (
    <main className="min-h-[85vh] bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-8">

          <div>
            <h1 className="text-3xl font-bold text-black">
              Productos
            </h1>

            <p className="text-gray-500 mt-2">
              Administra el catálogo de CalzaOma.
            </p>
          </div>

          <button
            onClick={() => router.push('/admin/products/new')}
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-[#c1d8f0] px-5 py-3 font-semibold text-black transition hover:opacity-90"
          >
            <Plus size={18} />
            Nuevo producto
          </button>

        </div>

        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">
            Cargando productos...
          </div>
        ) : (
          <ProductTable products={products} />
        )}

      </div>
    </main>
  )
}