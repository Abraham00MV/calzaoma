'use client'

import { useState } from 'react'
import ImageUploader from '@/app/components/admin/ImageUploader'
import { PRODUCT_CATEGORIES } from '@/app/lib/categories'

const AVAILABLE_SIZES = Array.from({ length: 11 }, (_, i) => 34 + i)

type ProductFormProps = {
  initialValues?: {
    name: string
    description: string
    category: string
    price: number
    stock: number
    image: string
    useType: string
    comfortScore: number
    sizes: number[]
  }
  onSubmit?: (product: {
    name: string
    description: string
    category: string
    price: number
    stock: number
    image: File | null
    useType: string
    comfortScore: number
    sizes: number[]
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

  const [useType, setUseType] = useState(
    initialValues?.useType ?? 'trabajo'
  )

  const [comfortScore, setComfortScore] = useState(
    initialValues?.comfortScore?.toString() ?? '5'
  )

  const [sizes, setSizes] = useState<number[]>(
    initialValues?.sizes ?? []
  )

  const categoryOptions = (() => {
    const options = new Set<string>(PRODUCT_CATEGORIES)

    if (initialValues?.category) {
      options.add(initialValues.category)
    }

    return Array.from(options)
  })()

  const toggleSize = (size: number) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size].sort((a, b) => a - b)
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSubmit?.({
      name,
      description,
      category,
      price: Number(price),
      stock: Number(stock),
      image,
      useType,
      comfortScore: Number(comfortScore),
      sizes,
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

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-black"
        >
          <option value="" disabled>
            Selecciona una categoría
          </option>

          {categoryOptions.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
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

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-black">
            Uso principal
          </label>

          <select
            value={useType}
            onChange={(e) => setUseType(e.target.value)}
            className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-black"
          >
            <option value="trabajo">Trabajo</option>
            <option value="deporte">Deporte</option>
            <option value="estilo">Estilo</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-black">
            Comodidad (1 - 10)
          </label>

          <input
            type="number"
            min={1}
            max={10}
            value={comfortScore}
            onChange={(e) => setComfortScore(e.target.value)}
            className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-black"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-black">
          Tallas disponibles
        </label>

        <div className="flex flex-wrap gap-2">
          {AVAILABLE_SIZES.map((size) => {
            const isSelected = sizes.includes(size)

            return (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`w-12 h-12 rounded-lg border font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#c1d8f0] border-black text-black scale-105 shadow-md'
                    : 'bg-white text-black hover:border-black hover:shadow-sm'
                }`}
              >
                {size}
              </button>
            )
          })}
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
