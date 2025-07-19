export type UserRole = 
  | 'administrator'
  | 'real_estate_director'
  | 'real_estate_agent'
  | 'investor_relations_manager'
  | 'property_sales_lead'
  | 'bd_manager'
  | 'project_manager'
  | 'head_of_design'
  | 'lawyer'
  | 'finance_lead'
  | 'marketing_lead'
  | 'vendor_manager'
  | 'automation_lead'
  | 'investor'
  | 'client'
  | 'partner';

export type Permission = 'view' | 'edit' | 'approve' | 'delete';

export interface RolePermissions {
  [key: string]: Permission[];
}

export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  administrator: {
    all: ['view', 'edit', 'approve', 'delete']
  },
  real_estate_director: {
    opportunities: ['view', 'edit', 'approve'],
    dld_data: ['view', 'edit', 'approve']
  },
  real_estate_agent: {
    listings: ['view', 'edit'],
    crm_leads: ['view', 'edit']
  },
  investor_relations_manager: {
    investors: ['view', 'edit', 'approve'],
    kyc: ['view', 'edit', 'approve'],
    roi_reports: ['view', 'edit', 'approve']
  },
  property_sales_lead: {
    post_renovation_projects: ['view', 'edit'],
    listings: ['view', 'edit']
  },
  bd_manager: {
    crm: ['view', 'edit'],
    partner_records: ['view', 'edit']
  },
  project_manager: {
    projects: ['view', 'edit', 'approve'],
    timelines: ['view', 'edit', 'approve'],
    partners: ['view', 'edit', 'approve']
  },
  head_of_design: {
    design_boards: ['view', 'edit'],
    comments: ['view', 'edit']
  },
  lawyer: {
    legal_docs: ['view', 'edit', 'approve'],
    contracts: ['view', 'edit', 'approve']
  },
  finance_lead: {
    payments: ['view', 'edit', 'approve'],
    roi: ['view', 'edit', 'approve'],
    invoices: ['view', 'edit', 'approve']
  },
  marketing_lead: {
    media: ['view', 'edit', 'approve'],
    campaign_builder: ['view', 'edit', 'approve'],
    marketing: ['view', 'edit', 'approve'],
    traffic_analytics: ['view', 'edit', 'approve'],
    seo: ['view', 'edit', 'approve'],
    social_media: ['view', 'edit', 'approve']
  },
  vendor_manager: {
    partner_profiles: ['view', 'edit'],
    ratings: ['view', 'edit']
  },
  automation_lead: {
    system_logs: ['view', 'edit', 'approve'],
    flow_manager: ['view', 'edit', 'approve']
  },
  investor: {
    investment_portfolio: ['view'],
    docs: ['view']
  },
  client: {
    their_projects: ['view'],
    designs: ['view']
  },
  partner: {
    assigned_tasks: ['view'],
    uploads: ['view', 'edit']
  }
};

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}