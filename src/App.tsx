import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
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
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Index />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/portfolio" element={<Properties />} />
            <Route path="/financial" element={<Financial />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/team" element={<Team />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/qa" element={<QualityAssurance />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            {/* Admin Routes */}
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/system" element={<AdminSystem />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
