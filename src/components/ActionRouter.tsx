import { useState } from 'react';
import { NewProjectModal } from './modals/NewProjectModal';
import { InviteUserModal } from './modals/InviteUserModal';
import { PromoteOpportunityModal } from './modals/PromoteOpportunityModal';
import { StartProjectModal } from './modals/StartProjectModal';
import { UploadDocumentModal } from './modals/UploadDocumentModal';
import { ReferInvestorModal } from './modals/ReferInvestorModal';
import { JoinInvestmentModal } from './modals/JoinInvestmentModal';

export type ActionKey =
  | 'new-project'
  | 'invite-user'
  | 'promote-opportunity'
  | 'start-project'
  | 'upload-doc'
  | 'reports'
  | 'export-data'
  | 'team-meeting';

interface ActionContext {
  projectId?: string;
  opportunityId?: string;
  [key: string]: any;
}

export function useActionRouter() {
  const [action, setAction] = useState<ActionKey | null>(null);
  const [context, setContext] = useState<ActionContext>({});

  const open = (actionKey: ActionKey, actionContext: ActionContext = {}) => {
    setAction(actionKey);
    setContext(actionContext);
  };

  const close = () => {
    setAction(null);
    setContext({});
  };

  const portal = (
    <>
      <NewProjectModal 
        open={action === 'new-project'} 
        onClose={close}
      />
      <InviteUserModal 
        open={action === 'invite-user'} 
        onClose={close}
      />
      <PromoteOpportunityModal 
        open={action === 'promote-opportunity'} 
        onClose={close}
        opportunityId={context.opportunityId}
      />
      <StartProjectModal 
        open={action === 'start-project'} 
        onClose={close}
        projectId={context.projectId}
      />
      <UploadDocumentModal 
        open={action === 'upload-doc'} 
        onClose={close}
      />
    </>
  );

  return { open, close, portal, currentAction: action, context };
}