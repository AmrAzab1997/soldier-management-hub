import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CreateResourceDialog } from "@/components/CreateResourceDialog";

export default function NewSoldier() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const fields = [
    { name: "first_name", label: "First Name", type: "text" as const, required: true },
    { name: "last_name", label: "Last Name", type: "text" as const, required: true },
    { name: "rank", label: "Rank", type: "text" as const, required: true },
    { name: "service_number", label: "Service Number", type: "text" as const, required: true },
    { name: "unit", label: "Unit", type: "text" as const, required: true },
  ];

  const handleSubmit = async (data: Record<string, string>) => {
    try {
      const { error } = await supabase.from("soldiers").insert([
        {
          first_name: data.first_name,
          last_name: data.last_name,
          rank: data.rank,
          service_number: data.service_number,
          unit: data.unit,
        },
      ]);

      if (error) throw error;

      toast.success("Soldier created successfully");
      navigate("/personnel/soldiers");
    } catch (error) {
      console.error("Error creating soldier:", error);
      toast.error("Failed to create soldier");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Soldier</h1>
      <CreateResourceDialog
        title="Create New Soldier"
        description="Enter the details for the new soldier"
        fields={fields}
        onSubmit={handleSubmit}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
}