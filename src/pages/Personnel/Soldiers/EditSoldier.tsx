import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const EditSoldier = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: soldier, isLoading } = useQuery({
    queryKey: ["soldier", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("soldiers")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        toast.error("Error loading soldier");
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
        <h1 className="text-2xl font-bold">Edit Soldier</h1>
        <Button variant="outline" onClick={() => navigate("/personnel/soldiers")}>
          Back to Soldiers
        </Button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <p>Soldier ID: {id}</p>
        <p>Name: {soldier?.first_name} {soldier?.last_name}</p>
        {/* Add form fields here */}
      </div>
    </div>
  );
};

export default EditSoldier;