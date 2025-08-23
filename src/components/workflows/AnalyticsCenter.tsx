import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BarChart3 } from "lucide-react"

interface AnalyticsCenterProps {
  open: boolean
  onClose: () => void
}

export function AnalyticsCenter({ open, onClose }: AnalyticsCenterProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Analytics Center
          </DialogTitle>
        </DialogHeader>
        <div className="p-4 text-center">
          <p>Enhanced analytics dashboard coming soon...</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}