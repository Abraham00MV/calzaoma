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

  const { error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (loginError) {
    console.error('LOGIN ERROR', loginError)
    setError(loginError.message)
    setLoading(false)
    return
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()


  if (!user) {
    setError('No se pudo obtener el usuario autenticado.')
    setLoading(false)
    return
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle()

  if (profileError) {
    setError(profileError.message)
    setLoading(false)
    return
  }

  let role = profile?.role

  // Si el usuario no tiene perfil, se crea con rol de cliente
  if (!role) {
    const { error: insertError } = await supabase
      .from('profiles')
      .upsert({ id: user.id, role: 'customer' })

    if (insertError) {
      // No bloqueamos el acceso: continúa como cliente
      console.warn('No se pudo crear el perfil:', insertError.message)
    }

    role = 'customer'
  }

  if (role === 'admin') {
    router.push('/admin')
  } else {
    router.push('/account')
  }
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

        const { data, error } = await supabase.auth.signUp({
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

        // Si la confirmación de correo está desactivada, Supabase crea
        // la sesión de inmediato: el usuario entra directo a su cuenta.
        if (data.session) {
            router.push('/account')
        } else {
            router.push('/signup-success')
        }
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

                <form
                    className="space-y-4"
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmit()
                    }}
                >

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
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#c1d8f0] text-black py-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
                    >
                        {loading
                            ? 'Procesando...'
                            : mode === 'login'
                                ? 'Iniciar sesión'
                                : 'Crear cuenta'}
                    </button>
                </form>

            </div>
        </main>
    )
}