import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import Projects from "./pages/Projects";
import Financial from "./pages/Financial";
import Documents from "./pages/Documents";
import Team from "./pages/Team";
import Analytics from "./pages/Analytics";
import Messages from "./pages/Messages";
import QualityAssurance from "./pages/QualityAssurance";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import AdminUsers from "./pages/admin/Users";
import AdminSystem from "./pages/admin/System";
import AdminDetailedUsers from "./pages/admin/DetailedUsers";
import AdminInvestors from "./pages/admin/Investors";
import AdminProperties from "./pages/admin/Properties";
import AdminSystemSettings from "./pages/admin/SystemSettings";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import Media from "./pages/Media";
import Partners from "./pages/Partners";
import Investors from "./pages/Investors";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectManagerDashboard from "./pages/ProjectManagerDashboard";
import InvestorDashboard from "./pages/InvestorDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import DashboardProjects from "./pages/DashboardProjects";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import InvestmentDisclaimer from "./pages/legal/InvestmentDisclaimer";
import Marketing from "./pages/Marketing";
import TrafficAnalytics from "./pages/TrafficAnalytics";
import Opportunities from "./pages/Opportunities";
import ProjectAgreements from "./pages/ProjectAgreements";
import ProjectManagement from "./pages/ProjectManagement";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="luxury-labs-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/properties" element={<ProtectedRoute><Properties /></ProtectedRoute>} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/dashboard/projects" element={<ProtectedRoute><DashboardProjects /></ProtectedRoute>} />
            <Route path="/projects/:id" element={<ProtectedRoute><ProjectDetail /></ProtectedRoute>} />
            <Route path="/pm-dashboard" element={<ProtectedRoute><ProjectManagerDashboard /></ProtectedRoute>} />
            <Route path="/investor-dashboard" element={<ProtectedRoute><InvestorDashboard /></ProtectedRoute>} />
            <Route path="/client-dashboard" element={<ProtectedRoute><ClientDashboard /></ProtectedRoute>} />
            <Route path="/portfolio" element={<ProtectedRoute><Properties /></ProtectedRoute>} />
            <Route path="/financial" element={<ProtectedRoute><Financial /></ProtectedRoute>} />
            <Route path="/documents" element={<ProtectedRoute><Documents /></ProtectedRoute>} />
            <Route path="/team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
            <Route path="/qa" element={<ProtectedRoute><QualityAssurance /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/media" element={<Media />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/investors" element={<Investors />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/investment-disclaimer" element={<InvestmentDisclaimer />} />
            <Route path="/marketing" element={<ProtectedRoute><Marketing /></ProtectedRoute>} />
            <Route path="/traffic-analytics" element={<ProtectedRoute><TrafficAnalytics /></ProtectedRoute>} />
            <Route path="/opportunities" element={<ProtectedRoute><Opportunities /></ProtectedRoute>} />
            <Route path="/agreements" element={<ProtectedRoute><ProjectAgreements /></ProtectedRoute>} />
            <Route path="/project-management" element={<ProtectedRoute><ProjectManagement /></ProtectedRoute>} />
            {/* Admin Routes */}
           <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
           <Route path="/admin/detailed-users" element={<ProtectedRoute><AdminDetailedUsers /></ProtectedRoute>} />
           <Route path="/admin/investors" element={<ProtectedRoute><AdminInvestors /></ProtectedRoute>} />
           <Route path="/admin/properties" element={<ProtectedRoute><AdminProperties /></ProtectedRoute>} />
           <Route path="/admin/system-settings" element={<ProtectedRoute><AdminSystemSettings /></ProtectedRoute>} />
           <Route path="/admin/system" element={<ProtectedRoute><AdminSystem /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
