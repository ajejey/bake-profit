'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Plus, Phone, ShoppingBag, X } from 'lucide-react'
import { useCustomers } from '../hooks'
import type { Customer } from '../types'

interface CustomerSelectorProps {
  value: Customer | null
  onChange: (customer: Customer | null) => void
  onCreateNew: (name: string, phone?: string) => void
}

export function CustomerSelector({ value, onChange, onCreateNew }: CustomerSelectorProps) {
  const { customers, searchCustomers } = useCustomers()
  const [searchInput, setSearchInput] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newCustomerName, setNewCustomerName] = useState('')
  const [newCustomerPhone, setNewCustomerPhone] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  // Get filtered customers based on search
  const filteredCustomers = searchCustomers(searchInput)
  const hasExactMatch = filteredCustomers.some(c => c.name.toLowerCase() === searchInput.toLowerCase())

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setShowCreateForm(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectCustomer = (customer: Customer) => {
    onChange(customer)
    setSearchInput(customer.name)
    setIsOpen(false)
    setShowCreateForm(false)
  }

  const handleCreateCustomer = () => {
    if (!newCustomerName.trim()) return

    onCreateNew(newCustomerName.trim(), newCustomerPhone || undefined)
    setNewCustomerName('')
    setNewCustomerPhone('')
    setSearchInput('')
    setShowCreateForm(false)
    setIsOpen(false)
  }

  const handleClear = () => {
    onChange(null)
    setSearchInput('')
    setIsOpen(false)
  }

  const handleShowCreateForm = () => {
    setNewCustomerName(searchInput)
    setShowCreateForm(true)
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative">
      <Label className="text-sm font-medium mb-1">Customer *</Label>
      
      {/* Selected Customer Display */}
      {value && !showCreateForm ? (
        <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex-1">
            <div className="font-medium text-sm">{value.name}</div>
            <div className="text-xs text-gray-600 flex items-center gap-3">
              {value.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {value.phone}
                </span>
              )}
              <span className="flex items-center gap-1">
                <ShoppingBag className="h-3 w-3" />
                {value.totalOrders} order{value.totalOrders !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          {/* Search Input */}
          <div className="relative">
            <Input
              placeholder="Search customer or create new..."
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value)
                setIsOpen(true)
                setShowCreateForm(false)
              }}
              onFocus={() => setIsOpen(true)}
              autoComplete="off"
            />
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <Card className="absolute z-50 w-full mt-1 p-0 shadow-lg border">
              {/* Existing Customers List */}
              {filteredCustomers.length > 0 && (
                <div className="max-h-64 overflow-y-auto">
                  {filteredCustomers.map(customer => (
                    <button
                      key={customer.id}
                      type="button"
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b last:border-b-0 transition-colors"
                      onClick={() => handleSelectCustomer(customer)}
                    >
                      <div className="font-medium text-sm">{customer.name}</div>
                      <div className="text-xs text-gray-600 flex items-center gap-3 mt-1">
                        {customer.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {customer.phone}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <ShoppingBag className="h-3 w-3" />
                          {customer.totalOrders} order{customer.totalOrders !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* No Results - Show Create Option */}
              {filteredCustomers.length === 0 && searchInput && !hasExactMatch && (
                <div className="p-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start text-left"
                    onClick={handleShowCreateForm}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create new customer: &quot;{searchInput}&quot;
                  </Button>
                </div>
              )}

              {/* Empty State */}
              {filteredCustomers.length === 0 && !searchInput && (
                <div className="p-4 text-center text-sm text-gray-500">
                  {customers.length === 0
                    ? 'No customers yet. Create your first one!'
                    : 'Type to search customers...'}
                </div>
              )}
            </Card>
          )}
        </>
      )}

      {/* Quick Create Form */}
      {showCreateForm && (
        <Card className="absolute z-50 w-full mt-1 p-4 shadow-lg border space-y-3">
          <div>
            <Label className="text-xs font-medium mb-1">Customer Name</Label>
            <Input
              placeholder="Full name"
              value={newCustomerName}
              onChange={(e) => setNewCustomerName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateCustomer()}
              autoFocus
            />
          </div>
          <div>
            <Label className="text-xs font-medium mb-1">Phone (Optional)</Label>
            <Input
              placeholder="+1 234 567 8900"
              value={newCustomerPhone}
              onChange={(e) => setNewCustomerPhone(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateCustomer()}
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              onClick={handleCreateCustomer}
              className="flex-1"
            >
              Create Customer
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                setShowCreateForm(false)
                setNewCustomerName('')
                setNewCustomerPhone('')
              }}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
