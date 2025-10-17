'use client'

import React, { useMemo, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '../utils/settings'
import { Button } from '@/components/ui/button'
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
  Trash2
} from 'lucide-react'
import { useInventory, useIngredients, useOrders } from '../hooks'
import { useToast } from '@/hooks/use-toast'
import type { Ingredient, ShoppingListItem } from '../types'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import SearchBar from './SearchBar'
import FilterChips, { type FilterOption } from './FilterChips'
import SortDropdown, { type SortOption } from './SortDropdown'

// Form schemas
const ingredientFormSchema = z.object({
  name: z.string().min(1, { message: "Ingredient name is required" }),
  unit: z.string().min(1, { message: "Unit is required" }),
  packageSize: z.number().positive({ message: "Package size must be positive" }),
  packageCost: z.number().positive({ message: "Package cost must be positive" }),
})

export default function InventoryManager() {
  const { toast } = useToast()
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
      unit: 'g',
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
    ingredientForm.reset()

    toast({
      title: 'Ingredient added',
      description: `${data.name} has been added to your ingredients.`,
    })
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

  // Handle export shopping list
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
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
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
                              <Input type="number" step="0.01" {...field} />
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
                            <Input type="number" step="0.01" {...field} />
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
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-gray-500">No ingredients added yet. Add your first ingredient to get started.</p>
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
                            <Input type="number" step="0.01" {...field} />
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
                          <Input type="number" step="0.01" {...field} />
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
                <div className="text-center py-8 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>No ingredients found. Add ingredients in the Recipe Calculator first.</p>
                </div>
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
                  <Button onClick={handleExportShoppingList}>
                    <Download className="h-4 w-4 mr-2" />
                    Copy to Clipboard
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </TabsContent>
      </Tabs>
    </div>
  )
}
