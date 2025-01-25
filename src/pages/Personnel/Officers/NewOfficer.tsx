import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CreateResourceDialog } from "@/components/CreateResourceDialog";

export default function NewOfficer() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const fields = [
    { name: "first_name", label: "First Name", type: "text" as const, required: true },
    { name: "last_name", label: "Last Name", type: "text" as const, required: true },
    { name: "rank", label: "Rank", type: "text" as const, required: true },
    { name: "badge_number", label: "Badge Number", type: "text" as const, required: true },
    { name: "department", label: "Department", type: "text" as const, required: true },
  ];

  const handleSubmit = async (data: Record<string, string>) => {
    try {
      const { error } = await supabase.from("officers").insert([
        {
          first_name: data.first_name,
          last_name: data.last_name,
          rank: data.rank,
          badge_number: data.badge_number,
          department: data.department,
        },
      ]);

      if (error) throw error;

      toast.success("Officer created successfully");
      navigate("/personnel/officers");
    } catch (error) {
      console.error("Error creating officer:", error);
      toast.error("Failed to create officer");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Officer</h1>
      <CreateResourceDialog
        title="Create New Officer"
        description="Enter the details for the new officer"
        fields={fields}
        onSubmit={handleSubmit}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
}