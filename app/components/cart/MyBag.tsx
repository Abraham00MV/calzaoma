'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { ShoppingBag, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/app/store/cartStore'

export default function MyBag() {
  const router = useRouter()

  const {
    items,
    isOpen,
    openCart,
    closeCart,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
  } = useCartStore()

  const totalItems = getTotalItems()
  const hasProducts = items.length > 0

  // Bloquear scroll cuando esté abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
  }, [isOpen])

  const handleButtonClick = () => {
    if (hasProducts) {
      console.log('Ir a checkout')
      // router.push('/checkout') // Cuando exista la ruta
    } else {
      closeCart()
      router.push('/product')
    }
  }

  return (
    <>
      {/* BOTÓN */}
      <button
        onClick={openCart}
        className="fixed top-6 right-6 z-50 bg-slate-900 text-white p-4 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
      >
        <ShoppingBag size={22} />

        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
            {totalItems}
          </span>
        )}
      </button>

      {/* OVERLAY */}
      {isOpen && (
        <div
          onClick={closeCart}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-[380px] bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-black">Mi bolsa</h2>
            <button onClick={closeCart}>
              <X size={22} />
            </button>
          </div>

          {/* Productos */}
          <div className="flex-1 overflow-y-auto space-y-4">
            {items.length === 0 && (
              <p className="text-gray-500">
                Tu carrito está vacío
              </p>
            )}

            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex gap-4 border-b pb-4"
              >
                <div className="relative w-16 h-16">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="flex-1">
                  <p className="font-medium text-black">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Talla: {item.size}
                  </p>
                  <p className="text-sm">
                    Cantidad: {item.quantity}
                  </p>
                  <p className="font-semibold text-black">
                    $
                    {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() =>
                    removeFromCart(item.id, item.size)
                  }
                  className="text-red-500 text-sm"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t pt-4">
            <div className="flex justify-between font-bold text-lg text-black">
              <span>Total</span>
              <span>
                ${getTotalPrice().toLocaleString()}
              </span>
            </div>

            <button
              onClick={handleButtonClick}
              className="w-full bg-slate-900 text-white py-3 rounded-lg mt-4 hover:bg-slate-800 transition"
            >
              {hasProducts ? 'Finalizar compra' : 'Ver productos'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
