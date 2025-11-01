'use client'

import PricingCalculator from '../components/PricingCalculator'
import AppLayout from '../components/AppLayout'

export default function PricingPage() {
  return (
    <AppLayout currentPage="pricing">
      <PricingCalculator />
    </AppLayout>
  )
}
