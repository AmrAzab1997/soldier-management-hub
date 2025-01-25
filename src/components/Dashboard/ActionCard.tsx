import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ActionCardProps {
  userRole: string;
  actions: string[];
}

export function ActionCard({ userRole, actions }: ActionCardProps) {
  const navigate = useNavigate();

  const handleAction = (action: string) => {
    switch (action) {
      case "Add Personnel":
        navigate("/personnel/soldiers/new");
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
            <Button
              key={action}
              variant="outline"
              onClick={() => handleAction(action)}
              className="p-4 text-sm text-military-navy hover:bg-military-navy/10 rounded-lg transition-colors"
            >
              {action}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}