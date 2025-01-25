import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Users, FileText, Bell, Home, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  {
    name: "Personnel",
    href: "/personnel",
    icon: Users,
    subItems: [
      { name: "Officers", href: "/personnel/officers" },
      { name: "Soldiers", href: "/personnel/soldiers" },
    ],
  },
  {
    name: "Cases",
    href: "/cases",
    icon: FileText,
    subItems: [
      { name: "Active Cases", href: "/cases/active" },
      { name: "New Case", href: "/cases/new" },
    ],
  },
  {
    name: "Announcements",
    href: "/announcements",
    icon: Bell,
    subItems: [
      { name: "View All", href: "/announcements" },
      { name: "New Announcement", href: "/announcements/new" },
    ],
  },
];

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error logging out");
      console.error("Error:", error);
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <Link to="/dashboard" className="flex ml-2 md:mr-24">
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-military-navy">
                Military System
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.subItems ? item.subItems[0].href : item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-lg",
                    location.pathname === item.href ||
                      (item.subItems &&
                        item.subItems.some((subItem) =>
                          location.pathname.startsWith(subItem.href)
                        ))
                      ? "text-military-navy bg-gray-100"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <item.icon className="w-5 h-5 mr-2" />
                  {item.name}
                </Link>
                {item.subItems && (
                  <div className="absolute left-0 hidden pt-2 group-hover:block">
                    <div className="bg-white border rounded-lg shadow-lg">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className={cn(
                            "block px-4 py-2 text-sm whitespace-nowrap",
                            location.pathname === subItem.href
                              ? "text-military-navy bg-gray-100"
                              : "text-gray-600 hover:bg-gray-100"
                          )}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}