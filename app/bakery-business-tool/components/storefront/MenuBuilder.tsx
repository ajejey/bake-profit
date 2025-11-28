'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Store, Eye, Save, Globe, Copy, QrCode, Plus, Trash2, GripVertical, Check, X, ExternalLink, Palette, Settings, Package, Phone, Loader2, AlertCircle, Sparkles, Link2, CheckCircle2, XCircle, Edit3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useMenu } from '../../hooks/useMenu'
import { useBakeryData } from '../../contexts/BakeryDataContext'
import { useAuth } from '@/contexts/AuthContext'
import { MENU_TEMPLATES, type MenuProduct } from '../../types'
import MenuRenderer from './MenuRenderer'

export default function MenuBuilder() {
  const { menu, isLoading, error, saveMenu, createMenu, addProduct, updateProduct, removeProduct, publishMenu, unpublishMenu, checkSlugAvailability } = useMenu()
  const { recipes } = useBakeryData()
  const { user } = useAuth()
  const autoCreateAttempted = useRef(false)

  const [activeTab, setActiveTab] = useState('design')
  const [showPreview, setShowPreview] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [showAddProductDialog, setShowAddProductDialog] = useState(false)
  const [newProduct, setNewProduct] = useState<Partial<MenuProduct>>({ name: '', description: '', price: 0, category: 'Cakes', isAvailable: true, isFeatured: false })
  const [showQRDialog, setShowQRDialog] = useState(false)
  const [localMenu, setLocalMenu] = useState(menu)
  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [isGeneratingShortLink, setIsGeneratingShortLink] = useState(false)
  const [shortLinkCopied, setShortLinkCopied] = useState(false)
  
  // URL editing state
  const [isEditingUrl, setIsEditingUrl] = useState(false)
  const [editedSlug, setEditedSlug] = useState('')
  const [slugStatus, setSlugStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'invalid'>('idle')
  const [isSavingSlug, setIsSavingSlug] = useState(false)
  const slugCheckTimeout = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => { setLocalMenu(menu) }, [menu])

  // Auto-create menu for new users using their business name or user name
  useEffect(() => {
    const autoCreateMenu = async () => {
      // Only attempt once, and only if no menu exists and not loading
      if (autoCreateAttempted.current || menu || isLoading) return
      autoCreateAttempted.current = true

      // Generate slug from business name or user name
      const displayName = user?.business_name || user?.name || ''
      const baseName = displayName || user?.email?.split('@')[0] || 'my-bakery'
      let slug = baseName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .slice(0, 30)

      // Ensure minimum length
      if (slug.length < 3) {
        slug = 'my-bakery'
      }

      console.log('Auto-creating menu with slug:', slug)
      // Pass business name to pre-populate branding
      let success = await createMenu(slug, displayName || undefined)
      
      // If slug is taken, try with a random suffix
      if (!success) {
        const uniqueSlug = `${slug}-${Date.now().toString(36).slice(-4)}`
        console.log('Slug taken, trying:', uniqueSlug)
        success = await createMenu(uniqueSlug, displayName || undefined)
      }
    }

    autoCreateMenu()
  }, [menu, isLoading, user, createMenu])

  const handleDragStart = (e: React.DragEvent, productId: string) => {
    setDraggedId(productId)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, targetProductId: string) => {
    e.preventDefault()
    if (!draggedId || !localMenu || draggedId === targetProductId) return

    const draggedIndex = localMenu.products.findIndex(p => p.id === draggedId)
    const targetIndex = localMenu.products.findIndex(p => p.id === targetProductId)

    if (draggedIndex === -1 || targetIndex === -1) return

    const newProducts = [...localMenu.products]
    const [draggedProduct] = newProducts.splice(draggedIndex, 1)
    newProducts.splice(targetIndex, 0, draggedProduct)

    // Update sort order
    const reorderedProducts = newProducts.map((p, idx) => ({ ...p, sortOrder: idx }))
    setLocalMenu({ ...localMenu, products: reorderedProducts })
    setDraggedId(null)
  }

  const handleDragEnd = () => {
    setDraggedId(null)
  }

  const handleSave = async () => {
    if (!localMenu) return
    setIsSaving(true)
    const success = await saveMenu(localMenu)
    setIsSaving(false)
    if (success) { setSaveSuccess(true); setTimeout(() => setSaveSuccess(false), 2000) }
  }

  const handlePublishToggle = async () => {
    if (!localMenu) return
    if (localMenu.isPublished) {
      await unpublishMenu()
    } else {
      await publishMenu()
    }
  }

  // URL editing handlers
  const handleStartEditUrl = () => {
    setEditedSlug(localMenu?.slug || '')
    setSlugStatus('idle')
    setIsEditingUrl(true)
  }

  const handleCancelEditUrl = () => {
    setIsEditingUrl(false)
    setEditedSlug('')
    setSlugStatus('idle')
  }

  const handleSlugChange = (value: string) => {
    // Sanitize input: lowercase, only allowed characters
    const sanitized = value.toLowerCase().replace(/[^a-z0-9-_]/g, '')
    setEditedSlug(sanitized)

    // Clear previous timeout
    if (slugCheckTimeout.current) {
      clearTimeout(slugCheckTimeout.current)
    }

    // Validate format
    if (sanitized.length < 3) {
      setSlugStatus('invalid')
      return
    }

    // If same as current, mark as available
    if (sanitized === localMenu?.slug) {
      setSlugStatus('available')
      return
    }

    // Debounce availability check
    setSlugStatus('checking')
    slugCheckTimeout.current = setTimeout(async () => {
      const available = await checkSlugAvailability(sanitized)
      setSlugStatus(available ? 'available' : 'taken')
    }, 500)
  }

  const handleSaveUrl = async () => {
    if (!localMenu || slugStatus !== 'available' || editedSlug === localMenu.slug) return
    
    setIsSavingSlug(true)
    const success = await saveMenu({ ...localMenu, slug: editedSlug })
    setIsSavingSlug(false)
    
    if (success) {
      setIsEditingUrl(false)
      setEditedSlug('')
      setSlugStatus('idle')
    }
  }

  const handleAddFromRecipe = (recipeId: string) => {
    const recipe = recipes.find(r => r.id === recipeId)
    if (!recipe) return
    addProduct({ recipeId: recipe.id, name: recipe.name, description: recipe.description || '', price: recipe.costPerServing * 2.5, category: recipe.category || 'Other', isAvailable: true, isFeatured: false })
  }

  const handleAddCustomProduct = () => {
    if (!newProduct.name || !newProduct.price) return
    addProduct({ name: newProduct.name, description: newProduct.description || '', price: newProduct.price, category: newProduct.category || 'Other', isAvailable: true, isFeatured: newProduct.isFeatured || false })
    setShowAddProductDialog(false)
    setNewProduct({ name: '', description: '', price: 0, category: 'Cakes', isAvailable: true, isFeatured: false })
  }

  const copyLink = () => { if (localMenu) navigator.clipboard.writeText(`${window.location.origin}/m/${localMenu.slug}`) }

  const copyShortLink = async () => {
    if (!localMenu) return
    try {
      setIsGeneratingShortLink(true)
      const fullUrl = `${window.location.origin}/m/${localMenu.slug}`
      const res = await fetch('/api/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: fullUrl })
      })
      const data = await res.json()
      if (data.shortUrl) {
        navigator.clipboard.writeText(data.shortUrl)
        setShortLinkCopied(true)
        setTimeout(() => setShortLinkCopied(false), 2000)
      }
    } catch (err) {
      console.error('Failed to generate short link:', err)
    } finally {
      setIsGeneratingShortLink(false)
    }
  }

  const getQRCodeUrl = () => localMenu ? `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(`${window.location.origin}/m/${localMenu.slug}`)}` : ''

  if (isLoading) return <div className="flex items-center justify-center h-96"><Loader2 className="h-8 w-8 animate-spin text-rose-500" /></div>

  // Show loading while auto-creating menu
  if (!menu && !isLoading) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border-2 border-dashed border-rose-200">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-4">
              <Loader2 className="h-8 w-8 text-rose-500 animate-spin" />
            </div>
            <CardTitle className="text-2xl">Setting Up Your Storefront</CardTitle>
            <CardDescription>Creating your online menu...</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-500">This will only take a moment</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!localMenu) return null

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        {/* Header with Status Banner */}
        <div className={`rounded-lg border-2 ${localMenu.isPublished ? 'border-green-200 bg-gradient-to-r from-green-50 to-emerald-50' : 'border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50'} p-4`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <Store className="h-6 w-6 text-rose-500" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold text-gray-900">My Storefront</h1>
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${localMenu.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    <div className={`w-2 h-2 rounded-full ${localMenu.isPublished ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
                    {localMenu.isPublished ? 'Live' : 'Draft'}
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {localMenu.isPublished ? `${localMenu.viewCount} views • Share your menu with customers` : 'Publish your menu to make it visible online'}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Primary Actions */}
              <div className="flex items-center gap-2 flex-1">
                <Button 
                  onClick={handleSave} 
                  disabled={isSaving} 
                  size="sm" 
                  className="bg-rose-500 hover:bg-rose-600 flex-1 sm:flex-none"
                >
                  {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : saveSuccess ? <Check className="h-4 w-4 mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                  {saveSuccess ? 'Saved!' : 'Save Changes'}
                </Button>
                <Button 
                  variant={localMenu.isPublished ? 'outline' : 'default'} 
                  size="sm" 
                  onClick={handlePublishToggle} 
                  className={`flex-1 sm:flex-none ${!localMenu.isPublished ? 'bg-green-600 hover:bg-green-700 text-white' : ''}`}
                >
                  <Globe className="mr-2 h-4 w-4" />
                  {localMenu.isPublished ? 'Unpublish' : 'Publish'}
                </Button>
              </div>

              {/* Secondary Actions */}
              {localMenu.isPublished && (
                <div className="flex items-center gap-2 justify-end">
                  <Button variant="outline" size="sm" onClick={() => window.open(`/m/${localMenu.slug}`, '_blank')}>
                    <ExternalLink className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">View Live</span>
                  </Button>
                  <Button variant="outline" size="sm" onClick={copyLink}>
                    <Copy className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Copy Link</span>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setShowQRDialog(true)}>
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              {!localMenu.isPublished && (
                <Button variant="outline" size="sm" onClick={() => setShowPreview(true)} className="sm:ml-auto">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              )}
            </div>
          </div>
        </div>

        {error && <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2"><AlertCircle className="h-5 w-5" />{error}</div>}
      </div>

      {/* Storefront URL Editor - Prominent placement for easy access */}
      <Card className="border-2 border-rose-100">
        <CardContent className="py-0">
          <div className="flex items-center gap-2 mb-3">
            <Link2 className="h-5 w-5 text-rose-500" />
            <span className="font-semibold text-gray-900">Your Storefront URL</span>
          </div>
          
          {!isEditingUrl ? (
            // Display mode
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-3 border">
                <span className="text-gray-500 text-sm">bakeprofit.vercel.app/m/</span>
                <span className="font-medium text-gray-900">{localMenu.slug}</span>
              </div>
              <Button variant="outline" onClick={handleStartEditUrl} className="shrink-0">
                <Edit3 className="mr-2 h-4 w-4" />
                Change URL
              </Button>
            </div>
          ) : (
            // Edit mode
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex items-center bg-white rounded-lg border-2 border-rose-200 focus-within:border-rose-400 transition-colors">
                  <span className="text-gray-500 text-sm pl-4 shrink-0">bakeprofit.vercel.app/m/</span>
                  <Input
                    value={editedSlug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 pl-1"
                    placeholder="your-bakery-name"
                    autoFocus
                  />
                  <div className="pr-3">
                    {slugStatus === 'checking' && <Loader2 className="h-4 w-4 animate-spin text-gray-400" />}
                    {slugStatus === 'available' && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                    {slugStatus === 'taken' && <XCircle className="h-5 w-5 text-red-500" />}
                    {slugStatus === 'invalid' && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button 
                    variant="outline" 
                    onClick={handleCancelEditUrl}
                    disabled={isSavingSlug}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSaveUrl}
                    disabled={slugStatus !== 'available' || editedSlug === localMenu.slug || isSavingSlug}
                    className="bg-rose-500 hover:bg-rose-600"
                  >
                    {isSavingSlug ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Save URL
                  </Button>
                </div>
              </div>
              
              {/* Status messages */}
              <div className="text-sm">
                {slugStatus === 'invalid' && (
                  <p className="text-yellow-600 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    URL must be at least 3 characters (letters, numbers, hyphens only)
                  </p>
                )}
                {slugStatus === 'taken' && (
                  <p className="text-red-600 flex items-center gap-1">
                    <XCircle className="h-4 w-4" />
                    This URL is already taken. Try a different one.
                  </p>
                )}
                {slugStatus === 'available' && editedSlug !== localMenu.slug && (
                  <p className="text-green-600 flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    This URL is available!
                  </p>
                )}
                {slugStatus === 'checking' && (
                  <p className="text-gray-500 flex items-center gap-1">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Checking availability...
                  </p>
                )}
              </div>
            </div>
          )}
          
          <p className="text-xs text-gray-500 mt-3">
            This is the link you&apos;ll share with customers. Choose something memorable and easy to type.
          </p>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="design"><Palette className="h-4 w-4 mr-1" /><span className="hidden sm:inline">Design</span></TabsTrigger>
          <TabsTrigger value="products"><Package className="h-4 w-4 mr-1" /><span className="hidden sm:inline">Products</span></TabsTrigger>
          <TabsTrigger value="contact"><Phone className="h-4 w-4 mr-1" /><span className="hidden sm:inline">Contact</span></TabsTrigger>
          <TabsTrigger value="settings"><Settings className="h-4 w-4 mr-1" /><span className="hidden sm:inline">Settings</span></TabsTrigger>
        </TabsList>

        <TabsContent value="design" className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Branding</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label>Business Name</Label><Input value={localMenu.branding?.businessName || ''} onChange={(e) => setLocalMenu({ ...localMenu, branding: { ...(localMenu.branding || {}), businessName: e.target.value } })} /></div>
                <div className="space-y-2"><Label>Tagline</Label><Input value={localMenu.branding?.tagline || ''} onChange={(e) => setLocalMenu({ ...localMenu, branding: { ...(localMenu.branding || {}), tagline: e.target.value } })} placeholder="Handcrafted with love" /></div>
              </div>
              <div className="space-y-2"><Label>Logo URL</Label><Input value={localMenu.branding?.logo || ''} onChange={(e) => setLocalMenu({ ...localMenu, branding: { ...(localMenu.branding || {}), logo: e.target.value } })} placeholder="https://example.com/logo.png" /></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Choose a Template</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {MENU_TEMPLATES.map((t) => (
                  <button key={t.id} onClick={() => setLocalMenu({ ...localMenu, templateId: t.id })} className={`relative p-4 rounded-xl border-2 text-left ${localMenu.templateId === t.id ? 'border-rose-500 bg-rose-50' : 'border-gray-200 hover:border-rose-300'}`}>
                    {localMenu.templateId === t.id && <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center"><Check className="h-4 w-4 text-white" /></div>}
                    <div className="flex gap-1 mb-3">{Object.values(t.colors).slice(0, 4).map((c, i) => <div key={i} className="w-6 h-6 rounded-full border" style={{ backgroundColor: c }} />)}</div>
                    <h4 className="font-semibold">{t.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{t.description}</p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Menu Items</CardTitle>
                <div className="flex gap-2">
                  <Select onValueChange={handleAddFromRecipe}><SelectTrigger className="w-[160px]"><SelectValue placeholder="Add from recipe" /></SelectTrigger><SelectContent>{recipes.map(r => <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>)}</SelectContent></Select>
                  <Button onClick={() => setShowAddProductDialog(true)}><Plus className="mr-2 h-4 w-4" />Add</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {localMenu.products.length === 0 ? (
                <div className="text-center py-12 text-gray-500"><Package className="h-12 w-12 mx-auto mb-4 opacity-50" /><p>No products yet.</p></div>
              ) : (
                <div className="space-y-3">
                  {localMenu.products.map(p => (
                    <div
                      key={p.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, p.id)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, p.id)}
                      onDragEnd={handleDragEnd}
                      className={`flex items-center gap-4 p-4 rounded-lg cursor-move transition-all ${draggedId === p.id ? 'opacity-50 bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'}`}
                    >
                      <GripVertical className={`h-5 w-5 ${draggedId === p.id ? 'text-rose-500' : 'text-gray-400'}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2"><h4 className="font-medium truncate">{p.name}</h4>{p.isFeatured && <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-700 rounded">Featured</span>}</div>
                        <p className="text-sm text-gray-500 truncate">{p.description}</p>
                      </div>
                      <div className="text-right"><p className="font-semibold">${p.price.toFixed(2)}</p><p className="text-xs text-gray-500">{p.category}</p></div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" onClick={() => updateProduct(p.id, { isFeatured: !p.isFeatured })}><Sparkles className={`h-4 w-4 ${p.isFeatured ? 'text-yellow-500' : 'text-gray-400'}`} /></Button>
                        <Button variant="ghost" size="sm" onClick={() => updateProduct(p.id, { isAvailable: !p.isAvailable })}>{p.isAvailable ? <Eye className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-gray-400" />}</Button>
                        <Button variant="ghost" size="sm" onClick={() => removeProduct(p.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label>Phone</Label><Input value={localMenu.contactInfo?.phone || ''} onChange={(e) => setLocalMenu({ ...localMenu, contactInfo: { ...(localMenu.contactInfo || {}), phone: e.target.value } })} placeholder="+1 234 567 8900" /></div>
                <div className="space-y-2"><Label>Email</Label><Input value={localMenu.contactInfo?.email || ''} onChange={(e) => setLocalMenu({ ...localMenu, contactInfo: { ...(localMenu.contactInfo || {}), email: e.target.value } })} placeholder="hello@mybakery.com" /></div>
                <div className="space-y-2"><Label>Instagram</Label><Input value={localMenu.contactInfo?.instagram || ''} onChange={(e) => setLocalMenu({ ...localMenu, contactInfo: { ...(localMenu.contactInfo || {}), instagram: e.target.value } })} placeholder="@mybakery" /></div>
                <div className="space-y-2"><Label>WhatsApp</Label><Input value={localMenu.contactInfo?.whatsapp || ''} onChange={(e) => setLocalMenu({ ...localMenu, contactInfo: { ...(localMenu.contactInfo || {}), whatsapp: e.target.value } })} placeholder="+1 234 567 8900" /></div>
              </div>
              <div className="space-y-2"><Label>Address</Label><Textarea value={localMenu.contactInfo?.address || ''} onChange={(e) => setLocalMenu({ ...localMenu, contactInfo: { ...(localMenu.contactInfo || {}), address: e.target.value } })} rows={2} /></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Display Settings</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between"><div><Label>Show Prices</Label><p className="text-sm text-gray-500">Display prices next to products</p></div><Switch checked={localMenu.showPrices} onCheckedChange={(c) => setLocalMenu({ ...localMenu, showPrices: c })} /></div>
              <div className="flex items-center justify-between"><div><Label>Show Contact Info</Label><p className="text-sm text-gray-500">Display your contact details</p></div><Switch checked={localMenu.showContactInfo} onCheckedChange={(c) => setLocalMenu({ ...localMenu, showContactInfo: c })} /></div>
              <div className="flex items-center justify-between"><div><Label>Accepting Orders</Label><p className="text-sm text-gray-500">Show that you&apos;re taking orders</p></div><Switch checked={localMenu.acceptingOrders} onCheckedChange={(c) => setLocalMenu({ ...localMenu, acceptingOrders: c })} /></div>
              <div className="flex items-center justify-between"><div><Label>Enable Order Form</Label><p className="text-sm text-gray-500">Allow customers to place orders directly from your menu</p></div><Switch checked={localMenu.orderFormEnabled} onCheckedChange={(c) => setLocalMenu({ ...localMenu, orderFormEnabled: c })} /></div>
              <div className="space-y-2"><Label htmlFor="orderLeadDays">Order Lead Days</Label><Input id="orderLeadDays" type="number" min="0" value={localMenu.orderLeadDays || 2} onChange={(e) => setLocalMenu({ ...localMenu, orderLeadDays: parseInt(e.target.value) || 2 })} className="max-w-[200px]" /><p className="text-sm text-gray-500">Minimum notice required for orders (in days)</p></div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto p-0">
          <DialogHeader className="p-4 border-b"><DialogTitle>Menu Preview</DialogTitle></DialogHeader>
          <div className="min-h-[500px]"><MenuRenderer menu={localMenu} isPreview /></div>
        </DialogContent>
      </Dialog>

      <Dialog open={showAddProductDialog} onOpenChange={setShowAddProductDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Custom Product</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2"><Label>Product Name *</Label><Input value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} /></div>
            <div className="space-y-2"><Label>Description</Label><Textarea value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} rows={2} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Price *</Label><Input type="number" step="0.01" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })} /></div>
              <div className="space-y-2"><Label>Category</Label><Select value={newProduct.category} onValueChange={(v) => setNewProduct({ ...newProduct, category: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{localMenu.categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
            </div>
            <div className="flex items-center gap-2"><Switch checked={newProduct.isFeatured} onCheckedChange={(c) => setNewProduct({ ...newProduct, isFeatured: c })} /><Label>Mark as featured</Label></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowAddProductDialog(false)}>Cancel</Button><Button onClick={handleAddCustomProduct} disabled={!newProduct.name || !newProduct.price}>Add Product</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>QR Code</DialogTitle><DialogDescription>Scan to view your menu</DialogDescription></DialogHeader>
          <div className="flex flex-col items-center py-4">
            <img src={getQRCodeUrl()} alt="QR Code" className="w-64 h-64" />
            <p className="text-sm text-gray-500 mt-4">bakeprofit.vercel.app/m/{localMenu.slug}</p>
          </div>
          <DialogFooter><Button onClick={() => { const a = document.createElement('a'); a.href = getQRCodeUrl(); a.download = `${localMenu.slug}-qr.png`; a.click() }}>Download QR</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
