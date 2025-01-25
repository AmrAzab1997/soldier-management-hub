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
import { Plus, Settings } from "lucide-react";
import { CustomFieldsManager } from "@/components/CustomFieldsManager";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ActionCardProps {
  userRole: string;
  actions: string[];
}

export function ActionCard({ userRole, actions }: ActionCardProps) {
  const navigate = useNavigate();
  const [selectedEntity, setSelectedEntity] = useState<'officer' | 'soldier' | 'case'>('officer');

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
              className="w-full flex items-center justify-center gap-2 p-4 text-sm font-medium text-military-navy hover:bg-military-navy/10 rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
              {action}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem 
              onClick={() => navigate("/personnel/officers/new")}
              className="cursor-pointer"
            >
              Add Officer
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => navigate("/personnel/soldiers/new")}
              className="cursor-pointer"
            >
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
        className="w-full p-4 text-sm text-military-navy hover:bg-military-navy/10 rounded-lg transition-colors"
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
          
          {userRole === 'developer' && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 p-4 text-sm font-medium text-military-navy hover:bg-military-navy/10 rounded-lg transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  Manage Custom Fields
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Custom Fields Management</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div className="flex gap-4">
                    <Button
                      variant={selectedEntity === 'officer' ? 'default' : 'outline'}
                      onClick={() => setSelectedEntity('officer')}
                    >
                      Officers
                    </Button>
                    <Button
                      variant={selectedEntity === 'soldier' ? 'default' : 'outline'}
                      onClick={() => setSelectedEntity('soldier')}
                    >
                      Soldiers
                    </Button>
                    <Button
                      variant={selectedEntity === 'case' ? 'default' : 'outline'}
                      onClick={() => setSelectedEntity('case')}
                    >
                      Cases
                    </Button>
                  </div>
                  <CustomFieldsManager entity={selectedEntity} />
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardContent>
    </Card>
  );
}