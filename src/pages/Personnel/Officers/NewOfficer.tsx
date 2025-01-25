import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CreateResourceDialog } from "@/components/CreateResourceDialog";

const NewOfficerPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleSubmit = async (data: Record<string, string>) => {
    try {
      const { error } = await supabase.from("officers").insert([
        {
          first_name: data.firstName,
          last_name: data.lastName,
          rank: data.rank,
          badge_number: data.badgeNumber,
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

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      navigate("/personnel/officers");
    }
  };

  return (
    <CreateResourceDialog
      title="Add New Officer"
      description="Enter the officer's information below"
      fields={[
        { name: "firstName", label: "First Name", type: "text", required: true },
        { name: "lastName", label: "Last Name", type: "text", required: true },
        { name: "rank", label: "Rank", type: "text", required: true },
        { name: "badgeNumber", label: "Badge Number", type: "text", required: true },
        { name: "department", label: "Department", type: "text" },
      ]}
      onSubmit={handleSubmit}
      open={open}
      onOpenChange={handleOpenChange}
    />
  );
};

export default NewOfficerPage;