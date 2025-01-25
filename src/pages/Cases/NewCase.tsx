import { CreateResourceDialog } from "@/components/CreateResourceDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export default function NewCasePage() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const fields = [
    { name: "title", label: "Title", type: "text" as const, required: true },
    {
      name: "description",
      label: "Description",
      type: "textarea" as const,
      required: true,
    },
    {
      name: "priority",
      label: "Priority",
      type: "text" as const,
      required: true,
    },
    {
      name: "assignedTo",
      label: "Assigned To",
      type: "text" as const,
      required: true,
    },
  ];

  const handleCreate = (data: Record<string, string>) => {
    // In a real app, this would make an API call
    console.log("Creating new case:", data);
    toast({
      title: "Case Created",
      description: "New case has been created successfully.",
    });
    navigate("/cases/active");
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">New Case</h1>

      <Card>
        <CardHeader>
          <CardTitle>Create Case</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateResourceDialog
            title="Create New Case"
            description="Enter the details for the new case"
            fields={fields}
            onSubmit={handleCreate}
            initialData={{}} // This will automatically open the dialog
          />
        </CardContent>
      </Card>
    </div>
  );
}