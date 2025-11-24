'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useOrders, useRecipes, useCustomers, useInventory, useCurrencySymbol } from '../hooks'
import { useAuth } from '@/contexts/AuthContext'
import DashboardCalendarWidget from './Calendar/DashboardCalendarWidget'


// Helper to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
import {
  Plus,
  Package,
  DollarSign,
  TrendingUp,
  ChefHat,
  Users,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  XCircle,
  ShoppingCart
} from 'lucide-react'
import type { Order } from '../types'
import Link from 'next/link'

interface DashboardProps {
  onNavigate: (tab: string) => void
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const {
    orders,
    ordersDueToday,
    ordersDueThisWeek,
    pendingOrders,
    totalRevenue,
    totalProfit
  } = useOrders()

  const { recipes } = useRecipes()
  const { user } = useAuth()
  const { customers, topCustomers } = useCustomers()
  const { alerts, hasLowStock, hasOutOfStock, lowStockItems, outOfStockItems } = useInventory()
  const { symbol: currencySymbol } = useCurrencySymbol()

  // Get status color
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-500'
      case 'in-progress': return 'bg-yellow-500'
      case 'ready': return 'bg-green-500'
      case 'delivered': return 'bg-gray-400'
      case 'cancelled': return 'bg-red-500'
      default: return 'bg-gray-400'
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }

  // Get today's date
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  // Helper to format currency synchronously
  const formatCurrency = (amount: number): string => {
    return `${currencySymbol}${amount.toFixed(2)}`
  }

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        Welcome back, {user?.name || 'Baker'}!
      </h1>

      {/* Quick Actions */}
      <Card>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            <Link href="/bakery-business-tool/orders">
              <Button
                className="h-20 flex flex-col gap-2 w-full cursor-pointer"
                size="lg"
              >
                <Plus className="h-5 w-5" />
                <span>New Order</span>
              </Button>
            </Link>
            <Link href="/bakery-business-tool/recipes">
              <Button
                className="h-20 flex flex-col gap-2 w-full cursor-pointer"
                variant="outline"
                size="lg"
              >
                <ChefHat className="h-5 w-5" />
                <span>Recipes</span>
              </Button>
            </Link>
            <Link href="/bakery-business-tool/inventory" className="relative">
              <Button
                className="h-20 flex flex-col gap-2 w-full cursor-pointer"
                variant="outline"
                size="lg"
              >
                <Package className="h-5 w-5" />
                <span>Inventory</span>
              </Button>
              {alerts.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white text-xs font-semibold">
                  {alerts.length}
                </span>
              )}
            </Link>
          </div>
        </CardContent>
      </Card>



      {/* Today's Orders */}
      {ordersDueToday.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Orders Due Today
            </CardTitle>
            <CardDescription>Orders that need attention today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 grid grid-cols-2 md:grid-cols-4 gap-3">
            {ordersDueToday.map(order => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{order.orderNumber}</span>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    {order.customerName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {order.items.map(item => `${item.recipeName} x${item.quantity}`).join(', ')}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatCurrency(order.totalRevenue)}</div>
                  <div className="text-sm text-green-600">
                    +{formatCurrency(order.totalProfit)} profit
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-gray-500 py-8">
              <CheckCircle2 className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p className="text-lg font-medium">No orders due today</p>
              <p className="text-sm">Enjoy your day or create a new order!</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Orders Today */}
        <Card className="gap-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders Today</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ordersDueToday.length}</div>
            <p className="text-xs text-muted-foreground">
              {ordersDueThisWeek.length} this week
            </p>
          </CardContent>
        </Card>

        {/* Total Revenue */}
        <Card className='gap-2'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">All delivered orders</p>
          </CardContent>
        </Card>

        {/* Total Profit */}
        <Card className='gap-2'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalProfit)}</div>
            <p className="text-xs text-muted-foreground">
              {totalRevenue > 0 ? `${((totalProfit / totalRevenue) * 100).toFixed(1)}% margin` : 'No sales yet'}
            </p>
          </CardContent>
        </Card>

        {/* Recipes & Customers */}
        <Card className='gap-2'>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Catalog</CardTitle>
            <ChefHat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recipes.length}</div>
            <p className="text-xs text-muted-foreground">
              {customers.length} customers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Calendar Widget - Upcoming Orders */}
      {/* <DashboardCalendarWidget
        orders={ordersDueThisWeek}
        onDateClick={(date) => {
          // Navigate to orders tab with date filter
          onNavigate('order-tracker')
        }}
        onViewAllClick={() => onNavigate('calendar')}
      /> */}

      {/* Inventory Alerts */}
      {alerts.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Inventory Alerts
              <Badge variant="destructive" className="ml-2">{alerts.length}</Badge>
            </CardTitle>
            <CardDescription>
              {hasOutOfStock && `${outOfStockItems.length} out of stock`}
              {hasOutOfStock && hasLowStock && ' • '}
              {hasLowStock && `${lowStockItems.length} running low`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {alerts.slice(0, 3).map((alert, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-3 rounded-md ${alert.severity === 'error' ? 'bg-red-100 border border-red-200' : 'bg-yellow-100 border border-yellow-200'
                    }`}
                >
                  {alert.severity === 'error' ? (
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${alert.severity === 'error' ? 'text-red-900' : 'text-yellow-900'
                      }`}>
                      {alert.message}
                    </p>
                  </div>
                </div>
              ))}
              {alerts.length > 3 && (
                <p className="text-sm text-gray-600 text-center pt-2">
                  And {alerts.length - 3} more alert{alerts.length - 3 !== 1 ? 's' : ''}...
                </p>
              )}
              <Button
                className="w-full mt-3"
                variant="outline"
                onClick={() => onNavigate('inventory-manager')}
              >
                <Package className="mr-2 h-4 w-4" />
                Go to Inventory Manager
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* This Week's Orders */}
      {ordersDueThisWeek.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              This Week&apos;s Orders
            </CardTitle>
            <CardDescription>
              {ordersDueThisWeek.length} orders • {formatCurrency(ordersDueThisWeek.reduce((sum, o) => sum + o.totalRevenue, 0))} revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {ordersDueThisWeek.slice(0, 5).map(order => (
                <div
                  key={order.id}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      {formatDate(order.deliveryDate)}
                    </Badge>
                    <span className="font-medium">{order.orderNumber}</span>
                    <span className="text-sm text-gray-600">- {order.customerName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(order.status)} variant="default">
                      {order.status}
                    </Badge>
                    <span className="text-sm font-medium">{formatCurrency(order.totalRevenue)}</span>
                  </div>
                </div>
              ))}
              {ordersDueThisWeek.length > 5 && (
                <div className="text-center pt-2">
                  <Button variant="link" size="sm">
                    View all {ordersDueThisWeek.length} orders →
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}



      {/* Top Customers */}
      {topCustomers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Top Customers
            </CardTitle>
            <CardDescription>Your best customers by total spent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCustomers.slice(0, 5).map((customer, index) => (
                <div
                  key={customer.id}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-gray-500">
                        {customer.totalOrders} orders
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{formatCurrency(customer.totalSpent)}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Getting Started (if no data) */}
      {orders.length === 0 && (
        <Card className="border-2 border-dashed">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <h3 className="text-lg font-semibold mb-2">Welcome to Your Bakery Dashboard!</h3>
              <p className="text-gray-600 mb-4">
                Get started by adding ingredients and recipes, then create your first order.
              </p>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => onNavigate('order-tracker')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Order
                </Button>
                <Button variant="outline" onClick={() => onNavigate('recipe-calculator')}>
                  <ChefHat className="mr-2 h-4 w-4" />
                  Add Recipes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
