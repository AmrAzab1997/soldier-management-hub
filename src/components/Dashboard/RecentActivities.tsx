import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface Activity {
  id: string;
  title: string;
  timestamp: string;
}

export function RecentActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchRecentActivities = async () => {
      const { data: cases } = await supabase
        .from('cases')
        .select('id, title, created_at')
        .order('created_at', { ascending: false })
        .limit(3);

      if (cases) {
        setActivities(cases.map(c => ({
          id: c.id,
          title: c.title,
          timestamp: new Date(c.created_at).toLocaleDateString()
        })));
      }
    };

    fetchRecentActivities();

    // Set up real-time subscription for updates
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cases' }, () => fetchRecentActivities())
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <div className="w-2 h-2 rounded-full bg-military-green" />
              <div className="flex-1">
                <p className="text-sm text-military-gray">
                  {activity.title} - {activity.timestamp}
                </p>
              </div>
            </div>
          ))}
          {activities.length === 0 && (
            <p className="text-sm text-military-gray">No recent activities</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}