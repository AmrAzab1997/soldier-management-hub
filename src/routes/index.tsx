import { Layout } from "@/components/Layout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import ActiveCases from "@/pages/Cases/ActiveCases";
import NewCase from "@/pages/Cases/NewCase";
import Soldiers from "@/pages/Personnel/Soldiers";
import NewSoldier from "@/pages/Personnel/Soldiers/NewSoldier";
import Officers from "@/pages/Personnel/Officers";
import NewOfficer from "@/pages/Personnel/Officers/NewOfficer";
import Announcements from "@/pages/Announcements/Announcements";
import NewAnnouncement from "@/pages/Announcements/NewAnnouncement";
import CustomFields from "@/pages/Settings/CustomFields";
import DatabaseManager from "@/pages/Settings/DatabaseManager";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

export const router = [
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "dashboard",
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
        path: "personnel/soldiers",
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
        path: "personnel/officers",
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
        path: "settings/custom-fields",
        element: <CustomFields />,
      },
      {
        path: "settings/database",
        element: <DatabaseManager />,
      },
    ],
  },
];