import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CreateResourceDialog } from "@/components/CreateResourceDialog";

export default function NewCase() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const fields = [
    { name: "case_number", label: "Case Number", type: "text" as const, required: true },
    { name: "title", label: "Title", type: "text" as const, required: true },
    { name: "description", label: "Description", type: "textarea" as const, required: true },
    { name: "priority", label: "Priority", type: "text" as const, required: true },
  ];

  const handleSubmit = async (data: Record<string, string>) => {
    try {
      const { error } = await supabase.from("cases").insert([
        {
          case_number: data.case_number,
          title: data.title,
          description: data.description,
          priority: data.priority,
        },
      ]);

      if (error) throw error;

      toast.success("Case created successfully");
      navigate("/cases");
    } catch (error) {
      console.error("Error creating case:", error);
      toast.error("Failed to create case");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Case</h1>
      <CreateResourceDialog
        title="Create New Case"
        description="Enter the details for the new case"
        fields={fields}
        onSubmit={handleSubmit}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
}