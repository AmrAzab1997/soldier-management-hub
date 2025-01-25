import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/ui/navigation";
import { Users, FileText, Bell, Shield } from "lucide-react";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const stats = [
    {
      title: "Total Personnel",
      value: "1,234",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Active Cases",
      value: "42",
      icon: FileText,
      color: "text-green-500",
    },
    {
      title: "Announcements",
      value: "8",
      icon: Bell,
      color: "text-yellow-500",
    },
    {
      title: "Security Level",
      value: "High",
      icon: Shield,
      color: "text-red-500",
    },
  ];

  const renderContent = () => {
    switch (currentPath) {
      case "/personnel/soldiers":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Soldiers Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-military-gray">Manage enlisted personnel records and assignments.</p>
            </CardContent>
          </Card>
        );
      case "/personnel/officers":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Officers Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-military-gray">Manage officer records and command assignments.</p>
            </CardContent>
          </Card>
        );
      case "/cases/active":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Active Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-military-gray">View and manage ongoing cases and investigations.</p>
            </CardContent>
          </Card>
        );
      case "/cases/new":
        return (
          <Card>
            <CardHeader>
              <CardTitle>New Case</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-military-gray">Create and submit new case reports.</p>
            </CardContent>
          </Card>
        );
      case "/announcements":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-military-gray">View all current announcements and bulletins.</p>
            </CardContent>
          </Card>
        );
      case "/announcements/new":
        return (
          <Card>
            <CardHeader>
              <CardTitle>New Announcement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-military-gray">Create and publish new announcements.</p>
            </CardContent>
          </Card>
        );
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {["Add Personnel", "New Case", "Announcement", "Reports"].map(
                    (action) => (
                      <button
                        key={action}
                        className="p-4 text-sm text-military-navy hover:bg-military-navy/10 rounded-lg transition-colors"
                      >
                        {action}
                      </button>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="p-6 space-y-6">
        <h1 className="text-3xl font-bold text-military-navy">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-military-gray">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;