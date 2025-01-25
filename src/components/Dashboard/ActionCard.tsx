import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ActionCardProps {
  userRole: string;
  actions: string[];
}

export function ActionCard({ userRole, actions }: ActionCardProps) {
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
            <button
              key={action}
              className="p-4 text-sm text-military-navy hover:bg-military-navy/10 rounded-lg transition-colors"
            >
              {action}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}