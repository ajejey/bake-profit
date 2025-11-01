'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { Plus, Calendar, DollarSign, Mail, Trash2, Download, FileText, Send, Check, X } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import { useInvoices, useOrders, useCustomers, useCurrencySymbol, usePDFCustomization } from '../hooks'
import type { Invoice, InvoiceItem, Order } from '../types'
import { PAYMENT_TERMS, INVOICE_STATUSES } from '../types'
import SearchBar from './SearchBar'
import { generateInvoicePDF, getInvoicePDFFilename, createInvoiceFromOrder } from '../lib/pdfGenerators/invoicePDF'
// import { sendInvoiceEmail } from '@/lib/email/sendInvoiceEmail'

const formatCurrency = (amount: number, symbol: string = '$'): string => {
  return `${symbol}${amount.toFixed(2)}`
}

export default function InvoiceManager() {
  const { toast } = useToast()
  const { symbol: currencySymbol = '$' } = useCurrencySymbol()
  const { customization } = usePDFCustomization()
  
  const {
    invoices,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    getNextInvoiceNumber,
    markAsPaid,
    markAsPartiallyPaid
  } = useInvoices()
  
  const { orders } = useOrders()
  const { customers } = useCustomers()
  
  // State
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isSendDialogOpen, setIsSendDialogOpen] = useState(false)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [isSending, setIsSending] = useState(false)
  const [createMode, setCreateMode] = useState<'order' | 'manual'>('order')
  const [selectedOrderId, setSelectedOrderId] = useState<string>('')
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('')
  
  // Form state for new invoice
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    paymentTerms: customization.defaultPaymentTerms || 'net-7',
    taxRate: customization.defaultTaxRate || 0,
    notes: '',
    terms: customization.defaultTerms || '',
    items: [] as InvoiceItem[]
  })
  
  // Payment form state
  const [paymentData, setPaymentData] = useState({
    amount: '',
    paymentMethod: 'cash',
    paymentDate: new Date().toISOString().split('T')[0]
  })
  
  // Email form state
  const [emailData, setEmailData] = useState({
    to: '',
    message: ''
  })
  
  // Create invoice from order
  const handleCreateFromOrder = () => {
    const order = orders.find(o => o.id === selectedOrderId)
    if (!order) {
      toast({
        title: 'Error',
        description: 'Please select an order.',
        variant: 'destructive'
      })
      return
    }

    const invoiceNumber = getNextInvoiceNumber(customization.invoicePrefix)
    const invoiceData = createInvoiceFromOrder(
      order,
      invoiceNumber,
      customization.defaultPaymentTerms,
      customization.defaultTaxRate
    )
    
    const newInvoice: Invoice = {
      ...invoiceData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    addInvoice(newInvoice)
    setIsCreateDialogOpen(false)
    setSelectedOrderId('')
    toast({
      title: 'Invoice created',
      description: `Invoice ${invoiceNumber} has been created from order ${order.orderNumber}.`
    })
  }

  // Load customer data when selected
  const handleCustomerSelect = (customerId: string) => {
    setSelectedCustomerId(customerId)
    const customer = customers.find(c => c.id === customerId)
    if (customer) {
      setFormData(prev => ({
        ...prev,
        customerName: customer.name,
        customerEmail: customer.email || '',
        customerPhone: customer.phone || '',
        customerAddress: customer.address || ''
      }))
    }
  }
  
  // Create manual invoice
  const handleCreateInvoice = () => {
    if (!formData.customerName || formData.items.length === 0) {
      toast({
        title: 'Missing information',
        description: 'Please provide customer name and at least one item.',
        variant: 'destructive'
      })
      return
    }
    
    const invoiceNumber = getNextInvoiceNumber(customization.invoicePrefix)
    const invoiceDate = new Date().toISOString()
    const dueDate = new Date()
    
    // Calculate due date
    const termsDays: Record<string, number> = {
      'due-on-receipt': 0,
      'net-7': 7,
      'net-15': 15,
      'net-30': 30,
      'net-60': 60
    }
    dueDate.setDate(dueDate.getDate() + (termsDays[formData.paymentTerms] || 0))
    
    const subtotal = formData.items.reduce((sum, item) => sum + item.total, 0)
    const taxAmount = (subtotal * formData.taxRate) / 100
    const total = subtotal + taxAmount
    
    const newInvoice: Invoice = {
      id: uuidv4(),
      invoiceNumber,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      customerAddress: formData.customerAddress,
      invoiceDate,
      dueDate: dueDate.toISOString(),
      paymentTerms: formData.paymentTerms as Invoice['paymentTerms'],
      items: formData.items,
      subtotal,
      taxRate: formData.taxRate,
      taxAmount,
      discount: 0,
      total,
      paymentStatus: 'unpaid',
      amountPaid: 0,
      amountDue: total,
      notes: formData.notes,
      terms: formData.terms,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    addInvoice(newInvoice)
    setIsCreateDialogOpen(false)
    resetForm()
    
    toast({
      title: 'Invoice created',
      description: `Invoice ${invoiceNumber} has been created successfully.`
    })
  }
  
  // Add item to invoice
  const handleAddItem = () => {
    const newItem: InvoiceItem = {
      id: uuidv4(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0,
      taxable: true
    }
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }))
  }
  
  // Update item
  const handleUpdateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === id) {
          const updated = { ...item, [field]: value }
          if (field === 'quantity' || field === 'unitPrice') {
            updated.total = updated.quantity * updated.unitPrice
          }
          return updated
        }
        return item
      })
    }))
  }
  
  // Remove item
  const handleRemoveItem = (id: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }))
  }
  
  // Export PDF
  const handleExportPDF = (invoice: Invoice) => {
    const pdf = generateInvoicePDF(invoice, { customization, currencySymbol })
    const filename = getInvoicePDFFilename(invoice)
    pdf.save(filename)
    
    toast({
      title: 'PDF Downloaded',
      description: 'Invoice has been saved as PDF.'
    })
  }
  
  // Send invoice email
//   const handleSendInvoice = async () => {
//     if (!selectedInvoice || !emailData.to) {
//       toast({
//         title: 'Missing information',
//         description: 'Please provide recipient email address.',
//         variant: 'destructive'
//       })
//       return
//     }
    
//     setIsSending(true)
    
//     try {
//       const result = await sendInvoiceEmail({
//         invoice: selectedInvoice,
//         recipientEmail: emailData.to,
//         customization,
//         currencySymbol
//       })
      
//       if (result.success) {
//         // Update invoice with sent info
//         updateInvoice(selectedInvoice.id, {
//           sentAt: new Date().toISOString(),
//           emailedTo: [...(selectedInvoice.emailedTo || []), emailData.to]
//         })
        
//         setIsSendDialogOpen(false)
//         setEmailData({ to: '', message: '' })
        
//         toast({
//           title: 'Invoice sent',
//           description: `Invoice has been sent to ${emailData.to}.`
//         })
//       } else {
//         throw new Error(result.error || 'Failed to send email')
//       }
//     } catch (error) {
//       toast({
//         title: 'Failed to send',
//         description: error instanceof Error ? error.message : 'Failed to send invoice email.',
//         variant: 'destructive'
//       })
//     } finally {
//       setIsSending(false)
//     }
//   }
  
  // Record payment
  const handleRecordPayment = () => {
    if (!selectedInvoice || !paymentData.amount) {
      toast({
        title: 'Missing information',
        description: 'Please provide payment amount.',
        variant: 'destructive'
      })
      return
    }
    
    const amount = parseFloat(paymentData.amount)
    
    if (amount >= selectedInvoice.amountDue) {
      markAsPaid(selectedInvoice.id, paymentData.paymentMethod, paymentData.paymentDate)
      toast({
        title: 'Payment recorded',
        description: 'Invoice has been marked as paid.'
      })
    } else {
      markAsPartiallyPaid(selectedInvoice.id, amount, paymentData.paymentMethod)
      toast({
        title: 'Partial payment recorded',
        description: `${formatCurrency(amount, currencySymbol)} has been recorded.`
      })
    }
    
    setIsPaymentDialogOpen(false)
    setPaymentData({ amount: '', paymentMethod: 'cash', paymentDate: new Date().toISOString().split('T')[0] })
  }
  
  // Delete invoice
  const handleDeleteInvoice = (id: string) => {
    deleteInvoice(id)
    toast({
      title: 'Invoice deleted',
      description: 'The invoice has been removed.'
    })
  }
  
  // Reset form
  const resetForm = () => {
    setFormData({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      customerAddress: '',
      paymentTerms: customization.defaultPaymentTerms || 'net-7',
      taxRate: customization.defaultTaxRate || 0,
      notes: '',
      terms: customization.defaultTerms || '',
      items: []
    })
    setSelectedOrderId('')
    setSelectedCustomerId('')
    setCreateMode('order')
  }

  // Get unpaid orders (orders that don't have invoices yet)
  const unpaidOrders = orders.filter(order => {
    // Check if this order already has an invoice
    const hasInvoice = invoices.some(inv => inv.orderId === order.id)
    return !hasInvoice && order.status !== 'cancelled'
  })
  
  // Filter and sort invoices
  const filteredInvoices = useMemo(() => {
    return invoices.filter(invoice => {
      const matchesSearch = 
        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || invoice.paymentStatus === statusFilter
      
      return matchesSearch && matchesStatus
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [invoices, searchTerm, statusFilter])
  
  // Get status color
  const getStatusColor = (status: Invoice['paymentStatus']) => {
    const colors = {
      unpaid: 'bg-yellow-100 text-yellow-800',
      partial: 'bg-blue-100 text-blue-800',
      paid: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800'
    }
    return colors[status]
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Invoices</h2>
          <p className="text-muted-foreground">Manage your invoices and payments</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
              <DialogDescription>
                {createMode === 'order' ? 'Create invoice from an existing order' : 'Create a custom invoice manually'}
              </DialogDescription>
            </DialogHeader>
            
            {/* Mode Selector */}
            <Tabs value={createMode} onValueChange={(value) => setCreateMode(value as 'order' | 'manual')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="order">From Order ({unpaidOrders.length})</TabsTrigger>
                <TabsTrigger value="manual">Manual Invoice</TabsTrigger>
              </TabsList>
              
              {/* From Order Tab */}
              <TabsContent value="order" className="space-y-4">
                {unpaidOrders.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      No orders available for invoicing. All orders either have invoices or are cancelled.
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    <div>
                      <Label>Select Order *</Label>
                      <Select value={selectedOrderId} onValueChange={setSelectedOrderId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose an order..." />
                        </SelectTrigger>
                        <SelectContent>
                          {unpaidOrders.map(order => (
                            <SelectItem key={order.id} value={order.id}>
                              {order.orderNumber} - {order.customerName} ({formatCurrency(order.totalRevenue, currencySymbol)})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {selectedOrderId && (() => {
                      const order = orders.find(o => o.id === selectedOrderId)
                      return order ? (
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Order Details</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2 text-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div><strong>Customer:</strong> {order.customerName}</div>
                              <div><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</div>
                              <div><strong>Items:</strong> {order.items.length}</div>
                              <div><strong>Total:</strong> {formatCurrency(order.totalRevenue, currencySymbol)}</div>
                            </div>
                            <div className="pt-2 border-t">
                              <strong>Items:</strong>
                              <ul className="list-disc list-inside mt-1">
                                {order.items.map(item => (
                                  <li key={item.id}>
                                    {item.recipeName} x{item.quantity} - {formatCurrency(item.subtotalRevenue, currencySymbol)}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      ) : null
                    })()}
                  </>
                )}
              </TabsContent>
              
              {/* Manual Invoice Tab */}
              <TabsContent value="manual" className="space-y-4">
                {/* Customer Selection */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Customer Information</h3>
                  <div>
                    <Label>Select Existing Customer (Optional)</Label>
                    <Select value={selectedCustomerId} onValueChange={handleCustomerSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a customer or enter manually..." />
                      </SelectTrigger>
                      <SelectContent>
                        {customers.map(customer => (
                          <SelectItem key={customer.id} value={customer.id}>
                            {customer.name} {customer.email && `(${customer.email})`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="text-xs text-muted-foreground">Or enter customer details manually below</div>
                </div>
                
                {/* Customer Info */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Customer Details</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Customer Name *</Label>
                    <Input
                      value={formData.customerName}
                      onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={formData.customerEmail}
                      onChange={(e) => setFormData(prev => ({ ...prev, customerEmail: e.target.value }))}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input
                      value={formData.customerPhone}
                      onChange={(e) => setFormData(prev => ({ ...prev, customerPhone: e.target.value }))}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label>Address</Label>
                    <Input
                      value={formData.customerAddress}
                      onChange={(e) => setFormData(prev => ({ ...prev, customerAddress: e.target.value }))}
                      placeholder="123 Main St"
                    />
                  </div>
                </div>
              </div>
              
              {/* Invoice Details */}
              <div className="space-y-3">
                <h3 className="font-semibold">Invoice Details</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Payment Terms</Label>
                    <Select
                      value={formData.paymentTerms}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, paymentTerms: value as Invoice['paymentTerms'] }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {PAYMENT_TERMS.map(term => (
                          <SelectItem key={term.value} value={term.value}>
                            {term.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Tax Rate (%)</Label>
                    <Input
                      type="number"
                      value={formData.taxRate}
                      onChange={(e) => setFormData(prev => ({ ...prev, taxRate: parseFloat(e.target.value) || 0 }))}
                      placeholder="8"
                    />
                  </div>
                </div>
              </div>
              
              {/* Items */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Items</h3>
                  <Button type="button" variant="outline" size="sm" onClick={handleAddItem}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Item
                  </Button>
                </div>
                
                {formData.items.map((item, index) => (
                  <Card key={item.id}>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-5">
                          <Label className="text-xs">Description</Label>
                          <Input
                            value={item.description}
                            onChange={(e) => handleUpdateItem(item.id, 'description', e.target.value)}
                            placeholder="Item description"
                          />
                        </div>
                        <div className="col-span-2">
                          <Label className="text-xs">Qty</Label>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleUpdateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div className="col-span-2">
                          <Label className="text-xs">Price</Label>
                          <Input
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) => handleUpdateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div className="col-span-2">
                          <Label className="text-xs">Total</Label>
                          <Input value={formatCurrency(item.total, currencySymbol)} disabled />
                        </div>
                        <div className="col-span-1 flex items-end">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Notes */}
              <div>
                <Label>Notes</Label>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Additional notes..."
                  rows={2}
                />
              </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsCreateDialogOpen(false)
                resetForm()
              }}>Cancel</Button>
              <Button onClick={createMode === 'order' ? handleCreateFromOrder : handleCreateInvoice}>
                Create Invoice
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search invoices..."
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Invoices</SelectItem>
            {INVOICE_STATUSES.map(status => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Invoices List */}
      <div className="grid gap-4">
        {filteredInvoices.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              No invoices found. Create your first invoice to get started!
            </CardContent>
          </Card>
        ) : (
          filteredInvoices.map((invoice) => (
            <Card key={invoice.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {invoice.invoiceNumber}
                      <Badge className={getStatusColor(invoice.paymentStatus)}>
                        {invoice.paymentStatus.toUpperCase()}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {invoice.customerName}
                      {invoice.customerEmail && ` • ${invoice.customerEmail}`}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleExportPDF(invoice)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                    {invoice.customerEmail && invoice.paymentStatus !== 'paid' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedInvoice(invoice)
                          setEmailData({ to: invoice.customerEmail || '', message: '' })
                          setIsSendDialogOpen(true)
                        }}
                      >
                        <Send className="h-4 w-4 mr-1" />
                        Send
                      </Button>
                    )}
                    {invoice.paymentStatus !== 'paid' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedInvoice(invoice)
                          setPaymentData({
                            amount: invoice.amountDue.toString(),
                            paymentMethod: 'cash',
                            paymentDate: new Date().toISOString().split('T')[0]
                          })
                          setIsPaymentDialogOpen(true)
                        }}
                      >
                        <DollarSign className="h-4 w-4 mr-1" />
                        Record Payment
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteInvoice(invoice.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Invoice Date</div>
                    <div className="font-medium">
                      {new Date(invoice.invoiceDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Due Date</div>
                    <div className="font-medium">
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Total</div>
                    <div className="font-semibold">{formatCurrency(invoice.total, currencySymbol)}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Amount Due</div>
                    <div className="font-semibold text-rose-600">
                      {formatCurrency(invoice.amountDue, currencySymbol)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      
      {/* Send Email Dialog */}
      <Dialog open={isSendDialogOpen} onOpenChange={setIsSendDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Invoice</DialogTitle>
            <DialogDescription>
              Send invoice {selectedInvoice?.invoiceNumber} via email
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label>Recipient Email *</Label>
              <Input
                type="email"
                value={emailData.to}
                onChange={(e) => setEmailData(prev => ({ ...prev, to: e.target.value }))}
                placeholder="customer@example.com"
              />
            </div>
            <div>
              <Label>Additional Message (Optional)</Label>
              <Textarea
                value={emailData.message}
                onChange={(e) => setEmailData(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Add a personal message..."
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSendDialogOpen(false)}>Cancel</Button>
            {/* <Button onClick={handleSendInvoice} disabled={isSending}>
              {isSending ? 'Sending...' : 'Send Invoice'}
            </Button> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Record Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
            <DialogDescription>
              Record payment for invoice {selectedInvoice?.invoiceNumber}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label>Amount Due</Label>
              <div className="text-2xl font-bold text-rose-600">
                {selectedInvoice && formatCurrency(selectedInvoice.amountDue, currencySymbol)}
              </div>
            </div>
            <div>
              <Label>Payment Amount *</Label>
              <Input
                type="number"
                value={paymentData.amount}
                onChange={(e) => setPaymentData(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label>Payment Method</Label>
              <Select
                value={paymentData.paymentMethod}
                onValueChange={(value) => setPaymentData(prev => ({ ...prev, paymentMethod: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Payment Date</Label>
              <Input
                type="date"
                value={paymentData.paymentDate}
                onChange={(e) => setPaymentData(prev => ({ ...prev, paymentDate: e.target.value }))}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleRecordPayment}>Record Payment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
