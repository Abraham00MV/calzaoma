'use client'

import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'

const mockProducts = [
  { 
    id: 1, 
    slug: 'new-balance-530',
    name: 'New Balance 530', 
    price: '$120.000',
    image: '/shoes/balance-530.png',
    category: 'Tenis deportivos'
  },
  { 
    id: 2, 
    slug: 'nike-zoom',
    name: 'Nike Zoom', 
    price: '$150.000',
    image: '/shoes/nike-zoom.png',
    category: 'Tenis running'
  },
  { 
    id: 3, 
    slug: 'puma-faster',
    name: 'Puma Faster', 
    price: '$110.000',
    image: '/shoes/puma-faster.png',
    category: 'Sandalias deportivas'
  },
  { 
    id: 4, 
    slug: 'puma-omnia',
    name: 'Puma Omnia', 
    price: '$130.000',
    image: '/shoes/puma-omnia.png',
    category: 'Tenis urbanos'
  },
]

export function ProductSlider() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <div 
      className="flex gap-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent snap-x snap-mandatory"
      role="region"
      aria-label="Productos nuevos destacados"
    >
      {mockProducts.map(product => (
        
        <Link
          key={product.id}
          href={`/product/${product.slug}`}
          className="snap-start"
        >
          <article
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="min-w-[280px] bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-200 group"
            itemScope
            itemType="https://schema.org/Product"
          >
            {/* 🔹 IMAGE */}
            <div className="h-56 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6 relative overflow-hidden">
              
              {/* hover overlay */}
              <div className={`absolute inset-0 bg-slate-200/30 transition-opacity duration-300 ${
                hoveredId === product.id ? 'opacity-100' : 'opacity-0'
              }`} />

              <div 
                className={`relative w-full h-full transition-transform duration-500 ${
                  hoveredId === product.id 
                    ? 'scale-110 -rotate-2' 
                    : 'scale-100'
                }`}
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

              {/* 🔹 QUICK CTA FLOAT (pro feel) */}
              <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 transition-all duration-300 ${
                hoveredId === product.id 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}>
              </div>
            </div>

            {/* 🔹 INFO */}
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
                    content={product.price.replace(/[$.]/g, '')}
                  >
                    {product.price}
                  </span>
                </div>
                
                {/* 🔹 BUTTON ahora navega correctamente */}
                <span 
                  className={`bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    hoveredId === product.id 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 -translate-x-2'
                  }`}
                >
                  Ver más
                </span>
              </div>
            </div>
          </article>
        </Link>

      ))}
    </div>
  )
}
