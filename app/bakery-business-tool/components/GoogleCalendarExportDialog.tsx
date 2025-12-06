'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { CalendarPlus, CalendarCheck, Loader2, RefreshCw } from 'lucide-react'
import type { Order } from '../types'
import { useGoogleCalendarSync } from '../hooks/useGoogleCalendarSync'

interface GoogleCalendarExportDialogProps {
    order: Order | null
    open: boolean
    onOpenChange: (open: boolean) => void
    onExported?: (eventId: string) => void
}

export function GoogleCalendarExportDialog({
    order,
    open,
    onOpenChange,
    onExported,
}: GoogleCalendarExportDialogProps) {
    const {
        isConnected,
        connectedEmail,
        isSyncing,
        addOrderToCalendar,
        updateOrderInCalendar,
        connectGoogleCalendar,
    } = useGoogleCalendarSync()

    const [dontAskAgain, setDontAskAgain] = useState(false)

    const isAlreadySynced = !!order?.googleCalendarEventId

    const handleExport = async () => {
        if (!order) return

        let eventId: string | null = null

        if (isAlreadySynced && order.googleCalendarEventId) {
            // Update existing event
            const success = await updateOrderInCalendar(order, order.googleCalendarEventId)
            if (success) {
                eventId = order.googleCalendarEventId
            }
        } else {
            // Create new event
            eventId = await addOrderToCalendar(order)
        }

        if (eventId) {
            onExported?.(eventId)
            onOpenChange(false)

            if (dontAskAgain) {
                window.dispatchEvent(new CustomEvent('google-calendar-auto-export', {
                    detail: { enabled: true }
                }))
            }
        }
    }

    if (!order) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {isAlreadySynced ? (
                            <CalendarCheck className="h-5 w-5 text-green-600" />
                        ) : (
                            <CalendarPlus className="h-5 w-5 text-blue-600" />
                        )}
                        {isAlreadySynced ? 'Update in Google Calendar?' : 'Add to Google Calendar?'}
                    </DialogTitle>
                    <DialogDescription>
                        Order {order.orderNumber} for {order.customerName}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {isConnected ? (
                        <>
                            {isAlreadySynced ? (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                                    <p className="text-sm text-green-900">
                                        ✅ This order is already in your Google Calendar
                                        {connectedEmail && ` (${connectedEmail})`}.
                                    </p>
                                    <p className="text-xs text-green-700 mt-1">
                                        Click &quot;Update&quot; to sync any changes to the event.
                                    </p>
                                </div>
                            ) : (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                    <p className="text-sm text-blue-900">
                                        📅 This will add the delivery date{' '}
                                        <strong>{order.deliveryDate}</strong> to your Google Calendar
                                        {connectedEmail && ` (${connectedEmail})`}.
                                    </p>
                                    <p className="text-xs text-blue-700 mt-1">
                                        Includes: Order details, customer info, items, and production schedule.
                                    </p>
                                </div>
                            )}

                            {!isAlreadySynced && (
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="dontAskAgain"
                                        checked={dontAskAgain}
                                        onCheckedChange={(checked) => setDontAskAgain(checked === true)}
                                    />
                                    <Label
                                        htmlFor="dontAskAgain"
                                        className="text-sm text-gray-600 cursor-pointer"
                                    >
                                        Always export orders to calendar (don&apos;t ask again)
                                    </Label>
                                </div>
                            )}

                            <div className="flex gap-3 pt-2">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => onOpenChange(false)}
                                    disabled={isSyncing}
                                >
                                    {isAlreadySynced ? 'Close' : 'Skip'}
                                </Button>
                                <Button
                                    className="flex-1"
                                    onClick={handleExport}
                                    disabled={isSyncing}
                                >
                                    {isSyncing ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            {isAlreadySynced ? 'Updating...' : 'Adding...'}
                                        </>
                                    ) : isAlreadySynced ? (
                                        <>
                                            <RefreshCw className="h-4 w-4 mr-2" />
                                            Update Event
                                        </>
                                    ) : (
                                        'Add to Calendar'
                                    )}
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="text-center py-4">
                                <p className="text-gray-600 mb-4">
                                    Connect your Google Calendar to automatically add orders.
                                </p>
                                <Button onClick={() => connectGoogleCalendar()}>
                                    Connect Google Calendar
                                </Button>
                            </div>

                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => onOpenChange(false)}
                            >
                                Maybe Later
                            </Button>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
