import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { PermissionsProvider } from "@/contexts/PermissionsContext";
import { Toaster } from "@/components/ui/toaster";

import Dashboard from "@/pages/Dashboard";
import Officers from "@/pages/Officers";
import OfficerDetails from "@/pages/Officers/Details";
import Soldiers from "@/pages/Soldiers";
import SoldierDetails from "@/pages/Soldiers/Details";
import Cases from "@/pages/Cases";
import CaseDetails from "@/pages/Cases/Details";
import Settings from "@/pages/Settings";
import CustomFields from "@/pages/Settings/CustomFields";
import DatabaseManager from "@/pages/Settings/DatabaseManager";

const routes = [
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
        path: "officers",
        children: [
          {
            index: true,
            element: <Officers />,
          },
          {
            path: ":id",
            element: <OfficerDetails />,
          },
        ],
      },
      {
        path: "soldiers",
        children: [
          {
            index: true,
            element: <Soldiers />,
          },
          {
            path: ":id",
            element: <SoldierDetails />,
          },
        ],
      },
      {
        path: "cases",
        children: [
          {
            index: true,
            element: <Cases />,
          },
          {
            path: ":id",
            element: <CaseDetails />,
          },
        ],
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

export const router = createBrowserRouter(routes);