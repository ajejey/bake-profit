import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db/mongodb'
import PublicMenu from '@/lib/db/models/PublicMenu'
import OrderModel from '@/lib/db/models/Order'
import Customer from '@/lib/db/models/Customer'
import User from '@/lib/db/models/User'
import { sendBakerOrderNotification, sendCustomerOrderConfirmation } from '@/lib/email/sendOrderEmails'

/**
 * POST /api/public/orders
 * Create a new order from the public menu (no authentication required)
 */
export async function POST(request: NextRequest) {
    try {
        await connectDB()

        const body = await request.json()
        const {
            menuSlug,
            customer,
            items,
            deliveryDate,
            deliveryType,
            address,
            notes,
        } = body

        // Validate required fields
        if (!menuSlug || !customer?.name || !items || !Array.isArray(items) || items.length === 0 || !deliveryDate || !deliveryType) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Validate customer contact info (at least phone OR email)
        if (!customer.phone && !customer.email) {
            return NextResponse.json(
                { error: 'Please provide either phone number or email' },
                { status: 400 }
            )
        }

        // Fetch the menu
        const menu = await PublicMenu.findOne({
            slug: menuSlug.toLowerCase(),
            isPublished: true,
        })

        if (!menu) {
            return NextResponse.json(
                { error: 'Menu not found or not published' },
                { status: 404 }
            )
        }

        // Check if accepting orders
        if (!menu.acceptingOrders || !menu.orderFormEnabled) {
            return NextResponse.json(
                { error: 'This menu is not currently accepting orders' },
                { status: 400 }
            )
        }

        // Validate lead days
        const orderLeadDays = menu.orderLeadDays || 2
        const minDeliveryDate = new Date()
        minDeliveryDate.setDate(minDeliveryDate.getDate() + orderLeadDays)
        minDeliveryDate.setHours(0, 0, 0, 0)

        const requestedDate = new Date(deliveryDate)
        requestedDate.setHours(0, 0, 0, 0)

        if (requestedDate < minDeliveryDate) {
            return NextResponse.json(
                {
                    error: `Orders require at least ${orderLeadDays} days notice. Please select a date on or after ${minDeliveryDate.toISOString().split('T')[0]}`,
                },
                { status: 400 }
            )
        }

        // Validate delivery type
        if (deliveryType !== 'pickup' && deliveryType !== 'delivery') {
            return NextResponse.json(
                { error: 'Invalid delivery type' },
                { status: 400 }
            )
        }

        // Validate address for delivery
        if (deliveryType === 'delivery' && !address) {
            return NextResponse.json(
                { error: 'Address is required for delivery orders' },
                { status: 400 }
            )
        }

        // Validate and calculate order items
        const orderItems = []
        let totalRevenue = 0
        let totalCost = 0

        for (const item of items) {
            const product = menu.products.find((p: any) => p.id === item.productId)

            if (!product) {
                return NextResponse.json(
                    { error: `Product not found: ${item.productId}` },
                    { status: 400 }
                )
            }

            if (!product.isAvailable) {
                return NextResponse.json(
                    { error: `Product not available: ${product.name}` },
                    { status: 400 }
                )
            }

            const quantity = parseInt(item.quantity)
            if (isNaN(quantity) || quantity <= 0) {
                return NextResponse.json(
                    { error: `Invalid quantity for ${product.name}` },
                    { status: 400 }
                )
            }

            const pricePerUnit = product.price
            // Assume 40% margin for cost calculation (can be improved with actual recipe data)
            const costPerUnit = pricePerUnit * 0.6

            const subtotalRevenue = pricePerUnit * quantity
            const subtotalCost = costPerUnit * quantity
            const profit = subtotalRevenue - subtotalCost

            orderItems.push({
                id: `${product.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                recipeId: product.recipeId || product.id,
                recipeName: product.name,
                quantity,
                costPerUnit,
                pricePerUnit,
                subtotalCost,
                subtotalRevenue,
                profit,
                notes: item.notes || '',
            })

            totalRevenue += subtotalRevenue
            totalCost += subtotalCost
        }

        const totalProfit = totalRevenue - totalCost

        // Get user (baker) email for notifications
        const user = await User.findOne({ email: menu.userId })
        if (!user) {
            console.error('User not found for menu:', menu.userId)
            return NextResponse.json(
                { error: 'Unable to process order. Please contact the baker directly.' },
                { status: 500 }
            )
        }

        // Generate order number (simple incrementing for now)
        const existingOrders = await OrderModel.countDocuments({ userId: menu.userId })
        const orderNumber = `ORD-${(existingOrders + 1).toString().padStart(3, '0')}`

        // Create order
        const order = new OrderModel({
            _id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            userId: menu.userId,
            orderNumber,
            customerName: customer.name,
            customerPhone: customer.phone || '',
            customerEmail: customer.email || '',
            items: orderItems,
            status: 'new',
            orderDate: new Date().toISOString(),
            deliveryDate: deliveryDate,
            totalCost,
            totalRevenue,
            totalProfit,
            notes: notes || '',
            deliveryAddress: deliveryType === 'delivery' ? address : undefined,
            paymentStatus: 'unpaid',
            source: 'menu', // Mark as menu order
        })

        await order.save()

        // Auto-save customer if they don't exist
        try {
            const existingCustomer = await Customer.findOne({
                userId: menu.userId,
                $or: [
                    customer.email ? { email: customer.email } : {},
                    customer.phone ? { phone: customer.phone } : {},
                ].filter((q) => Object.keys(q).length > 0),
            })

            if (existingCustomer) {
                // Update existing customer
                existingCustomer.orderHistory.push(order._id)
                existingCustomer.totalOrders += 1
                existingCustomer.totalSpent += totalRevenue
                await existingCustomer.save()
            } else {
                // Create new customer
                const newCustomer = new Customer({
                    _id: `customer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                    userId: menu.userId,
                    name: customer.name,
                    email: customer.email || undefined,
                    phone: customer.phone || undefined,
                    address: deliveryType === 'delivery' ? address : undefined,
                    orderHistory: [order._id],
                    totalOrders: 1,
                    totalSpent: totalRevenue,
                    notes: '',
                    createdAt: new Date().toISOString(),
                })
                await newCustomer.save()
            }
        } catch (customerError) {
            console.error('Error saving customer:', customerError)
            // Don't fail the order if customer save fails
        }

        // Send email notifications
        try {
            // Send notification to baker
            await sendBakerOrderNotification({
                bakerEmail: user.email,
                businessName: menu.branding?.businessName || 'Bakery',
                orderNumber,
                customerName: customer.name,
                customerPhone: customer.phone,
                customerEmail: customer.email,
                items: orderItems.map((item) => ({
                    name: item.recipeName,
                    quantity: item.quantity,
                    price: item.pricePerUnit,
                    notes: item.notes,
                })),
                deliveryDate,
                deliveryType,
                address: deliveryType === 'delivery' ? address : undefined,
                notes: notes || '',
                totalAmount: totalRevenue,
            })

            // Send confirmation to customer
            if (customer.email) {
                await sendCustomerOrderConfirmation({
                    customerEmail: customer.email,
                    businessName: menu.branding?.businessName || 'Bakery',
                    customerName: customer.name,
                    orderNumber,
                    items: orderItems.map((item) => ({
                        name: item.recipeName,
                        quantity: item.quantity,
                        price: item.pricePerUnit,
                    })),
                    deliveryDate,
                    deliveryType,
                    totalAmount: totalRevenue,
                    contactPhone: menu.contactInfo?.phone,
                    contactEmail: menu.contactInfo?.email,
                    contactInstagram: menu.contactInfo?.instagram,
                })
            }
        } catch (emailError) {
            console.error('Error sending emails:', emailError)
            // Don't fail the order if email fails - just log it
        }

        return NextResponse.json(
            {
                success: true,
                orderId: order._id,
                orderNumber,
                message: 'Order placed successfully!',
            },
            { status: 201 }
        )
    } catch (error) {
        console.error('Error creating order:', error)
        return NextResponse.json(
            { error: 'Failed to create order. Please try again.' },
            { status: 500 }
        )
    }
}
