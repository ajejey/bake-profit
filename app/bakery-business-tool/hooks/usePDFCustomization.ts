import { useState, useEffect } from 'react'
import type { PDFCustomization } from '../types'

const STORAGE_KEY = 'bakeprofit-pdf-customization'

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
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          setCustomization(JSON.parse(stored))
        }
      } catch (error) {
        console.error('Error loading PDF customization:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCustomization()
  }, [])

  // Save customization
  const saveCustomization = (updates: Partial<PDFCustomization>) => {
    try {
      const newCustomization = {
        ...customization,
        ...updates,
        updatedAt: new Date().toISOString()
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newCustomization))
      setCustomization(newCustomization)
    } catch (error) {
      console.error('Error saving PDF customization:', error)
      throw error
    }
  }

  // Reset to defaults
  const resetCustomization = () => {
    const newCustomization = {
      ...DEFAULT_CUSTOMIZATION,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newCustomization))
    setCustomization(newCustomization)
  }

  return {
    customization,
    isLoading,
    saveCustomization,
    resetCustomization
  }
}
