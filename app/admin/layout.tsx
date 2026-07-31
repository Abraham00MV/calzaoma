'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminBreadcrumb from '@/app/components/admin/AdminBreadcrumb'
import { createClient } from '@/app/lib/supabase/client'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const supabase = createClient()

  const [authorized, setAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAccess = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.replace('/admin/login')
        return
      }

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (error || !profile || profile.role !== 'admin') {
        await supabase.auth.signOut()
        router.replace('/admin/login')
        return
      }

      setAuthorized(true)
      setLoading(false)
    }

    checkAccess()
  }, [router, supabase])

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">
          Verificando acceso...
        </p>
      </main>
    )
  }

  if (!authorized) {
    return null
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <AdminBreadcrumb />

        {children}
      </div>
    </main>
  )
}