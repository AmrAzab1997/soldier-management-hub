import { CreateResourceDialog } from "@/components/CreateResourceDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export default function NewAnnouncementPage() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const fields = [
    { name: "title", label: "Title", type: "text" as const, required: true },
    {
      name: "content",
      label: "Content",
      type: "textarea" as const,
      required: true,
    },
    {
      name: "category",
      label: "Category",
      type: "text" as const,
      required: true,
    },
  ];

  const handleCreate = (data: Record<string, string>) => {
    // In a real app, this would make an API call
    console.log("Creating new announcement:", data);
    toast({
      title: "Announcement Created",
      description: "New announcement has been created successfully.",
    });
    navigate("/announcements");
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">New Announcement</h1>

      <Card>
        <CardHeader>
          <CardTitle>Create Announcement</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateResourceDialog
            title="Create New Announcement"
            description="Enter the details for the new announcement"
            fields={fields}
            onSubmit={handleCreate}
            initialData={{}} // This will automatically open the dialog
          />
        </CardContent>
      </Card>
    </div>
  );
}