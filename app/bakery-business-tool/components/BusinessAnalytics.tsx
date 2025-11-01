'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAnalytics, useCurrencySymbol } from '../hooks'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3,
  DollarSign,
  Package,
  Users,
  Calendar,
  Award,
  Minus,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

export default function BusinessAnalytics() {
  const { symbol: currencySymbol = '$' } = useCurrencySymbol()
  const {
    revenueByWeek,
    revenueByMonth,
    revenueTrend,
    productPerformance,
    topSellersByQuantity,
    mostProfitableProducts,
    customerAnalytics,
    summaryStats,
    dataDateRange,
    recentPerformance,
    hasData,
  } = useAnalytics()

  const [viewMode, setViewMode] = useState<'week' | 'month'>('week')
  const [productView, setProductView] = useState<'quantity' | 'profit'>('quantity')

  const revenueData = viewMode === 'week' ? revenueByWeek : revenueByMonth
  const productData = productView === 'quantity' ? topSellersByQuantity : mostProfitableProducts

  // Get max revenue for chart scaling
  const maxRevenue = Math.max(...revenueData.map(d => d.revenue), 1)

  // Get trend icon
  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <ArrowUp className="h-4 w-4 text-green-500" />
    if (trend === 'down') return <ArrowDown className="h-4 w-4 text-red-500" />
    return <Minus className="h-4 w-4 text-gray-400" />
  }

  // Helper to format currency synchronously
const formatCurrency = (amount: number): string => {
  return `${currencySymbol}${amount.toFixed(2)}`
}

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Business Analytics</h1>
        <p className="text-gray-600">Track performance and gain insights</p>
        {dataDateRange && (
          <p className="text-sm text-gray-500 mt-1">
            Data from {new Date(dataDateRange.start).toLocaleDateString()} to {new Date(dataDateRange.end).toLocaleDateString()} ({dataDateRange.days} days)
          </p>
        )}
      </div>

      {hasData ? (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(summaryStats.totalRevenue)}</div>
                <p className="text-xs text-muted-foreground">
                  {summaryStats.totalOrders} delivered orders
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{formatCurrency(summaryStats.totalProfit)}</div>
                <p className="text-xs text-muted-foreground">
                  {summaryStats.profitMargin.toFixed(1)}% profit margin
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(summaryStats.averageOrderValue)}</div>
                <p className="text-xs text-muted-foreground">
                  Per delivered order
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{summaryStats.totalCustomers}</div>
                <p className="text-xs text-muted-foreground">
                  {customerAnalytics.repeatCustomers} repeat customers
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Performance */}
          <Card className={recentPerformance.trend === 'up' ? 'border-green-200 bg-green-50' : recentPerformance.trend === 'down' ? 'border-red-200 bg-red-50' : ''}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Recent Performance
                {getTrendIcon(recentPerformance.trend)}
              </CardTitle>
              <CardDescription>Last 7 days vs previous 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Last Week</p>
                  <p className="text-2xl font-bold">{formatCurrency(recentPerformance.lastWeek.revenue)}</p>
                  <p className="text-xs text-gray-500">{recentPerformance.lastWeek.orders} orders</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Previous Week</p>
                  <p className="text-2xl font-bold">{formatCurrency(recentPerformance.previousWeek.revenue)}</p>
                  <p className="text-xs text-gray-500">{recentPerformance.previousWeek.orders} orders</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Change</p>
                  <p className={`text-2xl font-bold ${recentPerformance.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {recentPerformance.change >= 0 ? '+' : ''}{formatCurrency(Math.abs(recentPerformance.change))}
                  </p>
                  <p className="text-xs text-gray-500">
                    {recentPerformance.changePercentage >= 0 ? '+' : ''}{recentPerformance.changePercentage.toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Trend */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Revenue Trend
                  </CardTitle>
                  <CardDescription>Historical revenue by period</CardDescription>
                </div>
                <Select value={viewMode} onValueChange={(v: 'week' | 'month') => setViewMode(v)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">By Week</SelectItem>
                    <SelectItem value="month">By Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {revenueData.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No data available</p>
              ) : (
                <div className="space-y-3">
                  {revenueData.slice(-12).map((data, index) => (
                    <div key={data.period} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{data.period}</span>
                        <span className="text-gray-600">{data.orders} orders</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-end pr-2"
                            style={{ width: `${(data.revenue / maxRevenue) * 100}%` }}
                          >
                            {data.revenue / maxRevenue > 0.3 && (
                              <span className="text-xs font-semibold text-white">
                                {formatCurrency(data.revenue)}
                              </span>
                            )}
                          </div>
                        </div>
                        {data.revenue / maxRevenue <= 0.3 && (
                          <span className="text-sm font-semibold text-gray-700 w-16 text-right">
                            ${data.revenue.toFixed(0)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Product Performance */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Product Performance
                  </CardTitle>
                  <CardDescription>Your best performing products</CardDescription>
                </div>
                <Select value={productView} onValueChange={(v: 'quantity' | 'profit') => setProductView(v)}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quantity">By Quantity</SelectItem>
                    <SelectItem value="profit">By Profit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {productData.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No sales data yet</p>
              ) : (
                <div className="space-y-3">
                  {productData.slice(0, 10).map((product, index) => (
                    <div key={product.recipeId} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{product.recipeName}</p>
                        <div className="flex gap-3 text-xs text-gray-600">
                          <span>{product.unitsSold} sold</span>
                          <span>•</span>
                          <span>{formatCurrency(product.revenue)} revenue</span>
                          <span>•</span>
                          <span className="text-green-600">{formatCurrency(product.profit)} profit</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">
                          {product.marginPercentage.toFixed(0)}% margin
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatCurrency(product.averagePrice)}/unit
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Customer Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Customer Insights
              </CardTitle>
              <CardDescription>Understanding your customer base</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Stats */}
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="text-sm text-gray-600">Total Customers</p>
                    <p className="text-3xl font-bold">{customerAnalytics.totalCustomers}</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="text-sm text-gray-600">Repeat Customers</p>
                    <p className="text-3xl font-bold">{customerAnalytics.repeatCustomers}</p>
                    <p className="text-xs text-gray-500">
                      {customerAnalytics.totalCustomers > 0 
                        ? ((customerAnalytics.repeatCustomers / customerAnalytics.totalCustomers) * 100).toFixed(0)
                        : 0}% of total
                    </p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="text-sm text-gray-600">New Customers (30 days)</p>
                    <p className="text-3xl font-bold">{customerAnalytics.newCustomers}</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <p className="text-sm text-gray-600">Avg Order Value</p>
                    <p className="text-3xl font-bold">{formatCurrency(customerAnalytics.averageOrderValue)}</p>
                  </div>
                </div>

                {/* Top Spenders */}
                <div>
                  <h4 className="font-semibold mb-3">Top Customers</h4>
                  <div className="space-y-2">
                    {customerAnalytics.topSpenders.slice(0, 5).map((customer, index) => (
                      <div key={customer.id} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{customer.name}</p>
                            <p className="text-xs text-gray-500">{customer.totalOrders} orders</p>
                          </div>
                        </div>
                        <p className="font-semibold">{formatCurrency(customer.totalSpent)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Insights */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <TrendingUp className="h-5 w-5" />
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {summaryStats.profitMargin < 40 && (
                <div className="bg-yellow-100 border border-yellow-300 rounded p-3">
                  <p className="text-sm font-medium text-yellow-900">
                    ⚠️ Your overall profit margin is {summaryStats.profitMargin.toFixed(1)}%, which is below the recommended 40-60% for bakeries.
                  </p>
                </div>
              )}
              {customerAnalytics.repeatCustomers / customerAnalytics.totalCustomers > 0.5 && (
                <div className="bg-green-100 border border-green-300 rounded p-3">
                  <p className="text-sm font-medium text-green-900">
                    ✅ Great job! {((customerAnalytics.repeatCustomers / customerAnalytics.totalCustomers) * 100).toFixed(0)}% of your customers are repeat customers.
                  </p>
                </div>
              )}
              {topSellersByQuantity.length > 0 && (
                <div className="bg-blue-100 border border-blue-300 rounded p-3">
                  <p className="text-sm font-medium text-blue-900">
                    🏆 Your best seller is <strong>{topSellersByQuantity[0].recipeName}</strong> with {topSellersByQuantity[0].unitsSold} units sold.
                  </p>
                </div>
              )}
              {recentPerformance.trend === 'up' && (
                <div className="bg-green-100 border border-green-300 rounded p-3">
                  <p className="text-sm font-medium text-green-900">
                    📈 Revenue is growing! You&apos;re up {recentPerformance.changePercentage.toFixed(1)}% compared to last week.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        /* Empty State */
        <Card className="border-2 border-dashed">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <BarChart3 className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <h3 className="text-lg font-semibold mb-2">No Analytics Data Yet</h3>
              <p className="text-gray-600 mb-4">
                Complete and deliver orders to see your business analytics and insights.
              </p>
              <p className="text-sm text-gray-500">
                💡 Mark orders as &quot;Delivered&quot; in the Order Tracker to include them in analytics.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
