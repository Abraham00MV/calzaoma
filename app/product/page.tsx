'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { FaShoePrints } from 'react-icons/fa'

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
    category: 'Tenis deportivos',
  },
  {
    id: 3,
    slug: 'puma-faster',
    name: 'Puma Faster',
    price: '$110.000',
    image: '/shoes/puma-faster.png',
    category: 'Sandalias',
  },
  {
    id: 4,
    slug: 'puma-omnia',
    name: 'Puma Omnia',
    price: '$130.000',
    image: '/shoes/puma-omnia.png',
    category: 'Zapatos dama',
  },
]

const categories = [
  'Todos',
  'Sandalias',
  'Zapatos dama',
  'Tenis deportivos',
]

const sizes = Array.from({ length: 10 }, (_, i) => 35 + i)

function parsePrice(price: string) {
  return Number(price.replace(/[$.]/g, ''))
}

function ProductList() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const categoryFromUrl = searchParams.get('category')

  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [selectedSizes, setSelectedSizes] = useState<number[]>([])
  const [maxPrice, setMaxPrice] = useState<number>(200000)

  // 🔥 SYNC URL → STATE
  useEffect(() => {
    if (categoryFromUrl) {
      const formatted =
        categoryFromUrl.charAt(0).toUpperCase() +
        categoryFromUrl.slice(1).replace('-', ' ')

      const match = categories.find(
        (c) =>
          c.toLowerCase().replace(' ', '-') === categoryFromUrl
      )

      if (match) {
        setSelectedCategory(match)
      }
    }
  }, [categoryFromUrl])

  const toggleSize = (size: number) => {
    setSelectedSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    )
  }

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((p) => {
      const matchCategory =
        selectedCategory === 'Todos'
          ? true
          : p.category === selectedCategory

      const matchPrice = parsePrice(p.price) <= maxPrice

      return matchCategory && matchPrice
    })
  }, [selectedCategory, maxPrice])

  const title =
    selectedCategory === 'Todos'
      ? 'Nuestros productos'
      : selectedCategory

  // 🔥 OPTIONAL: update URL when clicking filters
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat)

    const slug =
      cat === 'Todos'
        ? '/product'
        : `/product?category=${cat
            .toLowerCase()
            .replace(' ', '-')}`

    router.push(slug)
  }

  return (
    <div className="bg-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row gap-8">

        {/* SIDEBAR */}
        <aside className="w-full md:w-64 flex flex-col gap-8">

          {/* CATEGORÍAS */}
          <div>
            <h3 className="font-bold text-slate-900 mb-3">
              Categorías
            </h3>

            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white'
                      : 'hover:bg-slate-100'
                  }`}
                >
                  <FaShoePrints className="text-lg" />
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* PRECIO */}
          <div>
            <h3 className="font-bold text-slate-900 mb-3">
              Precio máximo
            </h3>

            <input
              type="range"
              min="50000"
              max="200000"
              step="10000"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(Number(e.target.value))
              }
              className="w-full"
            />

            <p className="text-sm text-slate-600 mt-2">
              Hasta: ${maxPrice.toLocaleString('es-CO')}
            </p>
          </div>

          {/* TALLAS */}
          <div>
            <h3 className="font-bold text-slate-900 mb-3">
              Tallas
            </h3>

            <div className="grid grid-cols-3 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`border rounded-lg py-1 text-sm transition ${
                    selectedSizes.includes(size)
                      ? 'bg-slate-900 text-white'
                      : 'hover:bg-slate-100'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* PRODUCTS */}
        <section className="flex-1">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            {title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Link
                href={`/product/${product.slug}`}
                key={product.id}
              >
                <article
                  onMouseEnter={() => setHoveredId(product.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden bg-white"
                >
                  <div className="h-64 flex items-center justify-center p-6 relative">
                    <div
                      className={`absolute inset-0 bg-slate-100/50 transition-opacity ${
                        hoveredId === product.id
                          ? 'opacity-100'
                          : 'opacity-0'
                      }`}
                    />

                    <div
                      className={`relative w-full h-full transition-transform duration-300 ${
                        hoveredId === product.id
                          ? 'scale-105'
                          : 'scale-100'
                      }`}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <div className="p-5 flex flex-col gap-2">
                    <span className="text-xs text-slate-500">
                      {product.category}
                    </span>

                    <h3 className="font-semibold text-lg">
                      {product.name}
                    </h3>

                    <span className="text-emerald-700 font-bold text-xl">
                      {product.price}
                    </span>

                    <button className="mt-3 bg-slate-900 text-white py-2 rounded-lg">
                      Ver producto
                    </button>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default function Page() {
  return <ProductList />
}