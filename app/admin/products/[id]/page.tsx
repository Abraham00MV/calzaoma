'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import ProductForm from '@/app/components/admin/ProductForm'
import { createClient } from '@/app/lib/supabase/client'

type Product = {
  id: string
  name: string
  description: string
  category: string
  price: number
  stock: number
  image_url: string | null
}

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const supabase = createClient()

  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    const loadProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select(
          'id, name, description, category, price, stock, image_url'
        )
        .eq('id', params.id)
        .single()

      if (error) {
        console.error(error)
        alert('No se pudo cargar el producto.')
        router.push('/admin/products')
        return
      }

      setProduct(data)
      setLoading(false)
    }

    loadProduct()
  }, [params.id, router, supabase])

  const handleUpdate = async (updatedProduct: {
    name: string
    description: string
    category: string
    price: number
    stock: number
    image: File | null
  }) => {
    try {
      let imageUrl = product?.image_url ?? null

      if (updatedProduct.image) {
        const fileExt =
          updatedProduct.image.name.split('.').pop() || 'jpg'

        const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExt}`

        const { error: uploadError } = await supabase.storage
          .from('products')
          .upload(fileName, updatedProduct.image)

        if (uploadError) {
          alert(uploadError.message)
          return
        }

        const { data } = supabase.storage
          .from('products')
          .getPublicUrl(fileName)

        imageUrl = data.publicUrl
      }

      const slug = updatedProduct.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')

      const { error } = await supabase
        .from('products')
        .update({
          name: updatedProduct.name,
          slug,
          description: updatedProduct.description,
          category: updatedProduct.category,
          price: updatedProduct.price,
          stock: updatedProduct.stock,
          image_url: imageUrl,
        })
        .eq('id', params.id)

      if (error) {
        alert(error.message)
        return
      }

      router.push('/admin/products')
    } catch (error) {
      console.error(error)
      alert('Ocurrió un error actualizando el producto.')
    }
  }

  if (loading || !product) {
    return (
      <main className="min-h-[85vh] bg-gray-50 p-8">
        <div className="mx-auto max-w-5xl rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">
          Cargando producto...
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-[85vh] bg-gray-50 p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">
            Editar producto
          </h1>

          <p className="mt-2 text-gray-500">
            Modifica la información del producto.
          </p>
        </div>

        <ProductForm
          initialValues={{
            name: product.name,
            description: product.description,
            category: product.category,
            price: Number(product.price),
            stock: product.stock,
            image:
              product.image_url ??
              '/products/product-placeholder.png',
          }}
          onSubmit={handleUpdate}
        />
      </div>
    </main>
  )
}