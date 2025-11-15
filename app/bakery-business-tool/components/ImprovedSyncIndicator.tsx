'use client'

import { Cloud, CloudOff, RefreshCw, Check, AlertCircle } from 'lucide-react'
import { useOptimizedSync } from '../hooks/useOptimizedSync'
import { Button } from '@/components/ui/button'

export function ImprovedSyncIndicator() {
  const { syncStatus, performSync } = useOptimizedSync()

  const getStatusInfo = () => {
    if (syncStatus.isSyncing) {
      return {
        icon: <RefreshCw className="h-4 w-4 animate-spin" />,
        color: 'text-blue-500',
        label: 'Syncing...',
        description: `Syncing ${syncStatus.pendingCount} changes`,
      }
    }

    if (syncStatus.pendingCount > 0) {
      return {
        icon: <AlertCircle className="h-4 w-4" />,
        color: 'text-yellow-500',
        label: 'Pending',
        description: `${syncStatus.pendingCount} changes pending sync`,
      }
    }

    if (syncStatus.lastSyncAgo < 0) {
      return {
        icon: <CloudOff className="h-4 w-4" />,
        color: 'text-gray-400',
        label: 'Not synced',
        description: 'Never synced',
      }
    }

    const minutesAgo = Math.floor(syncStatus.lastSyncAgo / 60000)
    
    return {
      icon: <Check className="h-4 w-4" />,
      color: 'text-green-500',
      label: 'Synced',
      description: minutesAgo === 0 
        ? 'Just now' 
        : minutesAgo === 1 
        ? '1 minute ago' 
        : `${minutesAgo} minutes ago`,
    }
  }

  const status = getStatusInfo()

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-2"
      onClick={() => performSync()}
      disabled={syncStatus.isSyncing}
      title={`${status.label} - ${status.description}. Click to sync now.`}
    >
      <Cloud className={`h-4 w-4 ${status.color}`} />
      <span className="hidden sm:inline text-sm">{status.label}</span>
      {syncStatus.pendingCount > 0 && (
        <span className="ml-1 px-1.5 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full">
          {syncStatus.pendingCount}
        </span>
      )}
    </Button>
  )
}
