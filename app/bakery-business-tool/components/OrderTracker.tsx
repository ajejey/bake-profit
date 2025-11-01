'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { Plus, Calendar, DollarSign, Package, Phone, User, X, Edit2, Trash2, Check, Minus, Download, FileText, ChefHat, Truck } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import { useOrders, useRecipes, useCustomers, useCurrencySymbol } from '../hooks'
import type { Order, OrderItem, Customer } from '../types'
import SearchBar from './SearchBar'
import FilterChips, { type FilterOption } from './FilterChips'
import SortDropdown, { type SortOption } from './SortDropdown'
import { useSubscription } from '@/contexts/SubscriptionContext'
import UsageIndicator from '@/components/subscription/UsageIndicator'
import { getDefaultOrderStatus } from '../utils/settings'
import { CustomerSelector } from './CustomerSelector'
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



export default function OrderTracker() {
  const { toast } = useToast()
  const { checkLimit } = useSubscription()
  const { symbol: currencySymbol = '$' } = useCurrencySymbol()
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
  const [deliveryDate, setDeliveryDate] = useState('')
  const [orderNotes, setOrderNotes] = useState('')
  const [selectedRecipeId, setSelectedRecipeId] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [sellingPrice, setSellingPrice] = useState(0)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])

  // Helper to format currency synchronously
const formatCurrency = (amount: number): string => {
  return `${currencySymbol}${amount.toFixed(2)}`
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

    const costPerUnit = recipe.totalCost || 0
    const pricePerUnit = sellingPrice || costPerUnit * 2.5 // Default 2.5x markup
    const subtotalCost = costPerUnit * quantity
    const subtotalRevenue = pricePerUnit * quantity
    const profit = subtotalRevenue - subtotalCost

    const newItem: OrderItem = {
      id: uuidv4(),
      recipeId: recipe.id,
      recipeName: recipe.name,
      quantity,
      costPerUnit,
      pricePerUnit,
      subtotalCost,
      subtotalRevenue,
      profit,
    }

    setOrderItems([...orderItems, newItem])
    
    // Reset item form
    setSelectedRecipeId('')
    setQuantity(1)
    setSellingPrice(0)

    toast({
      title: 'Item added',
      description: `${recipe.name} x${quantity} added to order`,
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
      deliveryDate,
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
    setDeliveryDate('')
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
              <DialogTitle>Create New Order</DialogTitle>
              <DialogDescription>
                Add a new customer order with delivery details
              </DialogDescription>
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
                <Label className="text-sm font-medium mb-1" htmlFor="deliveryDate">Delivery Date *</Label>
                <Input
                  id="deliveryDate"
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                />
              </div>

              {/* Add Items */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Order Items</h3>
                
                <div className="grid grid-cols-12 gap-2 mb-3">
                  <div className="col-span-5">
                    <Label className="text-sm font-medium mb-1">Recipe</Label>
                    <Select value={selectedRecipeId} onValueChange={setSelectedRecipeId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select recipe" />
                      </SelectTrigger>
                      <SelectContent>
                        {recipes.map(recipe => (
                          <SelectItem key={recipe.id} value={recipe.id}>
                            {recipe.name} ({formatCurrency(recipe.totalCost || 0)})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="col-span-2">
                    <Label className="text-sm font-medium mb-1">Quantity</Label>
                    <div className="flex items-center gap-1">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="text"
                        value={quantity}
                        readOnly
                        className="text-center"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="col-span-3">
                    <Label className="text-sm font-medium mb-1">Selling Price ($)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Auto (2.5x)"
                      value={sellingPrice || ''}
                      onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  
                  <div className="col-span-2 flex items-end">
                    <Button onClick={handleSubmit} className="w-full">
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
                            <span className="ml-2 text-green-600">
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
                    
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Total Cost:</span>
                        <span>{formatCurrency(orderItems.reduce((sum, item) => sum + item.subtotalCost, 0))}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Total Revenue:</span>
                        <span>{formatCurrency(orderItems.reduce((sum, item) => sum + item.subtotalRevenue, 0))}</span>
                      </div>
                      <div className="flex justify-between font-bold text-green-600">
                        <span>Total Profit:</span>
                        <span>{formatCurrency(orderItems.reduce((sum, item) => sum + item.subtotalRevenue, 0) - orderItems.reduce((sum, item) => sum + item.subtotalCost, 0))}</span>
                      </div>
                    </div>
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
                    <Calendar className="h-4 w-4 mr-2" />
                    Delivery: {new Date(order.deliveryDate).toLocaleDateString()}
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
