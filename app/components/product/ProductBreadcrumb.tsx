'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, '-')
}

type Crumb = {
  label: string
  href?: string
}

export function ProductBreadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500">
      <Link href="/" className="transition hover:text-black">
        Inicio
      </Link>

      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1

        return (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight size={16} className="text-gray-400" />

            {isLast || !crumb.href ? (
              <span className="font-semibold text-black">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="transition hover:text-black"
              >
                {crumb.label}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
