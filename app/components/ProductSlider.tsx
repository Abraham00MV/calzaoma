'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useProducts, formatPrice } from '@/app/lib/products'

export function ProductSlider() {
  const { products, loading } = useProducts()

  return (
    <div
      className="flex gap-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent snap-x snap-mandatory"
      role="region"
      aria-label="Productos nuevos destacados"
    >
      {loading ? (
        <div className="min-w-[280px] rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
          Cargando productos...
        </div>
      ) : products.length === 0 ? (
        <div className="min-w-[280px] rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
          No hay productos disponibles.
        </div>
      ) : (
        products.slice(0, 8).map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="snap-start"
          >
            <article className="min-w-[280px] bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-200 group"
              itemScope
              itemType="https://schema.org/Product"
            >
              <div className="h-56 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6 relative overflow-hidden">
                <div className={`relative w-full h-full transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-2`}
                  itemProp="image"
                >
                  <Image
                    src={product.image}
                    alt={`${product.name} - ${product.category}`}
                    fill
                    className="object-contain drop-shadow-xl"
                    sizes="(max-width: 768px) 280px, 320px"
                  />
                </div>
              </div>

              <div className="p-5 flex flex-col gap-3 bg-white">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {product.category}
                </span>

                <h3
                  className="font-semibold text-slate-900 text-lg leading-tight"
                  itemProp="name"
                >
                  {product.name}
                </h3>

                <div className="flex items-center justify-between mt-1">
                  <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
                    <meta itemProp="priceCurrency" content="COP" />
                    <span
                      className="text-emerald-600 font-bold text-2xl"
                      itemProp="price"
                      content={String(product.price)}
                    >
                      {formatPrice(product.price)}
                    </span>
                  </div>

                  <span
                    className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                  >
                    Ver más
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))
      )}
    </div>
  )
}
