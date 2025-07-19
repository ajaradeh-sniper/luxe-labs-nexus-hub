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
  Target,
  Globe
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

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
const getNavigationItems = (userRole: string) => {
  // Role-specific dashboard routing
  const getDashboardUrl = (role: string) => {
    switch(role) {
      case 'project_manager': return '/pm-dashboard';
      case 'investor': return '/investor-dashboard';
      case 'client': return '/client-dashboard';
      default: return '/dashboard';
    }
  };

  const baseItems = [
    { title: "Dashboard", url: getDashboardUrl(userRole), icon: LayoutDashboard, roles: ['all'] }
  ];

  const adminItems = [
    { title: "User Management", url: "/admin/detailed-users", icon: Users, roles: ['administrator'] },
    { title: "Investor Management", url: "/admin/investors", icon: TrendingUp, roles: ['administrator'] },
    { title: "Property Management", url: "/admin/properties", icon: Building, roles: ['administrator'] },
    { title: "System Settings", url: "/admin/system-settings", icon: Settings, roles: ['administrator'] },
    { title: "System Overview", url: "/admin/system", icon: ShieldCheck, roles: ['administrator'] },
    { title: "Analytics", url: "/analytics", icon: BarChart3, roles: ['administrator'] },
    { title: "Marketing", url: "/marketing", icon: Target, roles: ['administrator', 'marketing_lead'] },
    { title: "Traffic Analytics", url: "/traffic-analytics", icon: Globe, roles: ['administrator', 'marketing_lead'] }
  ];

  const operationalItems = [
    { title: "Projects", url: "/dashboard/projects", icon: FolderOpen, roles: ['administrator', 'project_manager', 'head_of_design', 'client'] },
    { title: "Properties", url: "/properties", icon: Building, roles: ['administrator', 'real_estate_director', 'real_estate_agent', 'investor'] },
    { title: "Financial", url: "/financial", icon: DollarSign, roles: ['administrator', 'finance_lead', 'investor'] },
    { title: "Documents", url: "/documents", icon: FileText, roles: ['administrator', 'lawyer', 'client', 'project_manager'] },
    { title: "Team", url: "/team", icon: Users, roles: ['administrator', 'project_manager', 'vendor_manager'] },
    { title: "QA", url: "/qa", icon: CheckCircle, roles: ['administrator', 'project_manager', 'head_of_design'] },
    { title: "Messages", url: "/messages", icon: MessageSquare, roles: ['all'] },
    { title: "Notifications", url: "/notifications", icon: Bell, roles: ['all'] }
  ];

  const investorItems = [
    { title: "Portfolio", url: "/portfolio", icon: TrendingUp, roles: ['administrator', 'investor'] }
  ];

  const allItems = [...baseItems, ...adminItems, ...operationalItems, ...investorItems];
  
  return allItems.filter(item => 
    item.roles.includes('all') || 
    item.roles.includes(userRole) || 
    userRole === 'administrator'
  );
};

export function AppSidebar() {
  const { state } = useSidebar()
  const { user } = useAuth()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  const navigationItems = getNavigationItems(user?.role || 'administrator')

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
        {/* Logo */}
        <div className="p-4 border-b border-border">
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">LL</span>
              </div>
              <div>
                <h2 className="font-semibold text-sm">Luxury Labs</h2>
                <p className="text-xs text-muted-foreground">Real Estate Platform</p>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
              <span className="text-primary-foreground font-bold text-sm">LL</span>
            </div>
          )}
        </div>

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
      </SidebarContent>
    </Sidebar>
  )
}