import { FileText, Home, Users, Bell, Settings, ChevronLeft } from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "./ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    path: "/",
  },
  {
    title: "Cases",
    icon: FileText,
    path: "/cases",
  },
  {
    title: "Personnel",
    icon: Users,
    path: "/personnel",
  },
  {
    title: "Announcements",
    icon: Bell,
    path: "/announcements",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export function AppSidebar() {
  const location = useLocation();
  const { state } = useSidebar();

  const isActiveRoute = (path: string) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-military-navy" />
          <span className={cn("font-semibold transition-all", 
            state === "collapsed" && "hidden"
          )}>
            Military App
          </span>
        </div>
        <SidebarTrigger>
          <ChevronLeft className="h-4 w-4" />
        </SidebarTrigger>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActiveRoute(item.path)}
                    tooltip={item.title}
                  >
                    <Link to={item.path}>
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </>
  );
}