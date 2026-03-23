'use client'

import { useSearchParams } from 'next/navigation'
import { products } from '../data/products'
import { getRecommendedProducts } from '../lib/recommendationEngine'
import Link from 'next/link'
import Image from 'next/image'

export default function RecommendedPage() {
  const params = useSearchParams()

  const footLength = Number(params.get('foot'))
  const useType = params.get('use') || ''
  const comfortLevel = params.get('comfort') || ''

  const recommended = getRecommendedProducts(
    products,
    footLength,
    useType,
    comfortLevel
  )

  const descriptionText = `Based on your foot size (${footLength} cm), usage (${useType}) and comfort preference (${comfortLevel}).`

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-slate-50 py-12">
      
      {/* 🔹 HEADER */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
          Recommended for you
        </h1>

        <p className="text-slate-600 mt-3 text-lg">
          {descriptionText}
        </p>
      </div>

      {/* 🔹 EMPTY STATE */}
      {recommended.length === 0 && (
        <div className="max-w-2xl mx-auto px-6 text-center py-20">
          <div className="bg-white shadow-lg rounded-2xl p-10 border">
            <h2 className="text-2xl font-semibold text-slate-900 mb-3">
              No matches found
            </h2>
            <p className="text-slate-600 mb-6">
              Try adjusting your inputs to get better results.
            </p>

            <Link href="/suggestor">
              <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
                Try again
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* 🔹 GRID */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {recommended.map((p) => {
          const isPerfect = p.score >= 5

          return (
            <Link key={p.id} href={`/product/${p.slug}`} className="group">
              
              <article className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200">

                {/* 🔹 IMAGE */}
                <div className="relative h-64 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6 overflow-hidden">
                  
                  {/* ✅ FIXED BADGE (VISIBLE) */}
                  <div
                    className={`absolute top-4 left-4 z-20 px-3 py-1 text-xs rounded-full font-semibold backdrop-blur-md shadow-sm ${
                      isPerfect
                        ? 'bg-emerald-500/90 text-white'
                        : 'bg-yellow-400/90 text-black'
                    }`}
                  >
                    {isPerfect ? 'Perfect Match' : 'Good Match'}
                  </div>

                  {/* 🔥 CATEGORY TAG (NEW - PRO UI) */}
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 text-xs rounded-full bg-white/80 backdrop-blur-md text-slate-700 shadow-sm">
                    {p.category}
                  </div>

                  {/* IMAGE */}
                  <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-2">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-contain drop-shadow-xl"
                    />
                  </div>
                </div>

                {/* 🔹 INFO */}
                <div className="p-6 flex flex-col gap-3">

                  <h3 className="text-lg font-semibold text-slate-900 leading-tight">
                    {p.name}
                  </h3>

                  <p className="text-2xl font-bold text-slate-800">
                    ${p.price.toLocaleString('en-US')}
                  </p>

                  {/* 🔹 SCORE */}
                  <div className="mt-2">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          isPerfect ? 'bg-emerald-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${Math.min(p.score * 20, 100)}%` }}
                      />
                    </div>

                    <p className="text-xs text-gray-500 mt-1">
                      Compatibility: {p.score}/5
                    </p>
                  </div>

                  {/* 🔹 CTA */}
                  <button className="mt-4 w-full bg-slate-900 text-white py-2.5 rounded-xl font-medium hover:bg-slate-800 transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                    Ver producto
                  </button>
                </div>

              </article>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
