'use client'

import { useGoogleDriveSync } from '../hooks/useGoogleDriveSync'

export function SyncIndicator() {
  const { syncStatus, isConnected } = useGoogleDriveSync()

  if (!isConnected) return null

  const getStatusDisplay = () => {
    switch (syncStatus.status) {
      case 'syncing':
        return (
          <div className="flex items-center gap-2 text-blue-600">
            <div className="animate-spin">⟳</div>
            <span className="text-sm">Syncing...</span>
          </div>
        )
      case 'success':
        return (
          <div className="flex items-center gap-2 text-green-600">
            <span>✓</span>
            <span className="text-sm">Synced</span>
          </div>
        )
      case 'error':
        return (
          <div className="flex items-center gap-2 text-red-600">
            <span>⚠️</span>
            <span className="text-sm">Sync Failed</span>
          </div>
        )
      case 'offline':
        return (
          <div className="flex items-center gap-2 text-yellow-600">
            <span>📡</span>
            <span className="text-sm">Offline</span>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="fixed top-4 right-4 px-3 py-2 bg-white rounded-lg shadow-md border border-gray-200 text-xs">
      {getStatusDisplay()}
    </div>
  )
}
