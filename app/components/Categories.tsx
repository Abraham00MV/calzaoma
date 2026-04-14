'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const categories = [
  {
    id: 1,
    name: 'Sandalias',
    image: '/categories/sandals.webp',
    description: 'Comodidad para el día a día',
  },
  {
    id: 2,
    name: 'Tenis deportivos',
    image: '/categories/sport-shoes.webp',
    description: 'Rendimiento y estilo',
  },
  {
    id: 3,
    name: 'Zapatos para dama',
    image: '/categories/women-shoes.webp',
    description: 'Elegancia en cada paso',
  },
]

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-') // espacios → guion
}

export function Categories() {
  const router = useRouter()
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const handleCategoryClick = (name: string) => {
    const slug = slugify(name)
    router.push(`/product?category=${slug}`)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

      {categories.map((category) => (
        <article
          key={category.id}
          onMouseEnter={() => setHoveredId(category.id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => handleCategoryClick(category.name)}
          className="
            group bg-white rounded-2xl shadow-md hover:shadow-2xl
            transition-all duration-300 overflow-hidden cursor-pointer
            border border-gray-100
          "
        >

          {/* IMAGE */}
          <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">

            <div
              className={`absolute inset-0 bg-slate-900/10 transition-opacity duration-300 z-10 ${
                hoveredId === category.id ? 'opacity-100' : 'opacity-0'
              }`}
            />

            <Image
              src={category.image}
              alt={`Categoría ${category.name}`}
              fill
              className={`object-cover transition-transform duration-500 ${
                hoveredId === category.id ? 'scale-110' : 'scale-100'
              }`}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>

          {/* CONTENT */}
          <div className="p-6 text-center bg-white">

            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {category.name}
            </h3>

            <p className="text-sm text-slate-600 mb-4">
              {category.description}
            </p>

            {/* BUTTON */}
            <div
              className={`
                inline-flex items-center gap-2
                bg-[#c1d8f0] text-black
                px-4 py-2 rounded-full
                font-medium text-sm
                transition-all duration-300
                hover:scale-105 hover:shadow-md
                ${hoveredId === category.id ? 'translate-x-1' : ''}
              `}
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