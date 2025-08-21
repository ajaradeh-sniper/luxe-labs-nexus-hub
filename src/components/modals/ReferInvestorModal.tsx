import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { useToast } from "@/hooks/use-toast"

export function ReferInvestorModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { toast } = useToast()
  const { register, handleSubmit, reset } = useForm()

  async function onSubmit(values: any) {
    // Mock referral submission
    console.log('Referring investor:', values)
    toast({ title: "Referral sent successfully!" })
    reset()
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Refer New Investor</DialogTitle>
        </DialogHeader>
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="Investor Name" {...register('name', { required: true })} />
          <Input placeholder="Email Address" type="email" {...register('email', { required: true })} />
          <Input placeholder="Phone Number" {...register('phone')} />
          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="luxury-gradient text-primary-foreground">Send Referral</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}