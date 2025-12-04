'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Filter, Settings } from 'lucide-react'
import CalendarView from '../components/Calendar/CalendarView'
import { useOrders } from '../hooks'
import type { Order } from '../types'
import { ORDER_STATUSES } from '../types'
import AppLayout from '../components/AppLayout'

export default function CalendarPage() {
    const router = useRouter()
    const { orders } = useOrders()
    const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders)
    const [statusFilter, setStatusFilter] = useState<Order['status'] | 'all'>('all')
    const [customerFilter, setCustomerFilter] = useState('')
    const [showFilters, setShowFilters] = useState(false)

    // Update filtered orders when filters change
    const applyFilters = () => {
        let filtered = orders

        // Status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(order => order.status === statusFilter)
        }

        // Customer filter
        if (customerFilter.trim()) {
            filtered = filtered.filter(order =>
                order.customerName.toLowerCase().includes(customerFilter.toLowerCase())
            )
        }

        setFilteredOrders(filtered)
    }

    // Apply filters whenever they change
    useEffect(() => {
        applyFilters()
    }, [statusFilter, customerFilter, orders])

    // Handle order click - navigate to order details
    const handleOrderClick = (order: Order) => {
        router.push(`/bakery-business-tool/orders?orderId=${order.id}`)
    }

    // Handle date click - could filter by date or navigate to day view
    const handleDateClick = (date: Date) => {
        console.log('Date clicked:', date)
        // Could implement: scroll to date, filter by date, etc.
    }

    // Clear all filters
    const handleClearFilters = () => {
        setStatusFilter('all')
        setCustomerFilter('')
    }

    // Get unique customers for filter dropdown
    const uniqueCustomers = Array.from(new Set(orders.map(o => o.customerName))).sort()

    return (
        <AppLayout currentPage="calendar">
            <div className="calendar-page-container space-y-6">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Calendar</h1>
                        <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage your orders and production schedule</p>
                    </div>

                    <div className="flex gap-2 sm:gap-3">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg border-2 transition-colors text-sm sm:text-base ${showFilters ? 'bg-rose-50 border-rose-300 text-rose-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <Filter className="w-4 h-4" />
                            <span className="hidden xs:inline">Filters</span>
                            {(statusFilter !== 'all' || customerFilter) && (
                                <span className="px-1.5 sm:px-2 py-0.5 bg-rose-600 text-white text-xs rounded-full">
                                    {(statusFilter !== 'all' ? 1 : 0) + (customerFilter ? 1 : 0)}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => router.push('/bakery-business-tool/settings')}
                            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg border-2 border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base"
                        >
                            <Settings className="w-4 h-4" />
                            <span className="hidden xs:inline">Settings</span>
                        </button>
                    </div>
                </div>

                {/* Filters Panel */}
                {showFilters && (
                    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                            <button
                                onClick={handleClearFilters}
                                className="text-sm text-rose-600 hover:text-rose-700 font-medium"
                            >
                                Clear All
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Status Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Order Status
                                </label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value as Order['status'] | 'all')}
                                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:outline-none"
                                >
                                    <option value="all">All Statuses</option>
                                    {ORDER_STATUSES.map(status => (
                                        <option key={status.value} value={status.value}>
                                            {status.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Customer Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Customer
                                </label>
                                <input
                                    type="text"
                                    value={customerFilter}
                                    onChange={(e) => setCustomerFilter(e.target.value)}
                                    placeholder="Search by customer name..."
                                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:outline-none"
                                />
                            </div>

                            {/* Date Range Filter - TODO: Implement later */}
                            {/* <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date Range
                                </label>
                                <select
                                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:outline-none"
                                    disabled
                                >
                                    <option>This Month (Coming Soon)</option>
                                </select>
                            </div> */}
                        </div>

                        {/* Filter Results Summary */}
                        <div className="pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-600">
                                Showing <span className="font-semibold text-gray-900">{filteredOrders.length}</span> of{' '}
                                <span className="font-semibold text-gray-900">{orders.length}</span> orders
                            </p>
                        </div>
                    </div>
                )}

                {/* Calendar View */}
                <div className="bg-white border-2 border-gray-200 rounded-xl p-3 sm:p-6">
                    <CalendarView
                        orders={filteredOrders}
                        onOrderClick={handleOrderClick}
                        onDateClick={handleDateClick}
                        defaultView="month"
                    />
                </div>

                {/* Empty State */}
                {filteredOrders.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <p className="text-lg font-medium">No orders found</p>
                        <p className="text-sm mt-1">
                            {orders.length === 0
                                ? 'Start by creating your first order'
                                : 'Try adjusting your filters'}
                        </p>
                    </div>
                )}
            </div>
        </AppLayout>
    )
}
