'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { Save, FileText } from 'lucide-react'
import { usePDFCustomization } from '../hooks'
import { PAYMENT_TERMS } from '../types'

export default function PDFCustomizationSettings() {
  const { toast } = useToast()
  const { customization, saveCustomization } = usePDFCustomization()

  const [formData, setFormData] = useState({
    businessName: customization.businessName || '',
    businessAddress: customization.businessAddress || '',
    businessPhone: customization.businessPhone || '',
    businessEmail: customization.businessEmail || '',
    businessWebsite: customization.businessWebsite || '',
    taxId: customization.taxId || '',
    invoicePrefix: customization.invoicePrefix || 'INV-',
    defaultPaymentTerms: customization.defaultPaymentTerms || 'net-7',
    defaultTaxRate: customization.defaultTaxRate || 0,
    defaultNotes: customization.defaultNotes || '',
    defaultTerms: customization.defaultTerms || '',
    footerText: customization.footerText || 'Thank you for your business!'
  })

  const handleSave = () => {
    try {
      saveCustomization(formData)
      toast({
        title: 'Settings saved',
        description: 'PDF customization settings have been updated.'
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save settings.',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-2 gap-2">
        <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
          Cancel
        </Button>
        <Button size="lg" variant="default" onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
      <div>
        <h3 className="text-lg font-medium">PDF Customization</h3>
        <p className="text-sm text-muted-foreground">
          Customize how your PDFs (invoices, orders, recipes) appear
        </p>
      </div>

      {/* Business Information */}
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>This information will appear on all your PDFs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Business Name *</Label>
              <Input
                value={formData.businessName}
                onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                placeholder="Your Bakery Name"
              />
            </div>
            <div>
              <Label>Tax ID / EIN</Label>
              <Input
                value={formData.taxId}
                onChange={(e) => setFormData(prev => ({ ...prev, taxId: e.target.value }))}
                placeholder="12-3456789"
              />
            </div>
          </div>

          <div>
            <Label>Business Address</Label>
            <Input
              value={formData.businessAddress}
              onChange={(e) => setFormData(prev => ({ ...prev, businessAddress: e.target.value }))}
              placeholder="123 Main Street, City, State 12345"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Phone</Label>
              <Input
                value={formData.businessPhone}
                onChange={(e) => setFormData(prev => ({ ...prev, businessPhone: e.target.value }))}
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.businessEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, businessEmail: e.target.value }))}
                placeholder="contact@yourbakery.com"
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                value={formData.businessWebsite}
                onChange={(e) => setFormData(prev => ({ ...prev, businessWebsite: e.target.value }))}
                placeholder="www.yourbakery.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoice Defaults */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Defaults</CardTitle>
          <CardDescription>Default settings for new invoices</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Invoice Prefix</Label>
              <Input
                value={formData.invoicePrefix}
                onChange={(e) => setFormData(prev => ({ ...prev, invoicePrefix: e.target.value }))}
                placeholder="INV-"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Example: {formData.invoicePrefix}2025-001
              </p>
            </div>
            <div>
              <Label>Default Payment Terms</Label>
              <Select
                value={formData.defaultPaymentTerms}
                onValueChange={(value) => setFormData(prev => ({ ...prev, defaultPaymentTerms: value as any }))}
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
              <Label>Default Tax Rate (%)</Label>
              <Input
                type="number"
                value={formData.defaultTaxRate}
                onChange={(e) => setFormData(prev => ({ ...prev, defaultTaxRate: parseFloat(e.target.value) || 0 }))}
                placeholder="8"
              />
            </div>
          </div>

          <div>
            <Label>Default Invoice Notes</Label>
            <Textarea
              value={formData.defaultNotes}
              onChange={(e) => setFormData(prev => ({ ...prev, defaultNotes: e.target.value }))}
              placeholder="Payment is due within the specified terms..."
              rows={2}
            />
          </div>

          <div>
            <Label>Default Terms & Conditions</Label>
            <Textarea
              value={formData.defaultTerms}
              onChange={(e) => setFormData(prev => ({ ...prev, defaultTerms: e.target.value }))}
              placeholder="1. Payment must be received by the due date.&#10;2. Late payments may incur additional fees..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* PDF Layout */}
      <Card>
        <CardHeader>
          <CardTitle>PDF Layout</CardTitle>
          <CardDescription>Customize the appearance of your PDFs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Footer Text</Label>
            <Input
              value={formData.footerText}
              onChange={(e) => setFormData(prev => ({ ...prev, footerText: e.target.value }))}
              placeholder="Thank you for your business!"
            />
            <p className="text-xs text-muted-foreground mt-1">
              This text will appear at the bottom of all PDFs
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => window.location.reload()}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}
