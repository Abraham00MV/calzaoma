'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useCartStore } from '@/app/store/cartStore'

// ICONOS
import { FiUser, FiMapPin, FiPhone, FiHome } from 'react-icons/fi'
import { FaTruck } from 'react-icons/fa'

export default function CheckoutModal() {
    const {
        isCheckoutOpen,
        closeCheckout,
        items,
        getTotalPrice,
    } = useCartStore()

    const [payment, setPayment] = useState<'nequi' | 'contraentrega'>('contraentrega')
    const [step, setStep] = useState<1 | 2>(1)

    const [proof, setProof] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)

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

    const handleFile = (file: File | null) => {
        setProof(file)

        if (file) {
            const reader = new FileReader()
            reader.onload = () => setPreview(reader.result as string)
            reader.readAsDataURL(file)
        }
    }

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

    const validateStep2 = () => {
        if (payment === 'nequi' && !proof) {
            setErrors({ proof: 'Debes subir comprobante de pago' })
            return false
        }
        setErrors({})
        return true
    }

    const handleNext = () => {
        if (!validateStep1()) return
        setStep(2)
    }

    const handleConfirm = () => {
        if (!validateStep2()) return
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
                            <button
                                onClick={() => setStep(1)}
                                className="mt-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c1d8f0] text-black text-xs font-semibold shadow-sm hover:scale-[1.02] hover:opacity-90 transition"
                            >
                                ← Volver a métodos de pago
                            </button>
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
                            <div className="flex items-center gap-2 text-black font-semibold mb-4">
                                <FiHome />
                                <span>Resumen del pedido</span>
                            </div>

                            {/* STEP 1 */}
                            {step === 1 && (
                                <>
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

                                    {/* PAYMENT */}
                                    <div className="mt-6 space-y-3">

                                        <div
                                            onClick={() => setPayment('nequi')}
                                            className={`border rounded-xl p-4 flex justify-between items-center cursor-pointer transition ${payment === 'nequi'
                                                ? 'border-2 border-[#c1d8f0]'
                                                : 'border-gray-200 bg-white'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <input type="radio" checked={payment === 'nequi'} readOnly />
                                                <div>
                                                    <p className="font-semibold text-black">Nequi</p>
                                                    <p className="text-xs text-gray-600">
                                                        Pago con billetera digital
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="bg-white border rounded-lg px-3 py-2">
                                                <img
                                                    src="/payment/Nequi_Colombia_logo.svg"
                                                    alt="Nequi"
                                                    className="h-9 w-auto object-contain"
                                                />
                                            </div>
                                        </div>

                                        <div
                                            onClick={() => setPayment('contraentrega')}
                                            className={`border rounded-xl p-4 flex justify-between items-center cursor-pointer transition ${payment === 'contraentrega'
                                                ? 'border-2 border-[#c1d8f0]'
                                                : 'border-gray-200 bg-white'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <input type="radio" checked={payment === 'contraentrega'} readOnly />
                                                <div>
                                                    <p className="font-semibold text-black">
                                                        Contraentrega
                                                    </p>
                                                    <p className="text-xs text-gray-600">
                                                        Pago en efectivo al recibir
                                                    </p>
                                                </div>
                                            </div>

                                            <FaTruck className="text-green-600 text-lg" />
                                        </div>

                                    </div>
                                </>
                            )}

                            {/* STEP 2 - NEQUI */}
                            {step === 2 && payment === 'nequi' && (
                                <div className="space-y-4">

                                    {/* CARD DATOS PAGO */}
                                    <div className="p-4 border rounded-xl bg-white flex items-center gap-3">

                                        <img
                                            src="/payment/Nequi_Colombia_logo.svg"
                                            alt="Nequi"
                                            className="w-10 h-10 object-contain"
                                        />

                                        <div>
                                            <p className="font-semibold text-black">
                                                Fabian Salazar
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Nequi: 300 123 4567
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Total: ${getTotalPrice().toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    {/* UPLOAD / PREVIEW LOGIC */}
                                    <div className="border rounded-xl p-4 bg-white">

                                        <p className="font-medium text-black mb-2">
                                            Subir comprobante de pago
                                        </p>

                                        {/* SI NO HAY IMAGEN -> UPLOAD */}
                                        {!preview && (
                                            <label className="block border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition">

                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0] || null

                                                        // 🔒 SOLO 1 ARCHIVO
                                                        if (!file) return
                                                        handleFile(file)
                                                    }}
                                                    className="hidden"
                                                />

                                                <p className="text-sm text-gray-600">
                                                    Haz clic o sube tu captura de pago aquí
                                                </p>

                                                <p className="text-xs text-gray-400 mt-1">
                                                    JPG, PNG o JPEG
                                                </p>
                                            </label>
                                        )}

                                        {/* SI HAY IMAGEN -> SOLO PREVIEW */}
                                        {preview && (
                                            <div className="relative mt-3 border rounded-lg overflow-hidden">

                                                <img
                                                    src={preview}
                                                    className="w-full h-40 object-cover"
                                                />

                                                {/* ERASE BUTTON */}
                                                <button
                                                    onClick={() => {
                                                        setProof(null)
                                                        setPreview(null)
                                                    }}
                                                    className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-black/70 text-white hover:bg-red-500 transition"
                                                >
                                                    <X size={14} />
                                                </button>

                                            </div>
                                        )}
                                    </div>

                                    {/* WARNING MESSAGE */}
                                    <div className="flex items-center gap-2 text-xs text-gray-600">

                                        <svg
                                            className="w-4 h-4 text-gray-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>

                                        <span>
                                            Adjunta comprobante de pago a Nequi para confirmar tu compra
                                        </span>
                                    </div>

                                </div>
                            )}

                            {/* STEP 2 - CONTRAENTREGA (FULL SCREEN STATE) */}
                            {step === 2 && payment === 'contraentrega' && (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-5">

                                    {/* LOGO */}
                                    <img
                                        src="/logos/Oma-logo-rise.webp"
                                        alt="Oma"
                                        className="w-20 h-20 object-contain"
                                    />

                                    {/* MESSAGE */}
                                    <p className="text-xl font-semibold text-black">
                                        Te contactaremos para confirmar tu pedido
                                    </p>

                                    <p className="text-sm text-gray-500 max-w-sm">
                                        Nuestro equipo revisará tu solicitud y se pondrá en contacto contigo en breve.
                                    </p>

                                </div>
                            )}

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
                                disabled={payment === 'nequi' && !proof}
                                className={`w-full py-4 rounded-xl font-semibold transition ${payment === 'nequi' && !proof
                                    ? 'bg-[#c1d8f0] opacity-40 cursor-not-allowed text-black'
                                    : 'bg-[#c1d8f0] text-black hover:opacity-90'
                                    }`}
                            >
                                {payment === 'contraentrega'
                                    ? 'Confirmar datos y enviar'
                                    : 'Confirmar pedido'}
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </>
    )
}