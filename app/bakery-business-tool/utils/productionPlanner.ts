// Production Planning Utilities
// Helps calculate production dates and estimate production times

import type { Order, Recipe } from '../types'
import { addDays, subDays, format } from 'date-fns'

/**
 * Calculate production date based on delivery date and lead time
 * @param deliveryDate - ISO date string of delivery
 * @param leadTimeDays - Number of days before delivery to start production
 * @returns ISO date string for production date
 */
export function calculateProductionDate(
    deliveryDate: string,
    leadTimeDays: number = 1
): string {
    const delivery = new Date(deliveryDate)
    const production = subDays(delivery, leadTimeDays)
    return format(production, 'yyyy-MM-dd')
}

/**
 * Estimate production duration from recipes
 * This is a basic estimate - can be enhanced with more sophisticated calculations
 * @param recipes - Array of recipes
 * @returns Estimated hours needed for production
 */
export function estimateProductionDuration(recipes: Recipe[]): number {
    return recipes.reduce((total, recipe) => {
        // Use laborTime if available, otherwise estimate from prep + cook times
        if (recipe.laborTime) {
            return total + (recipe.laborTime / 60) // Convert minutes to hours
        }

        const prepTime = recipe.prepTime || 0
        const cookTime = recipe.cookTime || 0
        const coolTime = recipe.coolTime || 0

        // Total time in hours
        return total + ((prepTime + cookTime + coolTime) / 60)
    }, 0)
}

/**
 * Group orders by production date
 * @param orders - Array of orders
 * @param leadTimeDays - Default lead time if order doesn't have productionDate
 * @returns Map of production date to orders
 */
export function groupOrdersByProductionDate(
    orders: Order[],
    leadTimeDays: number = 1
): Map<string, Order[]> {
    const grouped = new Map<string, Order[]>()

    orders.forEach(order => {
        // Use existing productionDate or calculate it
        const prodDate = order.productionDate || calculateProductionDate(order.deliveryDate, leadTimeDays)

        if (!grouped.has(prodDate)) {
            grouped.set(prodDate, [])
        }
        grouped.get(prodDate)!.push(order)
    })

    return grouped
}

/**
 * Calculate total production hours for a date
 * @param orders - Orders for that date
 * @returns Total hours needed
 */
export function calculateDailyProductionHours(orders: Order[]): number {
    return orders.reduce((total, order) => {
        return total + (order.productionDuration || 0)
    }, 0)
}

/**
 * Check if a date is over capacity
 * @param orders - Orders for that date
 * @param dailyCapacity - Maximum hours per day
 * @returns Object with capacity info
 */
export function checkCapacity(
    orders: Order[],
    dailyCapacity: number
): {
    used: number
    available: number
    percentage: number
    isOverCapacity: boolean
    isNearCapacity: boolean
} {
    const used = calculateDailyProductionHours(orders)
    const available = dailyCapacity - used
    const percentage = dailyCapacity > 0 ? (used / dailyCapacity) * 100 : 0

    return {
        used,
        available,
        percentage,
        isOverCapacity: used > dailyCapacity,
        isNearCapacity: percentage >= 80 && percentage < 100,
    }
}

/**
 * Suggest batch production opportunities
 * Finds orders with the same recipes that could be baked together
 * @param orders - Orders to analyze
 * @returns Array of batch suggestions
 */
export function suggestBatchProduction(orders: Order[]): Array<{
    recipeId: string
    recipeName: string
    totalQuantity: number
    orderIds: string[]
    productionDate: string
}> {
    const batches = new Map<string, {
        recipeName: string
        totalQuantity: number
        orderIds: string[]
        productionDate: string
    }>()

    orders.forEach(order => {
        const prodDate = order.productionDate || ''

        order.items.forEach(item => {
            const key = `${item.recipeId}-${prodDate}`

            if (!batches.has(key)) {
                batches.set(key, {
                    recipeName: item.recipeName,
                    totalQuantity: 0,
                    orderIds: [],
                    productionDate: prodDate,
                })
            }

            const batch = batches.get(key)!
            batch.totalQuantity += item.quantity
            if (!batch.orderIds.includes(order.id)) {
                batch.orderIds.push(order.id)
            }
        })
    })

    // Filter to only show batches with 2+ orders
    return Array.from(batches.entries())
        .filter(([_, batch]) => batch.orderIds.length >= 2)
        .map(([key, batch]) => ({
            recipeId: key.split('-')[0],
            ...batch,
        }))
}

/**
 * Get suggested production dates for a delivery date
 * Based on recipe complexity and lead time
 * @param deliveryDate - Delivery date
 * @param estimatedHours - Estimated production hours
 * @param defaultLeadTime - Default lead time in days
 * @returns Array of suggested production dates with reasoning
 */
export function getSuggestedProductionDates(
    deliveryDate: string,
    estimatedHours: number,
    defaultLeadTime: number = 1
): Array<{
    date: string
    label: string
    recommended: boolean
    reason: string
}> {
    const delivery = new Date(deliveryDate)
    const suggestions = []

    // Calculate lead time based on complexity
    let recommendedLeadTime = defaultLeadTime
    if (estimatedHours > 8) {
        recommendedLeadTime = 3 // Complex orders need more time
    } else if (estimatedHours > 4) {
        recommendedLeadTime = 2
    }

    // Generate suggestions
    for (let i = 1; i <= 4; i++) {
        const prodDate = subDays(delivery, i)
        const dateStr = format(prodDate, 'yyyy-MM-dd')
        const isRecommended = i === recommendedLeadTime

        let reason = ''
        if (i === 1) {
            reason = 'Tight timeline - for simple orders only'
        } else if (i === 2) {
            reason = 'Standard lead time - recommended for most orders'
        } else if (i === 3) {
            reason = 'Extra time - recommended for complex orders'
        } else {
            reason = 'Early preparation - good for advance planning'
        }

        suggestions.push({
            date: dateStr,
            label: format(prodDate, 'EEEE, MMM d'),
            recommended: isRecommended,
            reason,
        })
    }

    return suggestions
}
