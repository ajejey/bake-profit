'use client'

import { useMemo } from 'react'
import { useSyncedBakeryData } from './useSyncedBakeryData'
import type { Order } from '../types'
import { useOrderSettings } from './useSettings'

/**
 * Custom hook for order management
 * Provides clean API for working with orders
 */
export function useOrders() {
  const { 
    orders, 
    addOrder, 
    updateOrder, 
    deleteOrder, 
    getOrderById, 
    updateOrderStatus,
    recipes 
  } = useSyncedBakeryData()

  const { settings } = useOrderSettings()
  console.log("Settings:", settings)

  // Get orders by status
  const getOrdersByStatus = useMemo(() => {
    return (status: Order['status']) => orders.filter(o => o.status === status)
  }, [orders])

  // Get recent orders
  const recentOrders = useMemo(() => {
    return [...orders]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10)
  }, [orders])

  // Helper to get date string in YYYY-MM-DD format from any date input
  const getDateString = (dateInput: string): string => {
    const date = new Date(dateInput)
    if (isNaN(date.getTime())) return dateInput
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // Get orders due today
  const ordersDueToday = useMemo(() => {
    const now = new Date()
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    
    return orders.filter(o => {
      const deliveryDateStr = getDateString(o.deliveryDate)
      return deliveryDateStr === today && o.status !== 'delivered'
    })
  }, [orders])

  // Get orders due this week
  const ordersDueThisWeek = useMemo(() => {
    const now = new Date()
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    const nextWeekStr = `${nextWeek.getFullYear()}-${String(nextWeek.getMonth() + 1).padStart(2, '0')}-${String(nextWeek.getDate()).padStart(2, '0')}`
    
    return orders.filter(o => {
      const deliveryDateStr = getDateString(o.deliveryDate)
      return deliveryDateStr >= todayStr && deliveryDateStr <= nextWeekStr && o.status !== 'delivered'
    })
  }, [orders])

  // Get pending orders (not delivered or cancelled)
  const pendingOrders = useMemo(() => {
    return orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled')
  }, [orders])

  // Calculate total revenue
  const totalRevenue = useMemo(() => {
    return orders
      .filter(o => o.status === 'delivered')
      .reduce((sum, o) => sum + o.totalRevenue, 0)
  }, [orders])

  // Calculate total profit
  const totalProfit = useMemo(() => {
    return orders
      .filter(o => o.status === 'delivered')
      .reduce((sum, o) => sum + o.totalProfit, 0)
  }, [orders])

  // Get order with recipe details
  const getOrderWithDetails = useMemo(() => {
    return (id: string) => {
      const order = getOrderById(id)
      if (!order) return null

      return {
        ...order,
        itemsWithRecipes: order.items.map(item => {
          const recipe = recipes.find(r => r.id === item.recipeId)
          return {
            ...item,
            recipe,
          }
        }),
      }
    }
  }, [getOrderById, recipes])

  // Get next order number
  const getNextOrderNumber = () => {
    const maxNumber = orders.reduce((max, order) => {
      const num = parseInt(order.orderNumber.split('-')[1])
      return num > max ? num : max
    }, 0)
    return `${settings?.orderPrefix}${(maxNumber + 1).toString().padStart(3, '0')}`
  }

  return {
    // Data
    orders,
    recentOrders,
    ordersDueToday,
    ordersDueThisWeek,
    pendingOrders,
    totalRevenue,
    totalProfit,

    // Actions
    addOrder,
    updateOrder,
    deleteOrder,
    getOrderById,
    updateOrderStatus,
    getOrdersByStatus,
    getOrderWithDetails,
    getNextOrderNumber,
  }
}
