'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import type { PublicMenu } from '../../types'
import OrderFormDialog from './OrderFormDialog'

// Dynamically import templates
const ElegantFloralTemplate = dynamic(() => import('./templates/ElegantFloralTemplate'))
const ModernMinimalTemplate = dynamic(() => import('./templates/ModernMinimalTemplate'))
const RusticKraftTemplate = dynamic(() => import('./templates/RusticKraftTemplate'))
const PlayfulPastelTemplate = dynamic(() => import('./templates/PlayfulPastelTemplate'))
const ParisianNoirTemplate = dynamic(() => import('./templates/ParisianNoirTemplate'))
const BentoGridTemplate = dynamic(() => import('./templates/BentoGridTemplate'))

interface MenuRendererProps {
  menu: PublicMenu
  isPreview?: boolean
}

export default function MenuRenderer({ menu, isPreview = false }: MenuRendererProps) {
  const [showOrderForm, setShowOrderForm] = useState(false)

  const templates = {
    'elegant-floral': ElegantFloralTemplate,
    'modern-minimal': ModernMinimalTemplate,
    'rustic-kraft': RusticKraftTemplate,
    'playful-pastel': PlayfulPastelTemplate,
    'parisian-noir': ParisianNoirTemplate,
    'bento-grid': BentoGridTemplate,
  }

  const TemplateComponent = templates[menu.templateId] || ElegantFloralTemplate

  return (
    <>
      {/* Fixed Order Button for mobile/desktop */}
      {!isPreview && menu.orderFormEnabled && menu.acceptingOrders && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setShowOrderForm(true)}
            size="lg"
            className="bg-rose-500 hover:bg-rose-600 text-white shadow-lg hover:shadow-xl transition-all rounded-full px-6 py-6 flex items-center gap-2"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="font-semibold">Order Now</span>
          </Button>
        </div>
      )}

      {/* Template */}
      <TemplateComponent menu={menu} />

      {/* Order Form Dialog */}
      {!isPreview && menu.orderFormEnabled && (
        <OrderFormDialog
          menu={menu}
          isOpen={showOrderForm}
          onClose={() => setShowOrderForm(false)}
        />
      )}
    </>
  )
}
