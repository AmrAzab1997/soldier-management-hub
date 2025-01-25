import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CreateResourceDialog } from "@/components/CreateResourceDialog";

const NewAnnouncementPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleSubmit = async (data: Record<string, string>) => {
    try {
      const { error } = await supabase.from("announcements").insert([
        {
          title: data.title,
          content: data.content,
          priority: data.priority,
        },
      ]);

      if (error) throw error;

      toast.success("Announcement created successfully");
      navigate("/announcements");
    } catch (error) {
      console.error("Error creating announcement:", error);
      toast.error("Failed to create announcement");
    }
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) {
      navigate("/announcements");
    }
  };

  return (
    <CreateResourceDialog
      title="Create New Announcement"
      description="Enter the announcement details below."
      fields={[
        { name: "title", label: "Title", type: "text", required: true },
        { name: "content", label: "Content", type: "textarea", required: true },
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

export default NewAnnouncementPage;