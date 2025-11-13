'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Save, Check } from 'lucide-react'
import { LoginFormInline } from '@/components/auth/LoginFormInline'
import { SignupFormInline } from '@/components/auth/SignupFormInline'

interface SaveCalculationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  calculatorType: string
  onSuccess?: () => void
}

export function SaveCalculationDialog({
  open,
  onOpenChange,
  calculatorType,
  onSuccess,
}: SaveCalculationDialogProps) {
  const [activeTab, setActiveTab] = useState<'signup' | 'login'>('signup')

  const handleAuthSuccess = () => {
    // Close dialog
    onOpenChange(false)
    
    // Call success callback (this will save the calculation)
    if (onSuccess) {
      onSuccess()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Save className="h-5 w-5 text-rose-500" />
            Save Your {calculatorType}
          </DialogTitle>
          <DialogDescription>
            Sign up or log in to save this calculation and access it.
          </DialogDescription>
        </DialogHeader>


        {/* Tabs for Signup/Login */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'signup' | 'login')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="login">Log In</TabsTrigger>
          </TabsList>

          <TabsContent value="signup" className="mt-4">
            <SignupFormInline 
              onSuccess={handleAuthSuccess}
              redirectTo="/tools/my-calculations"
            />
          </TabsContent>

          <TabsContent value="login" className="mt-4">
            <LoginFormInline 
              onSuccess={handleAuthSuccess}
              redirectTo="/tools/my-calculations"
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
