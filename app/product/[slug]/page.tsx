'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useCartStore } from '@/app/store/cartStore'
import SizeSelector from '@/app/components/product/SizeSelector'
import QuantitySelector from '@/app/components/cart/QuantitySelector'
import { products } from '@/app/data/products'
import { FiAlertCircle } from 'react-icons/fi'

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string

  const addToCart = useCartStore((state) => state.addToCart)

  const product = products.find((p) => p.slug === slug)

  if (!product) {
    return <p className="p-10">Producto no encontrado</p>
  }

  const images = [product.image, product.image, product.image]

  const [selectedImage, setSelectedImage] = useState(0)
  const [size, setSize] = useState<number | null>(null)
  const [quantity, setQuantity] = useState(1)

  const [errors, setErrors] = useState<{
    size?: string
    quantity?: string
  }>({})

  const handleAddToCart = () => {
    const newErrors: typeof errors = {}

    if (size === null) {
      newErrors.size = 'Selecciona una talla'
    }

    if (!quantity || quantity < 1) {
      newErrors.quantity = 'Cantidad inválida'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    addToCart({
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
      size: size as number,
      quantity,
    })

  }

  return (
    <section className="min-h-screen bg-white py-16">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">

        {/* IMAGES */}
        <div>
          <div className="relative w-full h-[500px] rounded-lg overflow-hidden border-b-8 border-black">
            <Image
              src={images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex gap-4 mt-4">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-20 h-20 rounded overflow-hidden border ${
                  selectedImage === index
                    ? 'border-black'
                    : 'border-gray-300'
                }`}
              >
                <Image
                  src={img}
                  alt="Thumbnail"
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="flex flex-col gap-6">

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            {product.name}
          </h1>

          <p className="text-2xl font-bold text-slate-800">
            ${product.price.toLocaleString('es-CO')}
          </p>

          <p className="text-slate-700 leading-relaxed">
            Producto ideal para {product.useType}, con nivel de comodidad {product.comfortScore}/10.
          </p>

          {/* SIZE */}
          <div>
            <SizeSelector selected={size} onSelect={setSize} />

            {errors.size && (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                <FiAlertCircle />
                <span>{errors.size}</span>
              </div>
            )}
          </div>

          {/* QUANTITY */}
          <div>
            <h3 className="font-semibold mb-2 text-black">
              Cantidad
            </h3>

            <QuantitySelector
              initialQuantity={quantity}
              onChange={setQuantity}
            />

            {errors.quantity && (
              <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                <FiAlertCircle />
                <span>{errors.quantity}</span>
              </div>
            )}
          </div>

          {/* ADD TO CART */}
          <button
            onClick={handleAddToCart}
            className="mt-4 bg-[#c1d8f0] text-black px-10 py-3 rounded-full font-semibold shadow hover:shadow-lg hover:scale-[1.03] transition"
          >
            Agregar al carrito
          </button>

        </div>

      </div>
    </section>
  )
}