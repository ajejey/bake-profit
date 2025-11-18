'use client'

import { useMemo, useCallback } from 'react'
import { useSyncedBakeryData } from './useSyncedBakeryData'
import { v4 as uuidv4 } from 'uuid'
import type { Customer, Order } from '../types'

/**
 * Custom hook for customer management
 * Provides clean API for working with customers
 */
export function useCustomers() {
  const { 
    customers, 
    addCustomer, 
    updateCustomer,
    deleteCustomer,
    getCustomerByName,
    getCustomerById,
    orders 
  } = useSyncedBakeryData()

  // Search customers by name
  const searchCustomers = useCallback((query: string) => {
    if (!query) return []
    return customers.filter(c => 
      c.name.toLowerCase().includes(query.toLowerCase())
    )
  }, [customers])

  // Get top customers by total spent
  const topCustomers = useMemo(() => {
    return [...customers]
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 10)
  }, [customers])

  // Get customer with order history
  const getCustomerWithOrders = useCallback((customerId: string) => {
    const customer = getCustomerById(customerId)
    if (!customer) return null

    const customerOrders = orders.filter(o => 
      customer.orderHistory.includes(o.id)
    )

    return {
      ...customer,
      orders: customerOrders,
    }
  }, [getCustomerById, orders])

  // Save or update customer (smart upsert)
  const saveCustomer = useCallback((
    name: string, 
    phone: string | undefined, 
    orderId: string,
    orderTotal: number
  ) => {
    const existingCustomer = getCustomerByName(name)

    if (existingCustomer) {
      // Update existing customer
      updateCustomer(existingCustomer.id, {
        phone: phone || existingCustomer.phone,
        orderHistory: [...existingCustomer.orderHistory, orderId],
        totalOrders: existingCustomer.totalOrders + 1,
        totalSpent: existingCustomer.totalSpent + orderTotal,
      })
      return existingCustomer.id
    } else {
      // Create new customer
      const newCustomer: Customer = {
        id: uuidv4(),
        name: name.trim(),
        phone,
        orderHistory: [orderId],
        totalOrders: 1,
        totalSpent: orderTotal,
        notes: '',
        createdAt: new Date().toISOString(),
      }
      addCustomer(newCustomer)
      return newCustomer.id
    }
  }, [getCustomerByName, addCustomer, updateCustomer])

  // Get repeat customers (more than 1 order)
  const repeatCustomers = useMemo(() => {
    return customers.filter(c => c.totalOrders > 1)
  }, [customers])

  // Calculate repeat customer percentage
  const repeatCustomerPercentage = useMemo(() => {
    if (customers.length === 0) return 0
    return (repeatCustomers.length / customers.length) * 100
  }, [customers.length, repeatCustomers.length])

  return {
    // Data
    customers,
    topCustomers,
    repeatCustomers,
    repeatCustomerPercentage,

    // Actions
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerByName,
    getCustomerById,
    getCustomerWithOrders,
    searchCustomers,
    saveCustomer,
  }
}
