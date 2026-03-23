'use client'

import Image from 'next/image'
import { useState } from 'react'

const mockProducts = [
  { 
    id: 1, 
    name: 'New Balance 530', 
    price: '$120.000',
    image: '/shoes/balance-530.png',
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
    image: '/shoes/puma-faster.png',
    category: 'Sandalias deportivas'
  },
  { 
    id: 4, 
    name: 'Puma Omnia', 
    price: '$130.000',
    image: '/shoes/puma-omnia.png',
    category: 'Tenis urbanos'
  },
]

export function ProductList() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {mockProducts.map(product => (
        <article
          key={product.id}
          onMouseEnter={() => setHoveredId(product.id)}
          onMouseLeave={() => setHoveredId(null)}
          className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
          style={{ backgroundColor: '#c1d8f0' }}
          itemScope
          itemType="https://schema.org/Product"
        >
          {/* Imagen del producto */}
          <div className="h-64 bg-white flex items-center justify-center p-6 relative overflow-hidden">
            <div className={`absolute inset-0 bg-slate-100/50 transition-opacity duration-300 ${
              hoveredId === product.id ? 'opacity-100' : 'opacity-0'
            }`} />
            <div 
              className={`relative w-full h-full transition-transform duration-500 ${
                hoveredId === product.id ? 'scale-110 rotate-3' : 'scale-100 rotate-0'
              }`}
              itemProp="image"
            >
              <Image
                src={product.image}
                alt={`${product.name} - ${product.category}`}
                fill
                className="object-contain drop-shadow-lg"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
            </div>
          </div>

          {/* Información del producto */}
          <div className="p-5 flex flex-col gap-3">
            {/* Categoría */}
            <span className="text-xs font-medium text-slate-600 uppercase tracking-wider">
              {product.category}
            </span>
            
            {/* Nombre del producto */}
            <h3 
              className="font-bold text-slate-900 text-lg leading-tight"
              itemProp="name"
            >
              {product.name}
            </h3>
            
            {/* Precio y badge */}
            <div className="flex items-center justify-between mt-2">
              <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
                <meta itemProp="priceCurrency" content="COP" />
                <span 
                  className="text-emerald-700 font-bold text-2xl"
                  itemProp="price"
                  content={product.price.replace(/[$.]/g, '')}
                >
                  {product.price}
                </span>
              </div>
              
              <div className={`transition-all duration-300 ${
                hoveredId === product.id ? 'scale-110' : 'scale-100'
              }`}>
                <span className="inline-flex items-center gap-1 text-slate-900 font-medium text-sm">
                  Ver
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </span>
              </div>
            </div>

            {/* Botón de contacto */}
            <button 
              className={`w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-medium transition-all duration-300 mt-2 ${
                hoveredId === product.id 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-2'
              }`}
              aria-label={`Contactar por ${product.name}`}
            >
              Contactar por WhatsApp
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}