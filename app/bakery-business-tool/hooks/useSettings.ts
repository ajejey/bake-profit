'use client'

import { useState, useEffect } from 'react'
import {
  getBusinessSettings,
  getOrderSettings,
  getRecipeSettings,
  formatCurrency,
  getCurrencySymbol,
  getDefaultMarkup,
  getTaxRate,
  getDefaultLaborCost,
  getDefaultOverhead,
  getDefaultServings,
  getDefaultOrderStatus,
  getOrderPrefix,
  getDefaultLeadTime,
  formatDate,
  formatTime,
} from '../utils/settings'
import type { BusinessSettings, OrderSettings, RecipeSettings } from '../utils/settings'

export function useBusinessSettings() {
  const [settings, setSettings] = useState<BusinessSettings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBusinessSettings().then(setSettings).finally(() => setLoading(false))
  }, [])

  return { settings, loading }
}

export function useOrderSettings() {
  const [settings, setSettings] = useState<OrderSettings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getOrderSettings().then(setSettings).finally(() => setLoading(false))
  }, [])

  return { settings, loading }
}

export function useRecipeSettings() {
  const [settings, setSettings] = useState<RecipeSettings | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRecipeSettings().then(setSettings).finally(() => setLoading(false))
  }, [])

  return { settings, loading }
}

export function useFormattedCurrency() {
  return async (amount: number) => formatCurrency(amount)
}

export function useCurrencySymbol() {
  const [symbol, setSymbol] = useState('$')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCurrencySymbol().then(setSymbol).finally(() => setLoading(false))
  }, [])

  return { symbol, loading }
}

export function useDefaultMarkup() {
  const [markup, setMarkup] = useState(150)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDefaultMarkup().then(setMarkup).finally(() => setLoading(false))
  }, [])

  return { markup, loading }
}

export function useTaxRate() {
  const [taxRate, setTaxRate] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTaxRate().then(setTaxRate).finally(() => setLoading(false))
  }, [])

  return { taxRate, loading }
}

export function useDefaultLaborCost() {
  const [laborCost, setLaborCost] = useState(15)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDefaultLaborCost().then(setLaborCost).finally(() => setLoading(false))
  }, [])

  return { laborCost, loading }
}

export function useDefaultOverhead() {
  const [overhead, setOverhead] = useState(10)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDefaultOverhead().then(setOverhead).finally(() => setLoading(false))
  }, [])

  return { overhead, loading }
}

export function useDefaultServings() {
  const [servings, setServings] = useState(12)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDefaultServings().then(setServings).finally(() => setLoading(false))
  }, [])

  return { servings, loading }
}

export function useDefaultOrderStatus() {
  const [status, setStatus] = useState<'new' | 'in-progress' | 'ready' | 'delivered' | 'cancelled'>('new')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDefaultOrderStatus().then(setStatus).finally(() => setLoading(false))
  }, [])

  return { status, loading }
}

export function useOrderPrefix() {
  const [prefix, setPrefix] = useState('ORD-')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getOrderPrefix().then(setPrefix).finally(() => setLoading(false))
  }, [])

  return { prefix, loading }
}

export function useDefaultLeadTime() {
  const [leadTime, setLeadTime] = useState(2)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDefaultLeadTime().then(setLeadTime).finally(() => setLoading(false))
  }, [])

  return { leadTime, loading }
}

export function useFormattedDate() {
  return async (dateString: string) => formatDate(dateString)
}

export function useFormattedTime() {
  return async (dateString: string) => formatTime(dateString)
}
