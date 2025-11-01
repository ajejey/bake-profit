import { useState, useEffect } from 'react'
import type { Invoice } from '../types'
import { StorageAdapter } from '../utils/indexedDBAdapter'

const STORAGE_KEY = 'bakeprofit-invoices'

export function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load invoices from IndexedDB
  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const stored = await StorageAdapter.getItem(STORAGE_KEY)
        if (stored) {
          setInvoices(JSON.parse(stored))
        }
      } catch (error) {
        console.error('Error loading invoices:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadInvoices()
  }, [])

  // Save invoices to IndexedDB
  const saveInvoices = async (newInvoices: Invoice[]) => {
    try {
      await StorageAdapter.setItem(STORAGE_KEY, JSON.stringify(newInvoices))
      setInvoices(newInvoices)
    } catch (error) {
      console.error('Error saving invoices:', error)
    }
  }

  // Generate next invoice number
  const getNextInvoiceNumber = (prefix: string = 'INV-'): string => {
    const year = new Date().getFullYear()
    const existingNumbers = invoices
      .filter(inv => inv.invoiceNumber.startsWith(`${prefix}${year}-`))
      .map(inv => {
        const match = inv.invoiceNumber.match(/(\d+)$/)
        return match ? parseInt(match[1]) : 0
      })
    
    const nextNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1
    return `${prefix}${year}-${String(nextNumber).padStart(3, '0')}`
  }

  // Add invoice
  const addInvoice = async (invoice: Invoice) => {
    const newInvoices = [...invoices, invoice]
    await saveInvoices(newInvoices)
  }

  // Update invoice
  const updateInvoice = async (id: string, updates: Partial<Invoice>) => {
    const newInvoices = invoices.map(inv =>
      inv.id === id
        ? { ...inv, ...updates, updatedAt: new Date().toISOString() }
        : inv
    )
    await saveInvoices(newInvoices)
  }

  // Delete invoice
  const deleteInvoice = async (id: string) => {
    const newInvoices = invoices.filter(inv => inv.id !== id)
    await saveInvoices(newInvoices)
  }

  // Mark as paid
  const markAsPaid = async (id: string, paymentMethod: string, paymentDate?: string) => {
    const invoice = invoices.find(inv => inv.id === id)
    if (!invoice) return

    await updateInvoice(id, {
      paymentStatus: 'paid',
      amountPaid: invoice.total,
      amountDue: 0,
      paymentMethod,
      paymentDate: paymentDate || new Date().toISOString()
    })
  }

  // Mark as partially paid
  const markAsPartiallyPaid = async (id: string, amount: number, paymentMethod: string) => {
    const invoice = invoices.find(inv => inv.id === id)
    if (!invoice) return

    const newAmountPaid = invoice.amountPaid + amount
    const newAmountDue = invoice.total - newAmountPaid

    await updateInvoice(id, {
      paymentStatus: newAmountDue <= 0 ? 'paid' : 'partial',
      amountPaid: newAmountPaid,
      amountDue: newAmountDue,
      paymentMethod,
      paymentDate: new Date().toISOString()
    })
  }

  // Get overdue invoices
  const getOverdueInvoices = (): Invoice[] => {
    const now = new Date()
    return invoices.filter(inv => {
      if (inv.paymentStatus === 'paid') return false
      const dueDate = new Date(inv.dueDate)
      return dueDate < now
    })
  }

  // Get unpaid invoices
  const getUnpaidInvoices = (): Invoice[] => {
    return invoices.filter(inv => inv.paymentStatus === 'unpaid' || inv.paymentStatus === 'partial')
  }

  // Update overdue status
  useEffect(() => {
    const updateOverdueStatus = async () => {
      const now = new Date()
      let updated = false

      const newInvoices = invoices.map(inv => {
        if (inv.paymentStatus !== 'paid' && inv.paymentStatus !== 'overdue') {
          const dueDate = new Date(inv.dueDate)
          if (dueDate < now) {
            updated = true
            return { ...inv, paymentStatus: 'overdue' as const }
          }
        }
        return inv
      })

      if (updated) {
        await saveInvoices(newInvoices)
      }
    }

    updateOverdueStatus()
    const interval = setInterval(updateOverdueStatus, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [invoices])

  return {
    invoices,
    isLoading,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    getNextInvoiceNumber,
    markAsPaid,
    markAsPartiallyPaid,
    getOverdueInvoices,
    getUnpaidInvoices
  }
}
