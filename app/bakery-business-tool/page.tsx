'use client'

import React, { useState, useEffect } from 'react'
import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Calculator, 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  FileText, 
  ChefHat,
  Menu,
  X,
  Download,
  Upload,
  Users,
  Store,
  Settings as SettingsIcon,
  LogOut
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Dashboard from './components/Dashboard'
import RecipeCalculator from './components/RecipeCalculator'
import OrderTracker from './components/OrderTracker'
import InventoryManager from './components/InventoryManager'
import CustomerManagement from './components/CustomerManagement'
import PricingCalculator from './components/PricingCalculator'
import BusinessAnalytics from './components/BusinessAnalytics'
import Settings from './components/Settings'
import SoftwareApplicationSchema from '@/components/structured-data/SoftwareApplicationSchema'
import OrganizationSchema from '@/components/structured-data/OrganizationSchema'
import BreadcrumbSchema from '@/components/structured-data/BreadcrumbSchema'
import FAQSchema from '@/components/structured-data/FAQSchema'

// All components imported and ready to use!

export default function BakeryBusinessTool() {
  const { toast } = useToast()
  const { logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Check if localStorage is available (for SSR compatibility)
  const isLocalStorageAvailable = typeof window !== 'undefined' && window.localStorage

  useEffect(() => {
    // Initialize local storage with default data if not already set
    if (isLocalStorageAvailable) {
      if (!localStorage.getItem('bakery-ingredients')) {
        localStorage.setItem('bakery-ingredients', JSON.stringify([]))
      }
      if (!localStorage.getItem('bakery-recipes')) {
        localStorage.setItem('bakery-recipes', JSON.stringify([]))
      }
      if (!localStorage.getItem('bakery-orders')) {
        localStorage.setItem('bakery-orders', JSON.stringify([]))
      }
      if (!localStorage.getItem('bakery-inventory')) {
        localStorage.setItem('bakery-inventory', JSON.stringify([]))
      }
      if (!localStorage.getItem('bakery-customers')) {
        localStorage.setItem('bakery-customers', JSON.stringify([]))
      }
      setIsDataLoaded(true)
    }
  }, [isLocalStorageAvailable])

  const handleExportData = () => {
    if (!isLocalStorageAvailable) return

    try {
      const data = {
        ingredients: JSON.parse(localStorage.getItem('bakery-ingredients') || '[]'),
        recipes: JSON.parse(localStorage.getItem('bakery-recipes') || '[]'),
        orders: JSON.parse(localStorage.getItem('bakery-orders') || '[]'),
        inventory: JSON.parse(localStorage.getItem('bakery-inventory') || '[]'),
        customers: JSON.parse(localStorage.getItem('bakery-customers') || '[]'),
      }

      const dataStr = JSON.stringify(data)
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
      
      const exportFileDefaultName = `bakery-business-data-${new Date().toISOString().split('T')[0]}.json`
      
      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', exportFileDefaultName)
      linkElement.click()
      
      toast({
        title: 'Data exported successfully',
        description: 'Your bakery business data has been exported as a JSON file.',
      })
    } catch (error) {
      toast({
        title: 'Export failed',
        description: 'There was an error exporting your data.',
        variant: 'destructive',
      })
    }
  }

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isLocalStorageAvailable || !event.target.files || event.target.files.length === 0) return

    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const result = e.target?.result
        if (typeof result === 'string') {
          const data = JSON.parse(result)
          
          // Validate data structure
          if (data.ingredients && data.recipes && data.orders && data.inventory && data.customers) {
            localStorage.setItem('bakery-ingredients', JSON.stringify(data.ingredients))
            localStorage.setItem('bakery-recipes', JSON.stringify(data.recipes))
            localStorage.setItem('bakery-orders', JSON.stringify(data.orders))
            localStorage.setItem('bakery-inventory', JSON.stringify(data.inventory))
            localStorage.setItem('bakery-customers', JSON.stringify(data.customers))
            
            toast({
              title: 'Data imported successfully',
              description: 'Your bakery business data has been imported.',
            })
            
            // Refresh the page to load the new data
            window.location.reload()
          } else {
            throw new Error('Invalid data format')
          }
        }
      } catch (error) {
        toast({
          title: 'Import failed',
          description: 'The file format is invalid or corrupted.',
          variant: 'destructive',
        })
      }
    }

    reader.readAsText(file)
  }

  const handleLoadSampleData = async () => {
    if (!isLocalStorageAvailable) return

    try {
      // Fetch the sample data file
      const response = await fetch('/sample-bakery-data.json')
      const data = await response.json()
      
      // Load sample data into localStorage
      localStorage.setItem('bakery-ingredients', JSON.stringify(data.ingredients))
      localStorage.setItem('bakery-recipes', JSON.stringify(data.recipes))
      localStorage.setItem('bakery-orders', JSON.stringify(data.orders))
      localStorage.setItem('bakery-inventory', JSON.stringify(data.inventory || []))
      localStorage.setItem('bakery-customers', JSON.stringify(data.customers))
      
      toast({
        title: '🎉 Sample data loaded!',
        description: 'Your bakery now has recipes, orders, and customers. Explore all features!',
      })
      
      // Refresh to load new data
      setTimeout(() => window.location.reload(), 1000)
    } catch (error) {
      toast({
        title: 'Failed to load sample data',
        description: 'There was an error loading the sample data.',
        variant: 'destructive',
      })
    }
  }

  const handleLogout = () => {
    // Call the proper logout function from AuthContext
    // This will clear JWT token and user data from localStorage
    logout()
    
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully.',
    })
    
    // Redirect to home page after logout
    router.push('/')
  }

  // Navigation items for the sidebar
  const navItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      shortName: 'Home',
      icon: <ChefHat className="h-5 w-5" />
    },
    {
      id: 'order-tracker',
      name: 'Orders',
      shortName: 'Orders',
      icon: <ShoppingCart className="h-5 w-5" />
    },
    {
      id: 'recipe-calculator',
      name: 'Recipes',
      shortName: 'Recipes',
      icon: <Calculator className="h-5 w-5" />
    },
    {
      id: 'inventory-manager',
      name: 'Ingredients & Inventory',
      shortName: 'Inventory',
      icon: <Store className="h-5 w-5" />
    },
    {
      id: 'customers',
      name: 'Customers',
      shortName: 'Customers',
      icon: <Users className="h-5 w-5" />
    },
    {
      id: 'pricing-calculator',
      name: 'Pricing',
      shortName: 'Pricing',
      icon: <FileText className="h-5 w-5" />
    },
    {
      id: 'business-analytics',
      name: 'Analytics',
      shortName: 'Analytics',
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      id: 'settings',
      name: 'Settings',
      shortName: 'Settings',
      icon: <SettingsIcon className="h-5 w-5" />
    }
  ];

  if (!isDataLoaded && isLocalStorageAvailable) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    )
  }

  return (
    <>
      {/* Structured Data for SEO */}
      <SoftwareApplicationSchema
        name="Home Bakery Business Tool"
        description="Free all-in-one bakery business management tool for home bakers. Calculate recipe costs, track orders, manage inventory, and analyze profits - all offline with no login required."
        url={typeof window !== 'undefined' ? window.location.origin + '/bakery-business-tool' : 'https://yourdomain.com/bakery-business-tool'}
        applicationCategory="BusinessApplication"
        operatingSystem="Any"
        offers={{
          price: "0",
          priceCurrency: "USD"
        }}
        featureList={[
          "Recipe Cost Calculator",
          "Order Tracking System",
          "Inventory Management",
          "Pricing Calculator",
          "Business Analytics Dashboard",
          "Data Export/Import",
          "Offline Functionality"
        ]}
      />
      
      <OrganizationSchema
        name="Food Label Maker"
        url={typeof window !== 'undefined' ? window.location.origin : 'https://yourdomain.com'}
        description="Free online tools for food businesses and home bakers"
      />
      
      <BreadcrumbSchema
        items={[
          { name: "Home", url: typeof window !== 'undefined' ? window.location.origin : 'https://yourdomain.com' },
          { name: "Bakery Business Tool", url: typeof window !== 'undefined' ? window.location.origin + '/bakery-business-tool' : 'https://yourdomain.com/bakery-business-tool' }
        ]}
      />
      
      <FAQSchema
        faqs={[
          {
            question: "How do I calculate recipe costs for my bakery?",
            answer: "Use our Recipe Cost Calculator to add ingredients with their costs and quantities. The tool automatically calculates the total recipe cost, cost per serving, and helps you determine profitable pricing."
          },
          {
            question: "Is my bakery business data stored online?",
            answer: "No, all your data is stored locally on your device using browser storage. We don't collect or store any of your information on our servers. Remember to regularly export your data as a backup."
          },
          {
            question: "Can I export my bakery data?",
            answer: "Yes, you can export all your data (recipes, ingredients, orders, inventory) as a JSON file. Use the Export Data button in the sidebar to download your data for backup or transfer."
          },
          {
            question: "How do I price my baked goods for profit?",
            answer: "Our Pricing Calculator helps you determine selling prices based on ingredient costs, labor, overhead, and desired profit margins. It considers all costs to ensure profitable pricing."
          },
          {
            question: "What features are included in the Bakery Business Tool?",
            answer: "The tool includes Recipe Cost Calculator, Order Tracking, Inventory Management, Pricing Calculator, and Business Analytics Dashboard. All features are free and work offline."
          },
          {
            question: "Do I need to create an account to use this tool?",
            answer: "No account needed! The tool works entirely in your browser with no login required. Your data stays on your device for complete privacy."
          },
          {
            question: "Can I use this tool on my mobile device?",
            answer: "Yes, the Bakery Business Tool is fully responsive and works on all devices - desktop, tablet, and mobile phones."
          },
          {
            question: "How do I track ingredient inventory?",
            answer: "Use the Inventory Manager to track ingredient stock levels, set low stock alerts, and generate shopping lists based on upcoming orders."
          }
        ]}
      />

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
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:shadow-none",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
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
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={cn(
                  "flex items-center w-full px-3 py-3 rounded-md transition-colors text-left",
                  activeTab === item.id 
                    ? "bg-rose-50 text-rose-600" 
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </nav>

          {/* Data management */}
          <div className="p-4 border-t space-y-2">
            <Button 
              variant="default" 
              className="w-full flex items-center justify-center bg-rose-500 hover:bg-rose-600 transition-colors" 
              onClick={handleLoadSampleData}
            >
              <ChefHat className="h-4 w-4 mr-2" />
              Load Sample Data
            </Button>
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center text-gray-700 hover:text-gray-900 hover:bg-gray-100" 
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
            {/* <Button 
              variant="outline" 
              className="w-full flex items-center justify-center" 
              onClick={handleExportData}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <div className="relative">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center" 
                onClick={() => document.getElementById('import-data')?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Import Data
              </Button>
              <input
                id="import-data"
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleImportData}
              />
              
            </div> */}
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
                {navItems.find(item => item.id === activeTab)?.name || 'Home Bakery Business Tool'}
              </h1>
            </div>
          <div className=" bg-rose-50 rounded-lg p-2 border border-rose-100">
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
          <Tabs value={activeTab} className="w-full">
            <TabsContent value="dashboard" className="mt-0">
              <Dashboard onNavigate={setActiveTab} />
            </TabsContent>

            <TabsContent value="order-tracker" className="mt-0">
              <OrderTracker />
            </TabsContent>

            <TabsContent value="recipe-calculator" className="mt-0">
              <RecipeCalculator />
            </TabsContent>

            <TabsContent value="inventory-manager" className="mt-0">
              <InventoryManager />
            </TabsContent>

            <TabsContent value="customers" className="mt-0">
              <CustomerManagement onNavigate={setActiveTab} />
            </TabsContent>

            <TabsContent value="pricing-calculator" className="mt-0">
              <PricingCalculator />
            </TabsContent>

            <TabsContent value="business-analytics" className="mt-0">
              <BusinessAnalytics />
            </TabsContent>

            <TabsContent value="settings" className="mt-0">
              <Settings />
            </TabsContent>
          </Tabs>

          {/* Footer info */}
          <div className="mt-8 bg-rose-50 rounded-lg p-4 border border-rose-100">
            <div className="flex items-start gap-3">
              <div className="bg-rose-100 p-2 rounded-full">
                <ChefHat className="h-5 w-5 text-rose-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Your Data Stays Local</h3>
                <p className="text-xs text-gray-700">
                  All your bakery business data is stored locally on your device using browser storage. 
                  We don&apos;t collect or store any of your information on our servers. 
                  Remember to regularly export your data as a backup.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    </>
  )
}
