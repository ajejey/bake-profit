'use client'

import React, { useMemo, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useCurrencySymbol } from '../hooks'



// Helper to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Users,
  Plus,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  DollarSign,
  Edit,
  Trash2,
  Award,
  Calendar
} from 'lucide-react'
import { useCustomers, useOrders } from '../hooks'
import { useToast } from '@/hooks/use-toast'
import type { Customer } from '../types'
import SearchBar from './SearchBar'
import FilterChips, { type FilterOption } from './FilterChips'
import SortDropdown, { type SortOption } from './SortDropdown'

interface CustomerManagementProps {
  onNavigate?: (tab: string) => void
}

export default function CustomerManagement({ onNavigate }: CustomerManagementProps) {
  const { toast } = useToast()
  const { customers, addCustomer, updateCustomer, deleteCustomer } = useCustomers()
  const { orders } = useOrders()
  const { symbol: currencySymbol } = useCurrencySymbol()


  // UI State
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'repeat' | 'new' | 'vip'>('all')
  const [sortBy, setSortBy] = useState<'name' | 'spent' | 'orders' | 'recent'>('name')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isViewOrdersOpen, setIsViewOrdersOpen] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  })

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      notes: ''
    })
  }


  // Helper to format currency synchronously
  const formatCurrency = (amount: number): string => {
    return `${currencySymbol}${amount.toFixed(2)}`
  }

  // Handle add customer
  const handleAddCustomer = () => {
    if (!formData.name.trim()) {
      toast({
        title: 'Name required',
        description: 'Please enter a customer name',
        variant: 'destructive'
      })
      return
    }

    const newCustomer: Customer = {
      id: `cust-${Date.now()}`,
      name: formData.name.trim(),
      email: formData.email.trim() || undefined,
      phone: formData.phone.trim() || undefined,
      address: formData.address.trim() || undefined,
      orderHistory: [],
      totalOrders: 0,
      totalSpent: 0,
      notes: formData.notes.trim(),
      createdAt: new Date().toISOString()
    }

    addCustomer(newCustomer)
    setIsAddDialogOpen(false)
    resetForm()

    toast({
      title: 'Customer added',
      description: `${newCustomer.name} has been added to your customer list`
    })
  }

  // Handle edit customer
  const handleEditCustomer = () => {
    if (!selectedCustomer || !formData.name.trim()) return

    const updates: Partial<Customer> = {
      name: formData.name.trim(),
      email: formData.email.trim() || undefined,
      phone: formData.phone.trim() || undefined,
      address: formData.address.trim() || undefined,
      notes: formData.notes.trim()
    }

    updateCustomer(selectedCustomer.id, updates)
    setIsEditDialogOpen(false)
    setSelectedCustomer(null)
    resetForm()

    toast({
      title: 'Customer updated',
      description: `${formData.name}'s information has been updated`
    })
  }

  // Handle delete customer
  const handleDeleteCustomer = (customer: Customer) => {
    if (customer.totalOrders > 0) {
      toast({
        title: 'Cannot delete customer',
        description: 'This customer has order history. Archive instead of deleting.',
        variant: 'destructive'
      })
      return
    }

    if (confirm(`Are you sure you want to delete ${customer.name}?`)) {
      deleteCustomer(customer.id)
      toast({
        title: 'Customer deleted',
        description: `${customer.name} has been removed`
      })
    }
  }

  // Open edit dialog
  const openEditDialog = (customer: Customer) => {
    setSelectedCustomer(customer)
    setFormData({
      name: customer.name,
      email: customer.email || '',
      phone: customer.phone || '',
      address: customer.address || '',
      notes: customer.notes || ''
    })
    setIsEditDialogOpen(true)
  }

  // Get customer orders
  const getCustomerOrders = (customer: Customer) => {
    return orders.filter(order =>
      order.customerName === customer.name ||
      customer.orderHistory.includes(order.id)
    )
  }

  // Filter and sort customers
  const filteredAndSortedCustomers = useMemo(() => {
    let filtered = customers.filter(customer => {
      // Search filter
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch =
        customer.name.toLowerCase().includes(searchLower) ||
        customer.email?.toLowerCase().includes(searchLower) ||
        customer.phone?.includes(searchTerm)

      if (!matchesSearch) return false

      // Type filter
      if (filterType === 'repeat' && customer.totalOrders <= 1) return false
      if (filterType === 'new' && customer.totalOrders > 1) return false
      if (filterType === 'vip' && customer.totalSpent < 100) return false

      return true
    })

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'spent':
          return b.totalSpent - a.totalSpent
        case 'orders':
          return b.totalOrders - a.totalOrders
        case 'recent':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        default:
          return 0
      }
    })

    return filtered
  }, [customers, searchTerm, filterType, sortBy])

  // Stats
  const stats = useMemo(() => {
    const repeatCustomers = customers.filter(c => c.totalOrders > 1).length
    const vipCustomers = customers.filter(c => c.totalSpent >= 100).length
    const newCustomers = customers.filter(c => {
      const daysSinceCreated = (Date.now() - new Date(c.createdAt).getTime()) / (1000 * 60 * 60 * 24)
      return daysSinceCreated <= 30
    }).length

    return { repeatCustomers, vipCustomers, newCustomers }
  }, [customers])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>
          <p className="text-gray-600">Manage your customer relationships</p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Repeat Customers</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.repeatCustomers}</div>
            <p className="text-xs text-muted-foreground">
              {customers.length > 0 ? ((stats.repeatCustomers / customers.length) * 100).toFixed(0) : 0}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">VIP Customers</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.vipCustomers}</div>
            <p className="text-xs text-muted-foreground">{currencySymbol}100+ spent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New (30 days)</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newCustomers}</div>
            <p className="text-xs text-muted-foreground">Recent additions</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar and Add Button */}
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search customers by name, email, or phone..."
            className="flex-1"
          />
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              {/* <Button onClick={resetForm} className="sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button> */}
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
                <DialogDescription>
                  Add a new customer to your database
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Customer name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="customer@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="123 Main St, City, State"
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any special notes or preferences..."
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCustomer}>Add Customer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter Chips and Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <FilterChips
            options={[
              { id: 'all', label: 'All', count: customers.length },
              { id: 'repeat', label: 'Repeat', count: stats.repeatCustomers },
              { id: 'new', label: 'New', count: stats.newCustomers },
              { id: 'vip', label: 'VIP', count: stats.vipCustomers },
            ]}
            activeFilter={filterType}
            onChange={(id) => setFilterType(id as any)}
          />

          <SortDropdown
            options={[
              { id: 'name', label: 'Name (A-Z)' },
              { id: 'spent', label: 'Total Spent' },
              { id: 'orders', label: 'Order Count' },
              { id: 'recent', label: 'Recently Added' },
            ]}
            value={sortBy}
            onChange={(v) => setSortBy(v as any)}
          />
        </div>
      </div>

      {/* Customer List */}
      {filteredAndSortedCustomers.length === 0 ? (
        <Card className="border-2 border-dashed">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <h3 className="text-lg font-semibold mb-2">
                {searchTerm || filterType !== 'all' ? 'No customers found' : 'No customers yet'}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterType !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Add your first customer to get started'
                }
              </p>
              {!searchTerm && filterType === 'all' && (
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Customer
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAndSortedCustomers.map((customer) => (
            <Card key={customer.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{customer.name}</CardTitle>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {customer.totalOrders > 1 && (
                        <Badge variant="secondary" className="text-xs">
                          <Award className="h-3 w-3 mr-1" />
                          Repeat
                        </Badge>
                      )}
                      {customer.totalSpent >= 100 && (
                        <Badge className="bg-yellow-500 text-xs">
                          VIP
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Contact Info */}
                {customer.email && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{customer.email}</span>
                  </div>
                )}
                {customer.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{customer.phone}</span>
                  </div>
                )}
                {customer.address && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{customer.address}</span>
                  </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t">
                  <div>
                    <div className="text-xs text-gray-500">Total Spent</div>
                    <div className="text-lg font-bold text-green-600">
                      {formatCurrency(customer.totalSpent)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Orders</div>
                    <div className="text-lg font-bold">{customer.totalOrders}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setSelectedCustomer(customer)
                      setIsViewOrdersOpen(true)
                    }}
                  >
                    <ShoppingBag className="h-4 w-4 mr-1" />
                    Orders
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEditDialog(customer)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteCustomer(customer)}
                    disabled={customer.totalOrders > 0}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
            <DialogDescription>
              Update customer information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Name *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-phone">Phone</Label>
              <Input
                id="edit-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-address">Address</Label>
              <Input
                id="edit-address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-notes">Notes</Label>
              <Textarea
                id="edit-notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCustomer}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Orders Dialog */}
      <Dialog open={isViewOrdersOpen} onOpenChange={setIsViewOrdersOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedCustomer?.name}&apos;s Orders
            </DialogTitle>
            <DialogDescription>
              Order history for this customer
            </DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {getCustomerOrders(selectedCustomer).length === 0 ? (
                <p className="text-center text-gray-500 py-8">No orders yet</p>
              ) : (
                getCustomerOrders(selectedCustomer).map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium">{order.orderNumber}</div>
                        <div className="text-sm text-gray-600">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </div>
                      </div>
                      <Badge
                        variant={
                          order.status === 'delivered' ? 'default' :
                            order.status === 'ready' ? 'secondary' :
                              'outline'
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      {order.items.length} item(s) • {formatCurrency(order.totalRevenue)}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewOrdersOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
