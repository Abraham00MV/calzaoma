'use client'

import { useRouter } from 'next/navigation'
import ProductForm from '@/app/components/admin/ProductForm'
import { createClient } from '@/app/lib/supabase/client'

export default function NewProductPage() {
  const router = useRouter()

  const supabase = createClient()

  const handleCreate = async (product: {
    name: string
    description: string
    category: string
    price: number
    stock: number
    image: File | null
    useType: string
    comfortScore: number
    sizes: number[]
  }) => {
    try {
      let imageUrl: string | null = null

      if (product.image) {
        const fileExt = product.image.name.split('.').pop() || 'jpg'

        const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExt}`

        console.log('Uploading image...', fileName)

        const {
          data: uploadData,
          error: uploadError,
        } = await supabase.storage
          .from('products')
          .upload(fileName, product.image)

        console.log('UPLOAD RESULT', {
          uploadData,
          uploadError,
        })

        if (uploadError) {
          alert(uploadError.message)
          return
        }

        const { data: publicUrlData } = supabase.storage
          .from('products')
          .getPublicUrl(fileName)

        imageUrl = publicUrlData.publicUrl

        console.log('PUBLIC URL', imageUrl)
      }

      const slug = product.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')

      console.log('Creating product...')

      const {
        data: insertData,
        error: insertError,
      } = await supabase
        .from('products')
        .insert({
          name: product.name,
          slug,
          description: product.description,
          category: product.category,
          price: product.price,
          stock: product.stock,
          image_url: imageUrl,
          sizes: product.sizes,
          use_type: product.useType,
          comfort_score: product.comfortScore,
          featured: false,
          active: true,
        })
        .select()

      console.log('INSERT RESULT', {
        insertData,
        insertError,
      })

      if (insertError) {
        alert(insertError.message)
        return
      }

      router.push('/admin/products')
    } catch (error) {
      console.error('UNEXPECTED ERROR', error)

      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert('Unexpected error. Check console.')
      }
    }
  }

  return (
    <main className="min-h-[85vh] bg-gray-50 p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">
            Nuevo producto
          </h1>

          <p className="mt-2 text-gray-500">
            Agrega un nuevo producto al catálogo.
          </p>
        </div>

        <ProductForm onSubmit={handleCreate} />
      </div>
    </main>
  )
}