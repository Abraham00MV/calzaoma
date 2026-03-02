'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useCartStore } from '@/app/store/cartStore'
import SizeSelector from '@/app/components/product/SizeSelector'
import QuantitySelector from '@/app/components/cart/QuantitySelector'

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string

  const addToCart = useCartStore((state) => state.addToCart)

  // 🔹 Mock product (simulando respuesta API)
  const product = {
    id: '1',
    slug,
    name: 'Zapato Casual Hombre',
    price: 120000,
    description:
      'Zapato casual elaborado en cuero sintético de alta calidad, ideal para uso diario. Diseñado para brindar comodidad, durabilidad y estilo. Suela antideslizante y plantilla acolchada para máximo confort.',
    images: [
      '/products/mock-shoe-1.jpg',
      '/products/mock-shoe-2.jpg',
      '/products/mock-shoe-3.jpg',
    ],
  }

  const [selectedImage, setSelectedImage] = useState(0)
  const [size, setSize] = useState<number | null>(null)
  
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    if (!size) return alert('Selecciona una talla')

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size,
      quantity,
    })

    alert('Producto agregado al carrito')
  }

  return (
    <section className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">

        {/* 🔹 IMAGE SLIDER */}
        <div>
          <div className="relative w-full h-[500px] rounded-lg overflow-hidden border-b-8 border-black">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 mt-4">
            {product.images.map((img, index) => (
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

        {/* 🔹 PRODUCT INFO */}
        <div className="flex flex-col gap-6">

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            {product.name}
          </h1>

          <p className="text-2xl font-bold text-slate-800">
            ${product.price.toLocaleString('es-CO')}
          </p>

          <p className="text-slate-700 leading-relaxed">
            {product.description}
          </p>

          {/* Size Selector */}
          <SizeSelector selected={size} onSelect={setSize} />

          {/* Quantity Selector */}
          <div>
            <h3 className="font-semibold mb-2">Cantidad</h3>
            <QuantitySelector
              quantity={quantity}
              onChange={setQuantity}
            />
          </div>

          {/* Add to Cart */}
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
