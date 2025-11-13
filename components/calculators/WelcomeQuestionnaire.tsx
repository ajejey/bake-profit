'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Sparkles, ArrowRight } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface WelcomeQuestionnaireProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onComplete?: (data: QuestionnaireData) => void
}

export interface QuestionnaireData {
  lookingFor: string
  helpWith: string
  interestedFeatures: string[]
}

const FEATURE_OPTIONS = [
  { id: 'recipe-costing', label: 'Recipe costing & pricing' },
  { id: 'inventory', label: 'Inventory management' },
  { id: 'order-tracking', label: 'Order tracking & management' },
  { id: 'customer-management', label: 'Customer database' },
  { id: 'profit-analysis', label: 'Profit & analytics' },
  { id: 'invoicing', label: 'Invoicing & payments' },
  { id: 'production-planning', label: 'Production planning' },
  { id: 'ingredient-sourcing', label: 'Ingredient cost tracking' },
]

export function WelcomeQuestionnaire({
  open,
  onOpenChange,
  onComplete,
}: WelcomeQuestionnaireProps) {
  const { toast } = useToast()
  const [lookingFor, setLookingFor] = useState('')
  const [helpWith, setHelpWith] = useState('')
  const [interestedFeatures, setInterestedFeatures] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFeatureToggle = (featureId: string) => {
    setInterestedFeatures(prev =>
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    )
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    const data: QuestionnaireData = {
      lookingFor,
      helpWith,
      interestedFeatures,
    }

    try {
      // Get auth token from localStorage
      const token = localStorage.getItem('auth_token')
      
      if (!token) {
        throw new Error('No authentication token found')
      }

      // Save to database via API
      const response = await fetch('/api/user/questionnaire', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save questionnaire')
      }

      toast({
        title: '✅ Thanks for sharing!',
        description: 'We\'ll use this to make BakeProfit better for you.',
      })

      if (onComplete) {
        onComplete(data)
      }

      onOpenChange(false)
    } catch (error) {
      console.error('Error saving questionnaire:', error)
      toast({
        title: 'Error',
        description: 'Could not save your responses. You can skip this for now.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSkip = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            Welcome to BakeProfit!
          </DialogTitle>
          <DialogDescription>
            Help us understand what you need so we can build the right features for you. (Optional - takes 30 seconds)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Question 1: What are you looking for? */}
          <div className="space-y-2">
            <Label htmlFor="lookingFor" className="text-base font-semibold">
              What brought you to BakeProfit today?
            </Label>
            <Textarea
              id="lookingFor"
              placeholder="E.g., I need help pricing my cakes, tracking orders, managing inventory..."
              value={lookingFor}
              onChange={(e) => setLookingFor(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Question 2: What would help most? */}
          <div className="space-y-2">
            <Label htmlFor="helpWith" className="text-base font-semibold">
              What would help your bakery business the most right now?
            </Label>
            <Textarea
              id="helpWith"
              placeholder="E.g., Better pricing strategy, reducing waste, saving time on admin..."
              value={helpWith}
              onChange={(e) => setHelpWith(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Question 3: Feature interests */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              Which features interest you most? (Select all that apply)
            </Label>
            <div className="space-y-2">
              {FEATURE_OPTIONS.map((feature) => (
                <div key={feature.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={feature.id}
                    checked={interestedFeatures.includes(feature.id)}
                    onCheckedChange={() => handleFeatureToggle(feature.id)}
                  />
                  <label
                    htmlFor={feature.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {feature.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleSkip}
            className="flex-1"
            disabled={isSubmitting}
          >
            Skip for now
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-rose-500 hover:bg-rose-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Saving...
              </>
            ) : (
              <>
                Submit
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>

        <p className="text-xs text-center text-gray-500">
          Your feedback helps us prioritize features that matter most to bakers like you.
        </p>
      </DialogContent>
    </Dialog>
  )
}
