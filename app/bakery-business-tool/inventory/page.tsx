'use client'

import InventoryManager from '../components/InventoryManager'
import AppLayout from '../components/AppLayout'

export default function InventoryPage() {
  return (
    <AppLayout currentPage="inventory">
      <InventoryManager />
    </AppLayout>
  )
}
