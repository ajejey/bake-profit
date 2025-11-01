import { useCallback, useEffect, useRef, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { StorageAdapter } from '../utils/indexedDBAdapter'

interface SyncStatus {
  status: 'idle' | 'syncing' | 'success' | 'error' | 'offline'
  lastSync: Date | null
  error: string | null
}

export function useGoogleDriveSync() {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    status: 'idle',
    lastSync: null,
    error: null,
  })
  const [isConnected, setIsConnected] = useState(false)
  const syncTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const { toast } = useToast()

  // Check if user is online
  const isOnline = typeof window !== 'undefined' && navigator.onLine

  // Verify Google Drive token is valid
  const verifyToken = useCallback(async (token: string) => {
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v1/tokeninfo', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!response.ok) {
        throw new Error('Token invalid')
      }
    } catch (error) {
      console.error('Token verification failed:', error)
      localStorage.removeItem('google_drive_token')
      setIsConnected(false)
    }
  }, [])

  // Initialize Google Drive sync
  const initializeSync = useCallback(async () => {
    try {
      const token = localStorage.getItem('google_drive_token')
      if (token) {
        setIsConnected(true)
        await verifyToken(token)
      }
    } catch (error) {
      console.error('Error initializing sync:', error)
      setIsConnected(false)
    }
  }, [verifyToken])

  // Connect to Google Drive (will be enhanced after downloadFromGoogleDrive is defined)
  const connectGoogleDrive = useCallback(
    async (accessToken: string) => {
      try {
        localStorage.setItem('google_drive_token', accessToken)
        setIsConnected(true)

        toast({
          title: '✅ Google Drive Connected!',
          description: 'Your data will sync automatically.',
        })
      } catch (error) {
        console.error('Error connecting Google Drive:', error)
        toast({
          title: '❌ Connection Failed',
          description: 'Could not connect to Google Drive.',
          variant: 'destructive',
        })
      }
    },
    [toast]
  )

  // Sync data to Google Drive
  const syncToGoogleDrive = useCallback(async (token?: string) => {
    if (!isOnline) {
      setSyncStatus((prev) => ({ ...prev, status: 'offline' }))
      return
    }

    const accessToken = token || localStorage.getItem('google_drive_token')
    if (!accessToken) {
      console.warn('No Google Drive token available')
      return
    }

    try {
      setSyncStatus((prev) => ({ ...prev, status: 'syncing' }))

      // Get all data from localStorage (IndexedDB data)
    //   const recipes = localStorage.getItem('bakery-recipes') || '[]'
    //   const orders = localStorage.getItem('bakery-orders') || '[]'
    //   const customers = localStorage.getItem('bakery-customers') || '[]'
    //   const ingredients = localStorage.getItem('bakery-ingredients') || '[]'
    //   const inventory = localStorage.getItem('bakery-inventory') || '[]'
    //   const categories = localStorage.getItem('bakery-recipe-categories') || '[]'
      const recipes = await StorageAdapter.getItem('bakery-recipes') || '[]'
      const orders = await StorageAdapter.getItem('bakery-orders') || '[]'
      const customers = await StorageAdapter.getItem('bakery-customers') || '[]'
      const ingredients = await StorageAdapter.getItem('bakery-ingredients') || '[]'
      const inventory = await StorageAdapter.getItem('bakery-inventory') || '[]'
      const categories = await StorageAdapter.getItem('bakery-recipe-categories') || '[]'

      // Create backup data
      const backupData = {
        recipes: JSON.parse(recipes),
        orders: JSON.parse(orders),
        customers: JSON.parse(customers),
        ingredients: JSON.parse(ingredients),
        inventory: JSON.parse(inventory),
        categories: JSON.parse(categories),
        syncedAt: new Date().toISOString(),
        version: '1.0',
      }

      // Upload to Google Drive
      await uploadToGoogleDrive(accessToken, backupData)

      setSyncStatus({
        status: 'success',
        lastSync: new Date(),
        error: null,
      })

      toast({
        title: '✓ Synced to Google Drive',
      })
    } catch (error) {
      console.error('Sync error:', error)
      setSyncStatus((prev) => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      }))

      toast({
        title: '⚠️ Sync Failed',
        description: 'Will retry automatically',
        variant: 'destructive',
      })
    }
  }, [isOnline, toast])

  // Debounced sync (called on data changes)
  const debouncedSync = useCallback(() => {
    if (!isConnected || !isOnline) return

    // Clear existing timeout
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current)
    }

    // Set new timeout (5 seconds)
    syncTimeoutRef.current = setTimeout(() => {
      syncToGoogleDrive()
    }, 5000)
  }, [isConnected, isOnline])

  // Create or find BakeProfit folder
  const createOrFindBakeProfitFolder = useCallback(async (token: string): Promise<string> => {
    try {
      // Search for existing folder
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files?q=name='BakeProfit' and mimeType='application/vnd.google-apps.folder' and trashed=false&spaces=drive&pageSize=1`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      const data = await response.json()

      if (data.files && data.files.length > 0) {
        return data.files[0].id
      }

      // Create new folder
      const createResponse = await fetch('https://www.googleapis.com/drive/v3/files', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'BakeProfit',
          mimeType: 'application/vnd.google-apps.folder',
        }),
      })

      const createData = await createResponse.json()
      return createData.id
    } catch (error) {
      console.error('Error creating/finding folder:', error)
      throw error
    }
  }, [])

  // Find file by name in folder
  const findFileByName = useCallback(
    async (token: string, folderId: string, fileName: string): Promise<string | null> => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/drive/v3/files?q=name='${fileName}' and '${folderId}' in parents and trashed=false&spaces=drive&pageSize=1`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        const data = await response.json()
        if (data.files && data.files.length > 0) {
          return data.files[0].id
        }
        return null
      } catch (error) {
        console.error('Error finding file:', error)
        return null
      }
    },
    []
  )

  // Upload or update file to Google Drive
  const uploadFile = useCallback(
    async (token: string, folderId: string, fileName: string, content: string): Promise<string> => {
      try {
        // Check if file already exists
        const existingFileId = await findFileByName(token, folderId, fileName)

        if (existingFileId) {
          // Update existing file
          const form = new FormData()
          form.append('file', new Blob([content], { type: 'application/json' }))

          const response = await fetch(
            `https://www.googleapis.com/upload/drive/v3/files/${existingFileId}?uploadType=media`,
            {
              method: 'PATCH',
              headers: { Authorization: `Bearer ${token}` },
              body: form,
            }
          )

          const data = await response.json()
          if (!response.ok) {
            throw new Error(data.error?.message || 'Update failed')
          }
          return data.id
        } else {
          // Create new file
          const metadata = {
            name: fileName,
            parents: [folderId],
          }

          const form = new FormData()
          form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }))
          form.append('file', new Blob([content], { type: 'application/json' }))

          const response = await fetch(
            'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
            {
              method: 'POST',
              headers: { Authorization: `Bearer ${token}` },
              body: form,
            }
          )

          const data = await response.json()
          if (!response.ok) {
            throw new Error(data.error?.message || 'Upload failed')
          }
          return data.id
        }
      } catch (error) {
        console.error('Error uploading file:', error)
        throw error
      }
    },
    [findFileByName]
  )

  // Upload to Google Drive
  const uploadToGoogleDrive = useCallback(async (token: string, backupData: unknown) => {
    // Check if BakeProfit folder exists
    let folderId = localStorage.getItem('google_drive_folder_id')

    if (!folderId) {
      folderId = await createOrFindBakeProfitFolder(token)
      localStorage.setItem('google_drive_folder_id', folderId)
    }

    // Upload data file
    const fileId = await uploadFile(token, folderId, 'data.json', JSON.stringify(backupData))
    localStorage.setItem('google_drive_file_id', fileId)

    // Upload metadata file
    const metadata = {
      lastSync: new Date().toISOString(),
      version: '1.0',
      dataFileId: fileId,
    }
    await uploadFile(token, folderId, 'metadata.json', JSON.stringify(metadata))
  }, [createOrFindBakeProfitFolder, uploadFile])


  // Download from Google Drive and merge with local data
  const downloadFromGoogleDrive = useCallback(async (token?: string) => {
    const accessToken = token || localStorage.getItem('google_drive_token')
    if (!accessToken) return null

    try {
      const folderId = localStorage.getItem('google_drive_folder_id')
      if (!folderId) return null

      // Find data.json file
      const fileIdResponse = await fetch(
        `https://www.googleapis.com/drive/v3/files?q=name='data.json' and '${folderId}' in parents and trashed=false&spaces=drive&pageSize=1`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )

      const fileData = await fileIdResponse.json()
      if (!fileData.files || fileData.files.length === 0) {
        console.log('No data.json found in Google Drive')
        return null
      }

      const fileId = fileData.files[0].id
      localStorage.setItem('google_drive_file_id', fileId)

      // Download the file
      const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })

      if (!response.ok) {
        throw new Error('Download failed')
      }

      const driveData = await response.json()

      // Get local data
      const localRecipes = JSON.parse(await StorageAdapter.getItem('bakery-recipes') || '[]')
      const localOrders = JSON.parse(await StorageAdapter.getItem('bakery-orders') || '[]')
      const localCustomers = JSON.parse(await StorageAdapter.getItem('bakery-customers') || '[]')
      const localIngredients = JSON.parse(await StorageAdapter.getItem('bakery-ingredients') || '[]')
      const localInventory = JSON.parse(await StorageAdapter.getItem('bakery-inventory') || '[]')
      const localCategories = JSON.parse(await StorageAdapter.getItem('bakery-recipe-categories') || '[]')

      // Merge: Drive data is newer, so use it as base
      const mergedData = {
        recipes: driveData.recipes || localRecipes,
        orders: driveData.orders || localOrders,
        customers: driveData.customers || localCustomers,
        ingredients: driveData.ingredients || localIngredients,
        inventory: driveData.inventory || localInventory,
        categories: driveData.categories || localCategories,
      }

      // Save merged data to local storage
      await StorageAdapter.setItem('bakery-recipes', JSON.stringify(mergedData.recipes))
      await StorageAdapter.setItem('bakery-orders', JSON.stringify(mergedData.orders))
      await StorageAdapter.setItem('bakery-customers', JSON.stringify(mergedData.customers))
      await StorageAdapter.setItem('bakery-ingredients', JSON.stringify(mergedData.ingredients))
      await StorageAdapter.setItem('bakery-inventory', JSON.stringify(mergedData.inventory))
      await StorageAdapter.setItem('bakery-recipe-categories', JSON.stringify(mergedData.categories))

      console.log('✅ Downloaded and merged data from Google Drive')
      
      // Dispatch event to trigger UI refresh
      window.dispatchEvent(new CustomEvent('google-drive-data-loaded', { detail: mergedData }))
      
      return mergedData
    } catch (error) {
      console.error('Error downloading from Google Drive:', error)
      return null
    }
  }, [])

  // Disconnect Google Drive
  const disconnectGoogleDrive = useCallback(() => {
    localStorage.removeItem('google_drive_token')
    localStorage.removeItem('google_drive_folder_id')
    localStorage.removeItem('google_drive_file_id')
    setIsConnected(false)
    setSyncStatus({ status: 'idle', lastSync: null, error: null })
  }, [])

  // Initialize on mount
  useEffect(() => {
    initializeSync()
  }, [initializeSync])

  // Listen for online/offline events
  useEffect(() => {
    const handleOnline = () => {
      if (isConnected) {
        syncToGoogleDrive()
      }
    }

    window.addEventListener('online', handleOnline)
    return () => window.removeEventListener('online', handleOnline)
  }, [isConnected, syncToGoogleDrive])

  // Download data from Google Drive when first connected
  useEffect(() => {
    if (isConnected && syncStatus.status === 'idle') {
      downloadFromGoogleDrive()
    }
  }, [isConnected, downloadFromGoogleDrive, syncStatus.status])

  // Listen for data changes and trigger debounced sync
  useEffect(() => {
    const handleDataChanged = () => {
      debouncedSync()
    }

    window.addEventListener('bakery-data-changed', handleDataChanged)
    return () => window.removeEventListener('bakery-data-changed', handleDataChanged)
  }, [debouncedSync])

  return {
    syncStatus,
    isConnected,
    connectGoogleDrive,
    syncToGoogleDrive,
    debouncedSync,
    downloadFromGoogleDrive,
    disconnectGoogleDrive,
  }
}
