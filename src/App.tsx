
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "@/contexts/AuthContext"
import { ThemeProvider } from "@/components/ThemeProvider"
import { AccessibilityProvider } from "@/components/AccessibilityProvider"
import { RealTimeProvider } from "@/components/realtime/RealTimeProvider"
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
import SystemOverview from "./pages/admin/System"
import DetailedUsers from "./pages/admin/DetailedUsers"
import AdminInvestors from "./pages/admin/Investors"
import AdminProperties from "./pages/admin/Properties"
import AdminSystemSettings from "./pages/admin/SystemSettings"
import AdminSystemHealth from "./pages/admin/SystemHealth"

// Import public pages
import About from "./pages/About"
import Services from "./pages/Services"
import Projects from "./pages/Projects"
import Media from "./pages/Media"
import Partners from "./pages/Partners"
import Investors from "./pages/Investors"
import Contact from "./pages/Contact"

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
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
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
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </SmartProtectedRoute>
          } />
          
          {/* Role-Specific Dashboards */}
          <Route path="/pm-dashboard" element={
            <SmartProtectedRoute requiredRoles={['project_manager', 'administrator']}>
              <DashboardLayout>
                <ProjectManagerDashboard />
              </DashboardLayout>
            </SmartProtectedRoute>
          } />
          
          <Route path="/investor-dashboard" element={
            <SmartProtectedRoute requiredRoles={['investor', 'administrator']}>
              <DashboardLayout>
                <InvestorDashboard />
              </DashboardLayout>
            </SmartProtectedRoute>
          } />
          
          <Route path="/client-dashboard" element={
            <SmartProtectedRoute requiredRoles={['client', 'administrator']}>
              <DashboardLayout>
                <ClientDashboard />
              </DashboardLayout>
            </SmartProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/system" element={
            <SmartProtectedRoute requiredRoles={['administrator']}>
              <DashboardLayout>
                <SystemOverview />
              </DashboardLayout>
            </SmartProtectedRoute>
          } />
          
          <Route path="/admin/detailed-users" element={
            <SmartProtectedRoute requiredRoles={['administrator']}>
              <DashboardLayout>
                <DetailedUsers />
              </DashboardLayout>
            </SmartProtectedRoute>
          } />
          
          <Route path="/admin/investors" element={
            <SmartProtectedRoute requiredRoles={['administrator']}>
              <DashboardLayout>
                <AdminInvestors />
              </DashboardLayout>
            </SmartProtectedRoute>
          } />
          
          <Route path="/admin/properties" element={
            <SmartProtectedRoute requiredRoles={['administrator']}>
              <DashboardLayout>
                <AdminProperties />
              </DashboardLayout>
            </SmartProtectedRoute>
          } />
          
          <Route path="/admin/system-settings" element={
            <SmartProtectedRoute requiredRoles={['administrator']}>
              <DashboardLayout>
                <AdminSystemSettings />
              </DashboardLayout>
            </SmartProtectedRoute>
          } />
          
          <Route path="/admin/system-health" element={
            <SmartProtectedRoute requiredRoles={['administrator']}>
              <AdminSystemHealth />
            </SmartProtectedRoute>
          } />
          
          {/* Feature Routes */}
          <Route path="/properties" element={
            <SmartProtectedRoute>
              <DashboardLayout>
                <Properties />
              </DashboardLayout>
            </SmartProtectedRoute>
          } />
          
          <Route path="/financial" element={
            <SmartProtectedRoute>
              <DashboardLayout>
                <Financial />
              </DashboardLayout>
            </SmartProtectedRoute>
          } />
          
          <Route path="/documents" element={
            <SmartProtectedRoute>
              <DashboardLayout>
                <Documents />
              </DashboardLayout>
            </SmartProtectedRoute>
          } />
          
          <Route path="/team" element={
            <SmartProtectedRoute>
              <DashboardLayout>
                <Team />
              </DashboardLayout>
            </SmartProtectedRoute>
          } />
          
          <Route path="/qa" element={
            <SmartProtectedRoute>
              <DashboardLayout>
                <QualityAssurance />
              </DashboardLayout>
            </SmartProtectedRoute>
          } />
          
          <Route path="/analytics" element={
            <SmartProtectedRoute>
              <DashboardLayout>
                <Analytics />
              </DashboardLayout>
            </SmartProtectedRoute>
          } />
          
          <Route path="/marketing" element={
            <SmartProtectedRoute>
              <DashboardLayout>
                <Marketing />
              </DashboardLayout>
            </SmartProtectedRoute>
          } />
          
          <Route path="/traffic-analytics" element={
            <SmartProtectedRoute>
              <DashboardLayout>
                <TrafficAnalytics />
              </DashboardLayout>
            </SmartProtectedRoute>
          } />
          
          <Route path="/opportunities" element={
            <SmartProtectedRoute>
              <DashboardLayout>
                <Opportunities />
              </DashboardLayout>
            </SmartProtectedRoute>
          } />
          
          <Route path="/agreements" element={
            <SmartProtectedRoute>
              <DashboardLayout>
                <ProjectAgreements />
              </DashboardLayout>
            </SmartProtectedRoute>
          } />
          
          <Route path="/project-management" element={
            <SmartProtectedRoute>
              <DashboardLayout>
                <ProjectManagement />
              </DashboardLayout>
            </SmartProtectedRoute>
          } />
          
          <Route path="/dashboard/projects" element={
            <SmartProtectedRoute>
              <DashboardLayout>
                <DashboardProjects />
              </DashboardLayout>
            </SmartProtectedRoute>
          } />
          
          <Route path="/messages" element={
            <SmartProtectedRoute>
              <DashboardLayout>
                <Messages />
              </DashboardLayout>
            </SmartProtectedRoute>
          } />
          
          <Route path="/notifications" element={
            <SmartProtectedRoute>
              <DashboardLayout>
                <Notifications />
              </DashboardLayout>
            </SmartProtectedRoute>
          } />
          
          <Route path="/notification-settings" element={
            <SmartProtectedRoute>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
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
