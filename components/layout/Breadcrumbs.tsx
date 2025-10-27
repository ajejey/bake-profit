import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav 
      className={`flex items-center gap-2 text-sm text-gray-600 ${className}`}
      aria-label="Breadcrumb"
    >
      {/* Home Link */}
      <Link 
        href="/" 
        className="text-gray-600 hover:text-rose-600 transition-colors font-medium"
      >
        Home
      </Link>

      {/* Breadcrumb Items */}
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4 text-gray-400" />
          
          {item.href ? (
            <Link
              href={item.href}
              className="text-gray-600 hover:text-rose-600 transition-colors font-medium"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
