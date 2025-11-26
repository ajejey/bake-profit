'use client'

import React, { useState, useEffect } from 'react'
import { X, ShoppingCart, Calendar, User, Package, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { PublicMenu, MenuProduct } from '../../types'

interface OrderFormDialogProps {
    menu: PublicMenu
    isOpen: boolean
    onClose: () => void
}

interface OrderItem {
    productId: string
    product: MenuProduct
    quantity: number
    notes: string
}

export default function OrderFormDialog({ menu, isOpen, onClose }: OrderFormDialogProps) {
    const [step, setStep] = useState<'form' | 'submitting' | 'success' | 'error'>('form')
    const [error, setError] = useState('')
    const [customerName, setCustomerName] = useState('')
    const [customerPhone, setCustomerPhone] = useState('')
    const [customerEmail, setCustomerEmail] = useState('')
    const [deliveryDate, setDeliveryDate] = useState('')
    const [deliveryType, setDeliveryType] = useState<'pickup' | 'delivery'>('pickup')
    const [address, setAddress] = useState('')
    const [notes, setNotes] = useState('')
    const [orderItems, setOrderItems] = useState<OrderItem[]>([])
    const [orderNumber, setOrderNumber] = useState('')

    const getMinDeliveryDate = () => {
        const min = new Date()
        min.setDate(min.getDate() + (menu.orderLeadDays || 2))
        return min.toISOString().split('T')[0]
    }

    const updateOrderItem = (product: MenuProduct, quantity: number, notes: string = '') => {
        setOrderItems((prev) => {
            const existing = prev.find((item) => item.productId === product.id)
            if (quantity === 0) {
                return prev.filter((item) => item.productId !== product.id)
            }
            if (existing) {
                return prev.map((item) =>
                    item.productId === product.id ? { ...item, quantity, notes } : item
                )
            }
            return [...prev, { productId: product.id, product, quantity, notes }]
        })
    }

    const calculateTotal = () => {
        return orderItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    }

    const validateForm = (): string | null => {
        if (!customerName.trim()) return 'Please enter your name'
        if (!customerPhone.trim() && !customerEmail.trim()) return 'Please provide phone or email'
        if (orderItems.length === 0) return 'Please select at least one product'
        if (!deliveryDate) return 'Please select a delivery date'
        if (deliveryType === 'delivery' && !address.trim()) return 'Please enter delivery address'

        const selected = new Date(deliveryDate)
        const min = new Date(getMinDeliveryDate())
        if (selected < min) {
            return `Please select a date at least ${menu.orderLeadDays || 2} days from now`
        }

        return null
    }

    const handleSubmit = async () => {
        const validationError = validateForm()
        if (validationError) {
            setError(validationError)
            return
        }

        setStep('submitting')
        setError('')

        try {
            const response = await fetch('/api/public/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    menuSlug: menu.slug,
                    customer: {
                        name: customerName,
                        phone: customerPhone || undefined,
                        email: customerEmail || undefined,
                    },
                    items: orderItems.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        notes: item.notes,
                    })),
                    deliveryDate,
                    deliveryType,
                    address: deliveryType === 'delivery' ? address : undefined,
                    notes,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to place order')
            }

            setOrderNumber(data.orderNumber)
            setStep('success')
        } catch (err) {
            console.error('Error submitting order:', err)
            setError(err instanceof Error ? err.message : 'Failed to place order. Please try again.')
            setStep('error')
        }
    }

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setStep('form')
                setError('')
                setCustomerName('')
                setCustomerPhone('')
                setCustomerEmail('')
                setDeliveryDate('')
                setDeliveryType('pickup')
                setAddress('')
                setNotes('')
                setOrderItems([])
                setOrderNumber('')
            }, 300)
        }
    }, [isOpen])

    if (step === 'success') {
        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="max-w-md p-0 gap-0">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 text-center">
                        <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle2 className="h-10 w-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
                        <p className="text-gray-600 mb-4">Thank you for your order</p>
                        <div className="bg-white rounded-lg p-4 mb-6">
                            <p className="text-sm text-gray-500 mb-1">Your Order Number</p>
                            <p className="text-2xl font-bold text-green-600">{orderNumber}</p>
                        </div>
                        <p className="text-sm text-gray-600 mb-6">
                            {customerEmail
                                ? "We've sent a confirmation email. We'll be in touch if we have any questions!"
                                : "We'll be in touch if we have any questions about your order!"}
                        </p>
                        <Button onClick={onClose} className="w-full bg-green-600 hover:bg-green-700">
                            Close
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    if (step === 'error') {
        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="max-w-md p-0 gap-0">
                    <div className="bg-gradient-to-br from-red-50 to-rose-50 p-8 text-center">
                        <div className="mx-auto w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4">
                            <AlertCircle className="h-10 w-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <div className="flex gap-3">
                            <Button onClick={() => setStep('form')} variant="outline" className="flex-1">
                                Try Again
                            </Button>
                            <Button onClick={onClose} className="flex-1">
                                Close
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0">
                <div className="sticky top-0 bg-gradient-to-r from-rose-500 to-pink-500 text-white p-6 z-10">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <ShoppingCart className="h-6 w-6" />
                            <h2 className="text-2xl font-bold">Place Your Order</h2>
                        </div>
                        {step !== 'submitting' && (
                            <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
                                <X className="h-6 w-6" />
                            </button>
                        )}
                    </div>
                    <p className="text-white/90 text-sm">{menu.branding.businessName}</p>
                </div>

                {step === 'submitting' ? (
                    <div className="flex flex-col items-center justify-center p-12">
                        <Loader2 className="h-12 w-12 animate-spin text-rose-500 mb-4" />
                        <p className="text-lg font-medium text-gray-900">Placing your order...</p>
                        <p className="text-sm text-gray-500">Please wait</p>
                    </div>
                ) : (
                    <div className="p-6 space-y-6">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2">
                                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                                <span className="text-sm">{error}</span>
                            </div>
                        )}

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <User className="h-5 w-5 text-rose-500" />
                                Your Information
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Name *</Label>
                                    <Input
                                        id="name"
                                        value={customerName}
                                        onChange={(e) => setCustomerName(e.target.value)}
                                        placeholder="John Doe"
                                        className="mt-1"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={customerPhone}
                                            onChange={(e) => setCustomerPhone(e.target.value)}
                                            placeholder="+1 234 567 8900"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={customerEmail}
                                            onChange={(e) => setCustomerEmail(e.target.value)}
                                            placeholder="john@example.com"
                                            className="mt-1"
                                        />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500">* Please provide at least phone or email</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Package className="h-5 w-5 text-rose-500" />
                                Select Products
                            </h3>
                            <div className="space-y-3">
                                {menu.products.filter((p) => p.isAvailable).map((product) => {
                                    const orderItem = orderItems.find((item) => item.productId === product.id)
                                    const quantity = orderItem?.quantity || 0

                                    return (
                                        <div key={product.id} className="border rounded-lg p-4 hover:border-rose-300 transition-colors">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-900">{product.name}</h4>
                                                    {product.description && (
                                                        <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                                                    )}
                                                </div>
                                                {menu.showPrices && (
                                                    <span className="text-lg font-semibold text-rose-600 ml-4">
                                                        ${product.price.toFixed(2)}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3 mt-3">
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => updateOrderItem(product, Math.max(0, quantity - 1))}
                                                        disabled={quantity === 0}
                                                    >
                                                        −
                                                    </Button>
                                                    <span className="w-8 text-center font-medium">{quantity}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => updateOrderItem(product, quantity + 1)}
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                                {quantity > 0 && (
                                                    <Input
                                                        placeholder="Special requests (optional)"
                                                        value={orderItem?.notes || ''}
                                                        onChange={(e) => updateOrderItem(product, quantity, e.target.value)}
                                                        className="flex-1 text-sm"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-rose-500" />
                                Delivery Details
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="deliveryDate">Delivery Date *</Label>
                                    <Input
                                        id="deliveryDate"
                                        type="date"
                                        min={getMinDeliveryDate()}
                                        value={deliveryDate}
                                        onChange={(e) => setDeliveryDate(e.target.value)}
                                        className="mt-1"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Minimum {menu.orderLeadDays || 2} days notice required
                                    </p>
                                </div>
                                <div>
                                    <Label htmlFor="deliveryType">Type *</Label>
                                    <Select value={deliveryType} onValueChange={(v: 'pickup' | 'delivery') => setDeliveryType(v)}>
                                        <SelectTrigger className="mt-1">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pickup">Pickup</SelectItem>
                                            <SelectItem value="delivery">Delivery</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {deliveryType === 'delivery' && (
                                    <div>
                                        <Label htmlFor="address">Delivery Address *</Label>
                                        <Textarea
                                            id="address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="123 Main St, City, State ZIP"
                                            rows={2}
                                            className="mt-1"
                                        />
                                    </div>
                                )}
                                <div>
                                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                                    <Textarea
                                        id="notes"
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Any special requests or dietary restrictions..."
                                        rows={3}
                                        className="mt-1"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-lg font-semibold text-gray-900">Total</span>
                                <span className="text-2xl font-bold text-rose-600">
                                    ${calculateTotal().toFixed(2)}
                                </span>
                            </div>
                            <Button
                                onClick={handleSubmit}
                                disabled={orderItems.length === 0}
                                className="w-full bg-rose-500 hover:bg-rose-600 text-lg py-6"
                            >
                                Place Order
                            </Button>
                            <p className="text-xs text-center text-gray-500 mt-3">
                                You&apos;ll receive a confirmation {customerEmail ? 'email' : 'call'} shortly
                            </p>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}
