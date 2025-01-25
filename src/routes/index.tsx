import { Layout } from "@/components/Layout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import ActiveCases from "@/pages/Cases/ActiveCases";
import NewCase from "@/pages/Cases/NewCase";
import EditCase from "@/pages/Cases/EditCase";
import Soldiers from "@/pages/Personnel/Soldiers";
import NewSoldier from "@/pages/Personnel/Soldiers/NewSoldier";
import EditSoldier from "@/pages/Personnel/Soldiers/EditSoldier";
import Officers from "@/pages/Personnel/Officers";
import NewOfficer from "@/pages/Personnel/Officers/NewOfficer";
import EditOfficer from "@/pages/Personnel/Officers/EditOfficer";
import Announcements from "@/pages/Announcements/Announcements";
import NewAnnouncement from "@/pages/Announcements/NewAnnouncement";
import EditAnnouncement from "@/pages/Announcements/EditAnnouncement";
import CustomFields from "@/pages/Settings/CustomFields";
import DatabaseManager from "@/pages/Settings/DatabaseManager";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/NotFound";

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
          {
            path: "edit/:id",
            element: <EditCase />,
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
          {
            path: "edit/:id",
            element: <EditSoldier />,
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
          {
            path: "edit/:id",
            element: <EditOfficer />,
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
          {
            path: "edit/:id",
            element: <EditAnnouncement />,
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
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];