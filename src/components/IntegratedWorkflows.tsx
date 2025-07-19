import { useState } from "react"
import { ProjectCreationWizard } from "./ProjectCreationWizard"
import { DocumentUpload } from "./DocumentUpload"
import { TeamInvite } from "./TeamInvite"
import { FinancialReportGenerator } from "./FinancialReportGenerator"

export function useWorkflowModals() {
  const [projectWizardOpen, setProjectWizardOpen] = useState(false)
  const [documentUploadOpen, setDocumentUploadOpen] = useState(false)
  const [teamInviteOpen, setTeamInviteOpen] = useState(false)
  const [reportGeneratorOpen, setReportGeneratorOpen] = useState(false)

  const openProjectWizard = () => setProjectWizardOpen(true)
  const openDocumentUpload = () => setDocumentUploadOpen(true)
  const openTeamInvite = () => setTeamInviteOpen(true)
  const openReportGenerator = () => setReportGeneratorOpen(true)

  const WorkflowModals = () => (
    <>
      <ProjectCreationWizard 
        open={projectWizardOpen} 
        onOpenChange={setProjectWizardOpen} 
      />
      <DocumentUpload 
        open={documentUploadOpen} 
        onOpenChange={setDocumentUploadOpen} 
      />
      <TeamInvite 
        open={teamInviteOpen} 
        onOpenChange={setTeamInviteOpen} 
      />
      <FinancialReportGenerator 
        open={reportGeneratorOpen} 
        onOpenChange={setReportGeneratorOpen} 
      />
    </>
  )

  return {
    openProjectWizard,
    openDocumentUpload, 
    openTeamInvite,
    openReportGenerator,
    WorkflowModals
  }
}