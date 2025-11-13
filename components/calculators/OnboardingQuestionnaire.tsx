'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { ChefHat, Loader2, X } from 'lucide-react'

interface OnboardingQuestionnaireProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onComplete?: (data: OnboardingData) => void
}

export interface OnboardingData {
  bakeryType: string
  experienceLevel: string
  primaryProducts: string[]
  mainChallenges: string
  monthlyRevenue?: string
  howHeardAboutUs?: string
}

export function OnboardingQuestionnaire({
  open,
  onOpenChange,
  onComplete,
}: OnboardingQuestionnaireProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<OnboardingData>({
    bakeryType: '',
    experienceLevel: '',
    primaryProducts: [],
    mainChallenges: '',
    monthlyRevenue: '',
    howHeardAboutUs: '',
  })

  const handleSubmit = async () => {
    setLoading(true)
    
    try {
      // Save to database or send to API
      // For now, just log and call callback
      console.log('Onboarding data:', formData)
      
      if (onComplete) {
        onComplete(formData)
      }
      
      toast({
        title: '✅ Thanks for sharing!',
        description: 'Your preferences help us serve you better.',
      })
      
      onOpenChange(false)
    } catch (error) {
      console.error('Error saving onboarding data:', error)
      toast({
        title: 'Error',
        description: 'Could not save your preferences.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSkip = () => {
    onOpenChange(false)
    toast({
      title: 'Skipped',
      description: 'You can update your preferences anytime in Settings.',
    })
  }

  const toggleProduct = (product: string) => {
    setFormData(prev => ({
      ...prev,
      primaryProducts: prev.primaryProducts.includes(product)
        ? prev.primaryProducts.filter(p => p !== product)
        : [...prev.primaryProducts, product]
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <ChefHat className="h-5 w-5 text-rose-500" />
              Tell Us About Your Bakery
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            Help us personalize your experience (optional - takes 30 seconds)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Progress indicator */}
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 flex-1 rounded-full ${
                  s <= step ? 'bg-rose-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>

          {/* Step 1: Bakery Type & Experience */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>What type of bakery do you run?</Label>
                <RadioGroup
                  value={formData.bakeryType}
                  onValueChange={(value) => setFormData({ ...formData, bakeryType: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="home" id="home" />
                    <Label htmlFor="home" className="font-normal cursor-pointer">
                      Home Baker (hobby or side business)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cottage" id="cottage" />
                    <Label htmlFor="cottage" className="font-normal cursor-pointer">
                      Cottage Food Business
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="small" id="small" />
                    <Label htmlFor="small" className="font-normal cursor-pointer">
                      Small Commercial Bakery
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cake-decorator" id="cake-decorator" />
                    <Label htmlFor="cake-decorator" className="font-normal cursor-pointer">
                      Cake Decorator / Custom Cakes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="font-normal cursor-pointer">
                      Other
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>How long have you been baking professionally?</Label>
                <RadioGroup
                  value={formData.experienceLevel}
                  onValueChange={(value) => setFormData({ ...formData, experienceLevel: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="just-starting" id="just-starting" />
                    <Label htmlFor="just-starting" className="font-normal cursor-pointer">
                      Just starting out
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1-2-years" id="1-2-years" />
                    <Label htmlFor="1-2-years" className="font-normal cursor-pointer">
                      1-2 years
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3-5-years" id="3-5-years" />
                    <Label htmlFor="3-5-years" className="font-normal cursor-pointer">
                      3-5 years
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5-plus-years" id="5-plus-years" />
                    <Label htmlFor="5-plus-years" className="font-normal cursor-pointer">
                      5+ years
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Step 2: Products & Revenue */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>What do you primarily bake? (Select all that apply)</Label>
                <div className="space-y-2">
                  {['Cakes', 'Cupcakes', 'Cookies', 'Bread', 'Pastries', 'Macarons', 'Other'].map((product) => (
                    <div key={product} className="flex items-center space-x-2">
                      <Checkbox
                        id={product}
                        checked={formData.primaryProducts.includes(product)}
                        onCheckedChange={() => toggleProduct(product)}
                      />
                      <Label htmlFor={product} className="font-normal cursor-pointer">
                        {product}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>What's your approximate monthly revenue? (optional)</Label>
                <RadioGroup
                  value={formData.monthlyRevenue}
                  onValueChange={(value) => setFormData({ ...formData, monthlyRevenue: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="under-500" id="under-500" />
                    <Label htmlFor="under-500" className="font-normal cursor-pointer">
                      Under $500
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="500-1000" id="500-1000" />
                    <Label htmlFor="500-1000" className="font-normal cursor-pointer">
                      $500 - $1,000
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1000-3000" id="1000-3000" />
                    <Label htmlFor="1000-3000" className="font-normal cursor-pointer">
                      $1,000 - $3,000
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3000-5000" id="3000-5000" />
                    <Label htmlFor="3000-5000" className="font-normal cursor-pointer">
                      $3,000 - $5,000
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5000-plus" id="5000-plus" />
                    <Label htmlFor="5000-plus" className="font-normal cursor-pointer">
                      $5,000+
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="prefer-not-say" id="prefer-not-say" />
                    <Label htmlFor="prefer-not-say" className="font-normal cursor-pointer">
                      Prefer not to say
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          {/* Step 3: Challenges & Discovery */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label>What's your biggest challenge right now?</Label>
                <Textarea
                  placeholder="e.g., Pricing my products correctly, managing inventory, tracking orders..."
                  value={formData.mainChallenges}
                  onChange={(e) => setFormData({ ...formData, mainChallenges: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="space-y-3">
                <Label>How did you hear about BakeProfit? (optional)</Label>
                <RadioGroup
                  value={formData.howHeardAboutUs}
                  onValueChange={(value) => setFormData({ ...formData, howHeardAboutUs: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="google" id="google" />
                    <Label htmlFor="google" className="font-normal cursor-pointer">
                      Google Search
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="social-media" id="social-media" />
                    <Label htmlFor="social-media" className="font-normal cursor-pointer">
                      Social Media (Instagram, Facebook, etc.)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="friend" id="friend" />
                    <Label htmlFor="friend" className="font-normal cursor-pointer">
                      Friend or colleague
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="blog" id="blog" />
                    <Label htmlFor="blog" className="font-normal cursor-pointer">
                      Blog or article
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other-source" />
                    <Label htmlFor="other-source" className="font-normal cursor-pointer">
                      Other
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex-row gap-2 sm:gap-2">
          <Button
            variant="outline"
            onClick={handleSkip}
            className="flex-1"
          >
            Skip
          </Button>
          {step < 3 ? (
            <Button
              onClick={() => setStep(step + 1)}
              className="flex-1 bg-rose-500 hover:bg-rose-600"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-rose-500 hover:bg-rose-600"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Complete'
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
