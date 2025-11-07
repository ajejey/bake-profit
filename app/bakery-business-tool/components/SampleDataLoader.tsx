'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useBakeryData } from '../contexts/BakeryDataContext'
import type { Ingredient, Recipe, Order, Customer, InventoryItem } from '../types'

interface SampleDataLoaderProps {
  target: 'recipes' | 'ingredients' | 'inventory' | 'customers' | 'orders' | 'all'
  buttonText?: string
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  className?: string
  showIcon?: boolean
}

interface SampleData {
  ingredients: Ingredient[]
  recipes: Recipe[]
  orders: Order[]
  inventory: InventoryItem[]
  customers: Customer[]
}

export function SampleDataLoader({ 
  target, 
  buttonText = 'Load Sample Data',
  variant = 'default',
  size = 'default',
  className = '',
  showIcon = true
}: SampleDataLoaderProps) {
  const { toast } = useToast()
  const { 
    addIngredient, 
    addRecipe, 
    addOrder, 
    addCustomer,
    updateStock 
  } = useBakeryData()
  const [isLoading, setIsLoading] = useState(false)

  const handleLoadSampleData = async () => {
    setIsLoading(true)
    try {
      const response: Response = await fetch('/sample-bakery-data.json')
      const data: SampleData = await response.json()

      let loadedCount: number = 0
      const itemsLoaded: string[] = []

      // Handle dependencies based on target
      // Recipes need ingredients, Orders need customers + recipes, Inventory needs ingredients
      
      // Load ingredients (standalone or as dependency)
      if (target === 'ingredients' || target === 'recipes' || target === 'inventory' || target === 'all') {
        const sampleIngredients: Ingredient[] = data.ingredients.slice(0, 8)
        sampleIngredients.forEach((ingredient: Ingredient) => {
          addIngredient(ingredient)
        })
        loadedCount += sampleIngredients.length
        if (target === 'ingredients' || target === 'all') {
          itemsLoaded.push(`${sampleIngredients.length} ingredients`)
        }
      }

      // Load customers (standalone or as dependency for orders)
      if (target === 'customers' || target === 'orders' || target === 'all') {
        const sampleCustomers = data.customers.slice(0, 3)
        sampleCustomers.forEach(customer => {
          addCustomer(customer)
        })
        if (target === 'customers' || target === 'all') {
          loadedCount += sampleCustomers.length
          itemsLoaded.push(`${sampleCustomers.length} customers`)
        }
      }

      // Load recipes (standalone or as dependency for orders)
      if (target === 'recipes' || target === 'orders' || target === 'all') {
        const sampleRecipes = data.recipes.slice(0, 4)
        sampleRecipes.forEach(recipe => {
          addRecipe(recipe)
        })
        if (target === 'recipes' || target === 'all') {
          loadedCount += sampleRecipes.length
          itemsLoaded.push(`${sampleRecipes.length} recipes`)
        }
      }

      // Load inventory (requires ingredients to be loaded first)
      if (target === 'inventory' || target === 'all') {
        const sampleInventory = data.inventory.slice(0, 8)
        sampleInventory.forEach(item => {
          updateStock(item.ingredientId, item.currentStock)
        })
        loadedCount += sampleInventory.length
        itemsLoaded.push(`${sampleInventory.length} inventory items`)
      }

      // Load orders (requires customers and recipes to be loaded first)
      if (target === 'orders' || target === 'all') {
        const sampleOrders = data.orders.slice(0, 4)
        sampleOrders.forEach(order => {
          addOrder(order)
        })
        loadedCount += sampleOrders.length
        itemsLoaded.push(`${sampleOrders.length} orders`)
      }

      if (loadedCount > 0) {
        const description = itemsLoaded.length > 0 
          ? `Added ${itemsLoaded.join(', ')} to get you started.`
          : 'Sample data and dependencies loaded successfully!'
        
        toast({
          title: '🎉 Sample data loaded!',
          description,
        })
        
        // Small delay for user to see the toast
        setTimeout(() => window.location.reload(), 1500)
      } else {
        toast({
          title: 'No data loaded',
          description: 'No sample data available for this section.',
          variant: 'default',
        })
      }
    } catch (error) {
      console.error('Error loading sample data:', error)
      toast({
        title: 'Failed to load sample data',
        description: 'There was an error loading the sample data.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getButtonText = () => {
    switch (target) {
      case 'recipes':
        return 'Load Sample Recipes'
      case 'ingredients':
        return 'Load Sample Ingredients'
      case 'inventory':
        return 'Load Sample Inventory'
      case 'customers':
        return 'Load Sample Customers'
      case 'orders':
        return 'Load Sample Orders'
      default:
        return buttonText
    }
  }

  return (
    <Button
      onClick={handleLoadSampleData}
      disabled={isLoading}
      variant={variant}
      size={size}
      className={className}
    >
      {showIcon && (
        isLoading ? 
        <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" /> :
        <Download className="h-4 w-4 mr-2" />
      )}
      {isLoading ? 'Loading...' : getButtonText()}
    </Button>
  )
}
