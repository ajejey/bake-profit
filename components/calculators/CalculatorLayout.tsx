import React from 'react'
import Link from 'next/link'
import { ChefHat, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Header } from '@/components/layout/Header'
interface CalculatorLayoutProps {
  children: React.ReactNode
  title: string
  description: string
  showBackButton?: boolean
}

export default function CalculatorLayout({
  children,
  title,
  description,
  showBackButton = true
}: CalculatorLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* Header */}

      <Header />
      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className='mb-3'>
          <Breadcrumbs
            items={[
              { label: 'Tools', href: '/tools' },
              { label: title, href: '#' },
            ]}
          />
        </div>

        {/* Title Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Calculator Content */}
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ChefHat className="h-6 w-6 text-rose-500" />
                <span className="font-bold text-gray-900">BakeProfit</span>
              </div>
              <p className="text-sm text-gray-600">
                Free tools and software for home bakers and small bakeries.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Free Tools</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/tools/recipe-cost-calculator" className="hover:text-rose-600 transition-colors">
                    Recipe Cost Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/tools/cake-pricing-calculator" className="hover:text-rose-600 transition-colors">
                    Cake Pricing Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/tools/recipe-scaling-calculator" className="hover:text-rose-600 transition-colors">
                    Recipe Scaling Calculator
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/bakery-business-tool" className="hover:text-rose-600 transition-colors">
                    Full App
                  </Link>
                </li>
                <li>
                  <Link href="/#features" className="hover:text-rose-600 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/#pricing" className="hover:text-rose-600 transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>© 2025 BakeProfit. All rights reserved. Made with ❤️ for bakers.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
