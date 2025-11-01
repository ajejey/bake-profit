'use client'

import OrderTracker from '../components/OrderTracker'
import AppLayout from '../components/AppLayout'

export default function OrdersPage() {
  return (
    <AppLayout currentPage="orders">
      <OrderTracker />
    </AppLayout>
  )
}
