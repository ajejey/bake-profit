import { useState, useEffect } from 'react'
import type { PDFCustomization } from '../types'
import { getPDFCustomization, setPDFCustomizationSynced } from './useSyncedSettings'

const DEFAULT_CUSTOMIZATION: PDFCustomization = {
  businessName: 'BakeProfit Business',
  showLogo: false,
  showBusinessInfo: true,
  invoicePrefix: 'INV-',
  defaultPaymentTerms: 'net-7',
  defaultTaxRate: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}

export function usePDFCustomization() {
  const [customization, setCustomization] = useState<PDFCustomization>(DEFAULT_CUSTOMIZATION)
  const [isLoading, setIsLoading] = useState(true)

  // Load customization
  useEffect(() => {
    const loadCustomization = async () => {
      try {
        const stored = await getPDFCustomization()
        if (stored) {
          setCustomization(stored)
        }
      } catch (error) {
        console.error('Error loading PDF customization:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCustomization()

    // Listen for sync updates
    const handleDataChanged = () => {
      loadCustomization()
    }

    window.addEventListener('data:changed', handleDataChanged)
    return () => window.removeEventListener('data:changed', handleDataChanged)
  }, [])

  // Save customization
  const saveCustomization = async (updates: Partial<PDFCustomization>) => {
    try {
      const newCustomization = {
        ...customization,
        ...updates,
        updatedAt: new Date().toISOString()
      }

      // Update local state immediately for UI responsiveness
      setCustomization(newCustomization)

      // Save to IndexedDB and queue for Sync
      await setPDFCustomizationSynced(newCustomization)
    } catch (error) {
      console.error('Error saving PDF customization:', error)
      throw error
    }
  }

  // Reset to defaults
  const resetCustomization = async () => {
    const newCustomization = {
      ...DEFAULT_CUSTOMIZATION,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    setCustomization(newCustomization)
    await setPDFCustomizationSynced(newCustomization)
  }

  return {
    customization,
    isLoading,
    saveCustomization,
    resetCustomization
  }
}
