'use client'

import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export interface SortOption {
  id: string
  label: string
}

interface SortDropdownProps {
  options: SortOption[]
  value: string
  onChange: (value: string) => void
  label?: string
  className?: string
}

export default function SortDropdown({ 
  options, 
  value, 
  onChange,
  label = "Sort by:",
  className = ""
}: SortDropdownProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {label && <span className="text-sm text-gray-600">{label}</span>}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
