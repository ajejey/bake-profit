'use client'

import { useGoogleDriveSync } from '../hooks/useGoogleDriveSync'
import { useGoogleLogin } from '@react-oauth/google'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function GoogleDriveSettings() {
  const { isConnected, syncStatus, disconnectGoogleDrive, syncToGoogleDrive } = useGoogleDriveSync()
  const [isSyncing, setIsSyncing] = useState(false)

  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        // Exchange code for access token on backend
        const response = await fetch('/api/auth/google-drive', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: codeResponse.code }),
        })

        const data = await response.json()
        if (data.accessToken) {
          // Store token and trigger sync
          localStorage.setItem('google_drive_token', data.accessToken)
          await syncToGoogleDrive(data.accessToken)
        }
      } catch (error) {
        console.error('Error exchanging code:', error)
      }
    },
    flow: 'auth-code',
    scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.email',
  })

  const handleManualSync = async () => {
    setIsSyncing(true)
    await syncToGoogleDrive()
    setIsSyncing(false)
  }

  return (
    <div className="space-y-4">
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-4">Google Drive Backup</h3>

        {isConnected ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Status:</span>
              <span className="text-green-600 font-medium">✅ Connected</span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span>Last sync:</span>
              <span>
                {syncStatus.lastSync ? syncStatus.lastSync.toLocaleTimeString() : 'Never'}
              </span>
            </div>

            <div className="flex gap-2 pt-2">
              <Button size="sm" onClick={handleManualSync} disabled={isSyncing}>
                {isSyncing ? 'Syncing...' : 'Sync Now'}
              </Button>
              <Button size="sm" variant="outline" onClick={disconnectGoogleDrive}>
                Disconnect
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Automatically backup your recipes, orders, and customers to Google Drive.
            </p>
            <Button size="sm" onClick={() => googleLogin()}>
              Connect Google Drive
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
