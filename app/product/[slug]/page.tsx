'use client'

import { useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useCartStore } from '@/app/store/cartStore'
import SizeSelector from '@/app/components/product/SizeSelector'
import QuantitySelector from '@/app/components/cart/QuantitySelector'
import { useProducts, formatPrice } from '@/app/lib/products'
import { FiAlertCircle } from 'react-icons/fi'
import {
  ProductBreadcrumb,
  slugify,
} from '@/app/components/product/ProductBreadcrumb'
import FavoriteButton from '@/app/components/product/FavoriteButton'

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string

  const { products, loading } = useProducts()
  const addToCart = useCartStore((state) => state.addToCart)

  const product = useMemo(
    () => products.find((p) => p.slug === slug),
    [products, slug]
  )

  const [selectedImage, setSelectedImage] = useState(0)
  const [size, setSize] = useState<number | null>(null)
  const [quantity, setQuantity] = useState(1)

  const [errors, setErrors] = useState<{
    size?: string
    quantity?: string
  }>({})

  if (loading) {
    return (
      <section className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">Cargando producto...</p>
      </section>
    )
  }

  if (!product) {
    return <p className="p-10">Producto no encontrado</p>
  }

  const images = [product.image, product.image, product.image]
  const availableSizes =
    product.sizes.length > 0
      ? product.sizes
      : Array.from(
          { length: product.maxSize - product.minSize + 1 },
          (_, i) => product.minSize + i
        )

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
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size as number,
      quantity,
    })
  }

  return (
    <section className="min-h-screen bg-white py-16">

      <div className="max-w-7xl mx-auto px-6">
        <ProductBreadcrumb
          crumbs={[
            { label: 'Productos', href: '/product' },
            {
              label: product.category,
              href: `/product?category=${slugify(product.category)}`,
            },
            { label: product.name },
          ]}
        />
      </div>

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
            {formatPrice(product.price)}
          </p>

          <p className="text-slate-700 leading-relaxed">
            {product.description ||
              `Producto ideal para ${product.useType}, con nivel de comodidad ${product.comfortScore}/10.`}
          </p>

          {/* SIZE */}
          <div>
            <SizeSelector
              selected={size}
              onSelect={setSize}
              sizes={availableSizes}
            />

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
          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-[#c1d8f0] text-black px-10 py-3 rounded-full font-semibold shadow hover:shadow-lg hover:scale-[1.03] transition"
            >
              Agregar al carrito
            </button>
            <FavoriteButton productId={product.id} size={24} />
          </div>

        </div>

      </div>
    </section>
  )
}
