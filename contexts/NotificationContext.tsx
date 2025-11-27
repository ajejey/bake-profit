'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

export interface OrderNotification {
  id: string
  orderNumber: string
  customerName: string
  totalAmount: number
  deliveryDate: string
  createdAt: Date
  isRead: boolean
}

interface NotificationContextType {
  notifications: OrderNotification[]
  unreadCount: number
  addNotification: (notification: Omit<OrderNotification, 'id' | 'createdAt' | 'isRead'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  dismissNotification: (id: string) => void
  dismissAllNotifications: () => void
  clearNotifications: () => void
  loadNotifications: () => Promise<void>
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<OrderNotification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  // Load notifications from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('order-notifications')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setNotifications(parsed)
        setUnreadCount(parsed.filter((n: OrderNotification) => !n.isRead).length)
      } catch (error) {
        console.error('Error loading notifications:', error)
      }
    }
  }, [])

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('order-notifications', JSON.stringify(notifications))
    setUnreadCount(notifications.filter((n) => !n.isRead).length)
  }, [notifications])

  const addNotification = useCallback(
    (notification: Omit<OrderNotification, 'id' | 'createdAt' | 'isRead'>) => {
      const newNotification: OrderNotification = {
        ...notification,
        id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date(),
        isRead: false,
      }
      setNotifications((prev) => [newNotification, ...prev])
    },
    []
  )

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    )
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }, [])

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const dismissAllNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  const clearNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  const loadNotifications = useCallback(async () => {
    // This can be extended to fetch from API if needed
    // For now, it just ensures notifications are loaded from localStorage
  }, [])

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        dismissNotification,
        dismissAllNotifications,
        clearNotifications,
        loadNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within NotificationProvider')
  }
  return context
}
