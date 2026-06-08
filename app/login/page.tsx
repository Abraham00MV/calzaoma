'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/client'
import { Eye, EyeOff } from 'lucide-react'

const supabase = createClient()
export default function LoginPage() {
    const router = useRouter()

    const [mode, setMode] = useState<'login' | 'signup'>('login')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')

    const [confirmPassword, setConfirmPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')


    const handleLogin = async () => {
        setLoading(true)
        setError('')


        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }

        router.push('/account')
    }

    const handleSignup = async () => {
        setLoading(true)
        setError('')

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden')
            setLoading(false)
            return
        }

        if (password.length < 6) {
            setError('La contraseña debe tener mínimo 6 caracteres')
            setLoading(false)
            return
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
            },
        })

        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }

        router.push('/signup-success')
    }

    const handleSubmit = async () => {
        if (mode === 'login') {
            await handleLogin()
        } else {
            await handleSignup()
        }

        setLoading(false)
    }

    return (
        <main className="min-h-[80vh] flex items-center justify-center px-6">
            <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">

                <h1 className="text-3xl font-bold text-center text-black mb-8">
                    Mi Cuenta
                </h1>

                {/* Tabs */}
                <div className="flex mb-8 bg-gray-100 rounded-xl p-1">
                    <button
                        onClick={() => {
                            setMode('login')
                            setError('')
                        }}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${mode === 'login'
                            ? 'bg-white shadow text-black'
                            : 'text-gray-500'
                            }`}
                    >
                        Iniciar sesión
                    </button>

                    <button
                        onClick={() => {
                            setMode('signup')
                            setError('')
                        }}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${mode === 'signup'
                            ? 'bg-white shadow text-black'
                            : 'text-gray-500'
                            }`}
                    >
                        Crear cuenta
                    </button>
                </div>

                <div className="space-y-4">

                    {mode === 'signup' && (
                        <div>
                            <label className="block text-sm font-medium text-black mb-1">
                                Nombre completo
                            </label>

                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Ej: Abraham Martínez"
                                className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-black"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-black mb-1">
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="correo@ejemplo.com"
                            className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-black"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-black mb-1">
                            Contraseña
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="********"
                                className="w-full border border-gray-200 rounded-xl p-3 pr-12 outline-none focus:border-black"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    {mode === 'signup' && (
                        <div>
                            <label className="block text-sm font-medium text-black mb-1">
                                Confirmar contraseña
                            </label>

                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="********"
                                    className="w-full border border-gray-200 rounded-xl p-3 pr-12 outline-none focus:border-black"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                            <p className="text-sm text-red-600">
                                {error}
                            </p>
                        </div>
                    )}

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-[#c1d8f0] text-black py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
                    >
                        {loading
                            ? 'Procesando...'
                            : mode === 'login'
                                ? 'Iniciar sesión'
                                : 'Crear cuenta'}
                    </button>
                </div>

            </div>
        </main>
    )
}