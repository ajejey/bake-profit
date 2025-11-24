'use client'

import { Clock, User, Package, MapPin } from 'lucide-react'
import type { Order } from '../../types'
import { ORDER_STATUSES } from '../../types'

interface OrderBlockProps {
    order: Order
    onClick?: () => void
    compact?: boolean
    detailed?: boolean
    className?: string
}

export default function OrderBlock({
    order,
    onClick,
    compact = true,
    detailed = false,
    className = '',
}: OrderBlockProps) {
    // Get status color
    const statusConfig = ORDER_STATUSES.find(s => s.value === order.status) || ORDER_STATUSES[0]

    const statusColors = {
        blue: 'bg-blue-100 border-blue-300 text-blue-800',
        yellow: 'bg-yellow-100 border-yellow-300 text-yellow-800',
        green: 'bg-green-100 border-green-300 text-green-800',
        gray: 'bg-gray-100 border-gray-300 text-gray-800',
        red: 'bg-red-100 border-red-300 text-red-800',
    }

    const statusColor = statusColors[statusConfig.color as keyof typeof statusColors]

    if (compact) {
        return (
            <div
                onClick={onClick}
                className={`order-block-compact p-2 border-l-4 ${statusColor} rounded cursor-pointer hover:shadow-md transition-shadow ${className}`}
            >
                <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{order.customerName}</p>
                        {order.deliveryTime && (
                            <p className="text-xs text-gray-600 flex items-center gap-1 mt-0.5">
                                <Clock className="w-3 h-3" />
                                {order.deliveryTime}
                            </p>
                        )}
                    </div>
                    <div className="ml-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor}`}>
                            {statusConfig.label}
                        </span>
                    </div>
                </div>
            </div>
        )
    }

    if (detailed) {
        return (
            <div
                onClick={onClick}
                className={`order-block-detailed p-6 border-2 ${statusColor} rounded-xl cursor-pointer hover:shadow-lg transition-all ${className}`}
            >
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{order.customerName}</h3>
                        <p className="text-sm text-gray-600">Order #{order.orderNumber}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
                        {statusConfig.label}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="space-y-3">
                        {order.deliveryTime && (
                            <div className="flex items-center gap-2 text-gray-700">
                                <Clock className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-500">Delivery Time</p>
                                    <p className="font-medium">{order.deliveryTime}</p>
                                </div>
                            </div>
                        )}

                        {order.deliveryAddress && (
                            <div className="flex items-center gap-2 text-gray-700">
                                <MapPin className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-500">Delivery Address</p>
                                    <p className="font-medium">{order.deliveryAddress}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-3">
                        {order.customerPhone && (
                            <div className="flex items-center gap-2 text-gray-700">
                                <User className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-500">Contact</p>
                                    <p className="font-medium">{order.customerPhone}</p>
                                </div>
                            </div>
                        )}

                        {order.productionDuration && (
                            <div className="flex items-center gap-2 text-gray-700">
                                <Package className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-500">Production Time</p>
                                    <p className="font-medium">{order.productionDuration.toFixed(1)} hours</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="border-t pt-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Order Items ({order.items.length})</h4>
                    <div className="space-y-1">
                        {order.items.map(item => (
                            <div key={item.id} className="flex justify-between text-sm">
                                <span className="text-gray-700">
                                    {item.quantity}x {item.recipeName}
                                </span>
                                <span className="font-medium text-gray-900">
                                    ${item.subtotalRevenue.toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-3 pt-3 border-t font-bold text-gray-900">
                        <span>Total</span>
                        <span className="text-rose-600">${order.totalRevenue.toFixed(2)}</span>
                    </div>
                </div>

                {order.notes && (
                    <div className="mt-4 pt-4 border-t">
                        <p className="text-xs text-gray-500 mb-1">Notes</p>
                        <p className="text-sm text-gray-700">{order.notes}</p>
                    </div>
                )}
            </div>
        )
    }

    // Default view
    return (
        <div
            onClick={onClick}
            className={`order-block p-4 border-2 ${statusColor} rounded-lg cursor-pointer hover:shadow-md transition-shadow ${className}`}
        >
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{order.customerName}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${statusColor}`}>
                    {statusConfig.label}
                </span>
            </div>

            <div className="space-y-1 text-sm text-gray-600">
                {order.deliveryTime && (
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{order.deliveryTime}</span>
                    </div>
                )}

                <div className="flex items-center gap-1">
                    <Package className="w-4 h-4" />
                    <span>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
                </div>

                {order.productionDuration && (
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{order.productionDuration.toFixed(1)}h production</span>
                    </div>
                )}
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total</span>
                    <span className="font-bold text-rose-600">${order.totalRevenue.toFixed(2)}</span>
                </div>
            </div>
        </div>
    )
}
