'use client'

import { useState } from 'react'
import ImageUploader from '@/app/components/admin/ImageUploader'

type ProductFormProps = {
  initialValues?: {
    name: string
    description: string
    category: string
    price: number
    stock: number
    image: string
  }
  onSubmit?: (product: {
    name: string
    description: string
    category: string
    price: number
    stock: number
    image: File | null
  }) => void
}

export default function ProductForm({
  initialValues,
  onSubmit,
}: ProductFormProps) {
  const [name, setName] = useState(initialValues?.name ?? '')

  const [description, setDescription] = useState(
    initialValues?.description ?? ''
  )

  const [category, setCategory] = useState(
    initialValues?.category ?? ''
  )

  const [price, setPrice] = useState(
    initialValues?.price?.toString() ?? ''
  )

  const [stock, setStock] = useState(
    initialValues?.stock?.toString() ?? ''
  )

  const [image, setImage] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSubmit?.({
      name,
      description,
      category,
      price: Number(price),
      stock: Number(stock),
      image,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8"
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-black">
          Nombre
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-black"
          placeholder="Nombre del producto"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-black">
          Descripción
        </label>

        <textarea
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-black"
          placeholder="Descripción..."
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-black">
          Categoría
        </label>

        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-black"
          placeholder="Ej: Sandalias"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-black">
            Precio
          </label>

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-black"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-black">
            Stock
          </label>

          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-black"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-black">
          Imagen del producto
        </label>

        <ImageUploader
          onChange={(file) => setImage(file)}
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-[#c1d8f0] py-3 font-semibold text-black transition hover:opacity-90 cursor-pointer"
      >
        Guardar producto
      </button>
    </form>
  )
}