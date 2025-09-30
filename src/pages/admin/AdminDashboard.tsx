import { DashboardLayout } from '@/components/DashboardLayout';
import { Helmet } from 'react-helmet-async';
import { QuickStats } from '@/components/admin/QuickStats';
import { ActivityFeed } from '@/components/admin/ActivityFeed';
import { AlertCircle, TrendingUp } from 'lucide-react';
import { AdminCard } from '@/components/admin/AdminCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <Helmet>
        <title>Admin Dashboard | Luxury Labs</title>
        <meta name="description" content="Administrative dashboard for Luxury Labs management" />
      </Helmet>
      
      <div className="space-y-6 p-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back. Here's what's happening with your business today.
          </p>
        </div>

        {/* Quick Stats */}
        <QuickStats />

        {/* Main Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Activity */}
          <ActivityFeed />

          {/* Quick Actions & Alerts */}
          <div className="space-y-6">
            <AdminCard title="Quick Actions">
              <div className="grid gap-3">
                <Button variant="outline" className="justify-start" asChild>
                  <Link to="/admin/users">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Manage Users
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link to="/admin/projects">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    View Projects
                  </Link>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <Link to="/admin/submission-review">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Review Submissions
                  </Link>
                </Button>
              </div>
            </AdminCard>

            <AdminCard title="System Alerts" icon={AlertCircle}>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-md">
                  <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
                    Security Configuration Needed
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Configure OTP expiry and leaked password protection in Supabase settings
                  </p>
                </div>
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-md">
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-400">
                    Database Upgrade Available
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Postgres security patches available - upgrade recommended
                  </p>
                </div>
              </div>
            </AdminCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}