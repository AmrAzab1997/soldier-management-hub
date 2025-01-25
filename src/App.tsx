import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from "@/components/ui/navigation";
import { PermissionsProvider } from "@/contexts/PermissionsContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SoldiersPage from "./pages/Personnel/Soldiers";
import OfficersPage from "./pages/Personnel/Officers";
import NewOfficerPage from "./pages/Personnel/Officers/NewOfficer";
import NewSoldierPage from "./pages/Personnel/Soldiers/NewSoldier";
import ActiveCasesPage from "./pages/Cases/ActiveCases";
import NewCasePage from "./pages/Cases/NewCase";
import AnnouncementsPage from "./pages/Announcements/Announcements";
import NewAnnouncementPage from "./pages/Announcements/NewAnnouncement";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-military-navy"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PermissionsProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-gray-50">
              <Routes>
                <Route
                  path="/"
                  element={
                    user ? (
                      <Navigate to="/dashboard" replace />
                    ) : (
                      <Login />
                    )
                  }
                />
                <Route
                  path="/register"
                  element={
                    user ? (
                      <Navigate to="/dashboard" replace />
                    ) : (
                      <Register />
                    )
                  }
                />
                <Route
                  path="/*"
                  element={
                    user ? (
                      <>
                        <Navigation />
                        <div className="pt-16">
                          <Routes>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route
                              path="/personnel/soldiers"
                              element={<SoldiersPage />}
                            />
                            <Route
                              path="/personnel/soldiers/new"
                              element={<NewSoldierPage />}
                            />
                            <Route
                              path="/personnel/officers"
                              element={<OfficersPage />}
                            />
                            <Route
                              path="/personnel/officers/new"
                              element={<NewOfficerPage />}
                            />
                            <Route
                              path="/cases/active"
                              element={<ActiveCasesPage />}
                            />
                            <Route path="/cases/new" element={<NewCasePage />} />
                            <Route
                              path="/announcements"
                              element={<AnnouncementsPage />}
                            />
                            <Route
                              path="/announcements/new"
                              element={<NewAnnouncementPage />}
                            />
                          </Routes>
                        </div>
                      </>
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </PermissionsProvider>
    </QueryClientProvider>
  );
};

export default App;