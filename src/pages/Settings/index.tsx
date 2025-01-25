import { Link } from "react-router-dom";
import { Settings as SettingsIcon, Database, ListPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Settings() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center gap-2 mb-6">
        <SettingsIcon className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/settings/custom-fields">
          <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
            <ListPlus className="h-6 w-6" />
            <span>Custom Fields</span>
          </Button>
        </Link>
        
        <Link to="/settings/database">
          <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2">
            <Database className="h-6 w-6" />
            <span>Database Manager</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}