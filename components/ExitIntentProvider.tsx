'use client'

import { usePathname } from 'next/navigation'
import { useExitIntent } from '@/hooks/useExitIntent'
import { ExitIntentDialog } from './ExitIntentDialog'

/**
 * Exit Intent Provider
 * Wraps the app and provides exit-intent functionality
 * Place this high in the component tree
 * Disabled on public menu pages (/m/*)
 */
export function ExitIntentProvider() {
  const pathname = usePathname()
  
  // Disable exit intent on public menu pages
  const isPublicMenuPage = pathname.startsWith('/m/')
  
  const { showDialog, exitEvent, handleDismiss, handleSubmit } = useExitIntent({
    enabled: !isPublicMenuPage,
    maxShowsPerSession: 2,
    dismissalCooldown: 24 * 60 * 60 * 1000, // 24 hours
    minTimeOnPage: 10000, // 10 seconds
    targetSegments: ['new-users', 'inactive-users'],
  })

  // Don't render dialog on public menu pages
  if (isPublicMenuPage) {
    return null
  }

  return (
    <ExitIntentDialog
      isOpen={showDialog}
      segment={exitEvent?.segment}
      onDismiss={handleDismiss}
      onSubmit={handleSubmit}
    />
  )
}
