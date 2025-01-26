import { Settings as SettingsIcon, Database, ListPlus } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const SettingsPage = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <SettingsIcon className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link to="/settings/custom-fields">
          <Card className="h-full transition-colors hover:bg-accent">
            <CardHeader>
              <ListPlus className="h-8 w-8 text-military-navy mb-2" />
              <CardTitle>Custom Fields</CardTitle>
              <CardDescription>
                Manage custom fields for officers, soldiers, and cases. Add, edit,
                or remove fields as needed.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/settings/database">
          <Card className="h-full transition-colors hover:bg-accent">
            <CardHeader>
              <Database className="h-8 w-8 text-military-navy mb-2" />
              <CardTitle>Database Manager</CardTitle>
              <CardDescription>
                Create and manage database tables, fields, and relationships.
                Developer access required.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-500">
          Note: Some settings may require specific permissions to access. Contact
          your administrator if you need additional access.
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;