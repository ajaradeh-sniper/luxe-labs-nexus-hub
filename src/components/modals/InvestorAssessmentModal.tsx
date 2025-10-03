import React, { useEffect, Suspense } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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

  const handleRadixOpenChange = (next: boolean) => {
    console.log('Dialog onOpenChange (radix):', next);
    if (next) {
      onOpenChange(true);
    } else {
      console.warn('Prevented auto-close');
    }
  };

  const handleComplete = (data: any) => {
    // Handle completion - could show success message, redirect, etc.
    console.log('Assessment completed:', data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleRadixOpenChange}>
      <DialogContent forceMount className="max-w-4xl max-h-[90vh] overflow-hidden p-0 relative" onPointerDownOutside={(e) => e.preventDefault()} onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()} onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">Investor Profile Assessment</DialogTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-muted-foreground">
            Help us understand your investment preferences to provide personalized opportunities
          </DialogDescription>
        </DialogHeader>
        
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
                onComplete={handleComplete}
              />
            </Suspense>
          </AssessmentErrorBoundary>
        </div>
      </DialogContent>
    </Dialog>
  );
};