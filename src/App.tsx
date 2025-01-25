import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { PermissionsProvider } from "@/contexts/PermissionsContext";
import { AuthProvider } from "@/components/AuthProvider";
import { router } from "@/routes";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PermissionsProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
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
                  <RouterProvider router={router} />
                </div>
              );
            }}
          </AuthProvider>
        </TooltipProvider>
      </PermissionsProvider>
    </QueryClientProvider>
  );
};

export default App;