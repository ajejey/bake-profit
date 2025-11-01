'use client'

import InvoiceManager from '../components/InvoiceManager'
import AppLayout from '../components/AppLayout'

export default function InvoiceManagerPage() {
  return (
    <AppLayout currentPage="invoice-manager">
      <InvoiceManager />
    </AppLayout>
  )
}