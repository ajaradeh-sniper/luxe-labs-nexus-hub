import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOpportunities } from "@/hooks/useOpportunities";
import { Loader2, TrendingUp } from "lucide-react";

const schema = z.object({
  acquisitionPrice: z.string().min(1, "Acquisition price is required"),
  capex: z.string().min(1, "CapEx is required"),
  targetRoi: z.string().min(1, "Target ROI is required"),
  timelineMonths: z.string().min(1, "Timeline is required"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface ProcessedFormData {
  acquisitionPrice: number;
  capex: number;
  targetRoi: number;
  timelineMonths: number;
  notes?: string;
}

export function PromoteOpportunityModal({ 
  open, 
  onClose, 
  opportunityId 
}: { 
  open: boolean; 
  onClose: () => void; 
  opportunityId?: string;
}) {
  const { updateOpportunity } = useOpportunities();
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    reset 
  } = useForm<FormData>({ 
    resolver: zodResolver(schema) 
  });

  async function onSubmit(values: FormData) {
    if (!opportunityId) return;
    
    try {
      // Process form data
      const processedData: ProcessedFormData = {
        acquisitionPrice: parseFloat(values.acquisitionPrice.replace(/[^\d.]/g, '')),
        capex: parseFloat(values.capex.replace(/[^\d.]/g, '')),
        targetRoi: parseFloat(values.targetRoi),
        timelineMonths: parseInt(values.timelineMonths),
        notes: values.notes,
      };

      // Validate processed data
      if (isNaN(processedData.acquisitionPrice) || processedData.acquisitionPrice <= 0) {
        throw new Error("Invalid acquisition price");
      }
      if (isNaN(processedData.capex) || processedData.capex < 0) {
        throw new Error("Invalid CapEx amount");
      }
      if (isNaN(processedData.targetRoi) || processedData.targetRoi < 0 || processedData.targetRoi > 100) {
        throw new Error("ROI must be between 0-100%");
      }
      if (isNaN(processedData.timelineMonths) || processedData.timelineMonths <= 0) {
        throw new Error("Timeline must be positive number of months");
      }

      // Transform processedData to match OpportunityData interface
      const opportunityUpdates = {
        investment_required: processedData.acquisitionPrice + processedData.capex,
        expected_roi: processedData.targetRoi,
        status: 'converted_to_project',
        deadline: new Date(Date.now() + (processedData.timelineMonths * 30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
        description: processedData.notes
      };

      await updateOpportunity(opportunityId, opportunityUpdates);
      reset();
      onClose();
    } catch (error) {
      // Error handling is done in the mutation
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      reset();
      onClose();
    }
  };

  if (!opportunityId) {
    return (
      <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>No Opportunity Selected</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Please select an opportunity to promote to a project.
          </p>
          <div className="flex justify-end pt-4">
            <Button onClick={handleClose}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Promote to Active Project
          </DialogTitle>
        </DialogHeader>
        
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              This will convert the opportunity into an active project with full project management capabilities.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="acquisitionPrice">Acquisition Price (AED) *</Label>
              <Input 
                id="acquisitionPrice"
                placeholder="2,500,000" 
                {...register('acquisitionPrice')} 
                disabled={isSubmitting}
              />
              {errors.acquisitionPrice && (
                <p className="text-xs text-destructive">{errors.acquisitionPrice.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="capex">Capital Expenditure (AED) *</Label>
              <Input 
                id="capex"
                placeholder="500,000" 
                {...register('capex')} 
                disabled={isSubmitting}
              />
              {errors.capex && (
                <p className="text-xs text-destructive">{errors.capex.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="targetRoi">Target ROI (%) *</Label>
              <Input 
                id="targetRoi"
                placeholder="20" 
                {...register('targetRoi')} 
                disabled={isSubmitting}
              />
              {errors.targetRoi && (
                <p className="text-xs text-destructive">{errors.targetRoi.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="timelineMonths">Timeline (Months) *</Label>
              <Input 
                id="timelineMonths"
                placeholder="18" 
                {...register('timelineMonths')} 
                disabled={isSubmitting}
              />
              {errors.timelineMonths && (
                <p className="text-xs text-destructive">{errors.timelineMonths.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Project Notes</Label>
            <Textarea 
              id="notes"
              placeholder="Additional notes for the project team..."
              {...register('notes')} 
              disabled={isSubmitting}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Promote to Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}