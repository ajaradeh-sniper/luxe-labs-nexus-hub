import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { useToast } from "@/hooks/use-toast"

export function JoinInvestmentModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { toast } = useToast()
  const { register, handleSubmit, reset } = useForm()

  async function onSubmit(values: any) {
    // Mock investment submission
    console.log('Joining investment:', values)
    toast({ title: "Investment interest submitted!" })
    reset()
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join Investment Opportunity</DialogTitle>
        </DialogHeader>
        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="Investment Amount (AED)" {...register('amount', { required: true })} />
          <Input placeholder="Expected Timeline (months)" {...register('timeline')} />
          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="luxury-gradient text-primary-foreground">Submit Interest</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}