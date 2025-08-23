import { useState } from "react"
import { Button } from "@/components/ui/button"
import { UnifiedProjectModal } from "@/components/modals/UnifiedProjectModal"
import { InvestorManagementModal } from "@/components/modals/InvestorManagementModal"
import { OpportunityPitchModal } from "@/components/modals/OpportunityPitchModal"
import { UserInviteModal } from "./UserInviteModal"
import { MessagingCenter } from "./MessagingCenter"
import { AnalyticsCenter } from "./AnalyticsCenter"
import { DocumentWorkflows } from "@/components/documents/DocumentWorkflows"
import { EmailSystem } from "@/components/notifications/EmailSystem"
import { FinancialTracking } from "@/components/financial/FinancialTracking"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { 
  Plus, 
  Users, 
  UserPlus, 
  Target, 
  MessageCircle,
  BarChart3,
  Building,
  TrendingUp,
  Send,
  FileText,
  Mail,
  DollarSign
} from "lucide-react"

export type WorkflowAction = 
  | 'create-project'
  | 'add-user'
  | 'invite-user'
  | 'add-investor'
  | 'invite-investor'
  | 'create-opportunity'
  | 'send-pitch'
  | 'open-messaging'
  | 'view-analytics'

interface UnifiedWorkflowSystemProps {
  trigger?: WorkflowAction
  onActionComplete?: () => void
}

export function UnifiedWorkflowSystem({ trigger, onActionComplete }: UnifiedWorkflowSystemProps) {
  const [activeModal, setActiveModal] = useState<WorkflowAction | null>(trigger || null)
  const [documentsOpen, setDocumentsOpen] = useState(false)
  const [emailOpen, setEmailOpen] = useState(false)
  const [financialOpen, setFinancialOpen] = useState(false)

  const handleOpenModal = (action: WorkflowAction) => {
    setActiveModal(action)
  }

  const handleCloseModal = () => {
    setActiveModal(null)
    onActionComplete?.()
  }

  const handleModalSuccess = () => {
    handleCloseModal()
  }

  const workflows = [
    {
      id: 'create-project' as WorkflowAction,
      title: 'Create New Project',
      description: 'Start a new project (Flip, Fund, Advisory, Transformation)',
      icon: Building,
      color: 'bg-blue-500',
      shortcut: 'Ctrl+N'
    },
    {
      id: 'add-user' as WorkflowAction,
      title: 'Add Team Member',
      description: 'Add a new user to the system',
      icon: UserPlus,
      color: 'bg-green-500',
      shortcut: 'Ctrl+U'
    },
    {
      id: 'invite-user' as WorkflowAction,
      title: 'Invite User',
      description: 'Send invitation to join the platform',
      icon: Send,
      color: 'bg-green-600',
      shortcut: 'Ctrl+I'
    },
    {
      id: 'add-investor' as WorkflowAction,
      title: 'Add Investor',
      description: 'Add new investor to database',
      icon: TrendingUp,
      color: 'bg-purple-500',
      shortcut: 'Ctrl+A'
    },
    {
      id: 'invite-investor' as WorkflowAction,
      title: 'Invite Investor',
      description: 'Invite new investor with onboarding',
      icon: Users,
      color: 'bg-purple-600',
      shortcut: 'Ctrl+V'
    },
    {
      id: 'send-pitch' as WorkflowAction,
      title: 'Send Opportunity Pitch',
      description: 'Create and distribute investment opportunity',
      icon: Target,
      color: 'bg-orange-500',
      shortcut: 'Ctrl+P'
    },
    {
      id: 'open-messaging' as WorkflowAction,
      title: 'Message Center',
      description: 'Send and manage messages',
      icon: MessageCircle,
      color: 'bg-indigo-500',
      shortcut: 'Ctrl+M'
    },
    {
      id: 'view-analytics' as WorkflowAction,
      title: 'Analytics Dashboard',
      description: 'View and filter analytics data',
      icon: BarChart3,
      color: 'bg-cyan-500',
      shortcut: 'Ctrl+D'
    }
  ]

  const additionalWorkflows = [
    {
      id: 'documents',
      title: 'Documents',
      description: 'Manage document workflows',
      icon: FileText,
      color: 'bg-green-500',
      action: () => setDocumentsOpen(true)
    },
    {
      id: 'email',
      title: 'Email System',
      description: 'Send emails and campaigns',
      icon: Mail,
      color: 'bg-blue-500',
      action: () => setEmailOpen(true)
    },
    {
      id: 'financial',
      title: 'Financial Tracking',
      description: 'Track ROI and expenses',
      icon: DollarSign,
      color: 'bg-yellow-500',
      action: () => setFinancialOpen(true)
    }
  ]

  // Keyboard shortcuts
  useState(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'n':
            e.preventDefault()
            handleOpenModal('create-project')
            break
          case 'u':
            e.preventDefault()
            handleOpenModal('add-user')
            break
          case 'i':
            e.preventDefault()
            handleOpenModal('invite-user')
            break
          case 'a':
            e.preventDefault()
            handleOpenModal('add-investor')
            break
          case 'v':
            e.preventDefault()
            handleOpenModal('invite-investor')
            break
          case 'p':
            e.preventDefault()
            handleOpenModal('send-pitch')
            break
          case 'm':
            e.preventDefault()
            handleOpenModal('open-messaging')
            break
          case 'd':
            e.preventDefault()
            handleOpenModal('view-analytics')
            break
        }
      }
    }

    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  })

  return (
    <>
      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {workflows.map((workflow) => (
          <Button
            key={workflow.id}
            variant="outline"
            className="h-auto p-4 flex flex-col items-center gap-2 hover:shadow-md transition-all"
            onClick={() => handleOpenModal(workflow.id)}
          >
            <div className={`p-3 rounded-lg ${workflow.color} text-white`}>
              <workflow.icon className="h-6 w-6" />
            </div>
            <div className="text-center">
              <div className="font-medium text-sm">{workflow.title}</div>
              <div className="text-xs text-muted-foreground">{workflow.description}</div>
              <div className="text-xs text-muted-foreground mt-1 font-mono">{workflow.shortcut}</div>
            </div>
          </Button>
        ))}
        </div>
        
        {/* Additional Workflows */}
        <div className="grid grid-cols-3 gap-4 p-4">
          {additionalWorkflows.map((workflow) => (
            <Button
              key={workflow.id}
              variant="outline"
              className="h-24 flex flex-col gap-2"
              onClick={workflow.action}
            >
              <workflow.icon className="h-6 w-6" />
              <span className="text-sm">{workflow.title}</span>
            </Button>
          ))}
        </div>

      {/* Modals */}
      <UnifiedProjectModal
        open={activeModal === 'create-project'}
        onClose={handleCloseModal}
        onSuccess={handleModalSuccess}
      />

      <UserInviteModal
        open={activeModal === 'add-user' || activeModal === 'invite-user'}
        onClose={handleCloseModal}
        mode={activeModal === 'invite-user' ? 'invite' : 'add'}
        onSuccess={handleModalSuccess}
      />

      <InvestorManagementModal
        open={activeModal === 'add-investor' || activeModal === 'invite-investor'}
        onClose={handleCloseModal}
        mode={activeModal === 'invite-investor' ? 'invite' : 'add'}
        onSuccess={handleModalSuccess}
      />

      <OpportunityPitchModal
        open={activeModal === 'send-pitch'}
        onClose={handleCloseModal}
        onSuccess={handleModalSuccess}
      />

      <MessagingCenter
        open={activeModal === 'open-messaging'}
        onClose={handleCloseModal}
      />

      <AnalyticsCenter
        open={activeModal === 'view-analytics'}
        onClose={handleCloseModal}
      />
      
      {/* Additional System Modals */}
      <Dialog open={documentsOpen} onOpenChange={setDocumentsOpen}>
        <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Document Management</DialogTitle>
          </DialogHeader>
          <DocumentWorkflows />
        </DialogContent>
      </Dialog>
      
      <Dialog open={emailOpen} onOpenChange={setEmailOpen}>
        <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Email System</DialogTitle>
          </DialogHeader>
          <EmailSystem />
        </DialogContent>
      </Dialog>
      
      <Dialog open={financialOpen} onOpenChange={setFinancialOpen}>
        <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Financial Tracking</DialogTitle>
          </DialogHeader>
          <FinancialTracking />
        </DialogContent>
      </Dialog>
    </>
  )
}