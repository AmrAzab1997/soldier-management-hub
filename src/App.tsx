import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SoldiersPage from "./pages/Personnel/Soldiers";
import ActiveCasesPage from "./pages/Cases/ActiveCases";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/personnel/soldiers" element={<SoldiersPage />} />
          <Route path="/personnel/officers" element={<Dashboard />} />
          <Route path="/cases/active" element={<ActiveCasesPage />} />
          <Route path="/cases/new" element={<Dashboard />} />
          <Route path="/announcements" element={<Dashboard />} />
          <Route path="/announcements/new" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;