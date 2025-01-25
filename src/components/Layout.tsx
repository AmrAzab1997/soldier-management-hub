import { Outlet } from "react-router-dom";
import { Sidebar } from "./ui/sidebar";

export const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};