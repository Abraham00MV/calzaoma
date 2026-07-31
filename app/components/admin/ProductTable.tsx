'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Pencil } from 'lucide-react'

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
}

interface ProductTableProps {
  products: Product[]
}

export default function ProductTable({
  products,
}: ProductTableProps) {
  const router = useRouter()

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <table className="w-full">
        <thead className="border-b bg-gray-50">
          <tr className="text-left">
            <th className="px-6 py-4 text-sm font-semibold text-gray-700">
              Imagen
            </th>

            <th className="px-6 py-4 text-sm font-semibold text-gray-700">
              Producto
            </th>

            <th className="px-6 py-4 text-sm font-semibold text-gray-700">
              Categoría
            </th>

            <th className="px-6 py-4 text-sm font-semibold text-gray-700">
              Precio
            </th>

            <th className="px-6 py-4 text-sm font-semibold text-gray-700">
              Stock
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
              Acción
            </th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="py-16 text-center text-gray-500"
              >
                Aún no hay productos registrados.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr
                key={product.id}
                className="border-b transition last:border-0 hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg border bg-white">
                    <Image
                      src={
                        product.image_url ??
                        '/products/product-placeholder.png'
                      }
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </td>

                <td className="px-6 py-4 font-medium text-black">
                  {product.name}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {product.category}
                </td>

                <td className="px-6 py-4 font-semibold text-black">
                  ${Number(product.price).toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  {product.stock}
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() =>
                      router.push(`/admin/products/${product.id}`)
                    }
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#c1d8f0] px-4 py-2 text-black transition hover:opacity-90"
                  >
                    <Pencil size={16} />
                    Editar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}