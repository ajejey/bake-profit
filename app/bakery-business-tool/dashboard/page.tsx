'use client'

import Dashboard from '../components/Dashboard'
import AppLayout from '../components/AppLayout'

export default function DashboardPage() {
  return (
    <AppLayout currentPage="dashboard">
      <Dashboard onNavigate={() => {}} />
    </AppLayout>
  )
}
