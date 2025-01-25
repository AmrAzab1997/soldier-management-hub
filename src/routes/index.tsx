import { Navigate, RouteObject } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { PermissionsProvider } from "@/contexts/PermissionsContext";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "@/pages/Dashboard";
import Settings from "@/pages/Settings";
import CustomFields from "@/pages/Settings/CustomFields";
import DatabaseManager from "@/pages/Settings/DatabaseManager";

const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: (
      <PermissionsProvider>
        <Layout />
        <Toaster />
      </PermissionsProvider>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "settings",
        children: [
          {
            index: true,
            element: <Settings />,
          },
          {
            path: "custom-fields",
            element: <CustomFields />,
          },
          {
            path: "database",
            element: <DatabaseManager />,
          },
        ],
      },
    ],
  },
];

export const PublicRoutes = ({ user }: { user: any }) => {
  if (user) return <Navigate to="/" replace />;
  return <Navigate to="/login" replace />;
};

export const PrivateRoutes = () => {
  return <Navigate to="/" replace />;
};

export const router = privateRoutes;