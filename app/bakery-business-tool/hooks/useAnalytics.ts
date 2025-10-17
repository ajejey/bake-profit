'use client'

import { useMemo } from 'react'
import { useOrders, useCustomers, useRecipes } from '../hooks'
import type { RevenueByPeriod, ProductPerformance, CustomerAnalytics } from '../types'

/**
 * Custom hook for business analytics and insights
 * Provides revenue trends, product performance, and customer analytics
 */
export function useAnalytics() {
  const { orders } = useOrders()
  const { customers } = useCustomers()
  const { recipes } = useRecipes()

  /**
   * Get revenue by week
   */
  const revenueByWeek = useMemo((): RevenueByPeriod[] => {
    const weeklyData: Record<string, RevenueByPeriod> = {}

    orders.filter(o => o.status === 'delivered').forEach(order => {
      const date = new Date(order.deliveryDate)
      const year = date.getFullYear()
      const week = getWeekNumber(date)
      const period = `${year}-W${week.toString().padStart(2, '0')}`

      if (!weeklyData[period]) {
        weeklyData[period] = {
          period,
          revenue: 0,
          orders: 0,
          profit: 0,
        }
      }

      weeklyData[period].revenue += order.totalRevenue
      weeklyData[period].orders += 1
      weeklyData[period].profit += order.totalProfit
    })

    return Object.values(weeklyData).sort((a, b) => a.period.localeCompare(b.period))
  }, [orders])

  /**
   * Get revenue by month
   */
  const revenueByMonth = useMemo((): RevenueByPeriod[] => {
    const monthlyData: Record<string, RevenueByPeriod> = {}

    orders.filter(o => o.status === 'delivered').forEach(order => {
      const date = new Date(order.deliveryDate)
      const period = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`

      if (!monthlyData[period]) {
        monthlyData[period] = {
          period,
          revenue: 0,
          orders: 0,
          profit: 0,
        }
      }

      monthlyData[period].revenue += order.totalRevenue
      monthlyData[period].orders += 1
      monthlyData[period].profit += order.totalProfit
    })

    return Object.values(monthlyData).sort((a, b) => a.period.localeCompare(b.period))
  }, [orders])

  /**
   * Get product performance (best sellers)
   */
  const productPerformance = useMemo((): ProductPerformance[] => {
    const performanceMap: Record<string, ProductPerformance> = {}

    orders.filter(o => o.status === 'delivered').forEach(order => {
      order.items.forEach(item => {
        if (!performanceMap[item.recipeId]) {
          performanceMap[item.recipeId] = {
            recipeId: item.recipeId,
            recipeName: item.recipeName,
            unitsSold: 0,
            revenue: 0,
            cost: 0,
            profit: 0,
            marginPercentage: 0,
            averagePrice: 0,
          }
        }

        const perf = performanceMap[item.recipeId]
        perf.unitsSold += item.quantity
        perf.revenue += item.subtotalRevenue
        perf.cost += item.subtotalCost
        perf.profit += item.profit
      })
    })

    // Calculate averages and margins
    Object.values(performanceMap).forEach(perf => {
      perf.averagePrice = perf.unitsSold > 0 ? perf.revenue / perf.unitsSold : 0
      perf.marginPercentage = perf.revenue > 0 ? (perf.profit / perf.revenue) * 100 : 0
    })

    return Object.values(performanceMap).sort((a, b) => b.revenue - a.revenue)
  }, [orders])

  /**
   * Get top sellers (by quantity)
   */
  const topSellersByQuantity = useMemo(() => {
    return [...productPerformance].sort((a, b) => b.unitsSold - a.unitsSold).slice(0, 10)
  }, [productPerformance])

  /**
   * Get most profitable products
   */
  const mostProfitableProducts = useMemo(() => {
    return [...productPerformance].sort((a, b) => b.profit - a.profit).slice(0, 10)
  }, [productPerformance])

  /**
   * Customer analytics
   */
  const customerAnalytics = useMemo((): CustomerAnalytics => {
    const repeatCustomers = customers.filter(c => c.totalOrders > 1).length
    const deliveredOrders = orders.filter(o => o.status === 'delivered')
    const averageOrderValue = deliveredOrders.length > 0
      ? deliveredOrders.reduce((sum, o) => sum + o.totalRevenue, 0) / deliveredOrders.length
      : 0

    // Get new customers (first order in last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const newCustomers = customers.filter(c => {
      const createdDate = new Date(c.createdAt)
      return createdDate >= thirtyDaysAgo
    }).length

    const topSpenders = [...customers]
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 10)

    return {
      totalCustomers: customers.length,
      newCustomers,
      repeatCustomers,
      averageOrderValue,
      topSpenders,
    }
  }, [customers, orders])

  /**
   * Get revenue trend (growth/decline)
   */
  const revenueTrend = useMemo(() => {
    if (revenueByWeek.length < 2) return { trend: 'stable', percentage: 0 }

    const recent = revenueByWeek.slice(-2)
    if (recent.length < 2) return { trend: 'stable', percentage: 0 }

    const [previous, current] = recent
    const change = current.revenue - previous.revenue
    const percentage = previous.revenue > 0 ? (change / previous.revenue) * 100 : 0

    return {
      trend: percentage > 5 ? 'growing' : percentage < -5 ? 'declining' : 'stable',
      percentage: Math.abs(percentage),
      change,
    }
  }, [revenueByWeek])

  /**
   * Get summary stats
   */
  const summaryStats = useMemo(() => {
    const deliveredOrders = orders.filter(o => o.status === 'delivered')
    const totalRevenue = deliveredOrders.reduce((sum, o) => sum + o.totalRevenue, 0)
    const totalProfit = deliveredOrders.reduce((sum, o) => sum + o.totalProfit, 0)
    const totalCost = deliveredOrders.reduce((sum, o) => sum + o.totalCost, 0)
    const averageOrderValue = deliveredOrders.length > 0 ? totalRevenue / deliveredOrders.length : 0
    const averageProfit = deliveredOrders.length > 0 ? totalProfit / deliveredOrders.length : 0
    const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0

    return {
      totalOrders: deliveredOrders.length,
      totalRevenue,
      totalProfit,
      totalCost,
      averageOrderValue,
      averageProfit,
      profitMargin,
      totalCustomers: customers.length,
      totalRecipes: recipes.length,
    }
  }, [orders, customers, recipes])

  /**
   * Get date range of data
   */
  const dataDateRange = useMemo(() => {
    const deliveredOrders = orders.filter(o => o.status === 'delivered')
    if (deliveredOrders.length === 0) return null

    const dates = deliveredOrders.map(o => new Date(o.deliveryDate))
    const earliest = new Date(Math.min(...dates.map(d => d.getTime())))
    const latest = new Date(Math.max(...dates.map(d => d.getTime())))

    return {
      start: earliest.toISOString().split('T')[0],
      end: latest.toISOString().split('T')[0],
      days: Math.ceil((latest.getTime() - earliest.getTime()) / (1000 * 60 * 60 * 24)),
    }
  }, [orders])

  /**
   * Get recent performance (last 7 days vs previous 7 days)
   */
  const recentPerformance = useMemo(() => {
    const now = new Date()
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const previous7Days = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)

    const lastWeek = orders.filter(o => {
      const date = new Date(o.deliveryDate)
      return o.status === 'delivered' && date >= last7Days && date < now
    })

    const previousWeek = orders.filter(o => {
      const date = new Date(o.deliveryDate)
      return o.status === 'delivered' && date >= previous7Days && date < last7Days
    })

    const lastWeekRevenue = lastWeek.reduce((sum, o) => sum + o.totalRevenue, 0)
    const previousWeekRevenue = previousWeek.reduce((sum, o) => sum + o.totalRevenue, 0)
    const change = lastWeekRevenue - previousWeekRevenue
    const changePercentage = previousWeekRevenue > 0 ? (change / previousWeekRevenue) * 100 : 0

    return {
      lastWeek: {
        orders: lastWeek.length,
        revenue: lastWeekRevenue,
        profit: lastWeek.reduce((sum, o) => sum + o.totalProfit, 0),
      },
      previousWeek: {
        orders: previousWeek.length,
        revenue: previousWeekRevenue,
        profit: previousWeek.reduce((sum, o) => sum + o.totalProfit, 0),
      },
      change,
      changePercentage,
      trend: changePercentage > 0 ? 'up' : changePercentage < 0 ? 'down' : 'stable',
    }
  }, [orders])

  return {
    // Revenue trends
    revenueByWeek,
    revenueByMonth,
    revenueTrend,
    
    // Product performance
    productPerformance,
    topSellersByQuantity,
    mostProfitableProducts,
    
    // Customer analytics
    customerAnalytics,
    
    // Summary stats
    summaryStats,
    dataDateRange,
    recentPerformance,
    
    // Insights
    hasData: orders.filter(o => o.status === 'delivered').length > 0,
  }
}

/**
 * Helper function to get ISO week number
 */
function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
}
