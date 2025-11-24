// Settings utility functions for the bakery business tool
import { StorageAdapter } from './indexedDBAdapter'

export interface BusinessSettings {
  currency: string;
  currencyPosition: 'before' | 'after';
  defaultMarkup: string;
  taxRate: string;
  dateFormat: string;
  timeFormat: string;
  timezone: string;
  weekStart: string;
  weightSystem: string;
  volumeSystem: string;
  temperature: string;
}

export interface OrderSettings {
  defaultStatus: 'new' | 'in-progress' | 'ready' | 'delivered' | 'cancelled';
  autoIncrement: boolean;
  orderPrefix: string;
  leadTime: string;
  requirePhone: boolean;
  autoSaveCustomers: boolean;
}

export interface RecipeSettings {
  defaultServings: string;
  laborCostPerHour: string;
  overheadCost: string;
  showCostBreakdown: boolean;
}

// Currency symbols mapping
const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
  CAD: 'C$',
  AUD: 'A$',
};

export interface AppearanceSettings {
  theme: 'light' | 'dark' | 'auto';
  displayDensity: 'compact' | 'comfortable' | 'spacious';
}

export interface NotificationSettings {
  lowStockAlerts: boolean;
  upcomingDeliveries: boolean;
  usageLimitWarnings: boolean;
}


// Get business settings
export async function getBusinessSettings(): Promise<BusinessSettings> {
  if (typeof window === 'undefined') {
    return getDefaultBusinessSettings();
  }

  const stored = await StorageAdapter.getItem('businessSettings');
  if (!stored) return getDefaultBusinessSettings();

  try {
    return { ...getDefaultBusinessSettings(), ...JSON.parse(stored) };
  } catch {
    return getDefaultBusinessSettings();
  }
}

// Get order settings
export async function getOrderSettings(): Promise<OrderSettings> {
  if (typeof window === 'undefined') {
    return getDefaultOrderSettings();
  }

  const stored = await StorageAdapter.getItem('orderSettings');
  if (!stored) return getDefaultOrderSettings();

  try {
    return { ...getDefaultOrderSettings(), ...JSON.parse(stored) };
  } catch {
    return getDefaultOrderSettings();
  }
}

// Get recipe settings
export async function getRecipeSettings(): Promise<RecipeSettings> {
  if (typeof window === 'undefined') {
    return getDefaultRecipeSettings();
  }

  const stored = await StorageAdapter.getItem('recipeSettings');
  if (!stored) return getDefaultRecipeSettings();

  try {
    return { ...getDefaultRecipeSettings(), ...JSON.parse(stored) };
  } catch {
    return getDefaultRecipeSettings();
  }
}

// Get appearance settings
export async function getAppearanceSettings(): Promise<AppearanceSettings> {
  if (typeof window === 'undefined') {
    return getDefaultAppearanceSettings();
  }

  const stored = await StorageAdapter.getItem('appearanceSettings');
  if (!stored) return getDefaultAppearanceSettings();

  try {
    return { ...getDefaultAppearanceSettings(), ...JSON.parse(stored) };
  } catch {
    return getDefaultAppearanceSettings();
  }
}

// Get notification settings
export async function getNotificationSettings(): Promise<NotificationSettings> {
  if (typeof window === 'undefined') {
    return getDefaultNotificationSettings();
  }

  const stored = await StorageAdapter.getItem('notificationSettings');
  if (!stored) return getDefaultNotificationSettings();

  try {
    return { ...getDefaultNotificationSettings(), ...JSON.parse(stored) };
  } catch {
    return getDefaultNotificationSettings();
  }
}

// Set business settings
export async function setBusinessSettings(settings: BusinessSettings): Promise<void> {
  await StorageAdapter.setItem('businessSettings', JSON.stringify(settings));
}

// Set order settings
export async function setOrderSettings(settings: OrderSettings): Promise<void> {
  await StorageAdapter.setItem('orderSettings', JSON.stringify(settings));
}

// Set recipe settings
export async function setRecipeSettings(settings: RecipeSettings): Promise<void> {
  await StorageAdapter.setItem('recipeSettings', JSON.stringify(settings));
}

// Set appearance settings
export async function setAppearanceSettings(settings: AppearanceSettings): Promise<void> {
  await StorageAdapter.setItem('appearanceSettings', JSON.stringify(settings));
}

// Set notification settings
export async function setNotificationSettings(settings: NotificationSettings): Promise<void> {
  await StorageAdapter.setItem('notificationSettings', JSON.stringify(settings));
}

// Default settings
function getDefaultBusinessSettings(): BusinessSettings {
  return {
    currency: 'USD',
    currencyPosition: 'before',
    defaultMarkup: '150',
    taxRate: '0',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12',
    timezone: 'America/New_York',
    weekStart: 'sunday',
    weightSystem: 'imperial',
    volumeSystem: 'imperial',
    temperature: 'fahrenheit',
  };
}

function getDefaultOrderSettings(): OrderSettings {
  return {
    defaultStatus: 'new',
    autoIncrement: true,
    orderPrefix: 'ORD-',
    leadTime: '2',
    requirePhone: false,
    autoSaveCustomers: true,
  };
}

function getDefaultRecipeSettings(): RecipeSettings {
  return {
    defaultServings: '12',
    laborCostPerHour: '15',
    overheadCost: '10',
    showCostBreakdown: true,
  };
}

function getDefaultAppearanceSettings(): AppearanceSettings {
  return {
    theme: 'light',
    displayDensity: 'comfortable',
  };
}

function getDefaultNotificationSettings(): NotificationSettings {
  return {
    lowStockAlerts: true,
    upcomingDeliveries: true,
    usageLimitWarnings: true,
  };
}

// Format currency
export async function formatCurrency(amount: number): Promise<string> {
  const settings = await getBusinessSettings();
  const symbol = CURRENCY_SYMBOLS[settings.currency] || '$';
  const formatted = amount.toFixed(2);

  return settings.currencyPosition === 'after'
    ? `${formatted} ${symbol}`
    : `${symbol}${formatted}`;
}

// Get currency symbol
export async function getCurrencySymbol(): Promise<string> {
  const settings = await getBusinessSettings();
  return CURRENCY_SYMBOLS[settings.currency] || '$';
}

// Format date
export async function formatDate(dateString: string): Promise<string> {
  const settings = await getBusinessSettings();
  const date = new Date(dateString);

  if (isNaN(date.getTime())) return dateString;

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  switch (settings.dateFormat) {
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'MM/DD/YYYY':
    default:
      return `${month}/${day}/${year}`;
  }
}

// Format time
export async function formatTime(dateString: string): Promise<string> {
  const settings = await getBusinessSettings();
  const date = new Date(dateString);

  if (isNaN(date.getTime())) return dateString;

  if (settings.timeFormat === '24') {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  return date.toLocaleTimeString('en-US', {
    hour12: true,
    hour: 'numeric',
    minute: '2-digit'
  });
}

// Get default markup percentage
export async function getDefaultMarkup(): Promise<number> {
  const settings = await getBusinessSettings();
  return parseFloat(settings.defaultMarkup) || 150;
}

// Get tax rate
export async function getTaxRate(): Promise<number> {
  const settings = await getBusinessSettings();
  return parseFloat(settings.taxRate) || 0;
}

// Get default labor cost per hour
export async function getDefaultLaborCost(): Promise<number> {
  const settings = await getRecipeSettings();
  return parseFloat(settings.laborCostPerHour) || 15;
}

// Get default overhead cost
export async function getDefaultOverhead(): Promise<number> {
  const settings = await getRecipeSettings();
  return parseFloat(settings.overheadCost) || 10;
}

// Get default servings
export async function getDefaultServings(): Promise<number> {
  const settings = await getRecipeSettings();
  return parseFloat(settings.defaultServings) || 12;
}

// Get default order status
export async function getDefaultOrderStatus(): Promise<'new' | 'in-progress' | 'ready' | 'delivered' | 'cancelled'> {
  const settings = await getOrderSettings();
  const status = settings.defaultStatus || 'new';

  // Ensure the status is one of the valid order statuses
  const validStatuses: readonly ('new' | 'in-progress' | 'ready' | 'delivered' | 'cancelled')[] =
    ['new', 'in-progress', 'ready', 'delivered', 'cancelled'] as const;

  const typedStatus = status as 'new' | 'in-progress' | 'ready' | 'delivered' | 'cancelled';
  return validStatuses.includes(typedStatus) ? typedStatus : 'new';
}

// Get order prefix
export async function getOrderPrefix(): Promise<string> {
  const settings = await getOrderSettings();
  return settings.orderPrefix || 'ORD-';
}

// Get default lead time
export async function getDefaultLeadTime(): Promise<number> {
  const settings = await getOrderSettings();
  return parseFloat(settings.leadTime) || 2;
}
