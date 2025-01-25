import { Settings as SettingsIcon, Database, ListPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

const SettingsPage = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <SettingsIcon className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link to="/settings/custom-fields">
          <Card className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col space-y-3">
              <ListPlus className="h-8 w-8 text-military-navy" />
              <h2 className="text-lg font-semibold">Custom Fields</h2>
              <p className="text-sm text-gray-500">
                Manage custom fields for officers, soldiers, and cases. Add, edit, or remove fields as needed.
              </p>
            </div>
          </Card>
        </Link>

        <Link to="/settings/database">
          <Card className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex flex-col space-y-3">
              <Database className="h-8 w-8 text-military-navy" />
              <h2 className="text-lg font-semibold">Database Manager</h2>
              <p className="text-sm text-gray-500">
                Create and manage database tables, fields, and relationships. Developer access required.
              </p>
            </div>
          </Card>
        </Link>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-500">
          Note: Some settings may require specific permissions to access. Contact your administrator if you need additional access.
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;