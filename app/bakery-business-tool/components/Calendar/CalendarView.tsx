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

    // Week day headers
    const weekDays = useMemo(() => {
        const start = startOfWeek(new Date(), { weekStartsOn: settings.weekStartsOn })
        return eachDayOfInterval({ start, end: addDays(start, 6) }).map(date => format(date, 'EEE'))
    }, [settings.weekStartsOn])

    return (
        <div className={`calendar-view ${className}`}>
            {/* Header */}
            <div className="calendar-header flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handlePrevious}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Previous"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <h2 className="text-2xl font-bold">
                        {viewMode === 'month' && format(currentDate, 'MMMM yyyy')}
                        {viewMode === 'week' && `Week of ${format(startOfWeek(currentDate, { weekStartsOn: settings.weekStartsOn }), 'MMM d, yyyy')}`}
                        {viewMode === 'day' && format(currentDate, 'EEEE, MMMM d, yyyy')}
                    </h2>

                    <button
                        onClick={handleNext}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Next"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    <button
                        onClick={handleToday}
                        className="px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                        Today
                    </button>
                </div>

                {/* View Mode Switcher */}
                <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
                    <button
                        onClick={() => setViewMode('month')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${viewMode === 'month' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Month
                    </button>
                    <button
                        onClick={() => setViewMode('week')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${viewMode === 'week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Week
                    </button>
                    <button
                        onClick={() => setViewMode('day')}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${viewMode === 'day' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Day
                    </button>
                </div>
            </div>

            {/* Month View */}
            {viewMode === 'month' && (
                <div className="calendar-grid">
                    {/* Week day headers */}
                    <div className="grid grid-cols-7 gap-2 mb-2">
                        {weekDays.map((day, index) => (
                            <div key={index} className="text-center text-sm font-semibold text-gray-600 py-2">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar dates */}
                    <div className="grid grid-cols-7 gap-2">
                        {calendarDates.map((date, index) => {
                            const dateOrders = getOrdersForDate(date)
                            const capacity = getCapacityForDate(date)
                            const isCurrentMonth = isSameMonth(date, currentDate)
                            const isTodayDate = isToday(date)

                            return (
                                <div
                                    key={index}
                                    onClick={() => onDateClick?.(date)}
                                    className={`calendar-day min-h-[120px] p-3 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${isCurrentMonth ? 'bg-white' : 'bg-gray-50 opacity-60'
                                        } ${isTodayDate ? 'border-rose-500 shadow-md' : 'border-gray-200'} ${dateOrders.length > 0 ? getCapacityColor(capacity.percentage) : ''
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className={`text-sm font-medium ${isTodayDate ? 'text-rose-600 font-bold' : 'text-gray-700'}`}>
                                            {format(date, 'd')}
                                        </span>
                                        {dateOrders.length > 0 && (
                                            <span className="text-xs bg-rose-600 text-white px-2 py-0.5 rounded-full">
                                                {dateOrders.length}
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-1">
                                        {dateOrders.slice(0, 3).map(order => (
                                            <div
                                                key={order.id}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    onOrderClick?.(order)
                                                }}
                                                className="text-xs p-1 bg-white border border-gray-200 rounded truncate hover:bg-gray-50"
                                            >
                                                {order.customerName}
                                            </div>
                                        ))}
                                        {dateOrders.length > 3 && (
                                            <div className="text-xs text-gray-500 text-center">
                                                +{dateOrders.length - 3} more
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Week View */}
            {viewMode === 'week' && (
                <div className="week-view">
                    <div className="grid grid-cols-7 gap-4">
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
                </div>
            )}

            {/* Day View */}
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
                                <div className="text-center py-12 text-gray-500">
                                    <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                    <p>No orders scheduled for this day</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
