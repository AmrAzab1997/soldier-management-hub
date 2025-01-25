import { Navigate, RouteObject } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Dashboard from "@/pages/Dashboard";
import Settings from "@/pages/Settings";
import CustomFields from "@/pages/Settings/CustomFields";
import DatabaseManager from "@/pages/Settings/DatabaseManager";

const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
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

export const router = privateRoutes;