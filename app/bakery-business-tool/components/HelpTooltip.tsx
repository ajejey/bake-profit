'use client'

import React from 'react'
import { HelpCircle } from 'lucide-react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface HelpTooltipProps {
    content: React.ReactNode
    children?: React.ReactNode
    className?: string
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
}

/**
 * Reusable help tooltip component with info icon
 * Shows explanation on hover
 */
export function HelpTooltip({
    content,
    children,
    className,
    side = 'top',
    align = 'center'
}: HelpTooltipProps) {
    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className={cn('inline-flex items-center gap-1', className)}>
                        {children}
                        <HelpCircle className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600 cursor-help transition-colors" />
                    </span>
                </TooltipTrigger>
                <TooltipContent side={side} align={align} className="max-w-sm">
                    <div className="text-sm">{content}</div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
