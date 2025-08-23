import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MessageCircle } from "lucide-react"

interface MessagingCenterProps {
  open: boolean
  onClose: () => void
}

export function MessagingCenter({ open, onClose }: MessagingCenterProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Messaging Center
          </DialogTitle>
        </DialogHeader>
        <div className="p-4 text-center">
          <p>Enhanced messaging system coming soon...</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}