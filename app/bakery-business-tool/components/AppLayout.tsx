'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import {
  Calculator,
  ShoppingCart,
  TrendingUp,
  FileText,
  ChefHat,
  Menu,
  X,
  Users,
  Store,
  Settings as SettingsIcon,
  LogOut,
  Download,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useInventory } from '../hooks'
import { StorageAdapter } from '../utils/indexedDBAdapter'

interface AppLayoutProps {
  children: React.ReactNode
  currentPage?: string
}

export default function AppLayout({ children, currentPage = 'dashboard' }: AppLayoutProps) {
  const router = useRouter()
  const { logout } = useAuth()
  const { toast } = useToast()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { hasLowStock, hasOutOfStock, alertCount } = useInventory()
  const [isSampleDataLoaded, setIsSampleDataLoaded] = useState(false)

  const handleLogout = () => {
    logout()
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully.',
    })
    router.push('/')
  }

  const handleLoadSampleData = async () => {
    try {
      // Fetch the sample data file
      const response = await fetch('/sample-bakery-data.json')
      const data = await response.json()
      
      // Load sample data into localStorage
      await StorageAdapter.setItem('bakery-ingredients', JSON.stringify(data.ingredients))
      await StorageAdapter.setItem('bakery-recipes', JSON.stringify(data.recipes))
      await StorageAdapter.setItem('bakery-orders', JSON.stringify(data.orders))
      await StorageAdapter.setItem('bakery-inventory', JSON.stringify(data.inventory || []))
      await StorageAdapter.setItem('bakery-customers', JSON.stringify(data.customers))

      localStorage.setItem('sampleDataLoaded', 'true')
      
      toast({
        title: '🎉 Sample data loaded!',
        description: 'Your bakery now has recipes, orders, and customers. Explore all features!',
      })
      
      setIsSampleDataLoaded(true)
      setTimeout(() => window.location.reload(), 1000)
    } catch (error) {
      toast({
        title: 'Failed to load sample data',
        description: 'There was an error loading the sample data.',
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    const sampleDataLoaded = localStorage.getItem('sampleDataLoaded')
    if (sampleDataLoaded) {
      setIsSampleDataLoaded(true)
    }
  }, [])

  // Navigation items for the sidebar
  const navItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      shortName: 'Home',
      icon: <ChefHat className="h-5 w-5" />,
      href: '/bakery-business-tool/dashboard',
    },
    {
      id: 'orders',
      name: 'Orders',
      shortName: 'Orders',
      icon: <ShoppingCart className="h-5 w-5" />,
      href: '/bakery-business-tool/orders',
    },
    {
      id: 'recipes',
      name: 'Recipes',
      shortName: 'Recipes',
      icon: <Calculator className="h-5 w-5" />,
      href: '/bakery-business-tool/recipes',
    },
    {
      id: 'inventory',
      name: 'Ingredients & Inventory',
      shortName: 'Inventory',
      icon: <Store className="h-5 w-5" />,
      href: '/bakery-business-tool/inventory',
    },
    {
      id: 'customers',
      name: 'Customers',
      shortName: 'Customers',
      icon: <Users className="h-5 w-5" />,
      href: '/bakery-business-tool/customers',
    },
    {
      id: 'pricing',
      name: 'Pricing',
      shortName: 'Pricing',
      icon: <FileText className="h-5 w-5" />,
      href: '/bakery-business-tool/pricing',
    },
    {
      id: 'invoice-manager',
      name: 'Invoice Manager',
      shortName: 'Invoice Manager',
      icon: <FileText className="h-5 w-5" />,
      href: '/bakery-business-tool/invoice-manager',
    },
    {
      id: 'analytics',
      name: 'Analytics',
      shortName: 'Analytics',
      icon: <TrendingUp className="h-5 w-5" />,
      href: '/bakery-business-tool/analytics',
    },
    {
      id: 'settings',
      name: 'Settings',
      shortName: 'Settings',
      icon: <SettingsIcon className="h-5 w-5" />,
      href: '/bakery-business-tool/settings',
    },
  ]

  const currentItem = navItems.find((item) => item.id === currentPage)

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:shadow-none',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <ChefHat className="h-6 w-6 text-rose-500" />
              <h2 className="text-xl font-semibold">BakeProfit</h2>
            </div>
            <button
              className="p-1 rounded-md hover:bg-gray-100 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link key={item.id} href={item.href}>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    'flex items-center w-full px-3 py-3 rounded-md transition-colors text-left cursor-pointer',
                    currentPage === item.id
                      ? 'bg-rose-50 text-rose-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="font-medium flex-1">{item.name}</span>
                  {item.id === 'inventory' && alertCount > 0 && (
                    <Badge 
                      variant={hasOutOfStock ? 'destructive' : 'default'}
                      className={cn(
                        'ml-2',
                        !hasOutOfStock && 'bg-yellow-500 hover:bg-yellow-600'
                      )}
                    >
                      {alertCount}
                    </Badge>
                  )}
                </button>
              </Link>
            ))}
          </nav>

          {/* Load Sample Data Button */}
          {isSampleDataLoaded ? null : (
            <div className="p-4 border-t">
            <Button
              variant="default"
              className="w-full flex items-center justify-center bg-rose-500 text-white hover:text-white hover:bg-rose-600"
              onClick={handleLoadSampleData}
            >
              <Download className="h-4 w-4 mr-2" />
              Load Sample Data
            </Button>
          </div>
          )}

          {/* Logout button */}
          <div className="p-4 border-t">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center">
              <button
                className="p-1 mr-3 rounded-md hover:bg-gray-100 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-semibold">
                {currentItem?.name || 'BakeProfit'}
              </h1>
            </div>
            <div className="bg-rose-50 rounded-lg p-2 border border-rose-100">
              <div className="flex items-center gap-2">
                <div className="bg-rose-100 p-1 rounded-full">
                  <ChefHat className="h-4 w-4 text-rose-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-700">
                    Your data stays local and is stored on your device using browser storage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content area */}
        <div className="flex-1 overflow-y-auto px-4 py-2 md:px-6 md:py-4">
          {children}
        </div>
      </main>
    </div>
  )
}
