import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CreateResourceDialog } from "@/components/CreateResourceDialog";

export default function NewAnnouncement() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const fields = [
    { name: "title", label: "Title", type: "text" as const, required: true },
    { name: "content", label: "Content", type: "textarea" as const, required: true },
    { name: "priority", label: "Priority", type: "text" as const, required: true },
  ];

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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Announcement</h1>
      <CreateResourceDialog
        title="Create New Announcement"
        description="Enter the details for the new announcement"
        fields={fields}
        onSubmit={handleSubmit}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
}