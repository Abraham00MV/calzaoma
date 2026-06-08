'use client'

import Image from 'next/image'
import { ShoppingBag, ChevronDown, User } from 'lucide-react'
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
  const supabase = createClient()

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      setIsAuthenticated(!!session)

      if (session?.user) {
        setUserName(
          session.user.user_metadata?.full_name || 'Mi cuenta'
        )
      }
    }

    getSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session)

      if (session?.user) {
        setUserName(
          session.user.user_metadata?.full_name || 'Mi cuenta'
        )
      } else {
        setUserName('')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
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

  return (
    <header className="sticky top-0 z-50 w-full bg-[#f8fafc] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-[17px] flex items-center justify-between">

        {/* LOGO */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => router.push('/')}
        >
          <div className="relative w-10 h-10 rounded-xl overflow-hidden">
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

        {/* NAV */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-600">

          <button
            onClick={() => router.push('/')}
            className="hover:text-black transition"
          >
            Inicio
          </button>

          <button
            onClick={() => router.push('/product')}
            className="hover:text-black transition"
          >
            Productos
          </button>

          {/* DROPDOWN SAFE */}
          <div className="relative">

            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1 hover:text-black transition"
            >
              Categorías
              <ChevronDown size={16} />
            </button>

            {/* dropdown */}
            {dropdownOpen && (
              <>
                {/* SAFE BACKDROP (no full screen blocking layout issues) */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setDropdownOpen(false)}
                />

                {/* MENU */}
                <div className="absolute left-0 mt-3 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl z-20 overflow-hidden">

                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => handleCategory(cat.value)}
                      className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition"
                    >
                      {cat.label}
                    </button>
                  ))}

                </div>
              </>
            )}

          </div>
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-5">

          <button
            onClick={openCart}
            className="relative text-gray-700 hover:text-black transition"
          >
            <ShoppingBag size={22} />

            {mounted && totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>


          {isAuthenticated ? (
            <button
              onClick={() => router.push('/account')}
              className="flex items-center gap-2 text-gray-700 hover:text-black transition"
            >
              <User size={22} />
              <span className="max-w-[120px] truncate">
                {userName}
              </span>
            </button>
          ) : (
            <button
              onClick={() => router.push('/login')}
              className="bg-[#c1d8f0] text-black px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition"
            >
              Iniciar sesión
            </button>
          )}

        </div>
      </div>
    </header>
  )
}