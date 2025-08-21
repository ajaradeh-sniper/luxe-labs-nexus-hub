import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProjects } from "@/hooks/useProjects";
import { Loader2, Play, AlertTriangle, CheckCircle } from "lucide-react";

interface Precondition {
  id: string;
  label: string;
  met: boolean;
  description: string;
}

// Mock preconditions - in real app, fetch from API
const mockPreconditions: Precondition[] = [
  {
    id: 'contracts',
    label: 'Contracts Signed',
    met: true,
    description: 'All required contracts and agreements are signed'
  },
  {
    id: 'budget',
    label: 'Budget Approved',
    met: true,
    description: 'Project budget has been reviewed and approved'
  },
  {
    id: 'team',
    label: 'Team Assigned',
    met: false,
    description: 'Project manager and key team members are assigned'
  },
  {
    id: 'permits',
    label: 'Permits Obtained',
    met: false,
    description: 'Required permits and licenses are secured'
  }
];

export function StartProjectModal({ 
  open, 
  onClose, 
  projectId 
}: { 
  open: boolean; 
  onClose: () => void; 
  projectId?: string;
}) {
  const { start } = useProjects();
  
  // In real app, fetch actual preconditions for this project
  const preconditions = mockPreconditions;
  const unmetConditions = preconditions.filter(p => !p.met);
  const canStart = unmetConditions.length === 0;

  async function handleStart() {
    if (!projectId || !canStart) return;
    
    try {
      await start.mutateAsync(projectId);
      onClose();
    } catch (error) {
      // Error handling is done in the mutation
    }
  }

  const handleClose = () => {
    if (!start.isPending) {
      onClose();
    }
  };

  if (!projectId) {
    return (
      <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>No Project Selected</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Please select a project to start.
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
            <Play className="h-5 w-5" />
            Start Project Execution
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className={`p-3 rounded-lg border ${
            canStart 
              ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
              : 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {canStart ? (
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
              )}
              <span className={`text-sm font-medium ${
                canStart 
                  ? 'text-green-700 dark:text-green-300'
                  : 'text-yellow-700 dark:text-yellow-300'
              }`}>
                {canStart 
                  ? 'Ready to start project execution'
                  : `${unmetConditions.length} precondition${unmetConditions.length > 1 ? 's' : ''} not met`
                }
              </span>
            </div>
            <p className={`text-xs ${
              canStart 
                ? 'text-green-600 dark:text-green-400'
                : 'text-yellow-600 dark:text-yellow-400'
            }`}>
              {canStart
                ? 'All requirements are satisfied. The project will move to execution phase.'
                : 'Please complete the following requirements before starting the project.'
              }
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-sm">Preconditions Checklist:</h4>
            <div className="space-y-2">
              {preconditions.map((condition) => (
                <div key={condition.id} className="flex items-start gap-3 p-2 rounded border">
                  <div className={`mt-0.5 ${condition.met ? 'text-green-500' : 'text-gray-400'}`}>
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{condition.label}</span>
                      <Badge variant={condition.met ? 'default' : 'secondary'} className="text-xs">
                        {condition.met ? 'Complete' : 'Pending'}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {condition.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!canStart && (
            <div className="bg-muted/50 p-3 rounded-lg">
              <p className="text-xs text-muted-foreground">
                Complete the pending requirements and try again. Contact the project team if you need assistance.
              </p>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              variant="outline" 
              onClick={handleClose}
              disabled={start.isPending}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleStart} 
              disabled={!canStart || start.isPending}
            >
              {start.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Start Project
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}