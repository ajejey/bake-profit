'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface ExitIntentDialogProps {
  isOpen: boolean;
  segment?: 'new-users' | 'inactive-users';
  onDismiss: () => void;
  onSubmit: (feedback: { question: string; email?: string }) => void;
}

export function ExitIntentDialog({
  isOpen,
  segment = 'inactive-users',
  onDismiss,
  onSubmit,
}: ExitIntentDialogProps) {
  const [question, setQuestion] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) {
      alert('Please share your challenge with us');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Send feedback to backend
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question.trim(),
          email: email.trim() || undefined,
          segment,
          timestamp: new Date().toISOString(),
        }),
      });

      onSubmit({ question, email });
      setQuestion('');
      setEmail('');
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-in fade-in"
        onClick={onDismiss}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in zoom-in-95 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-2xl max-w-md w-full overflow-hidden my-auto">
          {/* Large Header - Rose Theme */}
          <div className="bg-gradient-to-br from-rose-500 via-rose-400 to-pink-500 px-8 py-10 relative">
            {/* Close button - more prominent */}
            <button
              onClick={onDismiss}
              className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-2 transition-all hover:scale-110"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Main headline - bigger */}
            <h2 className="text-4xl font-bold text-white mb-3 leading-tight">
              Before you go... 🎂
            </h2>
            
            {/* Subheading */}
            <p className="text-lg text-white/95 font-medium">
              What&apos;s your biggest challenge running a baking business?
            </p>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Main question */}
            <div>
              <label htmlFor="question" className="block text-sm font-semibold text-gray-800 mb-3">
                Tell us what&apos;s on your mind
              </label>
              <Textarea
                id="question"
                placeholder="e.g., &apos;Recipe costing takes forever&apos; or &apos;I never know what&apos;s selling best&apos;"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="min-h-28 resize-none border-2 border-gray-200 focus:border-rose-400 focus:ring-rose-100 rounded-lg p-3"
                disabled={isSubmitting}
              />
              <p className="text-xs text-gray-500 mt-2">
                💡 Tip: Share the challenge you&apos;re facing, not what you think the solution should be
              </p>
            </div>

            {/* Email (optional) */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                Want us to let you know when we solve this? (optional)
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="border-2 border-gray-200 focus:border-rose-400 focus:ring-rose-100"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-3">
              <Button
                type="button"
                variant="outline"
                onClick={onDismiss}
                disabled={isSubmitting}
                className="flex-1 border-2 border-gray-300 hover:bg-gray-50"
              >
                Skip
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !question.trim()}
                className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold"
              >
                {isSubmitting ? 'Sending...' : 'Share Your Challenge'}
              </Button>
            </div>
          </form>

          {/* Footer */}
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 px-6 py-4 border-t border-rose-100">
            <p className="text-sm text-gray-700 text-center font-medium">
              Your input shapes what we build next. Thank you! 🙏
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
