'use client'

import React, { useMemo, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useCurrencySymbol, usePreferredWeightUnit } from '../hooks'


import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { v4 as uuidv4 } from 'uuid'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Package,
  AlertTriangle,
  ShoppingCart,
  Plus,
  Minus,
  Settings,
  CheckCircle2,
  XCircle,
  AlertCircle,
  TrendingDown,
  Download,
  Calendar,
  Edit,
  Trash2,
  Save,
  Copy,
  Clock,
  Thermometer,
  X,
  Scale,
  FileText,
  DollarSign,
  ClipboardList,
  TrendingUp,
  Lightbulb,
  Calculator,
} from 'lucide-react'
import { SampleDataLoader } from './SampleDataLoader'
import { useInventory, useIngredients, useOrders } from '../hooks'
import { useToast } from '@/hooks/use-toast'
import type { Ingredient, ShoppingListItem } from '../types'
import { cn } from '@/lib/utils'
import jsPDF from 'jspdf'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import SearchBar from './SearchBar'
import FilterChips from './FilterChips'
import SortDropdown from './SortDropdown'

// Form schemas
const ingredientFormSchema = z.object({
  name: z.string().min(1, { message: "Ingredient name is required" }),
  unit: z.string().min(1, { message: "Unit is required" }),
  packageSize: z.number().positive({ message: "Package size must be positive" }),
  packageCost: z.number().positive({ message: "Package cost must be positive" }),
})

export default function InventoryManager() {
  const { toast } = useToast()
  const { symbol: currencySymbol } = useCurrencySymbol()
  const { unit: preferredWeightUnit } = usePreferredWeightUnit()
  console.log("currencySymbol ", currencySymbol)
  console.log("preferredWeightUnit ", preferredWeightUnit)
  const {
    ingredients,
    addIngredient,
    updateIngredient,
    deleteIngredient,
    safeDeleteIngredient,
    getIngredientById
  } = useIngredients()
  const { orders } = useOrders()
  const {
    inventory,
    alerts,
    hasLowStock,
    hasOutOfStock,
    alertCount,
    adjustStock,
    setMinStock,
    restock,
    initializeInventory,
    getInventoryStatus,
    getInventoryWithDetails,
    generateShoppingList,
  } = useInventory()

  const [isAddIngredientOpen, setIsAddIngredientOpen] = useState(false)
  const [isEditIngredientOpen, setIsEditIngredientOpen] = useState(false)
  const [isDeleteIngredientOpen, setIsDeleteIngredientOpen] = useState(false)
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null)

  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([])
  const [showShoppingList, setShowShoppingList] = useState(false)
  const [editingMinStock, setEditingMinStock] = useState<string | null>(null)
  const [minStockValue, setMinStockValue] = useState<number>(0)

  // Search, Filter, Sort state for Ingredients tab
  const [searchTerm, setSearchTerm] = useState('')
  const [filterUnit, setFilterUnit] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'name' | 'cost' | 'unit'>('name')


  // Forms
  const ingredientForm = useForm<z.infer<typeof ingredientFormSchema>>({
    resolver: zodResolver(ingredientFormSchema),
    defaultValues: {
      name: '',
      unit: preferredWeightUnit, // Dynamic based on user's weight system setting!
      packageSize: 0,
      packageCost: 0,
    },
  })

  // Handle adding a new ingredient
  const onAddIngredient = (data: z.infer<typeof ingredientFormSchema>) => {
    const costPerUnit = data.packageCost / data.packageSize

    const newIngredient: Ingredient = {
      id: uuidv4(),
      name: data.name,
      cost: costPerUnit,
      unit: data.unit,
      packageSize: data.packageSize,
      packageCost: data.packageCost,
    }

    addIngredient(newIngredient) // Hook handles everything!

    setIsAddIngredientOpen(false)
    ingredientForm.reset({
      name: '',
      unit: preferredWeightUnit, // Maintain user's preferred unit
      packageSize: 0,
      packageCost: 0,
    })

    toast({
      title: 'Ingredient added',
      description: `${data.name} has been added to your ingredients.`,
    })
  }

  // Helper to format currency synchronously
  const formatCurrency = (amount: number): string => {
    return `${currencySymbol}${amount.toFixed(2)}`
  }

  // Handle editing an ingredient
  const onEditIngredient = (data: z.infer<typeof ingredientFormSchema>) => {
    if (!editingIngredient) return

    const costPerUnit = data.packageCost / data.packageSize

    updateIngredient(editingIngredient.id, {
      name: data.name,
      cost: costPerUnit,
      unit: data.unit,
      packageSize: data.packageSize,
      packageCost: data.packageCost,
    }) // Hook handles everything!

    setIsEditIngredientOpen(false)
    setEditingIngredient(null)

    toast({
      title: 'Ingredient updated',
      description: `${data.name} has been updated.`,
    })
  }

  // Handle deleting an ingredient
  const handleDeleteIngredient = (id: string) => {
    const result = safeDeleteIngredient(id) // Hook checks recipe usage!

    toast({
      title: result.success ? 'Ingredient deleted' : 'Cannot delete ingredient',
      description: result.message,
      variant: result.success ? 'default' : 'destructive',
    })
  }

  // Get inventory with ingredient details
  const inventoryWithDetails = getInventoryWithDetails()

  // Get unique units for filter
  const uniqueUnits = useMemo(() => {
    const units = new Set(ingredients.map(ing => ing.unit))
    return Array.from(units).sort()
  }, [ingredients])

  // Filter and sort ingredients
  const filteredAndSortedIngredients = useMemo(() => {
    let filtered = ingredients.filter(ingredient => {
      // Search filter
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch = ingredient.name.toLowerCase().includes(searchLower)

      if (!matchesSearch) return false

      // Unit filter
      if (filterUnit !== 'all' && ingredient.unit !== filterUnit) return false

      return true
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'cost':
          return b.cost - a.cost
        case 'unit':
          return a.unit.localeCompare(b.unit)
        default:
          return 0
      }
    })

    return filtered
  }, [ingredients, searchTerm, filterUnit, sortBy])

  // Initialize inventory for ingredients that don't have inventory items
  const uninitializedIngredients = ingredients.filter(
    ing => !inventory.find(inv => inv.ingredientId === ing.id)
  )

  // Get status badge
  const getStatusBadge = (status: 'good' | 'low' | 'out' | 'unknown') => {
    switch (status) {
      case 'good':
        return <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle2 className="h-3 w-3 mr-1" />In Stock</Badge>
      case 'low':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600"><AlertTriangle className="h-3 w-3 mr-1" />Low Stock</Badge>
      case 'out':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Out of Stock</Badge>
      default:
        return <Badge variant="outline"><AlertCircle className="h-3 w-3 mr-1" />Not Tracked</Badge>
    }
  }

  // Handle generate shopping list
  const handleGenerateShoppingList = () => {
    const list = generateShoppingList(['new', 'in-progress'])
    setShoppingList(list)
    setShowShoppingList(true)

    if (list.length === 0) {
      toast({
        title: 'All stocked up!',
        description: 'You have enough ingredients for all pending orders.',
      })
    } else {
      toast({
        title: 'Shopping list generated',
        description: `${list.length} item${list.length !== 1 ? 's' : ''} need to be purchased.`,
      })
    }
  }

  // Handle adjust stock
  const handleAdjustStock = (ingredientId: string, delta: number) => {
    adjustStock(ingredientId, delta)

    const ingredient = ingredients.find(ing => ing.id === ingredientId)
    const action = delta > 0 ? 'added' : 'removed'

    toast({
      title: 'Stock updated',
      description: `${Math.abs(delta)} ${ingredient?.unit} ${action} for ${ingredient?.name}`,
    })
  }

  // Handle set min stock
  const handleSetMinStock = (ingredientId: string) => {
    setMinStock(ingredientId, minStockValue)
    setEditingMinStock(null)

    const ingredient = ingredients.find(ing => ing.id === ingredientId)
    toast({
      title: 'Minimum stock updated',
      description: `Minimum set to ${minStockValue} ${ingredient?.unit} for ${ingredient?.name}`,
    })
  }

  // Handle initialize inventory
  const handleInitializeInventory = (ingredientId: string) => {
    initializeInventory(ingredientId, 0, 0)
    toast({
      title: 'Inventory tracking started',
      description: 'You can now track stock levels for this ingredient.',
    })
  }

  // Handle export shopping list to clipboard
  const handleExportShoppingList = () => {
    const text = shoppingList.map(item =>
      `${item.ingredientName}: ${item.deficit.toFixed(2)} ${item.unit} (currently have: ${item.currentStock.toFixed(2)} ${item.unit}, need: ${item.needed.toFixed(2)} ${item.unit}) - ~${formatCurrency(item.estimatedCost)}`
    ).join('\n')

    const totalCost = shoppingList.reduce((sum, item) => sum + item.estimatedCost, 0)
    const fullText = `Shopping List - ${new Date().toLocaleDateString()}\n\n${text}\n\nTotal Estimated Cost: ${formatCurrency(totalCost)}`

    // Copy to clipboard
    navigator.clipboard.writeText(fullText)

    toast({
      title: 'Shopping list copied',
      description: 'Shopping list has been copied to your clipboard.',
    })
  }
  // Handle export shopping list to PDF
  const handleExportPDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })

    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 15
    const contentWidth = pageWidth - (margin * 2)
    let yPosition = margin

    // Helper to check if we need a new page
    const checkPageBreak = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - margin) {
        doc.addPage()
        yPosition = margin
        return true
      }
      return false
    }

    // Title
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.text('Shopping List', margin, yPosition)
    yPosition += 10

    // Date and order count
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100, 100, 100)
    doc.text(`Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, margin, yPosition)
    yPosition += 5
    doc.text(`For ${pendingOrdersCount} pending order${pendingOrdersCount !== 1 ? 's' : ''}`, margin, yPosition)
    yPosition += 10

    // Separator line
    doc.setDrawColor(200, 200, 200)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 8

    // Group items by priority
    const priorities: Array<'critical' | 'needed' | 'optional'> = ['critical', 'needed', 'optional']
    const priorityColors = {
      critical: { r: 220, g: 38, b: 38 },
      needed: { r: 234, g: 179, b: 8 },
      optional: { r: 34, g: 197, b: 94 }
    }
    const priorityLabels = {
      critical: 'CRITICAL - Out of Stock',
      needed: 'NEEDED - Below Minimum',
      optional: 'OPTIONAL - Additional Stock'
    }

    priorities.forEach((priority) => {
      const items = shoppingList.filter(item => item.priority === priority)
      if (items.length === 0) return

      checkPageBreak(15)

      // Priority header
      doc.setFontSize(12)
      doc.setFont('helvetica', 'bold')
      const color = priorityColors[priority]
      doc.setTextColor(color.r, color.g, color.b)
      doc.text(priorityLabels[priority], margin, yPosition)
      yPosition += 7

      // Items in this priority
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(0, 0, 0)

      items.forEach((item) => {
        checkPageBreak(20)

        // Item box background
        doc.setFillColor(250, 250, 250)
        doc.rect(margin, yPosition - 4, contentWidth, 16, 'F')

        // Item border
        doc.setDrawColor(220, 220, 220)
        doc.rect(margin, yPosition - 4, contentWidth, 16, 'S')

        // Item name (bold)
        doc.setFont('helvetica', 'bold')
        doc.text(item.ingredientName, margin + 3, yPosition)

        // Buy amount (highlighted)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(color.r, color.g, color.b)
        const buyText = `Buy: ${item.deficit.toFixed(2)} ${item.unit}`
        doc.text(buyText, margin + 3, yPosition + 5)

        // Details (normal)
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(100, 100, 100)
        const detailsText = `Have: ${item.currentStock.toFixed(2)} ${item.unit}  •  Need: ${item.needed.toFixed(2)} ${item.unit}`
        doc.text(detailsText, margin + 3, yPosition + 10)

        // Cost (right-aligned)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(0, 0, 0)
        const costText = `${String(currencySymbol)}${item.estimatedCost.toFixed(2)}`
        const costWidth = doc.getTextWidth(costText)
        doc.text(costText, pageWidth - margin - costWidth - 3, yPosition + 5)

        yPosition += 18
      })

      yPosition += 3
    })

    // Total section
    checkPageBreak(25)
    yPosition += 5
    doc.setDrawColor(200, 200, 200)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 8

    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(0, 0, 0)
    doc.text('Total Estimated Cost:', margin, yPosition)

    const totalCost = shoppingList.reduce((sum, item) => sum + item.estimatedCost, 0)
    const totalText = `${String(currencySymbol)}${totalCost.toFixed(2)}`
    const totalWidth = doc.getTextWidth(totalText)
    doc.setTextColor(34, 197, 94)
    doc.text(totalText, pageWidth - margin - totalWidth, yPosition)

    // Footer
    yPosition = pageHeight - 15
    doc.setFontSize(8)
    doc.setFont('helvetica', 'italic')
    doc.setTextColor(150, 150, 150)
    const footerText = 'Generated by BakeProfit - Bakery Management Software'
    const footerWidth = doc.getTextWidth(footerText)
    doc.text(footerText, (pageWidth - footerWidth) / 2, yPosition)

    // Save the PDF
    const fileName = `shopping-list-${new Date().toISOString().split('T')[0]}.pdf`
    doc.save(fileName)

    toast({
      title: 'PDF downloaded',
      description: 'Shopping list has been saved as PDF.',
    })
  }

  // Get pending orders count
  const pendingOrdersCount = orders.filter(o => o.status === 'new' || o.status === 'in-progress').length

  return (
    <div className="space-y-6">
      {/* Header */}
      {/* <div>
        <h1 className="text-3xl font-bold">Ingredients & Inventory</h1>
        <p className="text-gray-600">Manage your ingredients and track stock levels</p>
      </div> */}

      <Tabs defaultValue="ingredients" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="inventory" className="relative">
            Inventory
            {alertCount > 0 && (
              <Badge
                variant={hasOutOfStock ? 'destructive' : 'default'}
                className={cn(
                  'ml-2 h-5 min-w-5 px-1.5',
                  !hasOutOfStock && 'bg-yellow-500 hover:bg-yellow-600'
                )}
              >
                {alertCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Ingredients Tab - Will be moved from RecipeCalculator */}
        <TabsContent value="ingredients" className="mt-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Ingredients</h2>
              <Dialog open={isAddIngredientOpen} onOpenChange={setIsAddIngredientOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Ingredient
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Ingredient</DialogTitle>
                    <DialogDescription>
                      Add a new ingredient with its cost information.
                    </DialogDescription>
                  </DialogHeader>

                  <Form {...ingredientForm}>
                    <form onSubmit={ingredientForm.handleSubmit(onAddIngredient)} className="space-y-4">
                      <FormField
                        control={ingredientForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ingredient Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., All-Purpose Flour"
                                {...field}
                                onChange={(e) => field.onChange(e.target.value)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={ingredientForm.control}
                          name="packageSize"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Package Size</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  step="0.01"
                                  value={field.value}
                                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={ingredientForm.control}
                          name="unit"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Unit</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select unit" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="g">Grams (g)</SelectItem>
                                  <SelectItem value="kg">Kilograms (kg)</SelectItem>
                                  <SelectItem value="oz">Ounces (oz)</SelectItem>
                                  <SelectItem value="lb">Pounds (lb)</SelectItem>
                                  <SelectItem value="ml">Milliliters (ml)</SelectItem>
                                  <SelectItem value="l">Liters (l)</SelectItem>
                                  <SelectItem value="cup">Cups</SelectItem>
                                  <SelectItem value="tbsp">Tablespoons</SelectItem>
                                  <SelectItem value="tsp">Teaspoons</SelectItem>
                                  <SelectItem value="unit">Units/Pieces</SelectItem>
                                  <SelectItem value="dozen">Dozen</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={ingredientForm.control}
                        name="packageCost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Package Cost ($)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                value={field.value}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <DialogFooter>
                        <Button type="submit">Add Ingredient</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search and Filters */}
            {ingredients.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="space-y-4">
                    <SearchBar
                      value={searchTerm}
                      onChange={setSearchTerm}
                      placeholder="Search ingredients by name..."
                      className="w-full"
                    />

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <FilterChips
                        options={[
                          { id: 'all', label: 'All Units', count: ingredients.length },
                          ...uniqueUnits.map(unit => ({
                            id: unit,
                            label: unit,
                            count: ingredients.filter(i => i.unit === unit).length
                          }))
                        ]}
                        activeFilter={filterUnit}
                        onChange={setFilterUnit}
                      />

                      <SortDropdown
                        options={[
                          { id: 'name', label: 'Name (A-Z)' },
                          { id: 'cost', label: 'Cost (High to Low)' },
                          { id: 'unit', label: 'Unit' },
                        ]}
                        value={sortBy}
                        onChange={(v) => setSortBy(v as any)}
                      />
                    </div>
                  </div>
                </CardHeader>
              </Card>
            )}

            {ingredients.length === 0 ? (
              <Card className="border-2 border-dashed border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50">
                <CardContent className="pt-8 pb-8 px-6">
                  <div className="text-center">
                    <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-rose-100 flex items-center justify-center">
                      <Package className="h-8 w-8 text-rose-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Build Your Ingredient Library</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Start by adding your baking ingredients. We&apos;ll automatically calculate cost per unit and help you track inventory levels.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-6">
                      <div className="bg-white rounded-lg p-4 shadow-sm border">
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                          <Package className="h-5 w-5 text-blue-500 mr-2" />
                          Required Information
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-2 text-left">
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            <span><strong>Ingredient name:</strong> e.g., &quot;All-Purpose Flour&quot;</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            <span><strong>Package size:</strong> How much you buy (e.g., 5kg bag)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            <span><strong>Package cost:</strong> What you paid for the whole package</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            <span><strong>Unit:</strong> g, kg, cups, tbsp, etc.</span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-white rounded-lg p-4 shadow-sm border">
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                          <Calculator className="h-5 w-5 text-green-500 mr-2" />
                          What You&apos;ll Get
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-2 text-left">
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span><strong>Cost per unit:</strong> Automatically calculated</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span><strong>Recipe costs:</strong> Precise ingredient costs</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span><strong>Inventory tracking:</strong> Stock level monitoring</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            <span><strong>Shopping lists:</strong> Auto-generated restock lists</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-amber-50 rounded-lg p-4 max-w-2xl mx-auto text-left">
                      <h4 className="font-medium text-amber-900 mb-2 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Quick Start Tips
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-amber-800">
                        <div>
                          <strong>Start with basics:</strong> Flour, sugar, butter, eggs, vanilla
                        </div>
                        <div>
                          <strong>Be accurate:</strong> Use exact package weights from labels
                        </div>
                        <div>
                          <strong>Include everything:</strong> Salt, baking powder, spices count too
                        </div>
                        <div>
                          <strong>Update regularly:</strong> Adjust costs when prices change
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        onClick={() => setIsAddIngredientOpen(true)}
                        className="bg-rose-600 hover:bg-rose-700 w-full sm:w-auto"
                        size="lg"
                      >
                        <Plus className="h-5 w-5 mr-2" />
                        Add Your First Ingredient
                      </Button>
                      <SampleDataLoader
                        target="ingredients"
                        buttonText="Load Sample Ingredients"
                        size="lg"
                        className="w-full sm:w-auto"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : filteredAndSortedIngredients.length === 0 ? (
              <Card className="border-2 border-dashed">
                <CardContent className="pt-6 text-center">
                  <p className="text-gray-500 mb-2">No ingredients found</p>
                  <p className="text-sm text-gray-400">Try adjusting your search or filters</p>
                </CardContent>
              </Card>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Package Size</TableHead>
                      <TableHead>Package Cost</TableHead>
                      <TableHead>Cost per Unit</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAndSortedIngredients.map((ingredient) => (
                      <TableRow key={ingredient.id}>
                        <TableCell>{ingredient.name}</TableCell>
                        <TableCell>{ingredient.unit}</TableCell>
                        <TableCell>{ingredient.packageSize} {ingredient.unit}</TableCell>
                        <TableCell>{formatCurrency(ingredient.packageCost)}</TableCell>
                        <TableCell>{formatCurrency(ingredient.cost)}/{ingredient.unit}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEditingIngredient(ingredient)
                                ingredientForm.reset({
                                  name: ingredient.name,
                                  unit: ingredient.unit,
                                  packageSize: ingredient.packageSize,
                                  packageCost: ingredient.packageCost,
                                })
                                setIsEditIngredientOpen(true)
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteIngredient(ingredient.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            <Dialog open={isEditIngredientOpen} onOpenChange={setIsEditIngredientOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Ingredient</DialogTitle>
                  <DialogDescription>
                    Update the ingredient information.
                  </DialogDescription>
                </DialogHeader>

                <Form {...ingredientForm}>
                  <form onSubmit={ingredientForm.handleSubmit(onEditIngredient)} className="space-y-4">
                    <FormField
                      control={ingredientForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ingredient Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., All-Purpose Flour" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={ingredientForm.control}
                        name="packageSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Package Size</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                value={field.value}
                                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={ingredientForm.control}
                        name="unit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Unit</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select unit" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="g">Grams (g)</SelectItem>
                                <SelectItem value="kg">Kilograms (kg)</SelectItem>
                                <SelectItem value="oz">Ounces (oz)</SelectItem>
                                <SelectItem value="lb">Pounds (lb)</SelectItem>
                                <SelectItem value="ml">Milliliters (ml)</SelectItem>
                                <SelectItem value="l">Liters (l)</SelectItem>
                                <SelectItem value="cup">Cups</SelectItem>
                                <SelectItem value="tbsp">Tablespoons</SelectItem>
                                <SelectItem value="tsp">Teaspoons</SelectItem>
                                <SelectItem value="unit">Units/Pieces</SelectItem>
                                <SelectItem value="dozen">Dozen</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={ingredientForm.control}
                      name="packageCost"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Package Cost ($)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              value={field.value}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <DialogFooter>
                      <Button type="submit">Update Ingredient</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </TabsContent>


        {/* Stock Levels Tab - Current inventory content */}
        <TabsContent value="inventory" className="mt-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tracked Items</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{inventory.length}</div>
                <p className="text-xs text-muted-foreground">
                  {uninitializedIngredients.length} not tracked
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{alertCount}</div>
                <p className="text-xs text-muted-foreground">
                  {hasOutOfStock ? 'Some items out of stock' : hasLowStock ? 'Low stock warnings' : 'All good'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingOrdersCount}</div>
                <p className="text-xs text-muted-foreground">
                  Orders to fulfill
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Shopping List</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Button
                  onClick={handleGenerateShoppingList}
                  className="w-full"
                  size="sm"
                >
                  Generate List
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Alerts Section */}
          {alerts.length > 0 && (
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  Inventory Alerts
                </CardTitle>
                <CardDescription>Items that need your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {alerts.map((alert, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 p-3 rounded-md ${alert.severity === 'error' ? 'bg-red-100 border border-red-200' : 'bg-yellow-100 border border-yellow-200'
                        }`}
                    >
                      {alert.severity === 'error' ? (
                        <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className={`font-medium ${alert.severity === 'error' ? 'text-red-900' : 'text-yellow-900'}`}>
                          {alert.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Inventory Table */}
          <Card>
            <CardHeader>
              <CardTitle>Ingredient Stock Levels</CardTitle>
              <CardDescription>Manage your ingredient inventory</CardDescription>
            </CardHeader>
            <CardContent>
              {inventoryWithDetails.length === 0 && uninitializedIngredients.length === 0 ? (
                <Card className="border-2 border-dashed border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardContent className="pt-8 pb-8 px-6">
                    <div className="text-center">
                      <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                        <ClipboardList className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Track Your Inventory!</h3>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Once you add ingredients, you can track stock levels, set minimum quantities, and get automatic alerts when running low.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-6">
                        <div className="bg-white rounded-lg p-4 shadow-sm border">
                          <div className="flex items-center mb-2">
                            <TrendingUp className="h-5 w-5 text-green-500 mr-2" />
                            <h4 className="font-medium text-gray-900">Step 1: Add Ingredients</h4>
                          </div>
                          <p className="text-sm text-gray-600">
                            First, add your ingredients in the Ingredients tab with cost information.
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-3 w-full"
                            onClick={() => {
                              const tabs = document.querySelector('[role="tablist"]') as HTMLElement;
                              const ingredientsTab = tabs?.querySelector('[role="tab"]:first-child') as HTMLElement;
                              ingredientsTab?.click();
                            }}
                          >
                            Go to Ingredients
                          </Button>
                        </div>

                        <div className="bg-white rounded-lg p-4 shadow-sm border">
                          <div className="flex items-center mb-2">
                            <Settings className="h-5 w-5 text-blue-500 mr-2" />
                            <h4 className="font-medium text-gray-900">Step 2: Set Stock Levels</h4>
                          </div>
                          <p className="text-sm text-gray-600">
                            Set your current stock levels and minimum stock alerts for each ingredient.
                          </p>
                          <div className="mt-3 text-xs text-blue-600 font-medium">
                            ✓ Automatic tracking
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 shadow-sm border">
                          <div className="flex items-center mb-2">
                            <ShoppingCart className="h-5 w-5 text-purple-500 mr-2" />
                            <h4 className="font-medium text-gray-900">Step 3: Smart Alerts</h4>
                          </div>
                          <p className="text-sm text-gray-600">
                            Get automatic low-stock alerts and generate shopping lists based on pending orders.
                          </p>
                          <div className="mt-3 text-xs text-purple-600 font-medium">
                            ✓ Never run out
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-4 max-w-2xl mx-auto">
                        <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                          <Lightbulb className="h-4 w-4 mr-2" />
                          Inventory Best Practices
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-800">
                          <div>
                            <strong>Set realistic min stock:</strong> Based on your typical weekly usage
                          </div>
                          <div>
                            <strong>Update regularly:</strong> After each baking session or delivery
                          </div>
                          <div>
                            <strong>Track everything:</strong> Even small quantities matter for accurate costs
                          </div>
                          <div>
                            <strong>Use shopping lists:</strong> Auto-generated based on your orders
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <Button
                          onClick={() => {
                            const tabs = document.querySelector('[role="tablist"]') as HTMLElement;
                            const ingredientsTab = tabs?.querySelector('[role="tab"]:first-child') as HTMLElement;
                            ingredientsTab?.click();
                          }}
                          className="bg-green-600 hover:bg-green-700"
                          size="lg"
                        >
                          <Plus className="h-5 w-5 mr-2" />
                          Add Ingredients First
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ingredient</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Current Stock</TableHead>
                        <TableHead>Min Stock</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inventoryWithDetails.map((item) => (
                        <TableRow key={item.ingredientId}>
                          <TableCell className="font-medium">
                            {item.ingredientName}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(getInventoryStatus(item.ingredientId))}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-semibold">
                                {item.currentStock.toFixed(1)}
                              </span>
                              <span className="text-sm text-gray-500">{item.unit}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {editingMinStock === item.ingredientId ? (
                              <div className="flex items-center gap-2">
                                <Input
                                  type="number"
                                  value={minStockValue}
                                  onChange={(e) => setMinStockValue(parseFloat(e.target.value) || 0)}
                                  className="w-20"
                                  autoFocus
                                />
                                <Button
                                  size="sm"
                                  onClick={() => handleSetMinStock(item.ingredientId)}
                                >
                                  Save
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => setEditingMinStock(null)}
                                >
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setEditingMinStock(item.ingredientId)
                                  setMinStockValue(item.minStock)
                                }}
                                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
                              >
                                {item.minStock} {item.unit}
                                <Settings className="h-3 w-3" />
                              </button>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => handleAdjustStock(item.ingredientId, -1)}
                                disabled={item.currentStock === 0}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => handleAdjustStock(item.ingredientId, 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}

                      {/* Uninitialized ingredients */}
                      {uninitializedIngredients.map((ingredient) => (
                        <TableRow key={ingredient.id} className="bg-gray-50">
                          <TableCell className="font-medium text-gray-600">
                            {ingredient.name}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Not Tracked
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-400">-</TableCell>
                          <TableCell className="text-gray-400">-</TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleInitializeInventory(ingredient.id)}
                            >
                              <TrendingDown className="h-4 w-4 mr-1" />
                              Start Tracking
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Shopping List Dialog */}
          <Dialog open={showShoppingList} onOpenChange={setShowShoppingList}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Shopping List
                </DialogTitle>
                <DialogDescription>
                  Ingredients needed for {pendingOrdersCount} pending order{pendingOrdersCount !== 1 ? 's' : ''}
                </DialogDescription>
              </DialogHeader>

              {shoppingList.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-green-500" />
                  <p className="text-lg font-medium text-gray-900">You&apos;re all set!</p>
                  <p className="text-gray-600">You have enough ingredients for all pending orders.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Priority sections */}
                  {['critical', 'needed', 'optional'].map((priority) => {
                    const items = shoppingList.filter(item => item.priority === priority)
                    if (items.length === 0) return null

                    return (
                      <div key={priority}>
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          {priority === 'critical' && <XCircle className="h-4 w-4 text-red-500" />}
                          {priority === 'needed' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                          {priority === 'optional' && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                          {priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </h3>
                        <div className="space-y-2">
                          {items.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-md border"
                            >
                              <div className="flex-1">
                                <p className="font-medium">{item.ingredientName}</p>
                                <p className="text-sm text-gray-600">
                                  Buy: <span className="font-semibold">{item.deficit.toFixed(2)} {item.unit}</span>
                                  {' '}• Have: {item.currentStock.toFixed(2)} {item.unit}
                                  {' '}• Need: {item.needed.toFixed(2)} {item.unit}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold">{formatCurrency(item.estimatedCost)}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}

                  {/* Total */}
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total Estimated Cost:</span>
                      <span className="text-2xl font-bold text-green-600">
                        {formatCurrency(shoppingList.reduce((sum, item) => sum + item.estimatedCost, 0))}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowShoppingList(false)}>
                  Close
                </Button>
                {shoppingList.length > 0 && (
                  <>
                    <Button variant="outline" onClick={handleExportShoppingList}>
                      <Download className="h-4 w-4 mr-2" />
                      Copy to Clipboard
                    </Button>
                    <Button onClick={handleExportPDF} className="bg-rose-500 hover:bg-rose-600">
                      <Download className="h-4 w-4 mr-2" />
                      Export PDF
                    </Button>
                  </>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </TabsContent>
      </Tabs>
    </div>
  )
}
