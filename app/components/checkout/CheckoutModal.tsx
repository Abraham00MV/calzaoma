'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useCartStore } from '@/app/store/cartStore'

// ICONOS
import { FiUser, FiMapPin, FiPhone, FiHome } from 'react-icons/fi'
import { MessageCircle } from 'lucide-react'
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER



export default function CheckoutModal() {
    const {
        isCheckoutOpen,
        closeCheckout,
        items,
        getTotalPrice,
        clearCart
    } = useCartStore()

    const [step, setStep] = useState<1 | 2>(1)


    // ✅ FORM STATE
    const [form, setForm] = useState({
        name: '',
        address: '',
        phone: '',
        city: '',
    })

    const [errors, setErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeCheckout()
        }

        if (isCheckoutOpen) {
            document.addEventListener('keydown', handleEsc)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEsc)
            document.body.style.overflow = 'auto'
        }
    }, [isCheckoutOpen, closeCheckout])

    if (!isCheckoutOpen) return null


    // ✅ VALIDATION
    const validateStep1 = () => {
        const newErrors: Record<string, string> = {}

        if (!form.name.trim()) newErrors.name = 'Requerido'
        if (!form.address.trim()) newErrors.address = 'Requerido'
        if (!form.phone.trim()) newErrors.phone = 'Requerido'
        if (!form.city.trim()) newErrors.city = 'Requerido'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }



    const handleNext = () => {
        if (!validateStep1()) return
        setStep(2)
    }

    const handleConfirm = () => {
        const products = items
            .map(
                (item) =>
                    `• ${item.name}
                Talla: ${item.size}
                Cantidad: ${item.quantity}
                Subtotal: $${(item.price * item.quantity).toLocaleString()}`
            )
            .join('\n\n')

        const message = `
                Hola CalzaOma 👋 Quiero realizar el siguiente pedido:

                ${products}

                📦 Datos del cliente
                Nombre: ${form.name}
                Teléfono: ${form.phone}
                Ciudad: ${form.city}
                Dirección: ${form.address}

                💰 Total: $${getTotalPrice().toLocaleString()}`

        const whatsappUrl =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

        window.open(whatsappUrl, '_blank')

        clearCart()
        setStep(1)

        setForm({
            name: '',
            address: '',
            phone: '',
            city: '',
        })

        setErrors({})
        closeCheckout()

    }



    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                onClick={closeCheckout}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
                <div
                    className="relative bg-white w-full max-w-5xl h-[72vh] rounded-2xl shadow-2xl flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >

                    {/* Close */}
                    <button
                        onClick={closeCheckout}
                        className="absolute top-4 right-4 bg-white border rounded-full p-2 hover:scale-105 transition z-10"
                    >
                        <X size={18} className="text-black" />
                    </button>

                    {/* Header */}
                    <div className="px-8 py-5 border-b">
                        <h2 className="text-xl font-semibold text-black">
                            Finalizar compra
                        </h2>

                        {step === 2 && (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">

                                <MessageCircle
                                    size={64}
                                    className="text-green-500"
                                />

                                <h3 className="text-2xl font-bold text-black">
                                    Confirmar pedido
                                </h3>

                                <p className="text-gray-500 max-w-md">
                                    Se abrirá WhatsApp con toda la información de tu compra para que uno de nuestros asesores continúe el proceso.
                                </p>

                                <div className="w-full max-w-sm border rounded-xl p-4 bg-gray-50 text-left">
                                    <p className="font-semibold mb-2">
                                        Resumen
                                    </p>

                                    <p>
                                        Productos: {items.length}
                                    </p>

                                    <p className="font-bold">
                                        Total: ${getTotalPrice().toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>


                    {/* CONTENT */}
                    <div className="grid md:grid-cols-2 gap-10 p-8 flex-1 overflow-y-auto">

                        {/* LEFT */}
                        <div>
                            <div className="flex items-center gap-2 text-black font-semibold mb-4">
                                <FiUser />
                                <span>Datos de envío</span>
                            </div>

                            <div className="space-y-5">

                                {/* NAME */}
                                <div>
                                    <label className="text-sm font-medium text-black">
                                        Nombre completo
                                    </label>
                                    <div className="relative mt-1">
                                        <FiUser className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            value={form.name}
                                            onChange={(e) =>
                                                setForm({ ...form, name: e.target.value })
                                            }
                                            placeholder="Ej: Juan Pérez"
                                            className="w-full border border-gray-200 rounded-lg p-3 pl-10 bg-white focus:border-black outline-none placeholder-gray-500"
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                                    )}
                                </div>

                                {/* ADDRESS */}
                                <div>
                                    <label className="text-sm font-medium text-black">
                                        Dirección de entrega
                                    </label>
                                    <div className="relative mt-1">
                                        <FiMapPin className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            value={form.address}
                                            onChange={(e) =>
                                                setForm({ ...form, address: e.target.value })
                                            }
                                            placeholder="Calle, número, apartamento"
                                            className="w-full border border-gray-200 rounded-lg p-3 pl-10 bg-white focus:border-black outline-none placeholder-gray-500"
                                        />
                                    </div>
                                    {errors.address && (
                                        <p className="text-xs text-red-500 mt-1">{errors.address}</p>
                                    )}
                                </div>

                                {/* PHONE + CITY */}
                                <div className="grid grid-cols-2 gap-4">

                                    <div>
                                        <label className="text-sm font-medium text-black">
                                            Teléfono
                                        </label>
                                        <div className="relative mt-1">
                                            <FiPhone className="absolute left-3 top-3 text-gray-400" />
                                            <input
                                                value={form.phone}
                                                onChange={(e) =>
                                                    setForm({ ...form, phone: e.target.value })
                                                }
                                                placeholder="300 123 4567"
                                                className="w-full border border-gray-200 rounded-lg p-3 pl-10 bg-white focus:border-black outline-none placeholder-gray-500"
                                            />
                                        </div>
                                        {errors.phone && (
                                            <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-black">
                                            Ciudad
                                        </label>
                                        <input
                                            value={form.city}
                                            onChange={(e) =>
                                                setForm({ ...form, city: e.target.value })
                                            }
                                            placeholder="Ej: Bogotá"
                                            className="w-full mt-1 border border-gray-200 rounded-lg p-3 bg-white focus:border-black outline-none placeholder-gray-500"
                                        />
                                        {errors.city && (
                                            <p className="text-xs text-red-500 mt-1">{errors.city}</p>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div>

                            {/* STEP 1 */}
                            <>
                                <div className="flex items-center gap-2 text-black font-semibold mb-4">
                                    <FiHome />
                                    <span>Resumen del pedido</span>
                                </div>
                                <div className="space-y-4 max-h-[220px] overflow-y-auto pr-2">

                                    {items.map((item) => (
                                        <div
                                            key={`${item.id}-${item.size}`}
                                            className="flex gap-3 items-center"
                                        >
                                            <div className="w-14 h-14 relative bg-white rounded">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-black">
                                                    {item.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Talla: {item.size} × {item.quantity}
                                                </p>
                                            </div>

                                            <p className="text-sm font-semibold text-black">
                                                ${(item.price * item.quantity).toLocaleString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t mt-4 pt-4 flex justify-between text-xl font-bold">
                                    <span>Total</span>
                                    <span>${getTotalPrice().toLocaleString()}</span>
                                </div>
                            </>


                            {/* STEP 2 - NEQUI */}
                            {/* STEP 2 - CONTRAENTREGA (FULL SCREEN STATE) */}

                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className="p-6 border-t">
                        {step === 1 ? (
                            <button
                                onClick={handleNext}
                                className="w-full bg-[#c1d8f0] text-black py-4 rounded-xl font-semibold"
                            >
                                Continuar
                            </button>
                        ) : (
                            <button
                                onClick={handleConfirm}
                                className="w-full py-4 rounded-xl font-semibold bg-green-500 text-white hover:opacity-90 transition"
                            >
                                Enviar solicitud de pedido
                            </button>
                        )}

                    </div>
                </div>

            </div>
        </>
    )
}