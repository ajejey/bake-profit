'use client'

import { useExitIntent } from '@/hooks/useExitIntent'
import { ExitIntentDialog } from './ExitIntentDialog'

/**
 * Exit Intent Provider
 * Wraps the app and provides exit-intent functionality
 * Place this high in the component tree
 */
export function ExitIntentProvider() {
  const { showDialog, exitEvent, handleDismiss, handleSubmit } = useExitIntent({
    enabled: true,
    maxShowsPerSession: 2,
    dismissalCooldown: 24 * 60 * 60 * 1000, // 24 hours
    minTimeOnPage: 10000, // 10 seconds
    targetSegments: ['new-users', 'inactive-users'],
  })

  return (
    <ExitIntentDialog
      isOpen={showDialog}
      segment={exitEvent?.segment}
      onDismiss={handleDismiss}
      onSubmit={handleSubmit}
    />
  )
}
