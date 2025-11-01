'use client'

import BusinessAnalytics from '../components/BusinessAnalytics'
import AppLayout from '../components/AppLayout'

export default function AnalyticsPage() {
  return (
    <AppLayout currentPage="analytics">
      <BusinessAnalytics />
    </AppLayout>
  )
}
