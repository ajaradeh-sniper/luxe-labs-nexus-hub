import { SecurityAuditLog } from '@/components/admin/SecurityAuditLog';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Helmet } from 'react-helmet-async';

export default function SecurityAudit() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Helmet>
          <title>Security Audit | Luxury Labs Admin Dashboard</title>
          <meta name="description" content="Monitor security events and audit logs for the Luxury Labs platform" />
        </Helmet>
        <SecurityAuditLog />
      </DashboardLayout>
    </ProtectedRoute>
  );
}