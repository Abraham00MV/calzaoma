'use client'

import Image from 'next/image'
import { useState } from 'react'

const mockProducts = [
  { 
    id: 1, 
    name: 'New Balance 530', 
    price: '$120.000',
    image: '/shoes/Balance-530.png',
    category: 'Tenis deportivos'
  },
  { 
    id: 2, 
    name: 'Nike Zoom', 
    price: '$150.000',
    image: '/shoes/nike-zoom.png',
    category: 'Tenis running'
  },
  { 
    id: 3, 
    name: 'Puma Faster', 
    price: '$110.000',
    image: '/shoes/Puma-faster.png',
    category: 'Sandalias deportivas'
  },
  { 
    id: 4, 
    name: 'Puma Omnia', 
    price: '$130.000',
    image: '/shoes/Puma-omnia.png',
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
        <article
          key={product.id}
          onMouseEnter={() => setHoveredId(product.id)}
          onMouseLeave={() => setHoveredId(null)}
          className="min-w-[280px] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-200 snap-start"
          itemScope
          itemType="https://schema.org/Product"
        >
          {/* Imagen del producto */}
          <div className="h-56 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6 relative overflow-hidden">
            <div className={`absolute inset-0 bg-slate-200/30 transition-opacity duration-300 ${
              hoveredId === product.id ? 'opacity-100' : 'opacity-0'
            }`} />
            <div 
              className={`relative w-full h-full transition-transform duration-500 ${
                hoveredId === product.id ? 'scale-110 -rotate-3' : 'scale-100 rotate-0'
              }`}
              itemProp="image"
            >
              <Image
                src={product.image}
                alt={`${product.name} - ${product.category}`}
                fill
                className="object-contain drop-shadow-lg"
                sizes="(max-width: 768px) 280px, 320px"
                loading="lazy"
              />
            </div>
          </div>

          {/* Información del producto */}
          <div className="p-5 flex flex-col gap-3 bg-white">
            {/* Categoría */}
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              {product.category}
            </span>
            
            {/* Nombre del producto */}
            <h3 
              className="font-semibold text-slate-900 text-lg leading-tight"
              itemProp="name"
            >
              {product.name}
            </h3>
            
            {/* Precio y CTA */}
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
              
              <button 
                className={`bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md ${
                  hoveredId === product.id 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-2'
                }`}
                aria-label={`Ver detalles de ${product.name}`}
              >
                Ver más
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}