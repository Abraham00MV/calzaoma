'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

const labels: Record<string, string> = {
  admin: 'Admin',
  products: 'Productos',
  new: 'Nuevo producto',
}

export default function AdminBreadcrumb() {
  const pathname = usePathname()

  const segments = pathname.split('/').filter(Boolean)

  return (
    <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500">
      {segments.map((segment, index) => {
        const href = '/' + segments.slice(0, index + 1).join('/')

        const isLast = index === segments.length - 1

        const isDynamic =
          segment.length > 20 ||
          /^[0-9a-fA-F-]+$/.test(segment)

        const label = isDynamic
          ? 'Editar producto'
          : labels[segment] ?? segment

        return (
          <div
            key={href}
            className="flex items-center gap-2"
          >
            {index > 0 && (
              <ChevronRight
                size={16}
                className="text-gray-400"
              />
            )}

            {isLast ? (
              <span className="font-semibold text-black">
                {label}
              </span>
            ) : (
              <Link
                href={href}
                className="transition hover:text-black"
              >
                {label}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}