import { useEffect, useRef } from 'react'
import { useNotifications } from '@/contexts/NotificationContext'
import { useOrders } from './useOrders'

/**
 * Hook that monitors orders and creates notifications for new ones
 * Stores order IDs in localStorage to track which ones have been notified
 */
export function useOrderNotifications() {
  const { orders } = useOrders()
  const { addNotification } = useNotifications()
  const notifiedOrdersRef = useRef<Set<string>>(new Set())
  const initializedRef = useRef(false)

  useEffect(() => {
    // Load previously notified orders from localStorage
    if (!initializedRef.current) {
      const stored = localStorage.getItem('notified-order-ids')
      if (stored) {
        try {
          const ids = JSON.parse(stored)
          notifiedOrdersRef.current = new Set(ids)
        } catch (error) {
          console.error('Error loading notified orders:', error)
        }
      }
      initializedRef.current = true
      return
    }

    // Check for new orders
    if (orders && orders.length > 0) {
      orders.forEach((order) => {
        // If this order hasn't been notified yet, create a notification
        if (!notifiedOrdersRef.current.has(order.id)) {
          addNotification({
            orderNumber: order.orderNumber,
            customerName: order.customerName,
            totalAmount: order.totalRevenue,
            deliveryDate: order.deliveryDate,
          })

          // Mark as notified
          notifiedOrdersRef.current.add(order.id)
        }
      })

      // Save notified order IDs to localStorage
      localStorage.setItem(
        'notified-order-ids',
        JSON.stringify(Array.from(notifiedOrdersRef.current))
      )
    }
  }, [orders, addNotification])
}
