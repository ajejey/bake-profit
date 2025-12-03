'use client'

import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { Plus, Calendar as CalendarIcon, DollarSign, Package, Phone, User, X, Edit2, Trash2, Check, Minus, Download, FileText, ChefHat, Truck, Settings, Info } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import { useOrders, useRecipes, useCustomers, useCurrencySymbol, useBatchSizes, useDefaultMarkup, useDateFormat } from '../hooks'
import type { Order, OrderItem, Customer } from '../types'
import SearchBar from './SearchBar'
import FilterChips, { type FilterOption } from './FilterChips'
import SortDropdown, { type SortOption } from './SortDropdown'
import { useSubscription } from '@/contexts/SubscriptionContext'
import UsageIndicator from '@/components/subscription/UsageIndicator'
import { getDefaultOrderStatus } from '../utils/settings'
import { CustomerSelector } from './CustomerSelector'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  generateOrderConfirmation,
  generateKitchenSheet,
  generateDeliveryReceipt,
  generatePackingSlip,
  getOrderPDFFilename
} from '../lib/pdfGenerators/orderPDF'
import Link from 'next/link'



export default function OrderTracker() {
  const router = useRouter()
  const { toast } = useToast()
  const { checkLimit } = useSubscription()
  const { symbol: currencySymbol = '$' } = useCurrencySymbol()
  const { dateFormat = 'MM/DD/YYYY' } = useDateFormat()
  console.log("currencySymbol in OrderTracker", currencySymbol)

  // Use custom hooks for data access
  const { orders, addOrder, updateOrderStatus, deleteOrder, getNextOrderNumber } = useOrders()
  const { recipes } = useRecipes()
  const { saveCustomer, addCustomer } = useCustomers()

  // UI State
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'total' | 'customer'>('date')

  // Form state
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>()
  const [orderNotes, setOrderNotes] = useState('')
  const [selectedRecipeId, setSelectedRecipeId] = useState('')
  const [selectedSellingUnitId, setSelectedSellingUnitId] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [sellingPrice, setSellingPrice] = useState(0)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])

  // Batch sizes hook
  const { getSellingUnitsWithPricing } = useBatchSizes()

  // Get default markup from business settings
  const { markup: defaultMarkup = 150 } = useDefaultMarkup()
  // Convert percentage to multiplier: 150% = 1 + (150/100) = 2.5x
  const markupMultiplier = 1 + (defaultMarkup / 100)

  // Get selected recipe and its selling units
  const selectedRecipe = recipes.find(r => r.id === selectedRecipeId)
  const sellingUnitsWithPricing = selectedRecipe ? getSellingUnitsWithPricing(selectedRecipe, markupMultiplier) : []

  // Calculate full recipe price using markup from business settings
  const fullRecipePrice = selectedRecipe ? (selectedRecipe.totalCost || 0) * markupMultiplier : 0

  // Helper to format currency synchronously
  const formatCurrency = (amount: number): string => {
    return `${currencySymbol}${amount.toFixed(2)}`
  }

  // Helper to format date according to user settings
  const formatDateDisplay = (dateString: string): string => {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) return dateString

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    switch (dateFormat) {
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`
      case 'MM/DD/YYYY':
      default:
        return `${month}/${day}/${year}`
    }
  }

  // Helper to get date-fns format string based on user's date format setting
  const getDateFnsFormat = (): string => {
    switch (dateFormat) {
      case 'DD/MM/YYYY':
        return 'dd/MM/yyyy'
      case 'YYYY-MM-DD':
        return 'yyyy-MM-dd'
      case 'MM/DD/YYYY':
      default:
        return 'MM/dd/yyyy'
    }
  }

  // Handle creating a new customer from selector
  const handleCreateNewCustomer = (name: string, phone?: string) => {
    const newCustomer: Customer = {
      id: uuidv4(),
      name,
      phone,
      orderHistory: [],
      totalOrders: 0,
      totalSpent: 0,
      notes: '',
      createdAt: new Date().toISOString(),
    }
    addCustomer(newCustomer)
    setSelectedCustomer(newCustomer)
    toast({
      title: 'Customer created',
      description: `${name} has been added to your customers`,
    })
  }

  // Handle Add Order button click with limit check
  const handleAddOrderClick = async () => {
    const limitCheck = await checkLimit('orders');

    if (!limitCheck.allowed) {
      toast({
        title: 'Order limit reached',
        description: limitCheck.message,
        variant: 'destructive',
      });
      return;
    }

    setIsAddOrderOpen(true);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!selectedRecipeId || quantity <= 0) {
      toast({
        title: 'Invalid item',
        description: 'Please select a recipe and enter a valid quantity',
        variant: 'destructive',
      });
      return;
    }

    const recipe = recipes.find(r => r.id === selectedRecipeId)
    if (!recipe) return

    // Check if a selling unit is selected
    const selectedSellingUnit = selectedSellingUnitId
      ? sellingUnitsWithPricing.find(u => u.id === selectedSellingUnitId)
      : null

    let costPerUnit: number
    let pricePerUnit: number
    let itemName: string

    if (selectedSellingUnit) {
      // Use selling unit pricing
      costPerUnit = selectedSellingUnit.cost
      pricePerUnit = sellingPrice || selectedSellingUnit.suggestedPrice
      itemName = `${recipe.name} (${selectedSellingUnit.name})`
    } else {
      // Use recipe-level pricing (fallback) with markup from business settings
      costPerUnit = recipe.totalCost || 0
      pricePerUnit = sellingPrice || costPerUnit * markupMultiplier
      itemName = recipe.name
    }

    const subtotalCost = costPerUnit * quantity
    const subtotalRevenue = pricePerUnit * quantity
    const profit = subtotalRevenue - subtotalCost

    const newItem: OrderItem = {
      id: uuidv4(),
      recipeId: recipe.id,
      recipeName: itemName,
      quantity,
      costPerUnit,
      pricePerUnit,
      subtotalCost,
      subtotalRevenue,
      profit,
      // Store selling unit info for reference
      sellingUnitId: selectedSellingUnit?.id,
      sellingUnitName: selectedSellingUnit?.name,
      sellingUnitQuantity: selectedSellingUnit?.quantity,
    }

    setOrderItems([...orderItems, newItem])

    // Reset item form
    setSelectedRecipeId('')
    setSelectedSellingUnitId('')
    setQuantity(1)
    setSellingPrice(0)

    toast({
      title: 'Item added',
      description: `${itemName} x${quantity} added to order`,
    })
  }

  // Remove item from current order
  const handleRemoveItem = (itemId: string) => {
    setOrderItems(orderItems.filter(item => item.id !== itemId))
  }

  // Create new order
  const handleCreateOrder = async () => {
    if (!selectedCustomer) {
      toast({
        title: 'Customer required',
        description: 'Please select or create a customer',
        variant: 'destructive',
      })
      return
    }

    if (orderItems.length === 0) {
      toast({
        title: 'No items',
        description: 'Please add at least one item to the order',
        variant: 'destructive',
      })
      return
    }

    if (!deliveryDate) {
      toast({
        title: 'Delivery date required',
        description: 'Please select a delivery date',
        variant: 'destructive',
      })
      return
    }

    const totalCost = orderItems.reduce((sum, item) => sum + item.subtotalCost, 0)
    const totalRevenue = orderItems.reduce((sum, item) => sum + item.subtotalRevenue, 0)
    const totalProfit = totalRevenue - totalCost

    const orderId = uuidv4()
    const orderNumber = getNextOrderNumber()
    const defaultStatus = await getDefaultOrderStatus()

    const newOrder: Order = {
      id: orderId,
      orderNumber,
      customerName: selectedCustomer.name,
      customerPhone: selectedCustomer.phone,
      items: orderItems,
      status: defaultStatus,
      orderDate: new Date().toISOString(),
      deliveryDate: format(deliveryDate!, 'yyyy-MM-dd'),
      totalCost,
      totalRevenue,
      totalProfit,
      notes: orderNotes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    addOrder(newOrder)

    // Update customer with new order
    saveCustomer(selectedCustomer.name, selectedCustomer.phone, orderId, totalRevenue)

    // Reset form
    setSelectedCustomer(null)
    setDeliveryDate(undefined)
    setOrderNotes('')
    setOrderItems([])
    setIsAddOrderOpen(false)

    toast({
      title: 'Order created',
      description: `Order ${orderNumber} has been created successfully`,
    })
  }

  // Update order status
  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    updateOrderStatus(orderId, newStatus)

    toast({
      title: 'Status updated',
      description: `Order status changed to ${newStatus}`,
    })
  }

  // Delete order
  const handleDeleteOrder = (orderId: string) => {
    deleteOrder(orderId)

    toast({
      title: 'Order deleted',
      description: 'The order has been removed',
    })
  }

  // Handle PDF export
  const handleExportPDF = (order: Order, type: 'confirmation' | 'kitchen' | 'delivery' | 'packing') => {
    const customer = null // Could fetch from customers if needed

    let pdf
    let typeName = ''

    switch (type) {
      case 'confirmation':
        pdf = generateOrderConfirmation(order, customer, { currencySymbol })
        typeName = 'Order Confirmation'
        break
      case 'kitchen':
        pdf = generateKitchenSheet(order, customer, { currencySymbol })
        typeName = 'Kitchen Sheet'
        break
      case 'delivery':
        pdf = generateDeliveryReceipt(order, customer, { currencySymbol })
        typeName = 'Delivery Receipt'
        break
      case 'packing':
        pdf = generatePackingSlip(order, customer, { currencySymbol })
        typeName = 'Packing Slip'
        break
    }

    const filename = getOrderPDFFilename(order, type)
    pdf.save(filename)

    toast({
      title: 'PDF Downloaded',
      description: `${typeName} has been saved as PDF.`,
    })
  }

  // Filter and sort orders
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders.filter(order => {
      // Search filter
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchLower) ||
        order.customerName.toLowerCase().includes(searchLower) ||
        order.customerPhone?.includes(searchTerm)

      if (!matchesSearch) return false

      // Status filter
      if (filterStatus !== 'all' && order.status !== filterStatus) return false

      return true
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
        case 'total':
          return b.totalRevenue - a.totalRevenue
        case 'customer':
          return a.customerName.localeCompare(b.customerName)
        default:
          return 0
      }
    })

    return filtered
  }, [orders, searchTerm, filterStatus, sortBy])

  // Get status badge color
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-500'
      case 'in-progress': return 'bg-yellow-500'
      case 'ready': return 'bg-green-500'
      case 'delivered': return 'bg-gray-500'
      case 'cancelled': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Order Tracker</h2>
          <p className="text-gray-600">Manage customer orders and track delivery status</p>
        </div>

        <Dialog open={isAddOrderOpen} onOpenChange={setIsAddOrderOpen}>
          <DialogTrigger asChild>
            <Button size="lg" onClick={handleAddOrderClick}>
              <Plus className="mr-2 h-4 w-4" />
              New Order
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] md:max-w-4xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle>Create New Order</DialogTitle>
                  <DialogDescription>
                    Add a new customer order with delivery details
                  </DialogDescription>
                </div>
                <Link href="/bakery-business-tool/settings">
                  <Button
                    variant="outline"
                    title="Settings"
                    size="icon"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </DialogHeader>

            <div className="space-y-4">
              {/* Customer Selector */}
              <CustomerSelector
                value={selectedCustomer}
                onChange={setSelectedCustomer}
                onCreateNew={handleCreateNewCustomer}
              />

              {/* Delivery Date */}
              <div>
                <Label className="text-sm font-medium mb-1">Delivery Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !deliveryDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {deliveryDate ? format(deliveryDate, getDateFnsFormat()) : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={deliveryDate}
                      onSelect={setDeliveryDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-xs text-gray-500 mt-1">
                  Format: {dateFormat}
                </p>
              </div>

              {/* Add Items */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Order Items</h3>

                <div className="space-y-3 mb-3 md:grid md:grid-cols-12 md:gap-2 md:space-y-0">
                  <div className="w-full md:col-span-5">
                    <Label className="text-sm font-medium mb-1">Recipe</Label>
                    {recipes.length === 0 ? (
                      <div className="mt-1 rounded-md border border-dashed border-rose-200 bg-rose-50/60 px-3 py-3 text-sm text-gray-700">
                        <p className="mb-2">
                          To add items to an order, first set up your ingredients and create at least one recipe.
                        </p>
                        <Button
                          type="button"
                          size="sm"
                          className="btn-primary-action w-full justify-center"
                          onClick={() => router.push('/bakery-business-tool/recipes')}
                        >
                          Go to Recipes setup
                        </Button>
                      </div>
                    ) : (
                      <Select
                        value={selectedRecipeId}
                        onValueChange={(value) => {
                          setSelectedRecipeId(value)
                          setSelectedSellingUnitId('') // Reset selling unit when recipe changes
                          // Auto-set price to full recipe price with markup
                          const recipe = recipes.find(r => r.id === value)
                          if (recipe) {
                            const autoPrice = (recipe.totalCost || 0) * markupMultiplier
                            setSellingPrice(Math.round(autoPrice * 100) / 100)
                          } else {
                            setSellingPrice(0)
                          }
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select recipe" />
                        </SelectTrigger>
                        <SelectContent>
                          {recipes.map(recipe => (
                            <SelectItem key={recipe.id} value={recipe.id}>
                              {recipe.name} ({formatCurrency(recipe.totalCost || 0)})
                              {recipe.sellingUnits && recipe.sellingUnits.length > 0 && (
                                <span className="ml-1 text-rose-500">★</span>
                              )}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>

                  {/* Selling Unit Selector - Only show if recipe has selling units */}
                  {sellingUnitsWithPricing.length > 0 && (
                    <div className="w-full md:col-span-4">
                      <div className="flex items-center gap-1 mb-1">
                        <Label className="text-sm font-medium">
                          Package Size
                        </Label>
                        <TooltipProvider delayDuration={200}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="inline-flex items-center cursor-help">
                                <Info className="h-3 w-3 text-gray-400 hover:text-gray-600 transition-colors" />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p className="text-xs">
                                Choose <strong>Whole Batch</strong> to sell the entire recipe output, or select a <strong>selling unit</strong> to sell portions.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Select
                        value={selectedSellingUnitId || 'full-recipe'}
                        onValueChange={(value) => {
                          setSelectedSellingUnitId(value === 'full-recipe' ? '' : value)
                          // Auto-set the suggested price (rounded to 2 decimals)
                          if (value === 'full-recipe') {
                            setSellingPrice(Math.round(fullRecipePrice * 100) / 100)
                          } else {
                            const unit = sellingUnitsWithPricing.find(u => u.id === value)
                            if (unit) {
                              setSellingPrice(Math.round(unit.suggestedPrice * 100) / 100)
                            }
                          }
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select package size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-recipe">
                            🎂 Whole Batch {selectedRecipe?.batchYield && selectedRecipe?.batchUnit ?
                              `(${selectedRecipe.batchYield} ${selectedRecipe.batchUnit})` : ''} - {formatCurrency(fullRecipePrice)}
                          </SelectItem>
                          {sellingUnitsWithPricing.map(unit => (
                            <SelectItem key={unit.id} value={unit.id}>
                              📦 {unit.name} - {formatCurrency(unit.suggestedPrice)}
                              <span className="text-xs text-gray-500 ml-1">
                                ({unit.quantity} {selectedRecipe?.batchUnit})
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className={`w-full ${sellingUnitsWithPricing.length > 0 ? 'md:col-span-2' : 'md:col-span-2'} opacity-100 md:opacity-100`}>
                    <Label className="text-sm font-medium mb-1">
                      Quantity
                      {selectedSellingUnitId && sellingUnitsWithPricing.length > 0 && (
                        <span className="text-xs text-gray-500 ml-1">
                          (How many {sellingUnitsWithPricing.find(u => u.id === selectedSellingUnitId)?.name.toLowerCase() || 'units'}?)
                        </span>
                      )}
                      {!selectedSellingUnitId && selectedRecipe?.batchYield && (
                        <span className="text-xs text-gray-500 ml-1">
                          (How many batches?)
                        </span>
                      )}
                    </Label>
                    <div className="flex items-center gap-1 w-full">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={recipes.length === 0}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="text"
                        value={quantity}
                        readOnly
                        className="text-center flex-1"
                        disabled={recipes.length === 0}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => setQuantity(quantity + 1)}
                        disabled={recipes.length === 0}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="w-full md:col-span-3">
                    <Label className="text-sm font-medium mb-1">
                      Selling Price ({currencySymbol})
                      {selectedRecipe && (
                        <span className="text-xs text-gray-500 font-normal ml-1">
                          (Cost: {formatCurrency(
                            selectedSellingUnitId 
                              ? (sellingUnitsWithPricing.find(u => u.id === selectedSellingUnitId)?.cost || selectedRecipe.totalCost || 0)
                              : (selectedRecipe.totalCost || 0)
                          )})
                        </span>
                      )}
                    </Label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Auto (2.5x)"
                      value={sellingPrice || ''}
                      onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                      disabled={recipes.length === 0}
                      className={(() => {
                        if (!selectedRecipe || sellingPrice <= 0) return ''
                        const selectedUnit = selectedSellingUnitId 
                          ? sellingUnitsWithPricing.find(u => u.id === selectedSellingUnitId) 
                          : null
                        const currentCost = selectedUnit ? selectedUnit.cost : (selectedRecipe.totalCost || 0)
                        return sellingPrice < currentCost ? 'border-red-500 border-2' : ''
                      })()}
                    />
                    {(() => {
                      if (!selectedRecipe || sellingPrice <= 0) return null
                      const selectedUnit = selectedSellingUnitId 
                        ? sellingUnitsWithPricing.find(u => u.id === selectedSellingUnitId) 
                        : null
                      const currentCost = selectedUnit ? selectedUnit.cost : (selectedRecipe.totalCost || 0)
                      if (sellingPrice >= currentCost) return null
                      return (
                        <p className="text-xs text-red-500 mt-1 font-medium">
                          ⚠️ Price is below cost - You will lose {formatCurrency(currentCost - sellingPrice)} per unit!
                        </p>
                      )
                    })()}
                  </div>

                  <div className="w-full md:col-span-2 flex md:items-end">
                    <Button
                      onClick={handleSubmit}
                      className="w-full"
                      disabled={recipes.length === 0}
                    >
                      Add
                    </Button>
                  </div>
                </div>

                {/* Order Items List */}
                {orderItems.length > 0 && (
                  <div className="space-y-2 mt-4">
                    {orderItems.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div className="flex-1">
                          <div className="font-medium">{item.recipeName}</div>
                          <div className="text-sm text-gray-600">
                            Qty: {item.quantity} × {formatCurrency(item.pricePerUnit)} = {formatCurrency(item.subtotalRevenue)}
                            <span className={`ml-2 ${item.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              (Profit: {formatCurrency(item.profit)})
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    {(() => {
                      const totalCost = orderItems.reduce((sum, item) => sum + item.subtotalCost, 0)
                      const totalRevenue = orderItems.reduce((sum, item) => sum + item.subtotalRevenue, 0)
                      const totalProfit = totalRevenue - totalCost
                      
                      return (
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Total Cost:</span>
                            <span>{formatCurrency(totalCost)}</span>
                          </div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Total Revenue:</span>
                            <span>{formatCurrency(totalRevenue)}</span>
                          </div>
                          <div className={`flex justify-between font-bold ${totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            <span>Total Profit:</span>
                            <span>{formatCurrency(totalProfit)}</span>
                          </div>
                        </div>
                      )
                    })()}
                  </div>
                )}
              </div>

              {/* Notes */}
              <div>
                <Label htmlFor="orderNotes">Order Notes (Optional)</Label>
                <Textarea
                  id="orderNotes"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Special instructions, delivery notes, etc."
                  rows={3}
                />
              </div>

              <Button onClick={handleCreateOrder} className="w-full" size="lg">
                Create Order
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      {orders.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <div className="space-y-4">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search by order number, customer name, or phone..."
                className="w-full"
              />

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <FilterChips
                  options={[
                    { id: 'all', label: 'All', count: orders.length },
                    { id: 'new', label: 'New', count: orders.filter(o => o.status === 'new').length },
                    { id: 'in-progress', label: 'In Progress', count: orders.filter(o => o.status === 'in-progress').length },
                    { id: 'ready', label: 'Ready', count: orders.filter(o => o.status === 'ready').length },
                    { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
                  ]}
                  activeFilter={filterStatus}
                  onChange={setFilterStatus}
                />

                <SortDropdown
                  options={[
                    { id: 'date', label: 'Date (Newest)' },
                    { id: 'total', label: 'Total (High to Low)' },
                    { id: 'customer', label: 'Customer (A-Z)' },
                  ]}
                  value={sortBy}
                  onChange={(v) => setSortBy(v as any)}
                />
              </div>
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Orders List */}
      <div className="grid gap-4">
        {filteredAndSortedOrders.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-gray-500">
              {searchTerm || filterStatus !== 'all'
                ? 'No orders found. Try adjusting your search or filters.'
                : 'No orders yet. Create your first order to get started!'}
            </CardContent>
          </Card>
        ) : (
          filteredAndSortedOrders.map((order: Order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {order.orderNumber}
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      <User className="inline h-4 w-4 mr-1" />
                      {order.customerName}
                      {order.customerPhone && (
                        <>
                          <Phone className="inline h-4 w-4 ml-3 mr-1" />
                          {order.customerPhone}
                        </>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Export as PDF</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleExportPDF(order, 'confirmation')}>
                          <FileText className="h-4 w-4 mr-2" />
                          Order Confirmation
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExportPDF(order, 'kitchen')}>
                          <ChefHat className="h-4 w-4 mr-2" />
                          Kitchen Sheet
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExportPDF(order, 'delivery')}>
                          <Truck className="h-4 w-4 mr-2" />
                          Delivery Receipt
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExportPDF(order, 'packing')}>
                          <Package className="h-4 w-4 mr-2" />
                          Packing Slip
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Order Items */}
                  <div>
                    {order.items.map(item => (
                      <div key={item.id} className="text-sm py-1">
                        {item.recipeName} × {item.quantity}
                      </div>
                    ))}
                  </div>

                  {/* Delivery Info */}
                  <div className="flex items-center text-sm text-gray-600">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Delivery: {formatDateDisplay(order.deliveryDate)}
                  </div>

                  {/* Financial Info */}
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <div className="text-gray-600">Cost</div>
                      <div className="font-semibold">{formatCurrency(order.totalCost)}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Revenue</div>
                      <div className="font-semibold">{formatCurrency(order.totalRevenue)}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Profit</div>
                      <div className="font-semibold text-green-600">{formatCurrency(order.totalProfit)}</div>
                    </div>
                  </div>

                  {/* Status Actions */}
                  <div className="flex gap-2 pt-2">
                    {order.status === 'new' && (
                      <Button size="sm" onClick={() => handleStatusChange(order.id, 'in-progress')}>
                        Start
                      </Button>
                    )}
                    {order.status === 'in-progress' && (
                      <Button size="sm" onClick={() => handleStatusChange(order.id, 'ready')}>
                        Mark Ready
                      </Button>
                    )}
                    {order.status === 'ready' && (
                      <Button size="sm" onClick={() => handleStatusChange(order.id, 'delivered')}>
                        <Check className="mr-1 h-4 w-4" />
                        Deliver
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
