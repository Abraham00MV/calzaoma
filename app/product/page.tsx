'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

type Product = {
  id: number
  slug: string
  name: string
  price: string
  image: string
  category: string
}

const mockProducts: Product[] = [
  {
    id: 1,
    slug: 'new-balance-530',
    name: 'New Balance 530',
    price: '$120.000',
    image: '/shoes/balance-530.png',
    category: 'Tenis deportivos',
  },
  {
    id: 2,
    slug: 'nike-zoom',
    name: 'Nike Zoom',
    price: '$150.000',
    image: '/shoes/nike-zoom.png',
    category: 'Tenis running',
  },
  {
    id: 3,
    slug: 'puma-faster',
    name: 'Puma Faster',
    price: '$110.000',
    image: '/shoes/puma-faster.png',
    category: 'Sandalias deportivas',
  },
  {
    id: 4,
    slug: 'puma-omnia',
    name: 'Puma Omnia',
    price: '$130.000',
    image: '/shoes/puma-omnia.png',
    category: 'Tenis urbanos',
  },
]

const TOTAL_CARDS = 8

function ProductList() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const gridItems: (Product | null)[] = [...mockProducts]
  while (gridItems.length < TOTAL_CARDS) {
    gridItems.push(null)
  }

  return (
    <div className="bg-white py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-slate-900 mb-6">
        Nuestros productos
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {gridItems.map((product, index) =>
          product ? (
            <Link
              href={`/product/${product.slug}`}
              key={product.id}
              className="group"
            >
              <article
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer bg-white"
                itemScope
                itemType="https://schema.org/Product"
              >
                {/* Imagen */}
                <div className="h-64 flex items-center justify-center p-6 relative overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-slate-100/50 transition-opacity duration-300 ${
                      hoveredId === product.id
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                  />
                  <div
                    className={`relative w-full h-full transition-transform duration-500 ${
                      hoveredId === product.id
                        ? 'scale-105'
                        : 'scale-100'
                    }`}
                    itemProp="image"
                  >
                    <Image
                      src={product.image}
                      alt={`${product.name} - ${product.category}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                  </div>
                </div>

                {/* Información */}
                <div className="p-5 flex flex-col gap-2">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {product.category}
                  </span>

                  <h3
                    className="font-semibold text-slate-900 text-lg leading-tight"
                    itemProp="name"
                  >
                    {product.name}
                  </h3>

                  <span
                    className="text-emerald-700 font-bold text-xl"
                    itemProp="offers"
                    itemScope
                    itemType="https://schema.org/Offer"
                    content={product.price.replace(/[$.]/g, '')}
                  >
                    {product.price}
                  </span>

                  <button
                    type="button"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2 rounded-lg font-medium transition-all duration-300 mt-3"
                  >
                    Ver producto
                  </button>
                </div>
              </article>
            </Link>
          ) : (
            <div
              key={`placeholder-${index}`}
              className="rounded-2xl shadow-md bg-gray-100 h-80 animate-pulse"
            />
          )
        )}
      </div>
    </div>
  )
}

export default function Page() {
  return <ProductList />
}
