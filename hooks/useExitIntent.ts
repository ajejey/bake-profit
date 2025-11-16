'use client'

import { useEffect, useRef, useState } from 'react'
import { ExitIntentManager, type ExitIntentConfig } from '@/lib/exit-intent/ExitIntentManager'

export interface ExitIntentEvent {
  segment: 'new-users' | 'inactive-users';
  timeOnPage: number;
}

/**
 * Hook to manage exit intent dialog
 */
export function useExitIntent(config?: Partial<ExitIntentConfig>) {
  const [showDialog, setShowDialog] = useState(false)
  const [exitEvent, setExitEvent] = useState<ExitIntentEvent | null>(null)
  const initializedRef = useRef(false)

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    // Initialize manager
    ExitIntentManager.init(config);

    // Listen for exit intent trigger
    const handleExitIntent = (event: Event) => {
      const customEvent = event as CustomEvent<ExitIntentEvent>;
      setExitEvent(customEvent.detail);
      setShowDialog(true);
    };

    window.addEventListener('exit-intent:trigger', handleExitIntent);

    return () => {
      window.removeEventListener('exit-intent:trigger', handleExitIntent);
      ExitIntentManager.destroy();
    };
  }, [config]);

  const handleDismiss = () => {
    setShowDialog(false);
    ExitIntentManager.recordDismissal();
  };

  const handleSubmit = () => {
    setShowDialog(false);
    ExitIntentManager.recordSubmission();
  };

  return {
    showDialog,
    exitEvent,
    handleDismiss,
    handleSubmit,
  };
}
