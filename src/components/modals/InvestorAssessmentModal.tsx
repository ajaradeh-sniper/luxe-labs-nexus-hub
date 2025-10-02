import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { InvestorQuestionnaire } from '@/components/InvestorQuestionnaire';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InvestorAssessmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InvestorAssessmentModal: React.FC<InvestorAssessmentModalProps> = ({
  open,
  onOpenChange
}) => {
  const handleComplete = (data: any) => {
    // Handle completion - could show success message, redirect, etc.
    console.log('Assessment completed:', data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0 relative">
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
          <InvestorQuestionnaire 
            standalone={false} 
            onComplete={handleComplete}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};