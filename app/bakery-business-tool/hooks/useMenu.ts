'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import type { PublicMenu, MenuProduct } from '../types'

interface UseMenuReturn {
  menu: PublicMenu | null
  isLoading: boolean
  error: string | null
  saveMenu: (updates: Partial<PublicMenu>) => Promise<boolean>
  createMenu: (slug: string, businessName?: string) => Promise<boolean>
  deleteMenu: () => Promise<boolean>
  addProduct: (product: Omit<MenuProduct, 'id' | 'sortOrder'>) => void
  updateProduct: (id: string, updates: Partial<MenuProduct>) => void
  removeProduct: (id: string) => void
  reorderProducts: (products: MenuProduct[]) => void
  publishMenu: () => Promise<boolean>
  unpublishMenu: () => Promise<boolean>
  checkSlugAvailability: (slug: string) => Promise<boolean>
}

export function useMenu(): UseMenuReturn {
  const { token } = useAuth()
  const [menu, setMenu] = useState<PublicMenu | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch menu on mount or when token changes
  useEffect(() => {
    const fetchMenu = async () => {
      if (!token) {
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch('/api/menu', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setMenu(data.menu)
        } else {
          const data = await response.json()
          setError(data.error || 'Failed to fetch menu')
        }
      } catch (err) {
        setError('Failed to fetch menu')
        console.error('Error fetching menu:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMenu()
  }, [token])

  // Create new menu
  const createMenu = useCallback(async (slug: string, businessName?: string): Promise<boolean> => {
    if (!token) {
      setError('Not authenticated')
      return false
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/menu', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          slug,
          branding: businessName ? { businessName } : undefined
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMenu(data.menu)
        return true
      } else {
        setError(data.error || 'Failed to create menu')
        return false
      }
    } catch (err) {
      setError('Failed to create menu')
      console.error('Error creating menu:', err)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [token])

  // Save menu updates
  const saveMenu = useCallback(async (updates: Partial<PublicMenu>): Promise<boolean> => {
    if (!token) {
      setError('Not authenticated')
      return false
    }

    try {
      const response = await fetch('/api/menu', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })

      const data = await response.json()

      if (response.ok) {
        setMenu(data.menu)
        return true
      } else {
        setError(data.error || 'Failed to save menu')
        return false
      }
    } catch (err) {
      setError('Failed to save menu')
      console.error('Error saving menu:', err)
      return false
    }
  }, [token])

  // Delete menu
  const deleteMenu = useCallback(async (): Promise<boolean> => {
    if (!token) {
      setError('Not authenticated')
      return false
    }

    try {
      const response = await fetch('/api/menu', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setMenu(null)
        return true
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to delete menu')
        return false
      }
    } catch (err) {
      setError('Failed to delete menu')
      console.error('Error deleting menu:', err)
      return false
    }
  }, [token])

  // Add product
  const addProduct = useCallback((product: Omit<MenuProduct, 'id' | 'sortOrder'>) => {
    if (!menu) return

    const newProduct: MenuProduct = {
      ...product,
      id: `prod-${Date.now()}`,
      sortOrder: menu.products.length,
    }

    setMenu({
      ...menu,
      products: [...menu.products, newProduct],
    })
  }, [menu])

  // Update product
  const updateProduct = useCallback((id: string, updates: Partial<MenuProduct>) => {
    if (!menu) return

    setMenu({
      ...menu,
      products: menu.products.map(p => 
        p.id === id ? { ...p, ...updates } : p
      ),
    })
  }, [menu])

  // Remove product
  const removeProduct = useCallback((id: string) => {
    if (!menu) return

    setMenu({
      ...menu,
      products: menu.products.filter(p => p.id !== id),
    })
  }, [menu])

  // Reorder products
  const reorderProducts = useCallback((products: MenuProduct[]) => {
    if (!menu) return

    setMenu({
      ...menu,
      products: products.map((p, index) => ({ ...p, sortOrder: index })),
    })
  }, [menu])

  // Publish menu
  const publishMenu = useCallback(async (): Promise<boolean> => {
    return saveMenu({ isPublished: true })
  }, [saveMenu])

  // Unpublish menu
  const unpublishMenu = useCallback(async (): Promise<boolean> => {
    return saveMenu({ isPublished: false })
  }, [saveMenu])

  // Check slug availability
  const checkSlugAvailability = useCallback(async (slug: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/menu/check-slug?slug=${encodeURIComponent(slug)}`)
      const data = await response.json()
      return data.available
    } catch {
      return false
    }
  }, [])

  return {
    menu,
    isLoading,
    error,
    saveMenu,
    createMenu,
    deleteMenu,
    addProduct,
    updateProduct,
    removeProduct,
    reorderProducts,
    publishMenu,
    unpublishMenu,
    checkSlugAvailability,
  }
}
