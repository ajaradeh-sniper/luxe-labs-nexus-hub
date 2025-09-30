
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Routes, Route, Navigate } from "react-router-dom"
import Landing from "./pages/Landing"
import Index from "./pages/Index"
import Auth from "./pages/Auth"
import Dashboard from "./pages/Dashboard"
import { SmartProtectedRoute } from "@/components/SmartProtectedRoute"
import { DashboardLayout } from "@/components/DashboardLayout"
import { ErrorBoundary } from "@/components/ErrorBoundary"

// Import all dashboard pages
import Properties from "./pages/Properties"
import Financial from "./pages/Financial"
import Documents from "./pages/Documents"
import Team from "./pages/Team"
import QualityAssurance from "./pages/QualityAssurance"
import Analytics from "./pages/Analytics"
import Marketing from "./pages/Marketing"
import TrafficAnalytics from "./pages/TrafficAnalytics"
import { WebsiteAnalytics } from "./components/analytics/WebsiteAnalytics"
import Opportunities from "./pages/Opportunities"
import ProjectAgreements from "./pages/ProjectAgreements"
import ProjectManagement from "./pages/ProjectManagement"
import Messages from "./pages/Messages"
import Notifications from "./pages/Notifications"
import Settings from "./pages/Settings"
import DashboardProjects from "./pages/DashboardProjects"

// Import role-specific dashboards
import ProjectManagerDashboard from "./pages/ProjectManagerDashboard"
import InvestorDashboard from "./pages/InvestorDashboard"
import ClientDashboard from "./pages/ClientDashboard"

// Import admin pages
import AdminDashboard from "./pages/admin/AdminDashboard"
import SystemOverview from "./pages/admin/System"
import DetailedUsers from "./pages/admin/DetailedUsers"
import AdminInvestors from "./pages/admin/Investors"
import AdminProperties from "./pages/admin/Properties"
import AdminSystemSettings from "./pages/admin/SystemSettings"
import AdminSystemHealth from "./pages/admin/SystemHealth"
import AdminSecurityAudit from "./pages/admin/SecurityAudit"
import AdminSubmissionReview from "./pages/admin/SubmissionReview"
import LeadsManagement from "./pages/admin/LeadsManagement"
import WorkflowsProcesses from "./pages/admin/WorkflowsProcesses"
import ProjectsAdmin from "./pages/admin/ProjectsAdmin"

import InvestorQuestionnairePage from "./pages/InvestorQuestionnaire"
import EnhancedClientDashboard from "./pages/EnhancedClientDashboard"

// Import missing pages
import Calendar from "./pages/Calendar"
import Portfolio from "./pages/Portfolio"
import CRM from "./pages/CRM"
import Reports from "./pages/Reports"
import MarketingTools from "./pages/MarketingTools"
import Messaging from "./pages/Messaging"
import FundManagement from "./pages/FundManagement"
import Referrals from "./pages/Referrals"
import ClientProfile from "./pages/ClientProfile"
import Payments from "./pages/Payments"
import ClientOpportunities from "./pages/ClientOpportunities"

// Import public pages
import About from "./pages/About"
import Services from "./pages/Services"
import Projects from "./pages/Projects"
import Media from "./pages/Media"
import Partners from "./pages/Partners"
import Investors from "./pages/Investors"
import Contact from "./pages/Contact"
import Profile from "./pages/Profile"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

function App() {
  return (
    <ErrorBoundary>
      <TooltipProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/investor-questionnaire" element={<InvestorQuestionnairePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/media" element={<Media />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/investors" element={<Investors />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Auth Route */}
          <Route path="/auth" element={<Auth />} />
          
          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={
            <SmartProtectedRoute>
              <Dashboard />
            </SmartProtectedRoute>
          } />
          
          {/* Role-Specific Dashboards */}
          <Route path="/pm-dashboard" element={
            <SmartProtectedRoute requiredRoles={['real_estate_agent', 'administrator']}>
              <ProjectManagerDashboard />
            </SmartProtectedRoute>
          } />
          
          <Route path="/investor-dashboard" element={
            <SmartProtectedRoute requiredRoles={['investor', 'administrator']}>
              <InvestorDashboard />
            </SmartProtectedRoute>
          } />
          
          <Route path="/client-dashboard" element={
            <SmartProtectedRoute requiredRoles={['investor', 'administrator']}>
              <EnhancedClientDashboard />
            </SmartProtectedRoute>
          } />
          
          <Route path="/client-profile" element={
            <SmartProtectedRoute requiredRoles={['investor', 'administrator']}>
              <ClientProfile />
            </SmartProtectedRoute>
          } />
          
          <Route path="/payments" element={
            <SmartProtectedRoute requiredRoles={['investor', 'administrator']}>
              <Payments />
            </SmartProtectedRoute>
          } />
          
          <Route path="/client-opportunities" element={
            <SmartProtectedRoute requiredRoles={['investor', 'administrator']}>
              <ClientOpportunities />
            </SmartProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={
            <SmartProtectedRoute requiredRoles={['administrator']}>
              <AdminDashboard />
            </SmartProtectedRoute>
          } />
          
          <Route path="/admin/system" element={
            <SmartProtectedRoute requiredRoles={['administrator']}>
              <SystemOverview />
            </SmartProtectedRoute>
          } />
          
          <Route path="/admin/detailed-users" element={
            <SmartProtectedRoute requiredRoles={['administrator']}>
              <DetailedUsers />
            </SmartProtectedRoute>
          } />
          
          <Route path="/admin/investors" element={
            <SmartProtectedRoute requiredRoles={['administrator']}>
              <AdminInvestors />
            </SmartProtectedRoute>
          } />
          
          <Route path="/admin/properties" element={
            <SmartProtectedRoute requiredRoles={['administrator']}>
              <AdminProperties />
            </SmartProtectedRoute>
          } />
          
          <Route path="/admin/system-settings" element={
            <SmartProtectedRoute requiredRoles={['administrator']}>
              <AdminSystemSettings />
            </SmartProtectedRoute>
          } />
          
          <Route path="/admin/system-health" element={
            <SmartProtectedRoute requiredRoles={['administrator']}>
              <AdminSystemHealth />
            </SmartProtectedRoute>
          } />
          
          <Route path="/admin/submission-review" element={
            <SmartProtectedRoute requiredRoles={['administrator']}>
              <AdminSubmissionReview />
            </SmartProtectedRoute>
          } />
          
          <Route path="/admin/security-audit" element={
            <SmartProtectedRoute requiredRoles={['administrator']}>
              <AdminSecurityAudit />
            </SmartProtectedRoute>
          } />
          
          <Route path="/admin/leads" element={
            <SmartProtectedRoute requiredRoles={['administrator', 'real_estate_agent']}>
              <LeadsManagement />
            </SmartProtectedRoute>
          } />
          
          <Route path="/admin/workflows-processes" element={
            <SmartProtectedRoute requiredRoles={['administrator']}>
              <WorkflowsProcesses />
            </SmartProtectedRoute>
          } />
          
          <Route path="/admin/projects" element={
            <SmartProtectedRoute requiredRoles={['administrator']}>
              <ProjectsAdmin />
            </SmartProtectedRoute>
          } />
          
          {/* Public Questionnaire Route */}
          <Route path="/investor-questionnaire" element={<InvestorQuestionnairePage />} />

          {/* Feature Routes */}
          <Route path="/properties" element={
            <SmartProtectedRoute>
              <Properties />
            </SmartProtectedRoute>
          } />
          
          <Route path="/financial" element={
            <SmartProtectedRoute>
              <Financial />
            </SmartProtectedRoute>
          } />
          
          <Route path="/documents" element={
            <SmartProtectedRoute>
              <Documents />
            </SmartProtectedRoute>
          } />
          
          <Route path="/team" element={
            <SmartProtectedRoute>
              <Team />
            </SmartProtectedRoute>
          } />
          
          <Route path="/qa" element={
            <SmartProtectedRoute>
              <QualityAssurance />
            </SmartProtectedRoute>
          } />
          
          <Route path="/analytics" element={
            <SmartProtectedRoute>
              <Analytics />
            </SmartProtectedRoute>
          } />
          
          <Route path="/marketing" element={
            <SmartProtectedRoute>
              <Marketing />
            </SmartProtectedRoute>
          } />
          
          <Route path="/traffic-analytics" element={
            <SmartProtectedRoute>
              <TrafficAnalytics />
            </SmartProtectedRoute>
          } />
          
          <Route path="/website-analytics" element={
            <SmartProtectedRoute>
              <WebsiteAnalytics />
            </SmartProtectedRoute>
          } />
          
          <Route path="/opportunities" element={
            <SmartProtectedRoute>
              <Opportunities />
            </SmartProtectedRoute>
          } />
          
          <Route path="/fund-management" element={
            <SmartProtectedRoute requiredRoles={['administrator', 'real_estate_agent', 'investor']}>
              <FundManagement />
            </SmartProtectedRoute>
          } />
          
          <Route path="/agreements" element={
            <SmartProtectedRoute>
              <ProjectAgreements />
            </SmartProtectedRoute>
          } />
          
          <Route path="/project-management" element={
            <SmartProtectedRoute>
              <ProjectManagement />
            </SmartProtectedRoute>
          } />
          
          <Route path="/dashboard/projects" element={
            <SmartProtectedRoute>
              <DashboardProjects />
            </SmartProtectedRoute>
          } />
          
          <Route path="/messages" element={
            <SmartProtectedRoute>
              <Messages />
            </SmartProtectedRoute>
          } />
          
          <Route path="/notifications" element={
            <SmartProtectedRoute>
              <Notifications />
            </SmartProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <SmartProtectedRoute>
              <Profile />
            </SmartProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <SmartProtectedRoute>
              <Settings />
            </SmartProtectedRoute>
          } />
          
          <Route path="/notification-settings" element={
            <SmartProtectedRoute>
              <Settings />
            </SmartProtectedRoute>
          } />
          
          {/* Missing Pages */}
          <Route path="/calendar" element={
            <SmartProtectedRoute>
              <Calendar />
            </SmartProtectedRoute>
          } />
          
          <Route path="/portfolio" element={
            <SmartProtectedRoute requiredRoles={['investor', 'administrator']}>
              <Portfolio />
            </SmartProtectedRoute>
          } />
          
          <Route path="/crm" element={
            <SmartProtectedRoute requiredRoles={['administrator', 'real_estate_agent']}>
              <CRM />
            </SmartProtectedRoute>
          } />
          
          <Route path="/reports" element={
            <SmartProtectedRoute requiredRoles={['administrator', 'real_estate_agent']}>
              <Reports />
            </SmartProtectedRoute>
          } />
          
          <Route path="/marketing-tools" element={
            <SmartProtectedRoute requiredRoles={['administrator', 'real_estate_agent']}>
              <MarketingTools />
            </SmartProtectedRoute>
          } />
          
          <Route path="/messaging" element={
            <SmartProtectedRoute>
              <Messaging />
            </SmartProtectedRoute>
          } />
          
          <Route path="/referrals" element={
            <SmartProtectedRoute>
              <Referrals />
            </SmartProtectedRoute>
          } />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </ErrorBoundary>
  )
}

export default App
