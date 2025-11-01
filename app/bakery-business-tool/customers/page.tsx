'use client'

import CustomerManagement from '../components/CustomerManagement'
import AppLayout from '../components/AppLayout'

export default function CustomersPage() {
  return (
    <AppLayout currentPage="customers">
      <CustomerManagement onNavigate={() => {}} />
    </AppLayout>
  )
}
