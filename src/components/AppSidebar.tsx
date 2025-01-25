import { FileText, Home, Users, Bell, Settings, ChevronLeft, ShieldCheck, LogOut } from "lucide-react";
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
  SidebarFooter,
} from "./ui/sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
    path: "/personnel/soldiers",
    subItems: [
      {
        title: "Soldiers",
        path: "/personnel/soldiers",
      },
      {
        title: "Officers",
        path: "/personnel/officers",
      },
    ],
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
    subItems: [
      {
        title: "Custom Fields",
        path: "/settings/custom-fields",
      },
      {
        title: "Database",
        path: "/settings/database",
      },
    ],
  },
];

export function AppSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const navigate = useNavigate();

  const isActiveRoute = (path: string) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between p-3 md:p-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 md:h-6 md:w-6 text-military-navy" />
          <span className={cn("font-semibold transition-all", 
            state === "collapsed" && "hidden"
          )}>
            Military App
          </span>
        </div>
        <SidebarTrigger className="absolute right-0 top-3 md:top-4 translate-x-1/2 transform bg-background p-1.5 shadow-md hover:bg-accent">
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
                    <Link to={item.path} className="flex items-center gap-2">
                      <item.icon className="size-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                  {item.subItems && state !== "collapsed" && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <SidebarMenuButton
                          key={subItem.path}
                          asChild
                          isActive={isActiveRoute(subItem.path)}
                          tooltip={subItem.title}
                          size="sm"
                        >
                          <Link to={subItem.path}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      ))}
                    </div>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mt-auto p-3 md:p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              tooltip="Logout"
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="size-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}