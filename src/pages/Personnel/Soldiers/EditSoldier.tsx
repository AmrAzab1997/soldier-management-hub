import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { CreateResourceDialog } from "@/components/CreateResourceDialog";
import { Loader2 } from "lucide-react";

const EditSoldier = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  const { mutate: updateSoldier } = useMutation({
    mutationFn: async (data: Record<string, string>) => {
      const { error } = await supabase
        .from("soldiers")
        .update({
          first_name: data.first_name,
          last_name: data.last_name,
          rank: data.rank,
          service_number: data.service_number,
          unit: data.unit,
          status: data.status,
        })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Soldier updated successfully");
      queryClient.invalidateQueries({ queryKey: ["soldiers"] });
      navigate("/personnel/soldiers");
    },
    onError: (error) => {
      console.error("Error updating soldier:", error);
      toast.error("Failed to update soldier");
    },
  });

  const soldierFields = [
    {
      name: "first_name",
      label: "First Name",
      type: "text" as const,
      required: true,
    },
    {
      name: "last_name",
      label: "Last Name",
      type: "text" as const,
      required: true,
    },
    {
      name: "rank",
      label: "Rank",
      type: "text" as const,
      required: true,
    },
    {
      name: "service_number",
      label: "Service Number",
      type: "text" as const,
      required: true,
    },
    {
      name: "unit",
      label: "Unit",
      type: "text" as const,
    },
    {
      name: "status",
      label: "Status",
      type: "text" as const,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit Soldier</h1>
        <Button variant="outline" onClick={() => navigate("/personnel/soldiers")}>
          Back to Soldiers
        </Button>
      </div>
      {soldier && (
        <CreateResourceDialog
          title="Edit Soldier"
          description="Update the soldier's details."
          fields={soldierFields}
          onSubmit={updateSoldier}
          initialData={{
            first_name: soldier.first_name,
            last_name: soldier.last_name,
            rank: soldier.rank,
            service_number: soldier.service_number,
            unit: soldier.unit || "",
            status: soldier.status || "",
          }}
        />
      )}
    </div>
  );
};

export default EditSoldier;