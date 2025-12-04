// Export all custom hooks from a single entry point
export { useRecipes } from './useRecipes'
export { useOrders } from './useOrders'
export { useCustomers } from './useCustomers'
export { useIngredients } from './useIngredients'
export { useInventory } from './useInventory'
export { usePricing } from './usePricing'
export { useBatchSizes } from './useBatchSizes'
export { useAnalytics } from './useAnalytics'
export { useInvoices } from './useInvoices'
export { usePDFCustomization } from './usePDFCustomization'
export { useBakeryData } from '../contexts/BakeryDataContext'
export {
  useBusinessSettings,
  useOrderSettings,
  useRecipeSettings,
  useFormattedCurrency,
  useCurrencySymbol,
  useDefaultMarkup,
  useTaxRate,
  useDefaultLaborCost,
  useDefaultOverhead,
  useDefaultServings,
  useDefaultOrderStatus,
  useOrderPrefix,
  useDefaultLeadTime,
  useRequirePhone,
  useAutoSaveCustomers,
  useShowCostBreakdown,
  usePreferredWeightUnit,
  usePreferredVolumeUnit,
  useFormattedDate,
  useFormattedTime,
  useDateFormat,
} from './useSettings'
export { useCalendarSettings } from './useCalendarSettings'
export { useSyncedSettings, setBusinessSettingsSynced, setOrderSettingsSynced, setRecipeSettingsSynced, setAppearanceSettingsSynced, setNotificationSettingsSynced, setCalendarSettingsSynced, setPDFCustomizationSynced } from './useSyncedSettings'
