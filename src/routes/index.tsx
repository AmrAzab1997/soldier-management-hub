import { Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from "@/components/ui/navigation";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import SoldiersPage from "@/pages/Personnel/Soldiers";
import OfficersPage from "@/pages/Personnel/Officers";
import NewOfficerPage from "@/pages/Personnel/Officers/NewOfficer";
import NewSoldierPage from "@/pages/Personnel/Soldiers/NewSoldier";
import ActiveCasesPage from "@/pages/Cases/ActiveCases";
import NewCasePage from "@/pages/Cases/NewCase";
import AnnouncementsPage from "@/pages/Announcements/Announcements";
import NewAnnouncementPage from "@/pages/Announcements/NewAnnouncement";
import CustomFieldsPage from "@/pages/Settings/CustomFields";
import { User } from "@supabase/supabase-js";

interface AppRoutesProps {
  user: User | null;
}

export const PublicRoutes = ({ user }: AppRoutesProps) => {
  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/dashboard" replace /> : <Register />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export const PrivateRoutes = () => {
  return (
    <>
      <Navigation />
      <div className="pt-16">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/personnel/soldiers" element={<SoldiersPage />} />
          <Route path="/personnel/soldiers/new" element={<NewSoldierPage />} />
          <Route path="/personnel/officers" element={<OfficersPage />} />
          <Route path="/personnel/officers/new" element={<NewOfficerPage />} />
          <Route path="/cases/active" element={<ActiveCasesPage />} />
          <Route path="/cases/new" element={<NewCasePage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/announcements/new" element={<NewAnnouncementPage />} />
          <Route path="/settings/custom-fields" element={<CustomFieldsPage />} />
        </Routes>
      </div>
    </>
  );
};