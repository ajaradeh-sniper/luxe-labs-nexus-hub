import { useState } from "react"
import { 
  Building2, 
  DollarSign, 
  FileText, 
  Users, 
  BarChart3, 
  Settings, 
  Home,
  FolderOpen,
  MessageSquare,
  CheckSquare,
  Bell
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"

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

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Properties", url: "/properties", icon: Building2 },
  { title: "Projects", url: "/projects", icon: FolderOpen },
  { title: "Financial", url: "/financial", icon: DollarSign },
  { title: "Documents", url: "/documents", icon: FileText },
  { title: "Team & Partners", url: "/team", icon: Users },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Messages", url: "/messages", icon: MessageSquare },
  { title: "Quality Assurance", url: "/qa", icon: CheckSquare },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  const isActive = (path: string) => currentPath === path
  const isExpanded = navigationItems.some((item) => isActive(item.url))
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-accent text-primary font-medium shadow-elegant" : "hover:bg-accent/50"

  return (
    <Sidebar
      className={collapsed ? "w-16" : "w-64"}
      collapsible="icon"
    >
      <SidebarContent className="bg-gradient-elegant">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-luxury rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">[L]</span>
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-xl font-bold text-foreground">LUXURY LABS.</h1>
                <p className="text-xs text-muted-foreground">Real Estate Transformation</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup className="px-3">
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground mb-2">
            {!collapsed && "MAIN NAVIGATION"}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${getNavCls({ isActive })}`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
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