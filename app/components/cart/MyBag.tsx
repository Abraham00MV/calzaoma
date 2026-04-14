'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { X, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/app/store/cartStore'
import CheckoutModal from '@/app/components/checkout/CheckoutModal'

export default function MyBag() {
  const router = useRouter()

  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
    openCheckout,
  } = useCartStore()

  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
  }, [isOpen])

  const safeItems = hasMounted ? items : []
  const totalPrice = hasMounted ? getTotalPrice() : 0

  const hasProducts = safeItems.length > 0

  const handleButtonClick = () => {
    if (hasProducts) {
      openCheckout()
    } else {
      closeCart()
      router.push('/product')
    }
  }

  return (
    <>
      {/* OVERLAY */}
      {isOpen && (
        <div
          onClick={closeCart}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-[380px] bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 flex flex-col h-full">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-black">
              Mi bolsa
            </h2>

            <button onClick={closeCart}>
              <X size={22} />
            </button>
          </div>

          {/* ITEMS */}
          <div className="flex-1 overflow-y-auto space-y-4">

            {hasMounted && safeItems.length === 0 && (
              <p className="text-gray-500">
                Tu carrito está vacío
              </p>
            )}

            {safeItems.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex gap-4 border-b pb-4"
              >
                {/* IMAGE */}
                <div className="relative w-16 h-16">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* INFO */}
                <div className="flex-1">
                  <p className="font-medium text-black">
                    {item.name}
                  </p>
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

                {/* TRASH ACTION (FIXED UX) */}
                <button
                  onClick={() =>
                    removeFromCart(item.id, item.size)
                  }
                  aria-label="Eliminar producto"
                  className="
                    w-8 h-8
                    flex items-center justify-center
                    rounded-full
                    transition
                    hover:bg-red-50
                    active:scale-95
                    group
                  "
                >
                  <Trash2
                    size={18}
                    className="
                      text-gray-500
                      group-hover:text-red-500
                      transition
                    "
                  />
                </button>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div className="border-t pt-4">
            <div className="flex justify-between font-bold text-lg text-black">
              <span>Total</span>
              <span>${totalPrice.toLocaleString()}</span>
            </div>

            <button
              onClick={handleButtonClick}
              className="w-full bg-slate-900 text-white py-3 rounded-lg mt-4 hover:bg-slate-800 transition"
            >
              {hasProducts
                ? 'Finalizar compra'
                : 'Ver productos'}
            </button>
          </div>

        </div>
      </div>

      {/* CHECKOUT */}
      <CheckoutModal />
    </>
  )
}