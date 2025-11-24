'use client'

import { Calendar, ChevronRight } from 'lucide-react'
import { format, addDays, isToday, parseISO } from 'date-fns'
import type { Order } from '../../types'
import { ORDER_STATUSES } from '../../types'

interface DashboardCalendarWidgetProps {
    orders: Order[]
    onDateClick?: (date: Date) => void
    onViewAllClick?: () => void
    className?: string
}

export default function DashboardCalendarWidget({
    orders,
    onDateClick,
    onViewAllClick,
    className = '',
}: DashboardCalendarWidgetProps) {
    // Generate next 7 days
    const next7Days = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i))

    // Group orders by date
    const getOrdersForDate = (date: Date): Order[] => {
        const dateKey = format(date, 'yyyy-MM-dd')
        return orders.filter(order => {
            const orderDate = order.deliveryDate.split('T')[0]
            return orderDate === dateKey
        })
    }

    // Get status badge color
    const getStatusColor = (status: Order['status']): string => {
        const statusConfig = ORDER_STATUSES.find(s => s.value === status)
        const colorMap = {
            blue: 'bg-blue-500',
            yellow: 'bg-yellow-500',
            green: 'bg-green-500',
            gray: 'bg-gray-500',
            red: 'bg-red-500',
        }
        return statusConfig ? colorMap[statusConfig.color as keyof typeof colorMap] : colorMap.blue
    }

    return (
        <div className={`dashboard-calendar-widget bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-rose-100 rounded-lg">
                        <Calendar className="w-5 h-5 text-rose-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Upcoming Orders</h3>
                        <p className="text-sm text-gray-500">Next 7 days</p>
                    </div>
                </div>

                {onViewAllClick && (
                    <button
                        onClick={onViewAllClick}
                        className="flex items-center gap-1 text-sm font-medium text-rose-600 hover:text-rose-700 transition-colors"
                    >
                        View Calendar
                        <ChevronRight className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Calendar Days */}
            <div className="space-y-2">
                {next7Days.map((date, index) => {
                    const dateOrders = getOrdersForDate(date)
                    const isTodayDate = isToday(date)

                    return (
                        <div
                            key={index}
                            onClick={() => onDateClick?.(date)}
                            className={`calendar-day-row flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${isTodayDate
                                    ? 'bg-rose-50 border-rose-300 hover:bg-rose-100'
                                    : dateOrders.length > 0
                                        ? 'bg-white border-gray-200 hover:bg-gray-50'
                                        : 'bg-gray-50 border-gray-100 hover:bg-gray-100'
                                }`}
                        >
                            {/* Date Info */}
                            <div className="flex items-center gap-4">
                                <div className={`text-center min-w-[60px] ${isTodayDate ? 'text-rose-600' : 'text-gray-700'}`}>
                                    <div className="text-xs font-medium uppercase">
                                        {format(date, 'EEE')}
                                    </div>
                                    <div className={`text-2xl font-bold ${isTodayDate ? 'text-rose-600' : 'text-gray-900'}`}>
                                        {format(date, 'd')}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {format(date, 'MMM')}
                                    </div>
                                </div>

                                {/* Order Info */}
                                <div className="flex-1">
                                    {dateOrders.length > 0 ? (
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-semibold text-gray-900">
                                                    {dateOrders.length} order{dateOrders.length !== 1 ? 's' : ''}
                                                </span>
                                                <div className="flex gap-1">
                                                    {Array.from(new Set(dateOrders.map(o => o.status))).map(status => (
                                                        <div
                                                            key={status}
                                                            className={`w-2 h-2 rounded-full ${getStatusColor(status)}`}
                                                            title={ORDER_STATUSES.find(s => s.value === status)?.label}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-600 truncate">
                                                {dateOrders.slice(0, 2).map(o => o.customerName).join(', ')}
                                                {dateOrders.length > 2 && ` +${dateOrders.length - 2} more`}
                                            </div>
                                        </div>
                                    ) : (
                                        <span className="text-sm text-gray-400">No orders</span>
                                    )}
                                </div>
                            </div>

                            {/* Order Count Badge */}
                            {dateOrders.length > 0 && (
                                <div className={`px-3 py-1 rounded-full text-sm font-bold ${isTodayDate ? 'bg-rose-600 text-white' : 'bg-gray-200 text-gray-700'
                                    }`}>
                                    {dateOrders.length}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            {/* Summary */}
            {orders.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-gray-900">
                                {orders.filter(o => {
                                    const orderDate = new Date(o.deliveryDate)
                                    return next7Days.some(d => format(d, 'yyyy-MM-dd') === format(orderDate, 'yyyy-MM-dd'))
                                }).length}
                            </div>
                            <div className="text-xs text-gray-500">Total Orders</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-yellow-600">
                                {orders.filter(o => o.status === 'in-progress').length}
                            </div>
                            <div className="text-xs text-gray-500">In Progress</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-green-600">
                                {orders.filter(o => o.status === 'ready').length}
                            </div>
                            <div className="text-xs text-gray-500">Ready</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
