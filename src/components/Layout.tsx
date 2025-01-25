import { Outlet } from "react-router-dom";
import { Sidebar, SidebarProvider } from "./ui/sidebar";
import { AppSidebar } from "./AppSidebar";

export const Layout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="border-r">
          <AppSidebar />
        </Sidebar>
        <main className="flex-1 overflow-hidden p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
};