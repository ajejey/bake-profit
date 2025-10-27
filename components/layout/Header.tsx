'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChefHat, Menu, X } from 'lucide-react'

interface HeaderProps {
  showBlog?: boolean
  showTools?: boolean
}

export function Header({ showBlog = true, showTools = true }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0"
              onClick={closeMenu}
            >
              <ChefHat className="h-8 w-8 text-rose-500" />
              <h2 className="text-2xl font-bold text-gray-900">BakeProfit</h2>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {showTools && (
                <Link 
                  href="/tools" 
                  className="text-gray-700 hover:text-rose-600 font-medium transition-colors"
                >
                  Free Tools
                </Link>
              )}
              {showBlog && (
                <Link 
                  href="/blog" 
                  className="text-gray-700 hover:text-rose-600 font-medium transition-colors"
                >
                  Blog
                </Link>
              )}
              <Link 
                href="/pricing" 
                className="text-gray-700 hover:text-rose-600 font-medium transition-colors"
              >
                Pricing
              </Link>
              <a 
                href="#features" 
                className="text-gray-700 hover:text-rose-600 font-medium transition-colors"
              >
                Features
              </a>
            </div>

            {/* Desktop CTA + Mobile Menu Button */}
            <div className="flex items-center gap-4">
              <Link 
                href="/bakery-business-tool"
                className="hidden sm:inline-block bg-rose-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-rose-600 transition-all duration-300"
              >
                Launch App Free →
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 hover:bg-rose-50 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="h-6 w-6 text-gray-900" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-900" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Sidebar */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-black/50 z-40" onClick={closeMenu} />
        )}
        
        <div
          className={`md:hidden fixed top-16 left-0 h-screen w-64 bg-white border-r border-rose-100 transform transition-transform duration-300 ease-in-out z-40 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col p-6 space-y-4">
            {showTools && (
              <Link
                href="/tools"
                className="text-gray-700 hover:text-rose-600 font-medium transition-colors py-2"
                onClick={closeMenu}
              >
                Free Tools
              </Link>
            )}
            {showBlog && (
              <Link
                href="/blog"
                className="text-gray-700 hover:text-rose-600 font-medium transition-colors py-2"
                onClick={closeMenu}
              >
                Blog
              </Link>
            )}
            <Link
              href="/pricing"
              className="text-gray-700 hover:text-rose-600 font-medium transition-colors py-2"
              onClick={closeMenu}
            >
              Pricing
            </Link>
            <a
              href="#features"
              className="text-gray-700 hover:text-rose-600 font-medium transition-colors py-2"
              onClick={closeMenu}
            >
              Features
            </a>
            
            {/* Mobile CTA */}
            <div className="pt-4 border-t border-rose-100">
              <Link
                href="/bakery-business-tool"
                className="block w-full bg-rose-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-rose-600 transition-all duration-300 text-center"
                onClick={closeMenu}
              >
                Launch App Free →
              </Link>
            </div>
          </div>
        </div>
      </nav>

     

      {/* Spacer for fixed nav */}
      <div className="h-16" />
    </>
  )
}
