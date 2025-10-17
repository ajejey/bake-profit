'use client'

import React from 'react'
import { Button } from '@/components/ui/button'

export interface FilterOption {
  id: string
  label: string
  count?: number
}

interface FilterChipsProps {
  options: FilterOption[]
  activeFilter: string
  onChange: (filterId: string) => void
  className?: string
}

export default function FilterChips({ 
  options, 
  activeFilter, 
  onChange,
  className = ""
}: FilterChipsProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {options.map((option) => (
        <Button
          key={option.id}
          size="sm"
          variant={activeFilter === option.id ? 'default' : 'outline'}
          onClick={() => onChange(option.id)}
          className="transition-all"
        >
          {option.label}
          {option.count !== undefined && (
            <span className={`ml-1.5 ${activeFilter === option.id ? 'opacity-90' : 'opacity-60'}`}>
              ({option.count})
            </span>
          )}
        </Button>
      ))}
    </div>
  )
}
