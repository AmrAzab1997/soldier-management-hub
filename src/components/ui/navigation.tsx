import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { usePermissions } from "@/contexts/PermissionsContext";
import {
  Users,
  Shield,
  FileText,
  Megaphone,
  Settings,
  LogOut,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function Navigation() {
  const location = useLocation();
  const { canManageFields, currentUser } = usePermissions();
  const isDeveloper = currentUser?.role === 'developer';

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      toast.error("Error signing out");
    }
  };

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/dashboard" className="mr-8 flex items-center space-x-2">
          <Shield className="h-6 w-6" />
          <span className="font-bold">Military App</span>
        </Link>

        <div className="flex items-center space-x-6 text-sm font-medium">
          <Link
            to="/personnel/officers"
            className={cn(
              "transition-colors hover:text-foreground/80",
              isActive("/personnel") ? "text-foreground" : "text-foreground/60"
            )}
          >
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Personnel</span>
            </div>
          </Link>

          <Link
            to="/cases/active"
            className={cn(
              "transition-colors hover:text-foreground/80",
              isActive("/cases") ? "text-foreground" : "text-foreground/60"
            )}
          >
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Cases</span>
            </div>
          </Link>

          <Link
            to="/announcements"
            className={cn(
              "transition-colors hover:text-foreground/80",
              isActive("/announcements") ? "text-foreground" : "text-foreground/60"
            )}
          >
            <div className="flex items-center gap-2">
              <Megaphone className="h-4 w-4" />
              <span>Announcements</span>
            </div>
          </Link>

          {isDeveloper && (
            <Link
              to="/settings/custom-fields"
              className={cn(
                "transition-colors hover:text-foreground/80",
                isActive("/settings") ? "text-foreground" : "text-foreground/60"
              )}
            >
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Custom Fields</span>
              </div>
            </Link>
          )}
        </div>

        <div className="ml-auto">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground/80"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </nav>
  );
}