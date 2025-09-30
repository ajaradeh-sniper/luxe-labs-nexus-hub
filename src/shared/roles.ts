export type Role =
  | 'administrator'
  | 'real_estate_agent'
  | 'investor';

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
  real_estate_agent: [
    'opportunity:create', 'project:read', 'document:upload'
  ],
  investor: ['project:read', 'opportunity:create'],
};

export function hasCapability(role: Role, capability: Capability): boolean {
  return roleCapabilities[role]?.includes(capability) ?? false;
}