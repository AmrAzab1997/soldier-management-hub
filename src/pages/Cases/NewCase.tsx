import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CreateResourceDialog } from "@/components/CreateResourceDialog";

const NewCasePage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleSubmit = async (data: Record<string, string>) => {
    try {
      const { error } = await supabase.from("cases").insert([
        {
          case_number: data.caseNumber,
          title: data.title,
          description: data.description,
          priority: data.priority,
        },
      ]);

      if (error) throw error;

      toast.success("Case created successfully");
      navigate("/cases/active");
    } catch (error) {
      console.error("Error creating case:", error);
      toast.error("Failed to create case");
    }
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      navigate("/cases/active");
    }
  };

  return (
    <CreateResourceDialog
      title="Create New Case"
      description="Enter the case details below."
      fields={[
        { name: "caseNumber", label: "Case Number", type: "text", required: true },
        { name: "title", label: "Title", type: "text", required: true },
        { name: "description", label: "Description", type: "textarea" },
        {
          name: "priority",
          label: "Priority",
          type: "text",
          required: true,
        },
      ]}
      onSubmit={handleSubmit}
      open={open}
      onOpenChange={handleOpenChange}
    />
  );
};

export default NewCasePage;