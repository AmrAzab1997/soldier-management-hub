import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecentActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="w-2 h-2 rounded-full bg-military-green" />
              <div className="flex-1">
                <p className="text-sm text-military-gray">
                  Personnel update #{i}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}