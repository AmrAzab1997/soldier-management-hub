import { Card } from "@/components/ui/card";
import { Activity, Users, FileText, Bell } from "lucide-react";

const Index = () => {
  const stats = [
    {
      title: "Active Cases",
      value: "12",
      icon: FileText,
      color: "text-blue-500",
    },
    {
      title: "Personnel",
      value: "48",
      icon: Users,
      color: "text-green-500",
    },
    {
      title: "Recent Activities",
      value: "24",
      icon: Activity,
      color: "text-purple-500",
    },
    {
      title: "Announcements",
      value: "7",
      icon: Bell,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} bg-gray-50 p-3 rounded-full`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;