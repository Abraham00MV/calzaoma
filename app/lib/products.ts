'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/app/lib/supabase/client'
import { products as fallbackProducts } from '@/app/data/products'

export type PublicProduct = {
  id: string
  slug: string
  name: string
  price: number
  image: string
  category: string
  description: string | null
  stock: number
  sizes: number[]
  featured: boolean
  useType: 'trabajo' | 'deporte' | 'estilo'
  comfortScore: number
  minSize: number
  maxSize: number
}

export type DbProduct = {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  category: string
  sizes: number[] | null
  stock: number
  image_url: string | null
  featured: boolean
  active: boolean
  created_at: string
  updated_at: string
  use_type: string | null
  comfort_score: number | null
}

export function formatPrice(price: number) {
  return `$${price.toLocaleString('es-CO')}`
}

function inferUseType(category: string): PublicProduct['useType'] {
  const c = category.toLowerCase()

  if (
    c.includes('sandal') ||
    c.includes('formal') ||
    c.includes('urbano') ||
    c.includes('casual') ||
    c.includes('trabajo')
  ) {
    return 'trabajo'
  }

  return 'deporte'
}

export function mapDbProduct(row: DbProduct): PublicProduct {
  const sizes = Array.isArray(row.sizes) ? row.sizes : []
  const useType = row.use_type as PublicProduct['useType'] | null

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    price: Number(row.price),
    image: row.image_url ?? '/products/product-placeholder.png',
    category: row.category,
    description: row.description,
    stock: Number(row.stock),
    sizes,
    featured: row.featured,
    useType:
      useType === 'trabajo' || useType === 'deporte' || useType === 'estilo'
        ? useType
        : inferUseType(row.category),
    comfortScore: Number.isFinite(row.comfort_score)
      ? Number(row.comfort_score)
      : 6,
    minSize: sizes.length ? Math.min(...sizes) : 34,
    maxSize: sizes.length ? Math.max(...sizes) : 44,
  }
}

function toFallback(): PublicProduct[] {
  return fallbackProducts.map((p) => ({
    id: String(p.id),
    slug: p.slug,
    name: p.name,
    price: p.price,
    image: p.image,
    category: p.category,
    description: null,
    stock: 0,
    sizes: [],
    featured: false,
    useType: p.useType,
    comfortScore: p.comfortScore,
    minSize: p.minSize,
    maxSize: p.maxSize,
  }))
}

export function useProducts() {
  const [products, setProducts] = useState<PublicProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      const supabase = createClient()

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false })

      if (cancelled) return

      if (error) {
        console.error('Error loading products:', error)
        setProducts(toFallback())
      } else {
        setProducts((data ?? []).map(mapDbProduct))
      }

      setLoading(false)
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  return { products, loading }
}
