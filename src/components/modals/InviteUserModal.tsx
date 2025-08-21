import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUsers } from "@/hooks/useUsers";
import { Loader2, Mail } from "lucide-react";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  role: z.string().min(1, "Please select a role"),
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
});

type FormData = z.infer<typeof schema>;

const roleOptions = [
  { value: 'investor', label: 'Investor', description: 'Can view investments and returns' },
  { value: 'project_manager', label: 'Project Manager', description: 'Can manage projects and timelines' },
  { value: 'real_estate_agent', label: 'Real Estate Agent', description: 'Can create opportunities' },
  { value: 'real_estate_director', label: 'Real Estate Director', description: 'Can approve opportunities' },
  { value: 'finance', label: 'Finance', description: 'Can manage investments and reports' },
  { value: 'legal', label: 'Legal', description: 'Can manage documents and contracts' },
  { value: 'marketing', label: 'Marketing', description: 'Can access marketing tools' },
  { value: 'vendor_manager', label: 'Vendor Manager', description: 'Can manage vendor relationships' },
  { value: 'client', label: 'Client', description: 'Can view project progress' },
];

export function InviteUserModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { invite } = useUsers();
  const { 
    register, 
    handleSubmit, 
    control,
    formState: { errors, isSubmitting }, 
    reset 
  } = useForm<FormData>({ 
    resolver: zodResolver(schema) 
  });

  async function onSubmit(values: FormData) {
    try {
      await invite.mutateAsync(values);
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
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Invite Team Member
          </DialogTitle>
        </DialogHeader>
        
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input 
              id="email"
              type="email"
              placeholder="colleague@company.com" 
              {...register('email')} 
              disabled={isSubmitting}
            />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name"
              placeholder="John Doe" 
              {...register('name')} 
              disabled={isSubmitting}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role *</Label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        <div className="flex flex-col">
                          <span className="font-medium">{role.label}</span>
                          <span className="text-xs text-muted-foreground">{role.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.role && <p className="text-xs text-destructive">{errors.role.message}</p>}
          </div>

          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">
              An invitation email will be sent to the user with instructions to join the platform.
            </p>
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
              Send Invitation
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}