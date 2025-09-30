export type UserRole = 
  | 'administrator'
  | 'real_estate_agent'
  | 'investor';

export type Permission = 'view' | 'edit' | 'approve' | 'delete';

export interface RolePermissions {
  [key: string]: Permission[];
}

export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  administrator: {
    all: ['view', 'edit', 'approve', 'delete'],
    project_management: ['view', 'edit', 'approve', 'delete'],
    costs: ['view', 'edit', 'approve', 'delete'],
    risks: ['view', 'edit', 'approve', 'delete'],
    tenders: ['view', 'edit', 'approve', 'delete'],
    opportunities: ['view', 'edit', 'approve', 'delete'],
    properties: ['view', 'edit', 'approve', 'delete'],
    users: ['view', 'edit', 'approve', 'delete'],
    analytics: ['view', 'edit', 'approve', 'delete'],
    documents: ['view', 'edit', 'approve', 'delete'],
    financial: ['view', 'edit', 'approve', 'delete']
  },
  real_estate_agent: {
    listings: ['view', 'edit'],
    crm_leads: ['view', 'edit'],
    projects: ['view'],
    docs: ['view'],
    opportunities: ['view', 'edit']
  },
  investor: {
    investment_portfolio: ['view'],
    projects: ['view'],
    opportunities: ['view'],
    docs: ['view'],
    financial: ['view']
  }
};

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}