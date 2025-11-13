# 🔢 Calculation Verification Checklist
## Bakery Business Tool - Critical Calculations Audit

> **CRITICAL**: These calculations are the core of the application. Any errors here will cause complete failure of the product's value proposition.

---

## 📋 Table of Contents
1. [Ingredient Cost Calculations](#1-ingredient-cost-calculations)
2. [Recipe Cost Calculations](#2-recipe-cost-calculations)
3. [Pricing Calculations](#3-pricing-calculations)
4. [Order Calculations](#4-order-calculations)
5. [Revenue & Profit Calculations](#5-revenue--profit-calculations)
6. [Unit Conversion Calculations](#6-unit-conversion-calculations)
7. [Sample Data Verification](#7-sample-data-verification)

---

## 1. Ingredient Cost Calculations

### 📍 Location
- **File**: `app/bakery-business-tool/components/InventoryManager.tsx`
- **Lines**: 138, 169
- **Hook**: `app/bakery-business-tool/hooks/useIngredients.ts` (lines 39-41)

### 🧮 Formula
```typescript
costPerUnit = packageCost / packageSize
```

### ✅ Manual Verification Steps

#### Test Case 1: Butter
```
Input:
- Package Cost: $4.50
- Package Size: 454 g
- Unit: g

Expected Output:
costPerUnit = 4.50 / 454 = 0.00991 ≈ $0.01/g (displayed with 2 decimals)

Steps:
1. Go to Inventory Manager → Ingredients tab
2. Click "Add Ingredient"
3. Enter: Name="Test Butter", Package Size=454, Unit=g, Package Cost=4.50
4. Save and verify "Cost per Unit" column shows "$0.01/g"
```

#### Test Case 2: Baking Powder
```
Input:
- Package Cost: $3.50
- Package Size: 227 g
- Unit: g

Expected Output:
costPerUnit = 3.50 / 227 = 0.01542 ≈ $0.02/g

Steps:
1. Add ingredient with above values
2. Verify displays "$0.02/g"
```

#### Test Case 3: Eggs (Count Units)
```
Input:
- Package Cost: $4.20
- Package Size: 12 unit
- Unit: unit

Expected Output:
costPerUnit = 4.20 / 12 = 0.35 = $0.35/unit

Steps:
1. Add ingredient with above values
2. Verify displays "$0.35/unit"
```

### 🚨 Common Errors to Check
- [ ] String vs Number type coercion (form inputs must use `parseFloat`)
- [ ] Division by zero (packageSize = 0)
- [ ] Negative values
- [ ] Very small numbers displaying as $0.00 (precision issue)

### 🔍 Code Review Checklist
- [ ] Form inputs use `onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}`
- [ ] Zod schema validates `packageSize` and `packageCost` as positive numbers
- [ ] Display uses `.toFixed(2)` for currency formatting
- [ ] No hardcoded cost values (must always be calculated)

---

## 2. Recipe Cost Calculations

### 📍 Location
- **File**: `app/bakery-business-tool/components/RecipeCalculator.tsx`
- **Lines**: 259, 283-286, 289-291, 307-308

### 🧮 Formulas
```typescript
// 1. Recipe Ingredient Cost
recipeIngredient.cost = convertedQuantity × ingredient.cost

// 2. Total Recipe Cost
totalRecipeCost = sum(all ingredient costs) + laborCost + overheadCost

// 3. Cost Per Serving
costPerServing = totalRecipeCost / servings
```

### ✅ Manual Verification Steps

#### Test Case 1: Simple Chocolate Cake
```
Ingredients:
- Flour: 300g × $0.0018/g = $0.54
- Sugar: 250g × $0.0015/g = $0.375 ≈ $0.38
- Butter: 150g × $0.00991/g = $1.4865 ≈ $1.49
- Eggs: 3 unit × $0.35/unit = $1.05

Labor Cost: $10.00
Overhead Cost: $5.00
Servings: 12

Expected Output:
ingredientsCost = 0.54 + 0.38 + 1.49 + 1.05 = $3.46
totalRecipeCost = 3.46 + 10.00 + 5.00 = $18.46
costPerServing = 18.46 / 12 = $1.54

Steps:
1. Go to Recipe Calculator
2. Click "Add Recipe"
3. Add each ingredient with quantities above
4. Set Labor Cost = 10, Overhead = 5, Servings = 12
5. Save recipe
6. Verify:
   - Total Cost shows $18.46
   - Cost Per Serving shows $1.54
```

#### Test Case 2: Recipe with Unit Conversion
```
Ingredients:
- Flour: 1 lb (should convert to 453.592g)
  - 453.592g × $0.0018/g = $0.816 ≈ $0.82

Steps:
1. Add ingredient with quantity=1, unit=lb
2. Verify conversion happens correctly
3. Check final cost matches expected
```

### 🚨 Common Errors to Check
- [ ] Unit conversion errors (see section 6)
- [ ] Ingredient costs not recalculated when ingredient prices change
- [ ] Division by zero (servings = 0)
- [ ] Floating-point precision issues (sum of many small numbers)
- [ ] Missing ingredients in total cost calculation

### 🔍 Code Review Checklist
- [ ] `convertUnit()` function uses correct conversion table
- [ ] All ingredient costs are summed using `.reduce()`
- [ ] Labor and overhead are added to ingredient costs
- [ ] Cost per serving handles servings > 0 check
- [ ] Recipe updates recalculate all costs

---

## 3. Pricing Calculations

### 📍 Location
- **File**: `app/bakery-business-tool/hooks/usePricing.ts`
- **Lines**: 17-36, 42-106, 111-128, 158-169

### 🧮 Formulas
```typescript
// 1. Suggested Price (Industry Standard)
suggestedPrice = totalCost × 2.8  // 2.8x markup

// 2. Profit Margin Percentage
profitMargin = ((price - cost) / price) × 100

// 3. Target Price from Margin
price = cost / (1 - marginPercentage / 100)

// 4. Multiplier
multiplier = price / cost
```

### ✅ Manual Verification Steps

#### Test Case 1: Standard Markup
```
Input:
- Recipe Total Cost: $18.46

Expected Outputs:
suggestedPrice = 18.46 × 2.8 = $51.69
profitMargin = ((51.69 - 18.46) / 51.69) × 100 = 64.29%

Steps:
1. Go to Pricing Calculator
2. Select the test recipe (cost $18.46)
3. Verify "Suggested Price" shows $51.69
4. Verify profit margin shows ~64%
```

#### Test Case 2: Custom Target Margin
```
Input:
- Recipe Total Cost: $18.46
- Target Margin: 50%

Expected Output:
price = 18.46 / (1 - 0.50) = 18.46 / 0.50 = $36.92

Steps:
1. In Pricing Calculator, set custom margin to 50%
2. Verify calculated price is $36.92
```

#### Test Case 3: Pricing Strategies
```
Cost-Plus (2.5x): 18.46 × 2.5 = $46.15
Premium (3.5x): 18.46 × 3.5 = $64.61
Value (2.0x): 18.46 × 2.0 = $36.92

Steps:
1. View pricing comparisons
2. Verify all three strategies show correct prices
3. Verify margin percentages are correct
```

### 🚨 Common Errors to Check
- [ ] Margin calculation formula inverted
- [ ] Division by zero in margin calculations
- [ ] Negative margins not flagged
- [ ] Multiplier calculation incorrect
- [ ] Psychological pricing rounding errors

### 🔍 Code Review Checklist
- [ ] Markup multipliers are correct (2.5x, 2.8x, 3.5x)
- [ ] Margin formula: `(price - cost) / price × 100`
- [ ] Target price formula: `cost / (1 - margin/100)`
- [ ] All comparisons sorted by profit
- [ ] Low margin warnings (< 40%) are shown

---

## 4. Order Calculations

### 📍 Location
- **File**: `app/bakery-business-tool/components/OrderTracker.tsx`
- **Lines**: 123-127, 188-190

### 🧮 Formulas
```typescript
// 1. Order Item Calculations
costPerUnit = recipe.totalCost
pricePerUnit = sellingPrice (user input)
subtotalCost = costPerUnit × quantity
subtotalRevenue = pricePerUnit × quantity
profit = subtotalRevenue - subtotalCost

// 2. Order Totals
totalCost = sum(all item subtotalCosts)
totalRevenue = sum(all item subtotalRevenues)
totalProfit = totalRevenue - totalCost
```

### ✅ Manual Verification Steps

#### Test Case 1: Single Item Order
```
Input:
- Recipe: Chocolate Cake (cost $18.46)
- Quantity: 2
- Selling Price: $50.00

Expected Outputs:
costPerUnit = $18.46
pricePerUnit = $50.00
subtotalCost = 18.46 × 2 = $36.92
subtotalRevenue = 50.00 × 2 = $100.00
profit = 100.00 - 36.92 = $63.08

Steps:
1. Go to Order Tracker
2. Click "New Order"
3. Add item with above values
4. Verify all calculations in order summary
```

#### Test Case 2: Multi-Item Order
```
Items:
1. Chocolate Cake: qty=2, cost=$18.46, price=$50.00
   - subtotalCost = $36.92
   - subtotalRevenue = $100.00
   - profit = $63.08

2. Vanilla Cupcakes: qty=1, cost=$20.93, price=$35.00
   - subtotalCost = $20.93
   - subtotalRevenue = $35.00
   - profit = $14.07

Expected Order Totals:
totalCost = 36.92 + 20.93 = $57.85
totalRevenue = 100.00 + 35.00 = $135.00
totalProfit = 135.00 - 57.85 = $77.15

Steps:
1. Create order with both items
2. Verify order totals match expected
```

### 🚨 Common Errors to Check
- [ ] Quantity not multiplied correctly
- [ ] Profit calculation wrong (should be revenue - cost, not cost - revenue)
- [ ] Order totals not summing all items
- [ ] Negative profits not flagged
- [ ] Default markup (2.5x) not applied when price not set

### 🔍 Code Review Checklist
- [ ] `costPerUnit` comes from `recipe.totalCost`
- [ ] `subtotalCost` = `costPerUnit × quantity`
- [ ] `subtotalRevenue` = `pricePerUnit × quantity`
- [ ] `profit` = `revenue - cost` (not inverted)
- [ ] Order totals use `.reduce()` to sum all items

---

## 5. Revenue & Profit Calculations

### 📍 Location
- **File**: `app/bakery-business-tool/hooks/useOrders.ts`
- **Lines**: 60-71
- **File**: `app/bakery-business-tool/components/Dashboard.tsx`

### 🧮 Formulas
```typescript
// Only count delivered orders
totalRevenue = sum(order.totalRevenue) where status = 'delivered'
totalProfit = sum(order.totalProfit) where status = 'delivered'
```

### ✅ Manual Verification Steps

#### Test Case 1: Revenue Calculation
```
Orders:
1. Order #1: status='delivered', totalRevenue=$100.00
2. Order #2: status='delivered', totalRevenue=$135.00
3. Order #3: status='in-progress', totalRevenue=$50.00 (should NOT count)

Expected Output:
totalRevenue = 100.00 + 135.00 = $235.00

Steps:
1. Create 3 orders with above values
2. Mark first two as 'delivered'
3. Go to Dashboard
4. Verify "Total Revenue" shows $235.00
```

#### Test Case 2: Profit Calculation
```
Orders:
1. Order #1: status='delivered', totalProfit=$63.08
2. Order #2: status='delivered', totalProfit=$77.15
3. Order #3: status='cancelled', totalProfit=$20.00 (should NOT count)

Expected Output:
totalProfit = 63.08 + 77.15 = $140.23

Steps:
1. Verify Dashboard shows correct total profit
2. Ensure cancelled orders don't count
```

### 🚨 Common Errors to Check
- [ ] Non-delivered orders counted in totals
- [ ] Cancelled orders counted
- [ ] Negative profits not handled
- [ ] Filter not applied correctly

### 🔍 Code Review Checklist
- [ ] Revenue filter: `status === 'delivered'`
- [ ] Profit filter: `status === 'delivered'`
- [ ] Uses `.reduce()` for summing
- [ ] No hardcoded values
- [ ] Dashboard displays match hook calculations

---

## 6. Unit Conversion Calculations

### 📍 Location
- **File**: `app/bakery-business-tool/components/RecipeCalculator.tsx`
- **Lines**: 118-154

### 🧮 Formula
```typescript
convertedValue = value × conversionFactor
```

### 📊 Conversion Table Verification

#### Weight Conversions
```
✅ VERIFY THESE:
1 g → kg: 1 × 0.001 = 0.001 kg
1 kg → g: 1 × 1000 = 1000 g
1 oz → g: 1 × 28.3495 = 28.3495 g
1 lb → g: 1 × 453.592 = 453.592 g
1 lb → oz: 1 × 16 = 16 oz
```

#### Volume Conversions
```
✅ VERIFY THESE:
1 ml → l: 1 × 0.001 = 0.001 l
1 l → ml: 1 × 1000 = 1000 ml
1 cup → ml: 1 × 236.588 = 236.588 ml
1 tbsp → ml: 1 × 14.7868 = 14.7868 ml
1 tsp → ml: 1 × 4.92892 = 4.92892 ml
1 cup → tbsp: 1 × 16 = 16 tbsp
```

### ✅ Manual Verification Steps

#### Test Case 1: Weight Conversion
```
Input:
- Add 1 lb of flour to recipe
- Flour cost: $0.0018/g

Expected:
1 lb = 453.592 g
cost = 453.592 × 0.0018 = $0.816 ≈ $0.82

Steps:
1. Add flour ingredient with quantity=1, unit=lb
2. Verify converted quantity is 453.592g
3. Verify cost is $0.82
```

#### Test Case 2: Volume Conversion
```
Input:
- Add 2 cups of milk to recipe
- Milk cost: $0.0037/ml

Expected:
2 cups = 2 × 236.588 = 473.176 ml
cost = 473.176 × 0.0037 = $1.75

Steps:
1. Add milk with quantity=2, unit=cup
2. Verify converted to ml correctly
3. Verify cost calculation
```

### 🚨 Common Errors to Check
- [ ] Conversion table has inverted values
- [ ] Missing conversions between related units
- [ ] Case sensitivity (g vs G)
- [ ] Cross-category conversions (weight to volume) not blocked
- [ ] Conversion factor precision (too few decimals)

### 🔍 Code Review Checklist
- [ ] Each conversion row: "1 [fromUnit] = X [toUnit]"
- [ ] Reciprocal conversions are correct (kg→g and g→kg)
- [ ] No conversions between incompatible types
- [ ] `convertUnit()` returns original value if no conversion found
- [ ] Warning logged for missing conversions

---

## 7. Sample Data Verification

### 📍 Location
- **File**: `public/sample-bakery-data.json`
- **Lines**: 2-90 (ingredients), 528-609 (inventory)

### ✅ Verification Steps

#### Check All Ingredient Costs
```
For each ingredient, verify:
cost = packageCost / packageSize

Ingredients to check:
1. All-Purpose Flour: 4.50 / 2500 = 0.0018 ✓
2. Granulated Sugar: 3.00 / 2000 = 0.0015 ✓
3. Butter: 4.50 / 454 = 0.00991 ✓
4. Eggs: 4.20 / 12 = 0.35 ✓
5. Vanilla Extract: 8.99 / 237 = 0.0379 ✓
6. Baking Powder: 3.50 / 227 = 0.0154 ✓
7. Cocoa Powder: 5.99 / 226 = 0.0265 ✓
8. Milk: 3.50 / 946 = 0.0037 ✓

Steps:
1. Open sample-bakery-data.json
2. For each ingredient, calculate cost manually
3. Verify JSON value matches calculation
4. Repeat for inventory section's costPerUnit values
```

#### Check Recipe Costs
```
For each recipe, verify:
totalCost = sum(ingredient costs) + laborCost + overheadCost
costPerServing = totalCost / servings

Steps:
1. Pick a sample recipe
2. Calculate ingredient costs manually
3. Add labor and overhead
4. Verify totalCost in JSON
5. Verify costPerServing = totalCost / servings
```

### 🚨 Common Errors to Check
- [ ] Hardcoded cost values don't match calculation
- [ ] Inventory costPerUnit doesn't match ingredient cost
- [ ] Recipe ingredient costs don't match ingredient cost × quantity
- [ ] Recipe totalCost doesn't sum correctly
- [ ] Recipe costPerServing calculation wrong

---

## 🎯 Critical Testing Workflow

### Before Every Deployment
1. **Run All Test Cases** (30 minutes)
   - [ ] 3 ingredient cost tests
   - [ ] 2 recipe cost tests
   - [ ] 3 pricing tests
   - [ ] 2 order tests
   - [ ] 2 revenue tests
   - [ ] 2 unit conversion tests
   - [ ] Sample data verification

2. **Edge Case Testing** (15 minutes)
   - [ ] Zero values (servings=0, quantity=0)
   - [ ] Very large numbers (999,999.99)
   - [ ] Very small numbers (0.0001)
   - [ ] Negative values (should be rejected)
   - [ ] Decimal precision (many decimal places)

3. **Cross-Feature Testing** (15 minutes)
   - [ ] Change ingredient cost → verify recipe cost updates
   - [ ] Edit recipe → verify order cost updates
   - [ ] Change order quantity → verify totals recalculate
   - [ ] Load sample data → verify all calculations correct

### Automated Testing Recommendations
```typescript
// Create test file: __tests__/calculations.test.ts

describe('Ingredient Calculations', () => {
  test('calculates cost per unit correctly', () => {
    expect(4.50 / 454).toBeCloseTo(0.00991, 5)
  })
})

describe('Recipe Calculations', () => {
  test('calculates total recipe cost', () => {
    const ingredients = [0.54, 0.38, 1.49, 1.05]
    const labor = 10.00
    const overhead = 5.00
    const total = ingredients.reduce((a, b) => a + b, 0) + labor + overhead
    expect(total).toBeCloseTo(18.46, 2)
  })
})

// Add more tests for each calculation type
```

---

## 📊 Calculation Accuracy Standards

### Precision Requirements
- **Currency**: Always 2 decimal places (`.toFixed(2)`)
- **Percentages**: 2 decimal places (64.29%)
- **Quantities**: Up to 4 decimal places (0.0018)
- **Multipliers**: 2 decimal places (2.8x)

### Acceptable Tolerances
- **Rounding**: ±$0.01 due to rounding
- **Floating-point**: ±0.0001 for intermediate calculations
- **Display**: Must match calculation within $0.01

### Red Flags
- ❌ Costs showing as $0.00 when should be > 0
- ❌ Negative profits not flagged
- ❌ Margins > 100% or < 0%
- ❌ Multipliers < 1.0 (selling below cost)
- ❌ Very large numbers (> $10,000 for single item)
- ❌ NaN or Infinity values

---

## 🔧 Debugging Checklist

When a calculation is wrong:

1. **Check Data Types**
   - [ ] Are numbers actually numbers (not strings)?
   - [ ] Use `typeof` to verify
   - [ ] Check form inputs use `parseFloat()`

2. **Check Formula**
   - [ ] Is the formula correct?
   - [ ] Are operations in correct order?
   - [ ] Are parentheses correct?

3. **Check Data Flow**
   - [ ] Is data being passed correctly?
   - [ ] Are updates triggering recalculations?
   - [ ] Is state being updated properly?

4. **Check Display**
   - [ ] Is formatting correct (`.toFixed(2)`)?
   - [ ] Is currency symbol correct?
   - [ ] Are units displayed?

5. **Check Edge Cases**
   - [ ] What happens with 0?
   - [ ] What happens with very small numbers?
   - [ ] What happens with very large numbers?

---

## 📝 Documentation

Keep this checklist updated when:
- [ ] New calculation features are added
- [ ] Formulas are changed
- [ ] Bugs are found and fixed
- [ ] New test cases are discovered

**Last Updated**: November 13, 2025
**Version**: 1.0
**Maintained By**: Development Team
