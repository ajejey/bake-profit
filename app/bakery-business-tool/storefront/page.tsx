'use client'

import AppLayout from '../components/AppLayout'
import MenuBuilder from '../components/storefront/MenuBuilder'

export default function StorefrontPage() {
  return (
    <AppLayout currentPage="storefront">
      <MenuBuilder />
    </AppLayout>
  )
}
