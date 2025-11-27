'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Bell, ArrowRight, ShoppingCart, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNotifications } from '@/contexts/NotificationContext'

export default function NewOrdersCard() {
  const { notifications, unreadCount, markAsRead, dismissAllNotifications } = useNotifications()
  const [latestOrder, setLatestOrder] = useState(notifications[0] || null)

  useEffect(() => {
    if (notifications.length > 0) {
      setLatestOrder(notifications[0])
    }
  }, [notifications])

  if (unreadCount === 0) {
    return null
  }

  return (
    <div className="mb-6 bg-gradient-to-r from-rose-50 to-orange-50 border-2 border-rose-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow relative">
      {/* Dismiss button */}
      <button
        onClick={dismissAllNotifications}
        className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-600 hover:bg-rose-100 rounded-md transition-colors"
        title="Dismiss all notifications"
      >
        <X className="h-5 w-5" />
      </button>

      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4 flex-1">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-rose-500 to-orange-500 text-white animate-pulse">
              <Bell className="h-6 w-6" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900">
              🧁 {unreadCount} New {unreadCount === 1 ? 'Order' : 'Orders'}!
            </h3>

            {latestOrder && (
              <div className="mt-3 space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-gray-900">{latestOrder.customerName}</span>
                  {' '}just placed an order
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <ShoppingCart className="h-4 w-4 text-rose-600" />
                    <span className="font-semibold text-gray-900">
                      ${latestOrder.totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-gray-500">
                    📅 {new Date(latestOrder.deliveryDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Link href="/bakery-business-tool/orders" className="flex-shrink-0 ml-4">
          <Button
            size="sm"
            className="bg-gradient-to-r from-rose-500 to-orange-500 text-white hover:from-rose-600 hover:to-orange-600 border-0"
            onClick={() => {
              if (latestOrder && !latestOrder.isRead) {
                markAsRead(latestOrder.id)
              }
            }}
          >
            View Orders
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
