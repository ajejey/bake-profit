// Settings utility functions for the bakery business tool

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
  defaultStatus: string;
  autoIncrement: boolean;
  orderPrefix: string;
  leadTime: string;
  requirePhone: boolean;
  autoSaveCustomers: boolean;
}

export interface RecipeSettings {
  defaultServings: string;
  laborCostPerHour: string;
  overheadPercentage: string;
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

// Get business settings
export function getBusinessSettings(): BusinessSettings {
  if (typeof window === 'undefined') {
    return getDefaultBusinessSettings();
  }
  
  const stored = localStorage.getItem('businessSettings');
  if (!stored) return getDefaultBusinessSettings();
  
  try {
    return { ...getDefaultBusinessSettings(), ...JSON.parse(stored) };
  } catch {
    return getDefaultBusinessSettings();
  }
}

// Get order settings
export function getOrderSettings(): OrderSettings {
  if (typeof window === 'undefined') {
    return getDefaultOrderSettings();
  }
  
  const stored = localStorage.getItem('orderSettings');
  if (!stored) return getDefaultOrderSettings();
  
  try {
    return { ...getDefaultOrderSettings(), ...JSON.parse(stored) };
  } catch {
    return getDefaultOrderSettings();
  }
}

// Get recipe settings
export function getRecipeSettings(): RecipeSettings {
  if (typeof window === 'undefined') {
    return getDefaultRecipeSettings();
  }
  
  const stored = localStorage.getItem('recipeSettings');
  if (!stored) return getDefaultRecipeSettings();
  
  try {
    return { ...getDefaultRecipeSettings(), ...JSON.parse(stored) };
  } catch {
    return getDefaultRecipeSettings();
  }
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
    overheadPercentage: '10',
    showCostBreakdown: true,
  };
}

// Format currency
export function formatCurrency(amount: number): string {
  const settings = getBusinessSettings();
  const symbol = CURRENCY_SYMBOLS[settings.currency] || '$';
  const formatted = amount.toFixed(2);
  
  return settings.currencyPosition === 'after'
    ? `${formatted} ${symbol}`
    : `${symbol}${formatted}`;
}

// Get currency symbol
export function getCurrencySymbol(): string {
  const settings = getBusinessSettings();
  return CURRENCY_SYMBOLS[settings.currency] || '$';
}

// Format date
export function formatDate(dateString: string): string {
  const settings = getBusinessSettings();
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
export function formatTime(dateString: string): string {
  const settings = getBusinessSettings();
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
export function getDefaultMarkup(): number {
  const settings = getBusinessSettings();
  return parseFloat(settings.defaultMarkup) || 150;
}

// Get tax rate
export function getTaxRate(): number {
  const settings = getBusinessSettings();
  return parseFloat(settings.taxRate) || 0;
}

// Get default labor cost per hour
export function getDefaultLaborCost(): number {
  const settings = getRecipeSettings();
  return parseFloat(settings.laborCostPerHour) || 15;
}

// Get default overhead percentage
export function getDefaultOverhead(): number {
  const settings = getRecipeSettings();
  return parseFloat(settings.overheadPercentage) || 10;
}

// Get default servings
export function getDefaultServings(): number {
  const settings = getRecipeSettings();
  return parseFloat(settings.defaultServings) || 12;
}

// Get default order status
export function getDefaultOrderStatus(): string {
  const settings = getOrderSettings();
  return settings.defaultStatus || 'new';
}

// Get order prefix
export function getOrderPrefix(): string {
  const settings = getOrderSettings();
  return settings.orderPrefix || 'ORD-';
}

// Get default lead time
export function getDefaultLeadTime(): number {
  const settings = getOrderSettings();
  return parseFloat(settings.leadTime) || 2;
}
