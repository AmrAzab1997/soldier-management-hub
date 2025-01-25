import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link to="/settings/custom-fields">
          <Button variant="outline" className="w-full">
            Custom Fields
          </Button>
        </Link>
        <Link to="/settings/database">
          <Button variant="outline" className="w-full">
            Database Manager
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Settings;