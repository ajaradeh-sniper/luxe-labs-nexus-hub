import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProjects } from "@/hooks/useProjects";
import { Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters"),
  type: z.enum(['flip', 'client', 'investment']).refine((val) => val, {
    message: "Please select a project type"
  }),
  budget: z.string().min(1, "Budget is required"),
  targetRoi: z.string().min(1, "Target ROI is required"),
  timelineMonths: z.string().min(1, "Timeline is required"),
  description: z.string().optional(),
  location: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface ProcessedFormData {
  name: string;
  type: 'flip' | 'client' | 'investment';
  budget: number;
  targetRoi: number;
  timelineMonths: number;
  description?: string;
  location?: string;
}

export function NewProjectModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { create } = useProjects();
  const { 
    register, 
    handleSubmit, 
    control,
    formState: { errors, isSubmitting }, 
    reset 
  } = useForm<FormData>({ 
    resolver: zodResolver(schema),
    defaultValues: {
      type: 'flip'
    }
  });

  async function onSubmit(values: FormData) {
    try {
      // Process form data
      const processedData: ProcessedFormData = {
        ...values,
        budget: parseFloat(values.budget.replace(/[^\d.]/g, '')),
        targetRoi: parseFloat(values.targetRoi),
        timelineMonths: parseInt(values.timelineMonths),
      };

      // Validate processed data
      if (isNaN(processedData.budget) || processedData.budget <= 0) {
        throw new Error("Invalid budget amount");
      }
      if (isNaN(processedData.targetRoi) || processedData.targetRoi < 0 || processedData.targetRoi > 100) {
        throw new Error("ROI must be between 0-100%");
      }
      if (isNaN(processedData.timelineMonths) || processedData.timelineMonths <= 0) {
        throw new Error("Timeline must be positive number of months");
      }

      await create.mutateAsync(processedData);
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

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="name">Project Name *</Label>
            <Input 
              id="name"
              placeholder="Enter project name" 
              {...register('name')} 
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Project Type *</Label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flip">Property Flip</SelectItem>
                    <SelectItem value="client">Client Project</SelectItem>
                    <SelectItem value="investment">Investment Property</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && <p className="text-xs text-destructive">{errors.type.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget (AED) *</Label>
              <Input 
                id="budget"
                placeholder="500,000" 
                {...register('budget')} 
                disabled={isSubmitting}
              />
              {errors.budget && <p className="text-xs text-destructive">{errors.budget.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetRoi">Target ROI (%) *</Label>
              <Input 
                id="targetRoi"
                placeholder="15" 
                {...register('targetRoi')} 
                disabled={isSubmitting}
              />
              {errors.targetRoi && <p className="text-xs text-destructive">{errors.targetRoi.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timelineMonths">Timeline (Months) *</Label>
              <Input 
                id="timelineMonths"
                placeholder="12" 
                {...register('timelineMonths')} 
                disabled={isSubmitting}
              />
              {errors.timelineMonths && <p className="text-xs text-destructive">{errors.timelineMonths.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location"
                placeholder="Dubai Marina" 
                {...register('location')} 
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description"
              placeholder="Project description and details..."
              {...register('description')} 
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
              Create Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}