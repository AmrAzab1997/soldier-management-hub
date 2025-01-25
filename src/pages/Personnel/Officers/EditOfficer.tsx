import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const EditOfficer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: officer, isLoading } = useQuery({
    queryKey: ["officer", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("officers")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        toast.error("Error loading officer");
        throw error;
      }

      return data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit Officer</h1>
        <Button variant="outline" onClick={() => navigate("/personnel/officers")}>
          Back to Officers
        </Button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <p>Officer ID: {id}</p>
        <p>Name: {officer?.first_name} {officer?.last_name}</p>
        {/* Add form fields here */}
      </div>
    </div>
  );
};

export default EditOfficer;