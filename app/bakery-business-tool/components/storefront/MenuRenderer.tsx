'use client'

import React from 'react'
import type { PublicMenu, MenuTemplateId } from '../../types'
import {
  ElegantFloralTemplate,
  ModernMinimalTemplate,
  RusticKraftTemplate,
  PlayfulPastelTemplate,
} from './templates'

interface MenuRendererProps {
  menu: PublicMenu
  isPreview?: boolean
}

// Template component mapping
const templateComponents: Record<MenuTemplateId, React.ComponentType<{ menu: PublicMenu; isPreview?: boolean }>> = {
  'elegant-floral': ElegantFloralTemplate,
  'modern-minimal': ModernMinimalTemplate,
  'rustic-kraft': RusticKraftTemplate,
  'playful-pastel': PlayfulPastelTemplate,
}

export default function MenuRenderer({ menu, isPreview = false }: MenuRendererProps) {
  const TemplateComponent = templateComponents[menu.templateId] || ElegantFloralTemplate
  
  return <TemplateComponent menu={menu} isPreview={isPreview} />
}
