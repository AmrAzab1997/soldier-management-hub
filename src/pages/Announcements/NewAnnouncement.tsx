import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CreateResourceDialog } from "@/components/CreateResourceDialog";
import { useQueryClient } from "@tanstack/react-query";

const NewAnnouncementPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const queryClient = useQueryClient();

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

      // Invalidate and refetch announcements
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
      
      toast({
        title: "Success",
        description: "Announcement created successfully",
      });
      navigate("/announcements");
    } catch (error) {
      console.error("Error creating announcement:", error);
      toast({
        title: "Error",
        description: "Failed to create announcement",
        variant: "destructive",
      });
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
          type: "select",
          required: true,
          options: [
            { value: "low", label: "Low" },
            { value: "normal", label: "Normal" },
            { value: "high", label: "High" },
          ],
        },
      ]}
      onSubmit={handleSubmit}
      open={open}
      onOpenChange={handleOpenChange}
    />
  );
};

export default NewAnnouncementPage;