import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CreateResourceDialog } from "@/components/CreateResourceDialog";

const NewSoldierPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleSubmit = async (data: Record<string, string>) => {
    try {
      const { error } = await supabase.from("soldiers").insert([
        {
          first_name: data.firstName,
          last_name: data.lastName,
          rank: data.rank,
          service_number: data.serviceNumber,
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

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      navigate("/personnel/soldiers");
    }
  };

  return (
    <CreateResourceDialog
      title="Add New Soldier"
      description="Enter the soldier's information below"
      fields={[
        { name: "firstName", label: "First Name", type: "text", required: true },
        { name: "lastName", label: "Last Name", type: "text", required: true },
        { name: "rank", label: "Rank", type: "text", required: true },
        { name: "serviceNumber", label: "Service Number", type: "text", required: true },
        { name: "unit", label: "Unit", type: "text" },
      ]}
      onSubmit={handleSubmit}
      open={open}
      onOpenChange={handleOpenChange}
    />
  );
};

export default NewSoldierPage;