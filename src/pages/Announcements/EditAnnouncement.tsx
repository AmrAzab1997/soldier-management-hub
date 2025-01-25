import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const EditAnnouncement = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: announcement, isLoading, error } = useQuery({
    queryKey: ["announcement", id],
    queryFn: async () => {
      // Validate UUID format before making the request
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!id || !uuidRegex.test(id)) {
        throw new Error("Invalid announcement ID format");
      }

      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        toast.error("Error loading announcement");
        throw error;
      }

      if (!data) {
        toast.error("Announcement not found");
        throw new Error("Announcement not found");
      }

      return data;
    },
  });

  if (error) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Error</h1>
          <Button variant="outline" onClick={() => navigate("/announcements")}>
            Back to Announcements
          </Button>
        </div>
        <p className="text-red-500">
          {error instanceof Error ? error.message : "Failed to load announcement"}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Loading...</h1>
          <Button variant="outline" onClick={() => navigate("/announcements")}>
            Back to Announcements
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit Announcement</h1>
        <Button variant="outline" onClick={() => navigate("/announcements")}>
          Back to Announcements
        </Button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <p>Announcement ID: {id}</p>
        <p>Title: {announcement?.title}</p>
        {/* Add form fields here */}
      </div>
    </div>
  );
};

export default EditAnnouncement;