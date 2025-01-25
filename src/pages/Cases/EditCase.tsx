import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const EditCase = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: caseData, isLoading } = useQuery({
    queryKey: ["case", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cases")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        toast.error("Error loading case");
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
        <h1 className="text-2xl font-bold">Edit Case</h1>
        <Button variant="outline" onClick={() => navigate("/cases")}>
          Back to Cases
        </Button>
      </div>
      {/* Form implementation will be added later */}
      <div className="bg-white p-6 rounded-lg shadow">
        <p>Case ID: {id}</p>
        <p>Title: {caseData?.title}</p>
        {/* Add form fields here */}
      </div>
    </div>
  );
};

export default EditCase;