import { RouteObject } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Dashboard from "@/pages/Dashboard";
import Settings from "@/pages/Settings";
import CustomFields from "@/pages/Settings/CustomFields";
import DatabaseManager from "@/pages/Settings/DatabaseManager";
import ActiveCases from "@/pages/Cases/ActiveCases";
import NewCase from "@/pages/Cases/NewCase";
import Soldiers from "@/pages/Personnel/Soldiers";
import NewSoldier from "@/pages/Personnel/Soldiers/NewSoldier";
import Officers from "@/pages/Personnel/Officers";
import NewOfficer from "@/pages/Personnel/Officers/NewOfficer";
import Announcements from "@/pages/Announcements/Announcements";
import NewAnnouncement from "@/pages/Announcements/NewAnnouncement";

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
        path: "personnel",
        children: [
          {
            path: "soldiers",
            children: [
              {
                index: true,
                element: <Soldiers />,
              },
              {
                path: "new",
                element: <NewSoldier />,
              },
            ],
          },
          {
            path: "officers",
            children: [
              {
                index: true,
                element: <Officers />,
              },
              {
                path: "new",
                element: <NewOfficer />,
              },
            ],
          },
        ],
      },
      {
        path: "announcements",
        children: [
          {
            index: true,
            element: <Announcements />,
          },
          {
            path: "new",
            element: <NewAnnouncement />,
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