'use client'

import Image from 'next/image'
import { useState } from 'react'

const categories = [
  {
    id: 1,
    name: 'Sandalias',
    image: '/categories/sandals.webp',
    description: 'Comodidad para el día a día'
  },
  {
    id: 2,
    name: 'Tenis deportivos',
    image: '/categories/sport-shoes.webp',
    description: 'Rendimiento y estilo'
  },
  {
    id: 3,
    name: 'Zapatos para dama',
    image: '/categories/women-shoes.webp',
    description: 'Elegancia en cada paso'
  },
]

export function Categories() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map(category => (
        <article
          key={category.id}
          onMouseEnter={() => setHoveredId(category.id)}
          onMouseLeave={() => setHoveredId(null)}
          className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100"
        >
          {/* Imagen de la categoría */}
          <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
            <div className={`absolute inset-0 bg-slate-900/10 transition-opacity duration-300 z-10 ${
              hoveredId === category.id ? 'opacity-100' : 'opacity-0'
            }`} />
            <Image
              src={category.image}
              alt={`Categoría ${category.name}`}
              fill
              className={`object-cover transition-transform duration-500 ${
                hoveredId === category.id ? 'scale-110' : 'scale-100'
              }`}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          {/* Información de la categoría */}
          <div className="p-6 text-center bg-white">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {category.name}
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              {category.description}
            </p>
            <div 
              className={`inline-flex items-center gap-2 text-blue-600 font-medium text-sm transition-all duration-300 ${
                hoveredId === category.id 
                  ? 'translate-x-2' 
                  : 'translate-x-0'
              }`}
            >
              Explorar
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
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}