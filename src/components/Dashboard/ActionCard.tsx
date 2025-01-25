import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ActionCardProps {
  userRole: string;
  actions: string[];
}

export function ActionCard({ userRole, actions }: ActionCardProps) {
  const navigate = useNavigate();

  const handleAction = (action: string) => {
    switch (action) {
      case "Add Personnel":
        // This case is now handled by the dropdown
        break;
      case "New Case":
        navigate("/cases/new");
        break;
      case "Announcement":
        navigate("/announcements/new");
        break;
      case "Reports":
        toast.info("Reports feature coming soon!");
        break;
      default:
        toast.error("Action not implemented");
    }
  };

  const renderButton = (action: string) => {
    if (action === "Add Personnel") {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="p-4 text-sm text-military-navy hover:bg-military-navy/10 rounded-lg transition-colors w-full"
            >
              {action}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => navigate("/personnel/officers/new")}>
              Add Officer
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/personnel/soldiers/new")}>
              Add Soldier
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <Button
        variant="outline"
        onClick={() => handleAction(action)}
        className="p-4 text-sm text-military-navy hover:bg-military-navy/10 rounded-lg transition-colors w-full"
      >
        {action}
      </Button>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {userRole === 'developer' ? 'Developer Actions' : 'Admin Actions'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action) => (
            <div key={action}>
              {renderButton(action)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}