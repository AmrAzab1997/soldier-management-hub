import { RouteObject } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Dashboard from "@/pages/Dashboard";
import Settings from "@/pages/Settings";
import CustomFields from "@/pages/Settings/CustomFields";
import DatabaseManager from "@/pages/Settings/DatabaseManager";
import ActiveCases from "@/pages/Cases/ActiveCases";
import NewCase from "@/pages/Cases/NewCase";

export const router: RouteObject[] = [
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
        path: "cases",
        children: [
          {
            index: true,
            element: <ActiveCases />,
          },
          {
            path: "new",
            element: <NewCase />,
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