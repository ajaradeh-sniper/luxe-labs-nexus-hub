import React, { useEffect, Suspense } from 'react';
import { createPortal } from 'react-dom';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/LoadingSpinner';

// Lazy-load the heavy questionnaire to avoid render issues and show a fallback
const InvestorQuestionnaireLazy = React.lazy(() =>
  import('@/components/InvestorQuestionnaire').then((m) => ({ default: m.InvestorQuestionnaire }))
);

// Local error boundary to ensure the modal shows feedback instead of a blank overlay
class AssessmentErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: any) { console.error('InvestorAssessment error:', error); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 space-y-4">
          <p className="text-destructive font-medium">We couldn’t load the assessment.</p>
          <div className="flex gap-2">
            <Button onClick={() => (window.location.href = '/investor-questionnaire')}>Open full page</Button>
            <Button variant="secondary" onClick={() => this.setState({ hasError: false })}>Retry</Button>
          </div>
        </div>
      );
    }
    return this.props.children as any;
  }
}
interface InvestorAssessmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InvestorAssessmentModal: React.FC<InvestorAssessmentModalProps> = ({
  open,
  onOpenChange
}) => {
  useEffect(() => {
    console.log('InvestorAssessmentModal open:', open);
  }, [open]);

// Removed Radix onOpenChange intercept; using simple portal modal

  const handleComplete = (data: any) => {
    // Handle completion - could show success message, redirect, etc.
    console.log('Assessment completed:', data);
    onOpenChange(false);
  };

  

  // Lock scroll and handle Escape
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[10000]" role="dialog" aria-modal="true" aria-label="Investor Profile Assessment">
      <div className="absolute inset-0 bg-black/80 z-0" onClick={() => onOpenChange(false)} />
      <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
        <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-lg bg-background shadow-lg">
          <div className="p-6 pb-0 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Investor Profile Assessment</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="px-6 text-muted-foreground">
            Help us understand your investment preferences to provide personalized opportunities
          </p>
          <div className="px-6 pb-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <AssessmentErrorBoundary>
              <Suspense
                fallback={
                  <div className="py-10 flex items-center justify-center">
                    <LoadingSpinner />
                    <span className="ml-3">Loading assessment…</span>
                  </div>
                }
              >
                <InvestorQuestionnaireLazy 
                  standalone={false} 
                  onComplete={(data: any) => {
                    console.log('Assessment completed:', data);
                    onOpenChange(false);
                  }}
                />
              </Suspense>
            </AssessmentErrorBoundary>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};