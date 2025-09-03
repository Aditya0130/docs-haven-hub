import { 
  BookOpen, 
  Rocket, 
  Settings, 
  Code, 
  Palette, 
  Database,
  Shield,
  Zap,
  Globe,
  Users,
  MessageSquare,
  BarChart3
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const navigation = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", url: "/", icon: BookOpen },
      { title: "Quick Start", url: "/quick-start", icon: Rocket },
      { title: "Installation", url: "/installation", icon: Settings },
    ]
  },
  {
    title: "Development",
    items: [
      { title: "API Reference", url: "/api", icon: Code },
      { title: "Components", url: "/components", icon: Palette },
      { title: "Database", url: "/database", icon: Database },
      { title: "Authentication", url: "/auth", icon: Shield },
    ]
  },
  {
    title: "Advanced",
    items: [
      { title: "Performance", url: "/performance", icon: Zap },
      { title: "Deployment", url: "/deployment", icon: Globe },
      { title: "Team Management", url: "/team", icon: Users },
      { title: "Analytics", url: "/analytics", icon: BarChart3 },
    ]
  },
  {
    title: "Support",
    items: [
      { title: "Community", url: "/community", icon: MessageSquare },
    ]
  }
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;

  const getNavClasses = (path: string) => {
    const baseClasses = "w-full justify-start transition-colors duration-200";
    if (isActive(path)) {
      return `${baseClasses} bg-docs-nav-active text-primary-foreground font-medium`;
    }
    return `${baseClasses} hover:bg-docs-nav-hover`;
  };

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="p-4 border-b border-docs-border-subtle">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-semibold text-foreground">DocuApp</h2>
              <p className="text-xs text-muted-foreground">Documentation Hub</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        {navigation.map((section) => (
          <SidebarGroup key={section.title}>
            {!collapsed && (
              <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 py-2">
                {section.title}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        className={getNavClasses(item.url)}
                        title={collapsed ? item.title : undefined}
                      >
                        <item.icon className="w-4 h-4 flex-shrink-0" />
                        {!collapsed && <span className="ml-3">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}