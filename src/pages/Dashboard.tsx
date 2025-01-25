import { useEffect, useState } from "react";
import { Users, FileText, Bell, Shield } from "lucide-react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { StatsCard } from "@/components/Dashboard/StatsCard";
import { RecentActivities } from "@/components/Dashboard/RecentActivities";
import { ActionCard } from "@/components/Dashboard/ActionCard";

const Dashboard = () => {
  const location = useLocation();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: roleData, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user role:', error);
          toast.error('Error fetching user role');
          return;
        }

        setUserRole(roleData?.role || 'user');
      } catch (error) {
        console.error('Error:', error);
        toast.error('Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  const stats = [
    {
      title: "Total Personnel",
      value: "1,234",
      icon: Users,
      color: "text-blue-500",
      requiredRole: "user",
    },
    {
      title: "Active Cases",
      value: "42",
      icon: FileText,
      color: "text-green-500",
      requiredRole: "user",
    },
    {
      title: "Announcements",
      value: "8",
      icon: Bell,
      color: "text-yellow-500",
      requiredRole: "user",
    },
    {
      title: "Security Level",
      value: "High",
      icon: Shield,
      color: "text-red-500",
      requiredRole: "admin",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-military-navy"></div>
      </div>
    );
  }

  const filteredStats = stats.filter(stat => {
    if (userRole === 'developer') return true;
    if (userRole === 'admin' && stat.requiredRole !== 'developer') return true;
    if (userRole === 'user' && stat.requiredRole === 'user') return true;
    return false;
  });

  const actions = ["Add Personnel", "New Case", "Announcement", "Reports"];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-military-navy">Dashboard</h1>
          {userRole && (
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-military-navy text-white">
              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredStats.map((stat) => (
            <StatsCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentActivities />
          {(userRole === 'admin' || userRole === 'developer') && (
            <ActionCard userRole={userRole} actions={actions} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;