import { useState } from "react"
import { 
  LayoutDashboard, 
  Users, 
  Building, 
  TrendingUp, 
  Settings, 
  FileText,
  MessageSquare,
  Bell,
  BarChart3,
  ShieldCheck,
  FolderOpen,
  DollarSign,
  CheckCircle,
  Shield,
  Target,
  Globe,
  Calendar,
  LogOut,
  Eye
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { NavLink, useLocation } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

// Logout button component to handle auth context properly
function LogoutButton({ collapsed }: { collapsed: boolean }) {
  const { logout } = useAuth();
  
  return (
    <SidebarMenuButton 
      onClick={logout}
      className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
    >
      <LogOut className="h-4 w-4" />
      {!collapsed && <span>Logout</span>}
    </SidebarMenuButton>
  );
}

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

// Role-based navigation items
const getNavigationItems = (userRole: string, viewingRole?: string) => {
  // Use viewing role if provided (for preview mode), otherwise use actual user role
  const effectiveRole = viewingRole || userRole;

  const baseItems = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, roles: ['all'] }
  ];

  const adminItems = [
    { title: "User Management", url: "/admin/detailed-users", icon: Users, roles: ['administrator'] },
    { title: "Submission Review", url: "/admin/submission-review", icon: CheckCircle, roles: ['administrator'] },
    
    { title: "Projects", url: "/dashboard/projects", icon: FolderOpen, roles: ['administrator', 'project_manager', 'head_of_design', 'client', 'real_estate_agent', 'partner'] },
    { title: "Property Management", url: "/admin/properties", icon: Building, roles: ['administrator', 'investor'] },
    { title: "Opportunities", url: "/opportunities", icon: Target, roles: ['administrator', 'real_estate_director', 'real_estate_agent'] },
    { title: "Fund Management", url: "/fund-management", icon: DollarSign, roles: ['administrator', 'finance_lead', 'investor'] },
    { title: "System Settings", url: "/admin/system-settings", icon: Settings, roles: ['administrator'] },
    { title: "Security Audit", url: "/admin/security-audit", icon: Shield, roles: ['administrator'] },
    { title: "Analytics", url: "/analytics", icon: BarChart3, roles: ['administrator', 'marketing_lead', 'real_estate_director'] },
    { title: "Marketing", url: "/marketing", icon: Target, roles: ['administrator', 'marketing_lead'] },
    { title: "Agreements", url: "/agreements", icon: FileText, roles: ['administrator', 'project_manager', 'lawyer'] }
  ];

  const operationalItems = [
    { title: "QA", url: "/qa", icon: CheckCircle, roles: ['administrator', 'project_manager', 'head_of_design'] },
    { title: "Calendar", url: "/calendar", icon: Bell, roles: ['all'] },
    { title: "Reports", url: "/reports", icon: BarChart3, roles: ['administrator', 'finance_lead', 'project_manager', 'real_estate_director'] }
  ];

  const investorItems = [
    { title: "Financial", url: "/financial", icon: DollarSign, roles: ['administrator', 'finance_lead', 'investor', 'real_estate_agent', 'partner'] },
    { title: "Documents", url: "/documents", icon: FileText, roles: ['administrator', 'lawyer', 'client', 'project_manager', 'real_estate_agent', 'partner'] },
    { title: "Referrals", url: "/referrals", icon: Users, roles: ['all'] }
  ];

  const allItems = [...baseItems, ...adminItems, ...operationalItems, ...investorItems];
  
  return allItems.filter(item => 
    item.roles.includes('all') || 
    item.roles.includes(effectiveRole) || 
    effectiveRole === 'administrator'
  );
};

export function AppSidebar({ viewingRole }: { viewingRole?: string } = {}) {
  const { state } = useSidebar()
  const { user } = useAuth()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  const navigationItems = getNavigationItems(user?.role || 'administrator', viewingRole)

  const isActive = (path: string) => currentPath === path
  const isExpanded = navigationItems.some((item) => isActive(item.url))
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-accent text-accent-foreground font-medium" : "hover:bg-accent/50"

  return (
    <Sidebar
      className={collapsed ? "w-16" : "w-64"}
      collapsible="icon"
    >
      <SidebarContent className="bg-gradient-elegant">
        {/* Role Viewing Indicator */}
        {viewingRole && user && viewingRole !== user.role && (
          <div className="flex items-center gap-2 px-3 py-2 mx-2 mt-2 bg-warning/10 border border-warning/20 rounded-lg">
            <Eye className="h-4 w-4 text-warning" />
            {!collapsed && (
              <>
                <span className="text-sm font-medium text-warning">
                  Viewing as {viewingRole.replace('_', ' ').split(' ').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                </span>
                <Badge variant="outline" className="text-xs bg-background/50 ml-auto">
                  Preview Mode
                </Badge>
              </>
            )}
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>{!collapsed && "Navigation"}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => getNavCls({ isActive })}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User actions */}
        <div className="mt-auto border-t border-border p-4">
          {user && (
            <div className="space-y-2">
              {!collapsed && (
                <div className="text-xs text-muted-foreground">
                  <p className="font-medium">{user.name}</p>
                  <p className="capitalize">{user.role.replace('_', ' ')}</p>
                </div>
              )}
              <SidebarMenuButton asChild>
                <NavLink to="/notification-settings" className="w-full">
                  <Settings className="h-4 w-4" />
                  {!collapsed && <span>Settings</span>}
                </NavLink>
              </SidebarMenuButton>
              <LogoutButton collapsed={collapsed} />
            </div>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  )
}