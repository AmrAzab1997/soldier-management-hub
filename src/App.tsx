import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { PermissionsProvider } from "@/contexts/PermissionsContext";
import { AuthProvider } from "@/components/AuthProvider";
import { PublicRoutes, PrivateRoutes } from "@/routes";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PermissionsProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              {({ user, loading }) => {
                if (loading) {
                  return (
                    <div className="min-h-screen flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-military-navy"></div>
                    </div>
                  );
                }

                return (
                  <div className="min-h-screen bg-gray-50">
                    {user ? <PrivateRoutes /> : <PublicRoutes user={user} />}
                  </div>
                );
              }}
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </PermissionsProvider>
    </QueryClientProvider>
  );
};

export default App;