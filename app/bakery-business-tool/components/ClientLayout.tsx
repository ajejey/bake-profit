'use client'

import { BakeryDataProvider } from '../contexts/BakeryDataContext'

/**
 * Client-side layout wrapper that provides BakeryDataContext to all child components
 * This allows the parent layout.tsx to remain a Server Component
 */
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <BakeryDataProvider>
      {children}
    </BakeryDataProvider>
  )
}
