import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Bell, FileText, Shield, Users } from "lucide-react";

export const Navigation = () => {
  return (
    <div className="bg-military-navy text-white p-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-white hover:bg-military-navy/90">
              <Users className="mr-2" />
              Personnel
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-4 w-[400px] bg-white text-military-navy">
                <NavigationMenuLink href="/personnel/soldiers" className="block p-2 hover:bg-gray-100 rounded">
                  Manage Soldiers
                </NavigationMenuLink>
                <NavigationMenuLink href="/personnel/officers" className="block p-2 hover:bg-gray-100 rounded">
                  Manage Officers
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-white hover:bg-military-navy/90">
              <FileText className="mr-2" />
              Cases
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-4 w-[400px] bg-white text-military-navy">
                <NavigationMenuLink href="/cases/active" className="block p-2 hover:bg-gray-100 rounded">
                  Active Cases
                </NavigationMenuLink>
                <NavigationMenuLink href="/cases/new" className="block p-2 hover:bg-gray-100 rounded">
                  Create New Case
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-white hover:bg-military-navy/90">
              <Bell className="mr-2" />
              Announcements
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-3 p-4 w-[400px] bg-white text-military-navy">
                <NavigationMenuLink href="/announcements" className="block p-2 hover:bg-gray-100 rounded">
                  View All
                </NavigationMenuLink>
                <NavigationMenuLink href="/announcements/new" className="block p-2 hover:bg-gray-100 rounded">
                  Create New
                </NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};