export type Role =
  | 'administrator'
  | 'project_manager'
  | 'investor'
  | 'real_estate_director'
  | 'real_estate_agent'
  | 'client'
  | 'finance'
  | 'legal'
  | 'marketing'
  | 'vendor_manager'
  | 'automation';

export type Capability =
  | 'project:create' | 'project:read' | 'project:update' | 'project:delete'
  | 'user:invite' | 'user:update' | 'user:delete'
  | 'investment:create' | 'investment:update' | 'investment:delete'
  | 'document:upload' | 'document:manage'
  | 'opportunity:create' | 'opportunity:approve' | 'opportunity:promote';

export const roleCapabilities: Record<Role, Capability[]> = {
  administrator: [
    'project:create', 'project:read', 'project:update', 'project:delete',
    'user:invite', 'user:update', 'user:delete',
    'investment:create', 'investment:update', 'investment:delete',
    'document:upload', 'document:manage',
    'opportunity:create', 'opportunity:approve', 'opportunity:promote'
  ],
  real_estate_director: [
    'opportunity:create', 'opportunity:approve', 'opportunity:promote',
    'project:read', 'project:update'
  ],
  real_estate_agent: [
    'opportunity:create', 'project:read'
  ],
  project_manager: [
    'project:read', 'project:update', 'document:upload', 'document:manage'
  ],
  investor: ['project:read'],
  client: ['project:read'],
  finance: ['investment:update', 'project:read', 'document:manage'],
  legal: ['document:manage', 'project:read'],
  marketing: ['project:read'],
  vendor_manager: ['project:read'],
  automation: ['project:read'],
};

export function hasCapability(role: Role, capability: Capability): boolean {
  return roleCapabilities[role]?.includes(capability) ?? false;
}