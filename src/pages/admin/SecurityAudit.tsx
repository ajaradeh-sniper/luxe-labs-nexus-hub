import { SecurityAuditLog } from '@/components/admin/SecurityAuditLog';
import { Helmet } from 'react-helmet-async';

export default function SecurityAudit() {
  return (
    <>
      <Helmet>
        <title>Security Audit | Luxury Labs Admin Dashboard</title>
        <meta name="description" content="Monitor security events and audit logs for the Luxury Labs platform" />
      </Helmet>
      <SecurityAuditLog />
    </>
  );
}