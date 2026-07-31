'use client'

import Image from 'next/image'
import {
  ShoppingBag,
  ChevronDown,
  User,
  LogOut,
} from 'lucide-react'
import { useCartStore } from '@/app/store/cartStore'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/client'

export default function Navbar() {
  const router = useRouter()
  const { getTotalItems, openCart } = useCartStore()

  const [mounted, setMounted] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [userName, setUserName] = useState('')

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    setMounted(true)

    const loadSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      setIsAuthenticated(!!session)

      if (!session?.user) {
        setUserName('')
        setIsAdmin(false)
        return
      }

      setUserName(
        session.user.user_metadata?.full_name || 'Mi cuenta'
      )

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

      setIsAdmin(profile?.role === 'admin')
    }

    loadSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setIsAuthenticated(!!session)

      if (!session?.user) {
        setUserName('')
        setIsAdmin(false)
        return
      }

      setUserName(
        session.user.user_metadata?.full_name || 'Mi cuenta'
      )

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

      setIsAdmin(profile?.role === 'admin')
    })

    return () => subscription.unsubscribe()
  }, [])

  const totalItems = mounted ? getTotalItems() : 0

  const categories = [
    { label: 'Sandalias', value: 'sandalias' },
    { label: 'Zapatos dama', value: 'zapatos-dama' },
    { label: 'Tenis deportivos', value: 'tenis-deportivos' },
  ]

  const handleCategory = (value: string) => {
    setDropdownOpen(false)
    router.push(`/product?category=${value}`)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#f8fafc] border-b border-gray-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-[17px]">

        {/* LOGO */}
        <div
          className="flex cursor-pointer items-center gap-3"
          onClick={() => router.push(isAdmin ? '/admin' : '/')}
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-xl">
            <Image
              src="/logos/Oma-logo-rise.webp"
              alt="CalzaOma"
              fill
              className="object-contain"
            />
          </div>

          <span className="text-lg font-semibold text-black">
            CalzaOma
          </span>
        </div>

        {/* NAV CLIENTE */}
        {!isAdmin && (
          <nav className="hidden items-center gap-10 text-sm font-medium text-gray-600 md:flex">

            <button
              onClick={() => router.push('/')}
              className="transition hover:text-black"
            >
              Inicio
            </button>

            <button
              onClick={() => router.push('/product')}
              className="transition hover:text-black"
            >
              Productos
            </button>

            <div className="relative">

              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1 transition hover:text-black"
              >
                Categorías
                <ChevronDown size={16} />
              </button>

              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setDropdownOpen(false)}
                  />

                  <div className="absolute left-0 z-20 mt-3 w-56 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">

                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => handleCategory(cat.value)}
                        className="w-full px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-gray-50 hover:text-black"
                      >
                        {cat.label}
                      </button>
                    ))}

                  </div>
                </>
              )}

            </div>

          </nav>
        )}

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {!isAdmin && (
            <button
              onClick={openCart}
              className="relative text-gray-700 transition hover:text-black"
            >
              <ShoppingBag size={22} />

              {mounted && totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>
          )}

          {isAuthenticated ? (
            <>
              <button
                onClick={() =>
                  router.push(isAdmin ? '/admin' : '/account')
                }
                className="flex items-center gap-2 text-gray-700 transition hover:text-black"
              >
                <User size={22} />

                <span className="max-w-[120px] truncate">
                  {isAdmin ? 'Panel Admin' : userName}
                </span>
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                <LogOut size={16} />
                Cerrar sesión
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push('/login')}
              className="rounded-full bg-[#c1d8f0] px-5 py-2.5 text-sm font-medium text-black transition hover:opacity-90"
            >
              Iniciar sesión
            </button>
          )}

        </div>
      </div>
    </header>
  )
}