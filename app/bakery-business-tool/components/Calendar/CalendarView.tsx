'use client'

import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isToday,
    addMonths,
    subMonths,
    addWeeks,
    subWeeks,
    addDays,
    subDays,
} from 'date-fns'
import type { Order } from '../../types'
import { useCalendarSettings } from '../../hooks/useCalendarSettings'
import OrderBlock from './OrderBlock'

type ViewMode = 'month' | 'week' | 'day'

interface CalendarViewProps {
    orders: Order[]
    onOrderClick?: (order: Order) => void
    onDateClick?: (date: Date) => void
    defaultView?: ViewMode
    className?: string
}

export default function CalendarView({
    orders,
    onOrderClick,
    onDateClick,
    defaultView = 'month',
    className = '',
}: CalendarViewProps) {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [viewMode, setViewMode] = useState<ViewMode>(defaultView)
    const { settings } = useCalendarSettings()

    // Calculate calendar dates based on view mode
    const calendarDates = useMemo(() => {
        if (viewMode === 'month') {
            const monthStart = startOfMonth(currentDate)
            const monthEnd = endOfMonth(currentDate)
            const calendarStart = startOfWeek(monthStart, { weekStartsOn: settings.weekStartsOn })
            const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: settings.weekStartsOn })

            return eachDayOfInterval({ start: calendarStart, end: calendarEnd })
        } else if (viewMode === 'week') {
            const weekStart = startOfWeek(currentDate, { weekStartsOn: settings.weekStartsOn })
            const weekEnd = endOfWeek(currentDate, { weekStartsOn: settings.weekStartsOn })

            return eachDayOfInterval({ start: weekStart, end: weekEnd })
        } else {
            // day view
            return [currentDate]
        }
    }, [currentDate, viewMode, settings.weekStartsOn])

    // Group orders by date
    const ordersByDate = useMemo(() => {
        const grouped = new Map<string, Order[]>()

        orders.forEach(order => {
            const dateKey = order.deliveryDate.split('T')[0] // Get just the date part
            if (!grouped.has(dateKey)) {
                grouped.set(dateKey, [])
            }
            grouped.get(dateKey)!.push(order)
        })

        return grouped
    }, [orders])

    // Get orders for a specific date
    const getOrdersForDate = (date: Date): Order[] => {
        const dateKey = format(date, 'yyyy-MM-dd')
        return ordersByDate.get(dateKey) || []
    }

    // Calculate capacity for a date
    const getCapacityForDate = (date: Date): { used: number; total: number; percentage: number } => {
        const dateOrders = getOrdersForDate(date)
        const used = dateOrders.reduce((sum, order) => sum + (order.productionDuration || 0), 0)
        const total = settings.dailyCapacityHours
        const percentage = total > 0 ? (used / total) * 100 : 0

        return { used, total, percentage }
    }

    // Navigation handlers
    const handlePrevious = () => {
        if (viewMode === 'month') {
            setCurrentDate(subMonths(currentDate, 1))
        } else if (viewMode === 'week') {
            setCurrentDate(subWeeks(currentDate, 1))
        } else {
            setCurrentDate(subDays(currentDate, 1))
        }
    }

    const handleNext = () => {
        if (viewMode === 'month') {
            setCurrentDate(addMonths(currentDate, 1))
        } else if (viewMode === 'week') {
            setCurrentDate(addWeeks(currentDate, 1))
        } else {
            setCurrentDate(addDays(currentDate, 1))
        }
    }

    const handleToday = () => {
        setCurrentDate(new Date())
    }

    // Get capacity color
    const getCapacityColor = (percentage: number): string => {
        if (percentage >= 85) return 'bg-red-100 border-red-300'
        if (percentage >= 60) return 'bg-yellow-100 border-yellow-300'
        return 'bg-green-100 border-green-300'
    }

    // Week day headers - full names for desktop, abbreviated for mobile
    const weekDays = useMemo(() => {
        const start = startOfWeek(new Date(), { weekStartsOn: settings.weekStartsOn })
        return eachDayOfInterval({ start, end: addDays(start, 6) }).map(date => ({
            full: format(date, 'EEE'),
            short: format(date, 'EEEEE'), // Single letter: S, M, T, W, T, F, S
        }))
    }, [settings.weekStartsOn])

    return (
        <div className={`calendar-view ${className}`}>
            {/* Header - Responsive layout */}
            <div className="calendar-header mb-4 sm:mb-6">
                {/* Top row: Navigation and Title */}
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-1 sm:gap-2">
                        <button
                            onClick={handlePrevious}
                            className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Previous"
                        >
                            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>

                        <h2 className="text-base sm:text-xl md:text-2xl font-bold text-center min-w-0">
                            {viewMode === 'month' && format(currentDate, 'MMM yyyy')}
                            {viewMode === 'week' && (
                                <>
                                    <span className="hidden sm:inline">Week of {format(startOfWeek(currentDate, { weekStartsOn: settings.weekStartsOn }), 'MMM d, yyyy')}</span>
                                    <span className="sm:hidden">{format(startOfWeek(currentDate, { weekStartsOn: settings.weekStartsOn }), 'MMM d')}</span>
                                </>
                            )}
                            {viewMode === 'day' && (
                                <>
                                    <span className="hidden sm:inline">{format(currentDate, 'EEEE, MMMM d, yyyy')}</span>
                                    <span className="sm:hidden">{format(currentDate, 'EEE, MMM d')}</span>
                                </>
                            )}
                        </h2>

                        <button
                            onClick={handleNext}
                            className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            aria-label="Next"
                        >
                            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </div>

                    <button
                        onClick={handleToday}
                        className="px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                        Today
                    </button>
                </div>

                {/* View Mode Switcher - Full width on mobile */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                        onClick={() => setViewMode('month')}
                        className={`flex-1 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${viewMode === 'month' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Month
                    </button>
                    <button
                        onClick={() => setViewMode('week')}
                        className={`flex-1 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${viewMode === 'week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Week
                    </button>
                    <button
                        onClick={() => setViewMode('day')}
                        className={`flex-1 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition-colors ${viewMode === 'day' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Day
                    </button>
                </div>
            </div>

            {/* Month View - Responsive */}
            {viewMode === 'month' && (
                <div className="calendar-grid">
                    {/* Week day headers - Single letter on mobile, abbreviated on desktop */}
                    <div className="grid grid-cols-7 gap-0.5 sm:gap-2 mb-1 sm:mb-2">
                        {weekDays.map((day, index) => (
                            <div key={index} className="text-center text-[10px] sm:text-sm font-semibold text-gray-600 py-1 sm:py-2">
                                <span className="sm:hidden">{day.short}</span>
                                <span className="hidden sm:inline">{day.full}</span>
                            </div>
                        ))}
                    </div>

                    {/* Calendar dates - Compact on mobile */}
                    <div className="grid grid-cols-7 gap-0.5 sm:gap-2">
                        {calendarDates.map((date, index) => {
                            const dateOrders = getOrdersForDate(date)
                            const capacity = getCapacityForDate(date)
                            const isCurrentMonth = isSameMonth(date, currentDate)
                            const isTodayDate = isToday(date)

                            return (
                                <div
                                    key={index}
                                    onClick={() => onDateClick?.(date)}
                                    className={`calendar-day min-h-[60px] sm:min-h-[100px] md:min-h-[120px] p-1 sm:p-2 md:p-3 border sm:border-2 rounded sm:rounded-lg cursor-pointer transition-all hover:shadow-md ${isCurrentMonth ? 'bg-white' : 'bg-gray-50 opacity-60'
                                        } ${isTodayDate ? 'border-rose-500 shadow-md' : 'border-gray-200'} ${dateOrders.length > 0 ? getCapacityColor(capacity.percentage) : ''
                                        }`}
                                >
                                    {/* Date number and order count */}
                                    <div className="flex items-center justify-between mb-0.5 sm:mb-2">
                                        <span className={`text-xs sm:text-sm font-medium ${isTodayDate ? 'text-rose-600 font-bold' : 'text-gray-700'}`}>
                                            {format(date, 'd')}
                                        </span>
                                        {dateOrders.length > 0 && (
                                            <span className="text-[10px] sm:text-xs bg-rose-600 text-white px-1 sm:px-2 py-0.5 rounded-full">
                                                {dateOrders.length}
                                            </span>
                                        )}
                                    </div>

                                    {/* Order previews - Hidden on mobile, shown on tablet+ */}
                                    <div className="hidden sm:block space-y-1">
                                        {dateOrders.slice(0, 2).map(order => (
                                            <div
                                                key={order.id}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    onOrderClick?.(order)
                                                }}
                                                className="text-[10px] md:text-xs p-0.5 md:p-1 bg-white border border-gray-200 rounded truncate hover:bg-gray-50"
                                            >
                                                {order.customerName}
                                            </div>
                                        ))}
                                        {dateOrders.length > 2 && (
                                            <div className="text-[10px] md:text-xs text-gray-500 text-center">
                                                +{dateOrders.length - 2} more
                                            </div>
                                        )}
                                    </div>

                                    {/* Mobile: Show dot indicators for orders */}
                                    {dateOrders.length > 0 && (
                                        <div className="sm:hidden flex justify-center gap-0.5 mt-1">
                                            {dateOrders.slice(0, 3).map((_, i) => (
                                                <div key={i} className="w-1 h-1 rounded-full bg-rose-500" />
                                            ))}
                                            {dateOrders.length > 3 && (
                                                <div className="w-1 h-1 rounded-full bg-gray-400" />
                                            )}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Week View - Responsive: Horizontal scroll on tablet, vertical list on mobile */}
            {viewMode === 'week' && (
                <div className="week-view">
                    {/* Desktop/Tablet: Horizontal 7-column grid */}
                    <div className="hidden md:grid grid-cols-7 gap-4">
                        {calendarDates.map((date, index) => {
                            const dateOrders = getOrdersForDate(date)
                            const capacity = getCapacityForDate(date)
                            const isTodayDate = isToday(date)

                            return (
                                <div key={index} className="week-day">
                                    <div className={`text-center mb-3 pb-2 border-b-2 ${isTodayDate ? 'border-rose-500' : 'border-gray-200'}`}>
                                        <div className="text-sm font-medium text-gray-600">{format(date, 'EEE')}</div>
                                        <div className={`text-2xl font-bold ${isTodayDate ? 'text-rose-600' : 'text-gray-900'}`}>
                                            {format(date, 'd')}
                                        </div>
                                        {dateOrders.length > 0 && (
                                            <div className="text-xs text-gray-500 mt-1">
                                                {capacity.used.toFixed(1)} / {capacity.total}h
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        {dateOrders.map(order => (
                                            <OrderBlock
                                                key={order.id}
                                                order={order}
                                                onClick={() => onOrderClick?.(order)}
                                                compact={false}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Mobile: Vertical scrollable list */}
                    <div className="md:hidden space-y-3">
                        {calendarDates.map((date, index) => {
                            const dateOrders = getOrdersForDate(date)
                            const capacity = getCapacityForDate(date)
                            const isTodayDate = isToday(date)

                            return (
                                <div 
                                    key={index} 
                                    className={`week-day-mobile border-2 rounded-xl p-3 ${isTodayDate ? 'border-rose-500 bg-rose-50/30' : 'border-gray-200 bg-white'}`}
                                >
                                    {/* Day header */}
                                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
                                        <div className="flex items-center gap-3">
                                            <div className={`text-2xl font-bold ${isTodayDate ? 'text-rose-600' : 'text-gray-900'}`}>
                                                {format(date, 'd')}
                                            </div>
                                            <div>
                                                <div className={`text-sm font-medium ${isTodayDate ? 'text-rose-600' : 'text-gray-700'}`}>
                                                    {format(date, 'EEEE')}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {format(date, 'MMMM yyyy')}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            {dateOrders.length > 0 ? (
                                                <>
                                                    <div className="text-sm font-semibold text-gray-900">
                                                        {dateOrders.length} order{dateOrders.length !== 1 ? 's' : ''}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {capacity.used.toFixed(1)} / {capacity.total}h
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-sm text-gray-400">No orders</div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Orders list */}
                                    {dateOrders.length > 0 ? (
                                        <div className="space-y-2">
                                            {dateOrders.map(order => (
                                                <OrderBlock
                                                    key={order.id}
                                                    order={order}
                                                    onClick={() => onOrderClick?.(order)}
                                                    compact={true}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-4 text-gray-400 text-sm">
                                            No orders scheduled
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Day View - Already mobile-friendly, minor adjustments */}
            {viewMode === 'day' && (
                <div className="day-view">
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-3">
                            {getOrdersForDate(currentDate).map(order => (
                                <OrderBlock
                                    key={order.id}
                                    order={order}
                                    onClick={() => onOrderClick?.(order)}
                                    compact={false}
                                    detailed
                                />
                            ))}

                            {getOrdersForDate(currentDate).length === 0 && (
                                <div className="text-center py-8 sm:py-12 text-gray-500">
                                    <CalendarIcon className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 opacity-50" />
                                    <p className="text-sm sm:text-base">No orders scheduled for this day</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
